import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { entidades, solicitudesRecursos, recursos } from '$lib/server/db/schema';
import { eq, ne, and, desc } from 'drizzle-orm';

export const load = ({ locals, url }) => {
    if (!locals.user) throw redirect(302, '/login');

    // Control de paginación masiva activa (100 elementos por página)
    const pagina = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
    const limite = 100;
    const offset = (pagina - 1) * limite;

    // Catálogo maestro para los selectores reactivos del formulario
    const recursosPromise = db.select().from(recursos).orderBy(recursos.nombre);

    // Requerimientos Globales Activos (otros centros) con proyección total de campos de contacto y dirección
    const globalesActivasPromise = db
        .select({
            id: solicitudesRecursos.id,
            codigo: solicitudesRecursos.codigo,
            lote: solicitudesRecursos.lote,
            estatus: solicitudesRecursos.estatus,
            cantidad: solicitudesRecursos.cantidad,
            descripcion: solicitudesRecursos.descripcion,
            createdAt: solicitudesRecursos.createdAt,
            recursoNombre: recursos.nombre,
            recursoCategoria: recursos.categoria,
            centroNombre: entidades.nombre,
            estado: entidades.estado,
            municipio: entidades.municipio,
            localidad: entidades.localidad,
            direccionExacta: entidades.direccionExacta,
            latitud: entidades.latitud,
            longitud: entidades.longitud,
            telefonoPrincipal: entidades.telefonoPrincipal,
            telefonoSecundario: entidades.telefonoSecundario,
            emailContacto: entidades.emailContacto
        })
        .from(solicitudesRecursos)
        .innerJoin(entidades, eq(solicitudesRecursos.entidadId, entidades.id))
        .innerJoin(recursos, eq(solicitudesRecursos.recursoId, recursos.id))
        .where(
            and(
                eq(solicitudesRecursos.estatus, 'PENDIENTE'),
                ne(entidades.encargadoId, locals.user.id)
            )
        )
        .orderBy(desc(solicitudesRecursos.createdAt))
        .limit(limite)
        .offset(offset);

    // Solicitudes del centro del usuario en sesión
    const misSolicitudesPromise = db
        .select({
            id: solicitudesRecursos.id,
            codigo: solicitudesRecursos.codigo,
            lote: solicitudesRecursos.lote,
            estatus: solicitudesRecursos.estatus,
            cantidad: solicitudesRecursos.cantidad,
            descripcion: solicitudesRecursos.descripcion,
            createdAt: solicitudesRecursos.createdAt,
            recursoNombre: recursos.nombre,
            recursoCategoria: recursos.categoria,
            centroNombre: entidades.nombre,
            estado: entidades.estado,
            municipio: entidades.municipio,
            localidad: entidades.localidad,
            direccionExacta: entidades.direccionExacta,
            latitud: entidades.latitud,
            longitud: entidades.longitud,
            telefonoPrincipal: entidades.telefonoPrincipal,
            telefonoSecundario: entidades.telefonoSecundario,
            emailContacto: entidades.emailContacto
        })
        .from(solicitudesRecursos)
        .innerJoin(entidades, eq(solicitudesRecursos.entidadId, entidades.id))
        .innerJoin(recursos, eq(solicitudesRecursos.recursoId, recursos.id))
        .where(eq(entidades.encargadoId, locals.user.id))
        .orderBy(desc(solicitudesRecursos.createdAt))
        .limit(limite)
        .offset(offset);

    // Historial Global de Solicitudes ya procesadas y finalizadas
    const finalizadasPromise = db
        .select({
            id: solicitudesRecursos.id,
            codigo: solicitudesRecursos.codigo,
            lote: solicitudesRecursos.lote,
            estatus: solicitudesRecursos.estatus,
            cantidad: solicitudesRecursos.cantidad,
            createdAt: solicitudesRecursos.createdAt,
            recursoNombre: recursos.nombre,
            recursoCategoria: recursos.categoria,
            centroNombre: entidades.nombre,
            estado: entidades.estado,
            municipio: entidades.municipio,
            localidad: entidades.localidad,
            direccionExacta: entidades.direccionExacta,
            latitud: entidades.latitud,
            longitud: entidades.longitud,
            telefonoPrincipal: entidades.telefonoPrincipal,
            telefonoSecundario: entidades.telefonoSecundario,
            emailContacto: entidades.emailContacto
        })
        .from(solicitudesRecursos)
        .innerJoin(entidades, eq(solicitudesRecursos.entidadId, entidades.id))
        .innerJoin(recursos, eq(solicitudesRecursos.recursoId, recursos.id))
        .where(eq(solicitudesRecursos.estatus, 'FINALIZADA'))
        .orderBy(desc(solicitudesRecursos.createdAt))
        .limit(limite)
        .offset(offset);

    return {
        pagina,
        streamed: {
            recursos: recursosPromise,
            globalesActivas: globalesActivasPromise,
            misSolicitudes: misSolicitudesPromise,
            finalizadas: finalizadasPromise
        }
    };
};

export const actions = {
    crearSolicitudAgrupada: async ({ request, locals }) => {
        if (!locals.user) return fail(401, { error: 'No autorizado.' });

        const [entidad] = await db.select().from(entidades).where(eq(entidades.encargadoId, locals.user.id)).limit(1);
        if (!entidad) return fail(400, { error: 'No dispone de un centro o entidad vinculada.' });

        const data = await request.formData();
        const recursosIds = data.getAll('recursoId');
        const cantidades = data.getAll('cantidad');
        const descripcion = data.get('descripcion')?.toString().trim() || null;

        if (!recursosIds.length) {
            return fail(400, { error: 'El lote debe contener al menos un requerimiento.' });
        }

        try {
            const numeroLote = Math.floor(Date.now() / 1000);
            const codigoBase = `REQ-${numeroLote}`;

            for (let i = 0; i < recursosIds.length; i++) {
                const rId = recursosIds[i].toString();
                const cant = parseInt(cantidades[i].toString());

                if (!rId || isNaN(cant) || cant <= 0) continue;

                await db.insert(solicitudesRecursos).values({
                    codigo: `${codigoBase}-${i + 1}`,
                    lote: numeroLote,
                    estatus: 'PENDIENTE',
                    entidadId: entidad.id,
                    recursoId: rId,
                    cantidad: cant,
                    descripcion: descripcion
                });
            }

            return { exito: 'Lote de requerimientos guardado e indexado de manera exitosa.' };
        } catch (err) {
            console.error(err);
            return fail(500, { error: 'Fallo crítico de base de datos al procesar el lote.' });
        }
    },

    finalizarLote: async ({ request, locals }) => {
        if (!locals.user) return fail(401, { error: 'No autorizado.' });

        const data = await request.formData();
        const loteId = parseInt(data.get('lote')?.toString());

        if (isNaN(loteId)) return fail(400, { error: 'Identificador de lote corrupto o ausente.' });

        try {
            await db.update(solicitudesRecursos)
                .set({ estatus: 'FINALIZADA', updatedAt: new Date() })
                .where(eq(solicitudesRecursos.lote, loteId));

            return { exito: 'El lote y sus líneas asociadas han cambiado a estatus FINALIZADO.' };
        } catch (err) {
            console.error(err);
            return fail(500, { error: 'No se pudo actualizar el estado físico del lote.' });
        }
    }
};
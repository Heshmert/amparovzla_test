import { db } from '$lib/server/db';
import { entidades } from '$lib/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

export const load = ({ url }) => {
    // Proyección ultra-optimizada: Solo traemos datos públicos esenciales e ID del encargado
    const centrosPromise = db.select({
        id: entidades.id,
        nombre: entidades.nombre,
        tipo: entidades.tipo,
        encargadoId: entidades.encargadoId, // Expuesto solo como ID crudo por seguridad
        telefonoPrincipal: entidades.telefonoPrincipal,
        estado: entidades.estado,
        municipio: entidades.municipio,
        localidad: entidades.localidad,
        direccionExacta: entidades.direccionExacta,
        latitud: entidades.latitud,
        longitud: entidades.longitud,
        estatus: entidades.estatus,
        verificado: entidades.verificado
    })
    .from(entidades)
    .where(
        and(
            isNull(entidades.deletedAt),
            eq(entidades.verificado, true) // Solo mostrar centros validados por la red
        )
    )
    .execute();

    return {
        streamed: {
            centros: centrosPromise
        }
    };
};
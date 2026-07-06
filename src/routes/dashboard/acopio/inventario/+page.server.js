import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import {
  inventarios,
  movimientos,
  detallesRecursos,
  personas,
  entidades,
  recursos,
} from "$lib/server/db/schema";
import { eq, and, isNull } from "drizzle-orm";



export const load = async ({ locals }) => {

  if (!locals.user) {
    return { 
      recursos: Promise.resolve([]), 
      inventario: Promise.resolve([]) 
    };
  }

  const inventarioActualPromise = db
    .select({
      inventarioId: inventarios.id,
      recursoId: recursos.id,
      nombre: recursos.nombre,
      categoria: recursos.cat, 
      stockActual: inventarios.cantidad
    })
    .from(inventarios)
    .innerJoin(recursos, eq(inventarios.recursosId, recursos.id))
    .innerJoin(entidades, eq(inventarios.entidadId, entidades.id))
    .where(eq(entidades.encargadoId, locals.user.id));

  return {
    recursos: db.select().from(recursos).where(isNull(recursos.deletedAt)),
    inventario: inventarioActualPromise
  };
};

export const actions = {
  verificarDonante: async ({ request }) => {
    const cedula = (await request.formData()).get("cedula")?.toString().trim();
    if (!cedula) return fail(400, { errorBuscar: "Debe ingresar una cédula." });

    const [persona] = await db
      .select()
      .from(personas)
      .where(eq(personas.cedula, cedula))
      .limit(1);
    if (!persona)
      return fail(404, {
        errorBuscar: "CÉDULA NO REGISTRADA",
        cedulaNoEncontrada: cedula,
      });

    return { donanteEncontrado: persona };
  },

registrarDonacionMasiva: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: "No autorizado." });

    const data = await request.formData();
    const personaIdRecibida = data.get("personasId")?.toString(); 
    const itemsDonados = JSON.parse(data.get("items")?.toString() || "[]");

    if (!personaIdRecibida || itemsDonados.length === 0) {
      return fail(400, { error: "Datos de donación incompletos." });
    }

    // Identificador único para agrupar todos los ítems de esta donación específica
    const identificadorLote = crypto.randomUUID();

    try {
      await db.transaction(async (tx) => {
        const [entidad] = await tx.select().from(entidades)
          .where(eq(entidades.encargadoId, locals.user.id)).limit(1);
        
        if (!entidad) throw new Error("ENTIDAD_NOT_FOUND");

        for (const item of itemsDonados) {
          const cant = parseInt(item.cantidad, 10);
          if (isNaN(cant) || cant <= 0) continue;

          // 1. INVENTARIO: Buscar/Actualizar stock
          let [stock] = await tx.select().from(inventarios).where(and(
            eq(inventarios.entidadId, entidad.id),
            eq(inventarios.recursosId, item.recursoId)
          )).limit(1);

          let invId;
          if (stock) {
            invId = stock.id;
            await tx.update(inventarios)
              .set({ cantidad: stock.cantidad + cant, updatedAt: new Date() })
              .where(eq(inventarios.id, invId));
          } else {
            const [nuevo] = await tx.insert(inventarios).values({
              entidadId: entidad.id,
              recursosId: item.recursoId,
              cantidad: cant
            }).returning();
            invId = nuevo.id;
          }

          // 2. DETALLES: Asegurar que exista el registro base
          let [det] = await tx.select().from(detallesRecursos)
            .where(eq(detallesRecursos.recursoId, item.recursoId)).limit(1);
          if (!det) {
            [det] = await tx.insert(detallesRecursos)
              .values({ recursoId: item.recursoId }).returning();
          }

          // 3. MOVIMIENTO: Registro con el lote agrupador unificado
          await tx.insert(movimientos).values({
            usuarioId: locals.user.id,    
            inventarioId: invId,         
            personaId: personaIdRecibida, 
            detallesId: det.id,          
            recursosId: item.recursoId,   
            metodo: "DONACION",
            tipo: true,                  
            cantidad: cant,
            lote: identificadorLote // Todos los registros de este envío tendrán el mismo hash/UUID
          });
        }
      });

      return { exito: "Donación procesada y stock actualizado correctamente." };

    } catch (err) {
      if (err.message === "ENTIDAD_NOT_FOUND") {
        return fail(404, { error: "No tienes un centro de acopio asignado." });
      }
      console.error("TX_ERROR:", err);
      return fail(500, { error: "Fallo al registrar los movimientos en la base de datos." });
    }
  }
};

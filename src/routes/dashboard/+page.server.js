import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { entidades, tipoEntidad } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load = async () => {
  return {
    // Pasamos los valores del ENUM al frontend
    tipoEntidad: tipoEntidad.enumValues,
  };
};

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("session_token", { path: "/" });
    throw redirect(303, "/ingresar");
  },

  crearEntidad: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: "No autorizado." });

    const data = await request.formData();

    // Optimización: Extracción limpia
    const payload = {
      nombre: data.get("nombre")?.toString().trim(),
      tipo: data.get("tipo")?.toString(),
      telefonoPrincipal: data.get("telefonoPrincipal")?.toString().trim(),
      telefonoSecundario:
        data.get("telefonoSecundario")?.toString().trim() || null,
      emailContacto: data.get("emailContacto")?.toString().trim(),
      estado: data.get("estado")?.toString(),
      municipio: data.get("municipio")?.toString(),
      localidad: data.get("localidad")?.toString(),
      direccionExacta: data.get("direccionExacta")?.toString().trim(),
      latitud: data.get("latitud"),
      longitud: data.get("longitud"),
    };

    if (
      !payload.nombre ||
      !payload.tipo ||
      !payload.telefonoPrincipal ||
      !payload.emailContacto ||
      !payload.estado ||
      !payload.municipio ||
      !payload.localidad ||
      !payload.direccionExacta
    ) {
      return fail(400, { error: "Faltan campos obligatorios." });
    }

    try {
      // Verificar si ya tiene entidad
      const existe = await db
        .select()
        .from(entidades)
        .where(eq(entidades.encargadoId, locals.user.id))
        .limit(1);
      if (existe.length > 0)
        return fail(400, { error: "Ya tienes una organización registrada." });

      const codigoUnico = `Vzla-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Insertar de forma directa y segura
      await db.insert(entidades).values({
        ...payload,
        codigo: codigoUnico,
        encargadoId: locals.user.id,
        latitud: payload.latitud ? parseFloat(payload.latitud) : null,
        longitud: payload.longitud ? parseFloat(payload.longitud) : null,
        verificado: false,
        estatus: "ACTIVO", // <-- AQUÍ ESTABA EL ERROR. String directo y seguro.
      });

      return { exito: true, codigo: codigoUnico };
    } catch (err) {
      console.error("Error en insertar:", err);
      return fail(500, { error: "Error interno al procesar el registro." });
    }
  },
};

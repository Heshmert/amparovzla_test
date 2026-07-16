<script>
import Hero from '$lib/components/Hero.svelte';
let { data } = $props();
// const listaPerfiles = [
//     {
//         rol: "Diseño y Prensa",
//         titulo: "Información Real para la Gente",
//         descripcion: "Comunicadores, fotógrafos y diseñadores visuales. Nos ayudan a contar la verdad de lo que pasa en las comunidades, armar avisos sencillos que se entiendan rápido en redes sociales o volantes impresos, y orientar a la gente sobre dónde buscar auxilio."
//     },
//     {
//         rol: "Transportistas",
//         titulo: "Movilización y Distribución",
//         descripcion: "Conductores de carga, motorizados o propietarios de vehículos comerciales. Su apoyo es el núcleo de la cadena logística, permitiendo trasladar insumos médicos, alimentos pesados y personal especializado hacia los focos geográficos de mayor necesidad."
//     },
//     {
//         rol: "Personal de Cocina",
//         titulo: "Alimentación Comunitaria",
//         descripcion: "Cocineros, auxiliares y colaboradores de alimentos. Encargados de la gestión operativa de comedores de emergencia y refugios comunitarios. Optimizan las materias primas donadas para garantizar raciones seguras y calientes para las familias afectadas."
//     },
//     {
//         rol: "Oficios Técnicos",
//         titulo: "Infraestructura de Emergencia",
//         descripcion: "Electricistas, plomeros, mecánicos y carpinteros. Profesionales prácticos enfocados en la reactivación básica de servicios en instalaciones comunitarias, reparación de generadores, habilitación de tuberías de agua y aseguramiento de estructuras temporales."
//     },
//     {
//         rol: "Educadores",
//         titulo: "Contención y Aprendizaje",
//         descripcion: "Docentes, maestros y recreadores institucionales. Proveen espacios de normalización, cuidado y apoyo educativo para niños y jóvenes dentro de los refugios habilitados, permitiendo que sus representantes gestionen la recuperación de sus hogares."
//     },
//     {
//         rol: "Salud Mental",
//         titulo: "Soporte y Primeros Auxilios Emocionales",
//         descripcion: "Psicólogos, terapeutas y trabajadores sociales. Profesionales dedicados a la contención en crisis, manejo del duelo, procesamiento del trauma inmediato y orientación familiar para operadores en campo y ciudadanos afectados."
//     },
//     {
//         rol: "Fauna y Rescate Animal",
//         titulo: "Protección Veterinaria",
//         descripcion: "Veterinarios, auxiliares técnicos y rescatistas de fauna. Dedicados al censo, atención médica de emergencia, estabilización y reubicación de animales domésticos y comunitarios extraviados o heridos en el área afectada."
//     },
//     {
//         rol: "Logística Base",
//         titulo: "Clasificación y Censo General",
//         descripcion: "Estudiantes, jóvenes y ciudadanos sin experiencia técnica previa. Su trabajo sostiene la operation diaria: clasificación física de ropa, armado de bolsas de alimentos, transcripción de datos en el censo público y asistencia general en los centros."
//     },
//     {
//         rol: "Telecomunicaciones",
//         titulo: "Radioaficionados y Conectividad",
//         descripcion: "Operadores de radio VHF/HF, técnicos de telecomunicaciones y redes inalámbricas. Esenciales cuando colapsan las redes comerciales. Garantizan los enlaces de voz y datos entre los centros de acopio aislados y el núcleo central de operaciones."
//     },
//     {
//         rol: "Gestión de Agua",
//         titulo: "Saneamiento e Hidrología",
//         descripcion: "Especialistas en tratamiento de aguas, fontanería industrial y control de plagas. Su tarea es diseñar sistemas provisionales de filtrado de agua, garantizar el almacenamiento libre de contaminantes en refugios y evitar brotes infecciosos."
//     },
//     {
//         rol: "Energías Alternativas",
//         titulo: "Sustentabilidad y Redes Autónomas",
//         descripcion: "Técnicos en paneles solares, inversores y sistemas de baterías de respaldo. Despliegan estaciones de carga rápida autónomas en zonas sin fluido eléctrico para mantener operativos los teléfonos de emergencia y los sistemas médicos críticos."
//     },
//     {
//         rol: "Almacenistas",
//         titulo: "Control de Carga y Estiba",
//         descripcion: "Operadores de depósitos, expertos en inventario físico y organización espacial. Maximizan la capacidad de almacenamiento en los centros de acopio, clasificando los insumos por peso, prioridad y rotación para acelerar el despacho."
//     },
//     {
//         rol: "Transcriptores",
//         titulo: "Procesamiento de Datos en Campo",
//         descripcion: "Digitadores y transcriptores rápidos. Reciben las fichas de papel recolectadas manualmente en zonas sin conectividad y las vuelcan velozmente al sistema automatizado de AmparoVZLA cuando se restablecen los servicios."
//     },
//     {
//         rol: "Enlace Comunitario",
//         titulo: "Líderes de Sector y Mediadores",
//         descripcion: "Voceros vecinales, líderes comunitarios y mediadores. Conocen el terreno mejor que nadie. Son el puente directo para identificar a las familias vulnerables que no pueden movilizarse y coordinan las entregas puerta a puerta de forma ordenada."
//     },
//     {
//         rol: "Costura y Textiles",
//         titulo: "Confección y Reparación Básica",
//         descripcion: "Costureros, sastres y colaboradores de talleres textiles. Reparan prendas donadas en mal estado, confeccionan mantas provisionales, adaptan protectores para colchones en refugios y aseguran que los textiles de emergencia sean funcionales."
//     },
//     {
//         rol: "Mensajería Física",
//         titulo: "Enlaces en Bicicleta y a Pie",
//         descripcion: "Ciclistas, motorizados ligeros y corredores urbanos. Actúan como el canal de comunicación físico cuando no hay señales analógicas ni digitales, trasladando solicitudes urgentes, listados de insumos y reportes médicos entre sectores colindantes."
//     },
//     {
//         rol: "Nutricionistas",
//         titulo: "Dietética de Contingencia",
//         descripcion: "Profesionales de la nutrición y dietistas. Diseñan menús optimizados en base a las donaciones disponibles, priorizando dietas especiales para lactantes, niños con desnutrición aguda, mujeres gestantes y adultos mayores en situación de refugio."
//     },
//     {
//         rol: "Seguridad Interna",
//         titulo: "Orden y Control de Accesos",
//         descripcion: "Personal capacitado en control de accesos, prevención de riesgos e incendios. Custodian de forma pacífica los perímetros de los centros de distribución y refugios, organizando las filas de atención para evitar aglomeraciones peligrosas."
//     },
//     {
//         rol: "Operadores Telefónicos",
//         titulo: "Atención al Ciudadano y Filtraje",
//         descripcion: "Personal enfocado en responder llamadas, procesar alertas telefónicas y filtrar reportes falsos. Atienden las solicitudes de soporte de la población civil lejana y derivan los casos críticos a los respectivos módulos logísticos."
//     },
//     {
//         rol: "Gestión Internacional",
//         titulo: "Trámites y Enlace Consular",
//         descripcion: "Especialistas en aduanas, comercio exterior y relaciones institucionales. Gestionan los permisos legales y la logística aduanera para recibir, validar y liberar donaciones e insumos críticos enviados por organizaciones aliadas en el extranjero."
//     },
//     {
//         rol: "Maquinaria Pesada",
//         titulo: "Despeje y Maniobras Críticas",
//         descripcion: "Operadores de montacargas, camiones volteo y grúas. Colaboran en la remoción física de obstáculos en vías secundarias de distribución y en la descarga masiva de pallets de alimentos e insumos de gran tonelaje."
//     },
//     {
//         rol: "Mantenimiento General",
//         titulo: "Higienización de Espacios",
//         descripcion: "Equipos de limpieza profunda y desinfección. Garantizan la salubridad diaria de los baños públicos, cocinas comunitarias y áreas comunes de los refugios para contener vectores de transmisión biológica y enfermedades."
//     },{
//         rol: "Estilistas y Barberos",
//         titulo: "Higiene y Dignidad Personal",
//         descripcion: "Peluqueros, barberos y estilistas. Su labor en los refugios previene brotes de afecciones capilares y piojos mediante jornadas de corte masivo, además de aportar un factor psicológico crítico de normalidad, higiene y dignidad para las personas que lo perdieron todo."
//     },
//     {
//         rol: "Comerciantes y Bodegueros",
//         titulo: "Logística de Proximidad",
//         descripcion: "Propietarios de comercios, abastos y redes locales. Aportan su conocimiento en cadenas de suministro minoristas, contactos con proveedores locales y capacidad de almacenamiento intermedio para descentralizar la entrega de insumos en puntos críticos."
//     },
//     {
//         rol: "Contadores y Auditores",
//         titulo: "Fiscalización y Transparencia",
//         descripcion: "Contadores públicos y auditores financieros. Validan los libros de ingresos de donaciones, concilian los reportes de inventario con las actas de entrega en campo y emiten balances públicos para certificar el uso transparente de cada recurso."
//     },
//     {
//         rol: "Traductores e Intérpretes",
//         titulo: "Accesibilidad e Idiomas",
//         descripcion: "Intérpretes de lenguas indígenas y traductores de idiomas extranjeros. Traducen manuales de operación de equipos médicos donados, facilitan la comunicación con delegaciones de ayuda internacional y aseguran la atención sin barreras en comunidades étnicas."
//     },
//     {
//         rol: "Impresores y Tipógrafos",
//         titulo: "Comunicación Física Análoga",
//         descripcion: "Operadores de imprentas y talleres gráficos. Clave para la producción masiva de mapas de riesgo, volantes informativos de salud, pancartas de señalización de centros de acopio y guías de emergencia para distribución en zonas sin electricidad."
//     },
//     {
//         rol: "Seguridad Industrial",
//         titulo: "Mitigación de Riesgos Laborales",
//         descripcion: "Técnicos en seguridad y salud ocupacional. Diseñan los protocolos de carga segura en los almacenes, supervisan el uso correcto de equipos de protección por parte de los voluntarios y demarcan las zonas de peligro estructural en áreas afectadas."
//     },
//     {
//         rol: "Agricultores y Jardineros",
//         titulo: "Control Ambiental y Huertos",
//         descripcion: "Productores agrícolas y expertos en mantenimiento verde. Coordinan el desmalezamiento de perímetros para evitar plagas en refugios, evalúan la estabilidad de terrenos con vegetación dañada y diseñan huertos comunitarios de ciclo corto."
//     },
//     {
//         rol: "Zapateros y Talabarteros",
//         titulo: "Mantenimiento de Calzado Operativo",
//         descripcion: "Artesanos del cuero y calzado. Reparan botas de brigadistas, rescatistas y ciudadanos damnificados que enfrentan largas caminatas en terrenos difíciles, extendiendo la vida útil de los implementos de protección física existentes."
//     },
//     {
//         rol: "Pilotos de Drones",
//         titulo: "Reconocimiento Aéreo y Mapeo",
//         descripcion: "Operadores de vehículos aéreos no tripulados. Realizan fotogrametría en tiempo real para evaluar el estado de vías bloqueadas, localizan infraestructuras colapsadas de difícil acceso y apoyan visualmente a los equipos de rescate animal y civil."
//     },
//     {
//         rol: "Cerrajeros técnicos",
//         titulo: "Aseguramiento de Infraestructura",
//         descripcion: "Especialistas en sistemas de apertura y cierre. Habilitan accesos trabados en instalaciones designadas para emergencia, reparan cerraduras dañadas en almacenes de medicamentos y garantizan el resguardo físico de bienes comunes."
//     },
//     {
//         rol: "Higiene Urbana",
//         titulo: "Control de Desechos de Contingencia",
//         descripcion: "Personal de recolección y limpieza ambiental. Gestionan la disposición correcta de residuos sólidos masivos generados en los centros logísticos y refugios, previniendo focos epidemiológicos y la contaminación de suelos."
//     },
//     {
//         rol: "Archivólogos e Historiadores",
//         titulo: "Memoria Histórica y Datos",
//         descripcion: "Especialistas en gestión documental y registro técnico. Preservan las actas físicas del suceso, organizan la bitácora cronológica de operaciones en campo y clasifican las lecciones aprendidas para futuros despliegues humanitarios."
//     },
//     {
//         rol: "Plásticos y Reciclaje",
//         titulo: "Habilitación de Materiales Temporales",
//         descripcion: "Técnicos en reciclaje e industrias plásticas. Procesan y adaptan lonas, contenedores recuperados y pallets plásticos para improvisar techados impermeables, aislamiento de suelos húmedos y sistemas limpios de acopio de ropa."
//     },
//     {
//         rol: "Lavandería Operativa",
//         titulo: "Sanitización de Textiles",
//         descripcion: "Personal de tintorerías y lavanderías. Encargados del lavado, desinfección y secado a gran escala de la ropa recibida por donación y de las sábanas o mantas utilizadas en los centros de asistencia médica temporal."
//     }
// ];

</script>

<Hero 
    titulo="¿Cómo ayuda"
    palabraResaltante="Guía de Acción"
    descripcion="Para salir adelante necesitamos que cada quien ponga lo que sabe hacer sobre la mesa. No buscamos solo manos vacías; queremos organizar lo que mejor sabe hacer cada uno para ayudar de verdad en las comunidades."
    tag="Voluntariado"
    imagen="/img/hero_ayudar.webp"
    claseTextoResaltado="text-amber-400"
    claseTag="bg-blue-700 text-white"
    claseBordeDesc="border-amber-400"
/>


<section id="talentos" class="max-w-7xl mx-auto p-6 md:p-12">

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 ">
    {#each data.talentos as talento}
        <a 
          href="/informacion/talentos/{talento.slug}" 
          class="{talento.meta.bg} p-6 flex flex-col justify-between min-h-[180px] group transition-colors rounded-none"
        >
          <div>
            <h2 class="text-lg font-black uppercase tracking-tight text-white/90 group-hover:underline">
              {talento.meta.title}
            </h2>
            <p class="text-xs text-stone-200 mt-2 line-clamp-2">
              {talento.meta.description}
            </p>
          </div>
          <span class="text-[10px] font-black uppercase tracking-wider text-black/55 group-hover:text-stone-900 mt-4 block">
            Ver guía de acción 
          </span>
        </a>
    {/each}
  </div>
</section>


<section class="w-full bg-white p-8 md:p-12 text-center rounded-none flex flex-col items-center justify-center space-y-6">
    <div class="max-w-2xl space-y-2">
        <span class="text-[10px] font-black text-blue-700 uppercase tracking-widest block font-mono">Aquí hacemos falta todos</span>
        <h2 class="text-2xl md:text-3xl font-black text-stone-900 uppercase tracking-tighter leading-none">
            ¿No encuentras lo que sabes hacer en la lista?
        </h2>
        <p class="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
            No te preocupes por el nombre de tu trabajo. Para dar una mano no hace falta un título especial ni estar en un listado; hacen falta vecinos con ganas de colaborar, de ordenar las cosas que llegan o de acompañar a la gente en el terreno.
        </p>
    </div>

    <div>
        <button class="bg-stone-900 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-none border border-stone-950 hover:bg-stone-800 transition-colors select-none font-mono">
            Quiero sumarme
        </button>
    </div>
</section>
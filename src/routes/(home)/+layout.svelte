<script>
    import '../../global.css';
    import Favicon from '$lib/assets/favicon.svg';
    let { children } = $props();
    let menuAbierto = $state(false);

</script>  

<header class="fixed top-0 z-50 w-full bg-slate-950/70 backdrop-blur-md shadow-xl">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8">
        
        <!-- Logo -->
        <a href="/" class="flex items-center">
            <img src="/img/logos/logo_borde.png" alt="amparovzla" width="40" />
        </a>

        <!-- Nav Desktop -->
        <nav class="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white">
            <a href="/informacion" class="hover:text-blue-700 transition">¿Cómo funciona?</a>
            <a href="/listas/centros_acopio" class="hover:text-blue-700 transition">Centros de Ayuda</a>
            <a href="/buscame" class="hover:text-blue-700 transition">Búscame</a>
            <a href="/ingresar" class="btn-blue px-5 py-2 hover:bg-stone-800 transition">
                Ingresar
            </a>
        </nav>

        <!-- Botón Móvil -->
        <button onclick={() => menuAbierto = !menuAbierto}  class="md:hidden px-3 py-1.5 text-xs btn-blue font-black uppercase">
        {#if (!menuAbierto)}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
                 {/if}
                 {#if (menuAbierto)}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 {/if}
        </button>
    </div>

    <!-- Menú Móvil Desplegable: Integrado y fluido -->
    {#if menuAbierto}
        <div class="md:hidden w-full">
            <a href="/informacion" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-white hover:bg-stone-900/5">
                ¿Cómo funciona?
            </a>
            <a href="/listas/centros_acopio" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-white hover:bg-stone-900/5">
                Centros de Acopio
            </a>
            <a href="/buscame" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-white hover:bg-stone-900/5">
                Búscame
            </a>
            <a href="/emergencia" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase btn-red">Contactos de Emergencia</a>
            <a href="/ingresar" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase btn-blue">
                Ingresar
            </a>
        </div>
    {/if}
</header>

    <main class="flex-1">
        {@render children()}
    </main>

<footer class="relative bg-slate-950 text-slate-300 py-16 px-6 md:px-12 mt-auto border-t border-slate-900 overflow-hidden">
    <!-- Detalle sutil: Línea superior con los colores de la bandera para conectar con el Hero -->
    <div class="absolute top-0 left-0 w-full h-1 flex">
        <div class="flex-1 bg-amber-500"></div>
        <div class="flex-1 bg-blue-700"></div>
        <div class="flex-1 bg-red-700"></div>
    </div>

    <div class="max-w-6xl mx-auto flex flex-col gap-12">
        
        <!-- Bloques Principales -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            
            <!-- Marca e Identidad -->
            <div class="space-y-4">
                <p class="text-2xl font-black text-white tracking-tighter uppercase">
                    AMPARO<span class="text-amber-500">.</span>
                </p>
                <p class="text-xs text-slate-400 leading-relaxed max-w-xs">
                    Iniciativa civil e independiente. Infraestructura técnica para la gestión transparente de ayuda, insumos y auxilio ciudadano en zonas afectadas.
                </p>
            </div>
            
            <!-- Enlaces: Información -->
            <div class="space-y-4">
                <p class="text-[11px] font-extrabold uppercase tracking-widest text-amber-500">Información</p>
                <ul class="space-y-3 text-xs font-medium text-slate-300">
                    <li><a href="/informacion" class="hover:text-blue-400 transition-colors">Conoce el proyecto</a></li>
                    <li><a href="/listas/centros_acopio" class="hover:text-blue-400 transition-colors">Centros de Ayuda</a></li>
                    <li><a href="/emergencia" class="hover:text-blue-400 transition-colors">Contactos de Emergencia</a></li>     
                    <li><a href="/informacion/galeria" class="hover:text-blue-400 transition-colors">Galería Fotográfica</a></li>
                </ul>
            </div>

            <!-- Enlaces: Participar -->
            <div class="space-y-4">
                <p class="text-[11px] font-extrabold uppercase tracking-widest text-blue-500">Participar</p>
                <ul class="space-y-3 text-xs font-medium text-slate-300">
                    <li><a href="/ingresar" class="hover:text-blue-400 transition-colors">Entrar al sistema</a></li>
                    <li><a href="/registro" class="hover:text-blue-400 transition-colors">Quiero ser voluntario</a></li>
                    <li><a href="/informacion/como_ayudar" class="hover:text-blue-400 transition-colors">Guía de ayuda</a></li>
                    <li><a href="/buscame" class="hover:text-blue-400 transition-colors">Censo Civil</a></li>     
                </ul>
            </div>

            <!-- Tarjeta con Propósito Humano -->
            <div class="space-y-3 bg-slate-900/50 p-6 border border-slate-800/60 shadow-xl flex flex-col justify-center">
                <h2 class="text-[10px] font-extrabold uppercase tracking-widest text-red-500">Unidos por Venezuela</h2>
                <p class="leading-relaxed text-slate-200 text-xs italic font-medium">
                    "La fuerza de nuestra nación reside en la capacidad de organizarnos para proteger a nuestros hermanos."
                </p>
            </div>
        </div>

        <!-- Cierre del Footer -->
        <div class="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <p>© 2026 AmparoVZLA. Plataforma autónoma y ciudadana.</p>
            
            <!-- Red Social integrada con estilo limpio -->
            <div class="flex items-center gap-2">
                <a href="https://instagram.com/amparo.vzla" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2  text-xs font-bold uppercase tracking-wider hover:bg-blue-700 hover:text-white hover:border-blue-600 transition duration-200">
                    Instagram
                </a>
            </div>
        </div>

    </div>
</footer>


<style>
:global(section) {
    padding: clamp(1rem, 5vw, 3rem);
}

:global(#hero) {
    padding-top: 4rem;
    height: min(100vh);
}
</style>
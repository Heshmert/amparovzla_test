<script>
    import '../../global.css';
    import Favicon from '$lib/assets/favicon.svg';
    let { children } = $props();
    let menuAbierto = $state(false);
</script>  

<header class="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-xl">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8">
        
        <!-- Logo -->
        <a href="/" class="flex items-center">
            <img src="/img/logo.png" alt="amparovzla" width="100" />
        </a>

        <!-- Nav Desktop -->
        <nav class="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-stone-900">
            <a href="/informacion" class="hover:text-blue-700 transition">¿Cómo funciona?</a>
            <a href="/listas/centros_insumos" class="hover:text-blue-700 transition">Centros de Ayuda</a>
            <a href="/buscame" class="hover:text-blue-700 transition">Búscame</a>
            <a href="/ingresar" class="btn-blue px-5 py-2 hover:bg-stone-800 transition">
                Ingresar
            </a>
        </nav>

        <!-- Botón Móvil -->
        <button 
            onclick={() => menuAbierto = !menuAbierto}
            class="md:hidden px-3 py-1.5 text-[10px] font-black text-stone-900 uppercase"
        >
            {menuAbierto ? 'Cerrar' : 'Menú'}
        </button>
    </div>

    <!-- Menú Móvil Desplegable: Integrado y fluido -->
    {#if menuAbierto}
        <div class="md:hidden w-full">
            <a href="/informacion" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-stone-900 hover:bg-stone-900/5">
                ¿Cómo funciona?
            </a>
            <a href="/listas/centros_insumos" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-stone-900 hover:bg-stone-900/5">
                Centros de Acopio
            </a>
            <a href="/buscame" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase text-stone-900 hover:bg-stone-900/5">
                Búscame
            </a>
            <a href="/ingresar" onclick={() => menuAbierto = false} class="block px-8 py-4 text-[10px] font-black uppercase btn-blue">
                Ingresar
            </a>
        </div>
    {/if}
</header>

    <main class="flex-1">
        {@render children()}
    </main>

<footer class="bg-slate-900 text-stone-300 border-t border-stone-800 py-16 px-4 md:px-8 mt-auto">
    <div class="max-w-7xl mx-auto space-y-12">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <!-- Identidad -->
            <div class="space-y-3">
                <p class="font-black text-white text-[10px] uppercase tracking-widest">AmparoVZLA</p>
                <p class="text-[11px] leading-relaxed text-stone-500">
                    Iniciativa civil e independiente. Infraestructura técnica para la gestión transparente de ayuda, insumos y auxilio ciudadano en zonas afectadas.
                </p>
            </div>
            
            <!-- Información -->
            <div class="space-y-3">
                <p class="font-black text-white text-[10px] uppercase tracking-widest">Información</p>
                <ul class="space-y-2 text-[11px] uppercase font-bold text-stone-400">
                    <li><a href="/informacion" class="hover:text-blue-400 transition">Conoce el proyecto</a></li>
                    <li><a href="/listas/centros_insumos" class="hover:text-blue-400 transition">Centros de Ayuda</a></li>
                    <li><a href="/buscame" class="hover:text-blue-400 transition">Censo Civil</a></li>
                </ul>
            </div>

            <!-- Participar -->
            <div class="space-y-3">
                <p class="font-black text-white text-[10px] uppercase tracking-widest">Participar</p>
                <ul class="space-y-2 text-[11px] uppercase font-bold text-stone-400">
                    <li><a href="/ingresar" class="hover:text-blue-400 transition">Entrar</a></li>
                    <li><a href="/registro" class="hover:text-blue-400 transition">Quiero ser voluntario</a></li>
                    <li><a href="/informacion/como_ayudar" class="hover:text-blue-400 transition">Guía de ayuda</a></li>
                </ul>
            </div>

            <!-- Mensaje -->
            <div class="space-y-3 bg-stone-800/40 p-4 border border-stone-800 rounded-none">
                <p class="font-black text-white text-[10px] uppercase tracking-widest">Unidos por Venezuela</p>
                <p class="leading-relaxed text-stone-200 text-[11px] italic">
                    "La fuerza de nuestra nación reside en la capacidad de organizarnos para proteger nuestrs hermanos"
                </p>
            </div>
        </div>

        <!-- Pie de página -->
        <div class="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-black uppercase tracking-widest text-stone-500">
            <p>© 2026 AmparoVZLA. Plataforma técnica independiente.</p>
            <p>Construyendo coherencia y auxilio.</p>
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
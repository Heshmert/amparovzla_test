<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    
    // Capturamos el estado del formulario usando las Runes de Svelte 5
    let { form } = $props();
    
    let cargando = $state(false);
    let imagenActual = $state(0);
    const imagenes = ['login(1).jpeg', 'login(2).jpeg'];

    onMount(() => {
        const interval = setInterval(() => {
            imagenActual = (imagenActual + 1) % imagenes.length;
        }, 5000);
        return () => clearInterval(interval);
    });

    const manejarSubmit = () => {
        cargando = true;
        return async ({ update }) => {
            await update();
            cargando = false;
        };
    };
</script>

<div class="grid grid-cols-1 md:grid-cols-2 min-h-screen md:h-screen w-full">

    <div class="relative hidden md:flex flex-col justify-between p-12 text-white h-full overflow-hidden">
        {#each imagenes as img, i}
            <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out {imagenActual === i ? 'opacity-100' : 'opacity-0'}">
                <img src={img} alt="Fondo de Login" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-blue-900/80"></div>
            </div>
        {/each}

        <div class="relative z-10 flex flex-col justify-between h-full">
            <div class="flex items-center gap-2">
                <a href="/" class="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                    Amparo Venezuela
                </a>
            </div>

            <div class="space-y-4">
                <h2 class="text-4xl font-black uppercase tracking-tight leading-tight">
                    Juntos podemos asegurar que la ayuda llegue a quienes más lo necesitan
                </h2>
                <p class="text-xs text-blue-100/80 font-medium max-w-sm leading-relaxed">
                    Ingresa a tu panel de control para gestionar stock, reportar novedades en tiempo real y asegurar que la ayuda civil llegue de forma transparente a las comunidades más vulnerables.
                </p>
            </div>
        </div>
    </div>

    <div class="flex flex-col justify-center p-8 md:p-16 bg-white min-h-screen md:min-h-0 h-full">
        <div class="max-w-sm w-full mx-auto space-y-6">

            <div class="space-y-1">
                <h1 class="text-2xl font-black text-stone-900 uppercase tracking-tight">Inicio de Sesión</h1>
            </div>

            {#if form?.error}
                <div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase rounded-none">
                    ERROR: {form.error}
                </div>
            {/if}

            <form method="POST" class="space-y-4" use:enhance={manejarSubmit}>
                <div class="space-y-1">
                    <label for="email" class="text-[10px] font-bold uppercase tracking-wider text-stone-600">Correo Electrónico</label>
                    <input type="email" id="email" name="correo" required placeholder="NOMBRE@CORREO.COM"
                        class="w-full border border-stone-300 bg-stone-50 p-3 text-xs font-medium text-stone-900 focus:outline-none focus:border-blue-800 rounded-none uppercase" />
                </div>

                <div class="space-y-1">
                    <div class="flex justify-between items-center">
                        <label for="password" class="text-[10px] font-bold uppercase tracking-wider text-stone-600">Contraseña</label>
                    </div>
                    <input type="password" id="password" name="password" required placeholder="••••••••"
                        class="w-full border border-stone-300 bg-stone-50 p-3 text-xs font-medium text-stone-900 focus:outline-none focus:border-blue-800 rounded-none" />
                </div>

                <button type="submit" disabled={cargando}
                    class="w-full bg-blue-800 text-white p-3 text-xs font-bold uppercase tracking-wider hover:bg-blue-900 transition rounded-none shadow-xs mt-2 disabled:bg-stone-400">
                    {cargando ? 'VERIFICANDO...' : 'ENTRAR A LA PLATAFORMA'}
                </button>
            </form>

            <div class="border-t border-stone-100 pt-4 text-center">
                <p class="text-xs text-stone-500 font-medium">
                    ¿AÚN NO FORMAS PARTE?
                    <a href="/registro" class="text-blue-800 font-bold uppercase hover:underline block md:inline md:ml-1">Regístrate aquí</a>
                </p>
            </div>

        </div>
    </div>

</div>
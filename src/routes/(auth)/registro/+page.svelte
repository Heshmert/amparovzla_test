<script>
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';

    let { data, form } = $props();
    let cargando = $state(false);
    let pasoActual = $state(1); 

    let selectedTalents = $state([]);
    let selectedAreas = $state([]);

    let imagenActual = $state(0);
    const imagenes = ['/img/auth/registro_1.jpg', '/img/auth/registro_2.jpg'];

    const obtenerFechaMaxima18 = () => {
        const hoy = new Date();
        const añoMax = hoy.getFullYear() - 18;
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${añoMax}-${mes}-${dia}`;
    };

    const fechaMaxima = obtenerFechaMaxima18();

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
            if (form?.exito) {
                pasoActual = 1;
                selectedTalents = [];
                selectedAreas = [];
            }
        };
    };

    function siguientePaso() {
        pasoActual = 2;
    }

    function pasoAnterior() {
        pasoActual = 1;
    }
</script>



<div class="grid grid-cols-1 md:grid-cols-2 w-full h-screen overflow-hidden">
    <div class="flex flex-col h-full overflow-y-auto p-6 md:p-12 bg-white border-b md:border-b-0 md:border-r w-full order-1">
        <div class="max-w-md w-full mx-auto space-y-2">
            <div>
                <Header
                    titulo="Registro como Voluntariado"
                    exito={form?.exito}
                    error={form?.error}
                    />
                <div class="flex items-center gap-2 pt-1">
                    <span class="text-[10px] font-black uppercase {pasoActual === 1 ? 'text-stone-900' : 'text-stone-400'}">01. Identificación</span>
                    <span class="h-px bg-stone-200 w-8"></span>
                    <span class="text-[10px] font-black uppercase {pasoActual === 2 ? 'text-stone-900' : 'text-stone-400'}">02. Capacidades</span>
                </div>
            </div>

            <form method="POST" class="w-full overflow-hidden" use:enhance={manejarSubmit}>
                <div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{(pasoActual - 1) * 100}%);">
                    
                    <!-- PASO 1: IDENTIFICACIÓN -->
                    <div class="min-w-full space-y-3 pr-2">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label for="name" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Nombre</label>
                                <input type="text" id="name" name="nombre" required placeholder="JUAN" />
                            </div>
                            <div class="space-y-1">
                                <label for="lastname" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Apellido</label>
                                <input type="text" id="lastname" name="apellido" required placeholder="PÉREZ" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label for="id-card" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Cédula</label>
                                <input type="number" id="id-card" name="cedula" required placeholder="V-00000000" min="0" max="99999999"/>
                            </div>
                            <div class="space-y-1">
                                <label for="phone" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Teléfono</label>
                                <input type="tel" id="phone" name="telefono" required placeholder="0412-0000000" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-3 border border-stone-200">
                            <div class="space-y-1">
                                <label for="genero" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Género</label>
                                <select id="genero" name="genero" required >
                                    <option value="">SELECCIONE</option>
                                    <option value="M">MASCULINO</option>
                                    <option value="F">FEMENINO</option>
                                </select>
                            </div>
                            <div class="space-y-1">
                                <label for="fechaNacimiento" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Fecha de Nacimiento</label>
                                <input type="date" id="fechaNacimiento" name="fechaNacimiento" max={fechaMaxima} required  />
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label for="reg-email" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Correo Electrónico</label>
                            <input type="email" id="reg-email" name="correo" required placeholder="CORREO@DOMINIO.COM" class="lowercase" />
                        </div>
                        <div class="space-y-1">
                            <label for="reg-password" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Contraseña</label>
                            <input type="password" id="reg-password" name="password" required placeholder="••••••••" />
                        </div>

                        <button type="button" onclick={siguientePaso} class="w-full bg-stone-900 text-white p-3 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition rounded-none mt-2">
                            CONTINUAR
                        </button>
                    </div>

                    <!-- PASO 2: CAPACIDADES -->
                    <div class="min-w-full space-y-3">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label for="profesion" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Ocupacion Principal</label>
                                <select id="profesion" name="profesionId" required>
                                    <option value="">SELECCIONE...</option>
                                    {#await data.profesiones}
                                        <option disabled>CARGANDO...</option>
                                    {:then list}
                                        {#each list as prof}
                                            <option value={prof.id}>{prof.nombre}</option>
                                        {/each}
                                    {/await}
                                </select>
                            </div>
                            
                            <div class="space-y-1">
                                <label for="disponibilidad" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Disponibilidad</label>
                                <select id="disponibilidad" name="disponibilidad" required>
                                    <option value="">SELECCIONE</option>
                                    <option value="Diurna">DIURNA</option>
                                    <option value="Nocturna">NOCTURNA</option>
                                    <option value="Cualquiera">TIEMPO COMPLETO</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-3">
                            <div class="space-y-1">
                                <label for="tipoSangre" class="text-[10px] font-black uppercase tracking-wider text-stone-600">Tipo de Sangre</label>
                                <select id="tipoSangre" name="tipoSangre" required>
                                    <option value="">SELECCIONE</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        </div>

                        <!-- SECCIÓN TALENTOS -->
                        <div class="border-t border-stone-200 pt-3">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-[10px] font-black uppercase text-stone-900 tracking-tight">Habilidades</span>
                                <span class="text-[9px] font-mono font-bold {selectedTalents.length === 4 ? 'text-amber-700' : 'text-stone-500'}">
                                    [{selectedTalents.length}/4 ASIGNADOS]
                                </span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-stone-200 bg-stone-50 p-2 max-h-36 overflow-y-auto rounded-none">
                                {#await data.talentos}
                                    <span class="text-[10px] font-bold text-stone-400 uppercase p-1">Cargando...</span>
                                {:then list}
                                    {#each list as t}
                                        {@const checksExcedidos = selectedTalents.length >= 4 && !selectedTalents.includes(t.id)}
                                        <label class="flex items-center gap-2 p-1 text-[10px] uppercase font-bold select-none rounded-none border border-transparent {checksExcedidos ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-200/50 cursor-pointer text-stone-800'}">
                                            <input 
                                                type="checkbox" 
                                                name="talentosIds" 
                                                value={t.id} 
                                                bind:group={selectedTalents} 
                                                disabled={checksExcedidos}
                                                class="accent-stone-900 h-3.5 w-3.5 rounded-none border-stone-300"
                                            />
                                            {t.nombre}
                                        </label>
                                    {/each}
                                {/await}
                            </div>
                        </div>

                        <!-- SECCIÓN ÁREAS -->
                        <div class="border-t border-stone-200 pt-3">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-[10px] font-black uppercase text-stone-900 tracking-tight">Áreas de Cobertura</span>
                                <span class="text-[9px] font-mono font-bold {selectedAreas.length === 4 ? 'text-amber-700' : 'text-stone-500'}">
                                    [{selectedAreas.length}/4 ASIGNADAS]
                                </span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-stone-200 bg-stone-50 p-2 max-h-36 overflow-y-auto rounded-none">
                                {#await data.areasColaboracion}
                                    <span class="text-[10px] font-bold text-stone-400 uppercase p-1">Cargando...</span>
                                {:then list}
                                    {#each list as area}
                                        {@const areasExcedidas = selectedAreas.length >= 4 && !selectedAreas.includes(area.id)}
                                        <label class="flex items-center gap-2 p-1 text-[10px] uppercase font-bold select-none rounded-none border border-transparent {areasExcedidas ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-200/50 cursor-pointer text-stone-800'}">
                                            <input 
                                                type="checkbox" 
                                                name="areasIds" 
                                                value={area.id} 
                                                bind:group={selectedAreas} 
                                                disabled={areasExcedidas}
                                                class="accent-stone-900 h-3.5 w-3.5 rounded-none border-stone-300"
                                            />
                                            {area.nombre}
                                        </label>
                                    {/each}
                                {/await}
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-2 pt-2">
                            <button type="button" onclick={pasoAnterior} class="bg-stone-200 text-stone-800 p-3 text-xs font-bold uppercase tracking-wider hover:bg-stone-300 transition rounded-none">
                                VOLVER
                            </button>
                            <button type="submit" disabled={cargando} class="col-span-2 bg-stone-900 text-white p-3 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition rounded-none disabled:bg-stone-400">
                                {cargando ? 'REGISTRANDO...' : 'COMPLETAR REGISTRO'}
                            </button>
                        </div>
                    </div>

                </div>
            </form>

            <div class="text-center pt-4">
                <p class="text-xs text-stone-500 font-medium">
                    ¿YA TIENES CUENTA?
                    <a href="/ingresar" class="text-stone-900 font-bold uppercase hover:underline block md:inline md:ml-1">INICIA SESIÓN AQUÍ</a>
                </p>
            </div>
        </div>
    </div>

    <!-- PANEL DE IMÁGENES -->
    <div class="relative hidden md:flex flex-col justify-between p-12 text-white h-full order-2 overflow-hidden bg-stone-950">
        {#each imagenes as img, i}
        <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out {imagenActual === i ? 'opacity-100' : 'opacity-0'}">
            <img src={img} alt="FONDO DE REGISTRO" class="w-full h-full object-cover animate-fade" />
            <div class="absolute inset-0 bg-red-950/60"></div>
        </div>
        {/each}
        <div class="relative z-10 flex flex-col justify-between h-full">
            <div class="flex items-center gap-2">
                <a href="/" class="text-[11px] flex gap-2 font-bold uppercase tracking-wider text-white">
                   <img src="img/logos/asterisco.png" alt="amparovzla" width="15"/> Amparo Venezuela
                </a>
            </div>
            <div class="space-y-4">
                <h2 class="text-4xl font-black uppercase tracking-tight leading-tight">TU ACCIÓN AYUDA A LEVANTAR <span class="text-6xl">CORAZONES</span></h2>
                <p class="text-xs text-stone-300 font-medium max-w-sm leading-relaxed">
                    Al registrarse, podras colaborar en la gestion del inventario, reportar novedades en tiempo real y asegurar que la ayuda civil llegue de forma transparente.
                </p>
            </div>
        </div>
    </div>
</div>
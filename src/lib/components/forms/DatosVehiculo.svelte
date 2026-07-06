<script>
    import { enhance } from '$app/forms';

    let { vehiculoPromesa, tiposTransporte } = $props();
</script>

<div class="w-full">
    {#await vehiculoPromesa}
        <div class="bg-white border border-stone-200 p-4 rounded-none space-y-3 animate-pulse">
            <div class="h-3 bg-stone-200 w-1/3 rounded-none"></div>
            <div class="h-10 bg-stone-100 rounded-none"></div>
        </div>
    {:then vehiculo}
        <div class="bg-white border border-stone-200 p-4 rounded-none">
            <div class="flex justify-between items-center border-b border-stone-200 pb-2 mb-4">
                <h3 class="text-[10px] font-black uppercase tracking-wider text-stone-900">
                    4. Unidad de Despliegue Logístico y Vehicular
                </h3>
                {#if vehiculo}
                    <span class="bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold px-2 py-0.5 border border-emerald-200 uppercase">
                        VINCULADO
                    </span>
                {:else}
                    <span class="bg-stone-100 text-stone-600 text-[9px] font-mono font-bold px-2 py-0.5 border border-stone-200 uppercase">
                        SIN REGISTRO
                    </span>
                {/if}
            </div>

            <form method="POST" action="?/guardarVehiculo" use:enhance class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label for="placa" class="text-[10px] font-black uppercase text-stone-600">Matrícula / Placa</label>
                        <input type="text" name="placa" value={vehiculo?.placa || ''} required placeholder="EXP-000" class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-mono font-bold uppercase focus:outline-none focus:border-stone-900 rounded-none" />
                    </div>
                    <div class="space-y-1">
                        <label for="vehiculo" class="text-[10px] font-black uppercase text-stone-600">Tipo de Vehículo</label>
                        <select name="tipo" value={vehiculo?.tipo || ''} required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-medium focus:outline-none focus:border-stone-900 rounded-none">
                            {#if tiposTransporte}
                                {#each tiposTransporte as tipo}
                                    <option value={tipo}>{tipo}</option>
                                {/each}
                            {/if}
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="space-y-1">
                        <label for="marca" class="text-[10px] font-black uppercase text-stone-600">Marca</label>
                        <input type="text" name="marca" value={vehiculo?.marca || ''} required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-medium uppercase focus:outline-none focus:border-stone-900 rounded-none" />
                    </div>
                    <div class="space-y-1">
                        <label for="modelo" class="text-[10px] font-black uppercase text-stone-600">Modelo</label>
                        <input type="text" name="modelo" value={vehiculo?.modelo || ''} required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-medium uppercase focus:outline-none focus:border-stone-900 rounded-none" />
                    </div>
                    <div class="space-y-1">
                        <label for="color" class="text-[10px] font-black uppercase text-stone-600">Color</label>
                        <input type="text" name="color" value={vehiculo?.color || ''} required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-medium uppercase focus:outline-none focus:border-stone-900 rounded-none" />
                    </div>
                </div>

                <div class="flex justify-end pt-2 border-t border-stone-200">
                    <button type="submit" class="bg-stone-900 hover:bg-stone-800 text-white font-black uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-none transition">
                        {vehiculo ? 'Actualizar' : 'Registrar'}
                    </button>
                </div>
            </form>
        </div>
    {/await}
</div>
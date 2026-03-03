function validarYCalcular() {
    const cpu = document.getElementById("cpu");
    const mobo = document.getElementById("mobo");
    const ram = document.getElementById("ram");
    const gpu = document.getElementById("gpu");
    const psu = document.getElementById("psu");

    // Obtener valores técnicos
    const cpuWatts = parseInt(cpu.value);
    const gpuWatts = parseInt(gpu.value);
    const psuWatts = parseInt(psu.value);
    
    const cpuSocket = cpu.options[cpu.selectedIndex].getAttribute("data-socket");
    const moboSocket = mobo.options[mobo.selectedIndex].getAttribute("data-socket");
    
    const moboRamType = mobo.options[mobo.selectedIndex].getAttribute("data-ram");
    const ramType = ram.options[ram.selectedIndex].getAttribute("data-tipo");

    // Obtener nombres para el reporte
    const nombreCpu = cpu.options[cpu.selectedIndex].getAttribute("data-nombre");
    const nombreMobo = mobo.options[mobo.selectedIndex].getAttribute("data-nombre");
    const nombreRam = ram.options[ram.selectedIndex].getAttribute("data-nombre");
    const nombreGpu = gpu.options[gpu.selectedIndex].getAttribute("data-nombre");
    const nombrePsu = psu.options[psu.selectedIndex].getAttribute("data-nombre");

    // CORRECCIÓN 1: Presupuesto Total con RAM incluida
    const totalBOB = parseInt(cpu.options[cpu.selectedIndex].getAttribute("data-precio")) +
                     parseInt(mobo.options[mobo.selectedIndex].getAttribute("data-precio")) +
                     parseInt(ram.options[ram.selectedIndex].getAttribute("data-precio")) +
                     parseInt(gpu.options[gpu.selectedIndex].getAttribute("data-precio")) +
                     parseInt(psu.options[psu.selectedIndex].getAttribute("data-precio"));

    let mensajesError = [];

    // CORRECCIÓN 2: Validación de Socket (Minúsculas estandarizadas)
    if (cpuSocket.toLowerCase() !== moboSocket.toLowerCase()) {
        mensajesError.push("Incompatibilidad detectada: El socket de la placa base no coincide con el procesador.");
    }

    // CORRECCIÓN EXTENDIDA: Validación de RAM
    if (moboRamType.toLowerCase() !== ramType.toLowerCase()) {
        mensajesError.push("Incompatibilidad detectada: El tipo de memoria RAM no es soportado por la placa base.");
    }

    // CORRECCIÓN 3: Validación de Energía matemática correcta
    const wattsRequeridos = (cpuWatts + gpuWatts) * 1.2; 
    if (psuWatts < wattsRequeridos) {
        mensajesError.push(`Error de Energía: Fuente de poder insuficiente. Se estiman al menos ${Math.ceil(wattsRequeridos)}W.`);
    }

    // Mostrar Resultados
    const divResultado = document.getElementById("resultado");
    if (mensajesError.length > 0) {
        divResultado.innerHTML = "<span class='error'>" + mensajesError.join("<br><br>") + "</span>";
    } else {
        // CORRECCIÓN EXTENDIDA: UI Typo reparado (nombreMobo en vez de nomreMobo)
        divResultado.innerHTML = `
            <span class='success'>¡Ensamblaje 100% Compatible!</span>
            <div class='reporte'>
                <strong>Resumen del Equipo:</strong><br>
                - Procesador: ${nombreCpu}<br>
                - Placa Base: ${typeof nombreMobo !== 'undefined' ? nombreMobo : 'Indefinido (Error de UI)'}<br>
                - Memoria: ${nombreRam}<br>
                - Gráfica: ${nombreGpu}<br>
                - Fuente: ${nombrePsu}<br><br>
                <strong>Costo Total Estimado:</strong> ${totalBOB} BOB
            </div>
        `;
    }
}
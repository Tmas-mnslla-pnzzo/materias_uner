// Diccionario de requisitos previos (debes completarlo con todas las materias)

// Función principal que se ejecuta al hacer clic en un checkbox
function myFunction(ele) {
  const id = ele.id.replace("_i", ""); // Eliminar el sufijo "_i" para obtener el ID de la materia
  const checkBox = document.getElementById(ele.id);

  // Verificar el estado de las materias y actualizar la interfaz
  const [approved, disabled, checkedNames] = comprobar();

  // Actualizar el progreso de la carrera
  const progress = (checkedNames.length / Object.keys(data).length) * 100;
  document.getElementById("r").innerHTML = `Carrera completada al ${progress.toFixed(2)}%`;

  // Habilitar/deshabilitar materias según los requisitos
  approved.forEach((materia) => {
    document.getElementById(`${materia}_i`).disabled = false;
    document.getElementById(materia).style.background = "#59cd90"; // Color verde para materias aprobadas
  });

  disabled.forEach((materia) => {
    document.getElementById(`${materia}_i`).disabled = true;
    document.getElementById(`${materia}_i`).checked = false;
    document.getElementById(materia).style.background = "#FFFFFF"; // Color blanco para materias deshabilitadas
  });
}

// Función para verificar los requisitos previos de cada materia
function comprobar() {
  const approved = []; // Materias que cumplen con los requisitos
  const disabled = []; // Materias que no cumplen con los requisitos
  const checkedNames = []; // Nombres de las materias seleccionadas

  // Obtener las materias seleccionadas
  Object.keys(data).forEach((materia) => {
    const checkbox = document.getElementById(`${materia}_i`);
    if (checkbox.checked) {
      checkedNames.push(materia);
    }
  });

  // Verificar los requisitos previos para cada materia
  Object.keys(data).forEach((materia) => {
    const requisitos = data[materia];
    if (requisitos.every((req) => checkedNames.includes(req))) {
      approved.push(materia); // Si cumple con los requisitos, se aprueba
    } else {
      disabled.push(materia); // Si no cumple, se deshabilita
    }
  });

  return [approved, disabled, checkedNames];
}

// Asignar eventos a los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => myFunction(e.target));
});

// Lógica para seleccionar/deseleccionar todo un año
const materiasPorAnio = {
  primerAnio: ["mb_i", "ic_i", "sr1_i", "if_i", "fi_i", "dcc_i", "ii_i", "f1_i", "c1_i", "sr2_i", "q_i", "co1_i"],
  segundoAnio: ["f2_i", "alga_i", "tmt_i", "co2_i", "i1_i", "f3_i", "c2_i", "et_i", "cm_i"],
  tercerAnio: ["edcn_i", "eb_i", "erm_i", "ss_i", "lmmee_i", "i2_i", "ed_i", "sm1_i", "mei_i", "iei_i"],
  cuartoAnio: ["est_i", "mr_i", "mc_i", "ti_i", "sc_i", "ai_i", "mem_i", "se_i", "r1_i", "ga_i"],
  quintoAnio: ["ep_i", "ia_i", "sm2_i", "sanh_i", "r2_i", "sorc_i", "ogi_i", "hsi_i", "pim_i"],
};

// Función para verificar si un año está completo
function isAnioCompleto(anio) {
  const materias = materiasPorAnio[anio];
  return materias.every((materia) => document.getElementById(materia).checked);
}

// Función para seleccionar todas las materias de un año
function seleccionarAnio(anio) {
  const materias = materiasPorAnio[anio];
  materias.forEach((materia) => {
    const checkbox = document.getElementById(materia);
    if (!checkbox.disabled) {
      checkbox.checked = true;
      myFunction(checkbox);
    }
  });
}

// Función para deseleccionar todas las materias de un año
function deseleccionarAnio(anio) {
  const materias = materiasPorAnio[anio];
  materias.forEach((materia) => {
    const checkbox = document.getElementById(materia);
    checkbox.checked = false;
    myFunction(checkbox);
  });
}

// Asignar eventos a los botones de "Seleccionar Todo"
document.getElementById("selectPrimerAnio").addEventListener("click", (e) => {
  if (e.target.checked) {
    seleccionarAnio("primerAnio");
  } else {
    deseleccionarAnio("primerAnio");
  }
});

document.getElementById("selectSegundoAnio").addEventListener("click", (e) => {
  if (e.target.checked) {
    if (isAnioCompleto("primerAnio")) {
      seleccionarAnio("segundoAnio");
    } else {
      alert("Debes completar todas las materias del Primer Año primero.");
      e.target.checked = false;
    }
  } else {
    deseleccionarAnio("segundoAnio");
  }
});

document.getElementById("selectTercerAnio").addEventListener("click", (e) => {
  if (e.target.checked) {
    if (isAnioCompleto("segundoAnio")) {
      seleccionarAnio("tercerAnio");
    } else {
      alert("Debes completar todas las materias del Segundo Año primero.");
      e.target.checked = false;
    }
  } else {
    deseleccionarAnio("tercerAnio");
  }
});

document.getElementById("selectCuartoAnio").addEventListener("click", (e) => {
  if (e.target.checked) {
    if (isAnioCompleto("tercerAnio")) {
      seleccionarAnio("cuartoAnio");
    } else {
      alert("Debes completar todas las materias del tercer Año primero.");
      e.target.checked = false;
    }
  } else {
    deseleccionarAnio("cuartoAnio");
  }
});

document.getElementById("selectQuintoAnio").addEventListener("click", (e) => {
  if (e.target.checked) {
    if (isAnioCompleto("cuartoAnio")) {
      seleccionarAnio("quintoAnio");
    } else {
      alert("Debes completar todas las materias del Cuarto Año primero.");
      e.target.checked = false;
    }
  } else {
    deseleccionarAnio("quintoAnio");
  }
});

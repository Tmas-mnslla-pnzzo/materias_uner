function myFunction(ele) {
  const [approved, regularidad, disabled, checkedNamesA, checkedNamesR] = comprobar();

  const progress = (checkedNamesA.length / Object.keys(data_a).length) * 100;
  document.getElementById("r1").innerHTML = `Ingeniería completada al ${progress.toFixed(2)}%`;

  approved.forEach((materia) => {
    const aprobadaCheckbox = document.getElementById(`${materia}_i`);
    const regularCheckbox = document.getElementById(`${materia}_j`);

    aprobadaCheckbox.disabled = false;
    regularCheckbox.disabled = false;
    aprobadaCheckbox.style.backgroundColor = "#1eff00ff";
    regularCheckbox.style.backgroundColor = "#ffae00";

  });

  regularidad.forEach((materia) => {
    const aprobadaCheckbox = document.getElementById(`${materia}_i`);
    const regularCheckbox = document.getElementById(`${materia}_j`);

    regularCheckbox.disabled = false;
    regularCheckbox.style.backgroundColor = "#ffae00";

  });

  disabled.forEach((materia) => {
    document.getElementById(`${materia}_i`).disabled = true;
    document.getElementById(`${materia}_i`).checked = false;
    document.getElementById(`${materia}_j`).disabled = true;
    document.getElementById(`${materia}_j`).checked = false;
    document.getElementById(`${materia}_j`).style.backgroundColor = "#dfdfdfff";
    document.getElementById(`${materia}_i`).style.backgroundColor = "#dfdfdfff";
  });

  const checkboxesChequeadosAprobadas = document.querySelectorAll('.checkbox-materia-a:not(:disabled)');
  const checkboxesChequeadosRegulares = document.querySelectorAll('.checkbox-materia-r:not(:disabled)');
  
  checkboxesChequeadosAprobadas.forEach((checkbox, index) => {
    const idMateria = checkbox.id.replace('_i', '');
    const regularCheckbox = document.getElementById(`${idMateria}_j`);
    try {
      const materiasAprobadasAntes = JSON.parse(localStorage.getItem('materiasRegularesAntes'));
      if (materiasAprobadasAntes[index] && !regularCheckbox.checked && checkbox.checked) {
        checkbox.checked = false;
      } else if (!materiasAprobadasAntes[index] && checkbox.checked) {
        regularCheckbox.checked = true;
      }
    } catch (error) {
      console.log(1);
    }
  });

  const materiasAprobadasAntes = Array.from(checkboxesChequeadosAprobadas).map(checkbox => checkbox.checked);
  const materiasRegularesAntes = Array.from(checkboxesChequeadosRegulares).map(checkbox => checkbox.checked);
  localStorage.setItem("materiasRegularesAntes", JSON.stringify(materiasRegularesAntes));
  localStorage.setItem("materiasAprobadasAntes", JSON.stringify(materiasAprobadasAntes));
}

// Función para verificar los requisitos previos de cada materia
function comprobar() {
  const approved = []; 
  const regularidad = [];
  const disabled = [];
  const checkedNamesR = []; 
  const checkedNamesA = [];

  // Obtener las materias seleccionadas
  Object.keys(data_a).forEach((materia) => {
    const checkbox_aprobada = document.getElementById(`${materia}_i`);
    const checkbox_regular = document.getElementById(`${materia}_j`);
    if (checkbox_aprobada.checked) {
      checkedNamesA.push(materia);
    }
    if (checkbox_regular.checked) {
      checkedNamesR.push(materia);
    }
  });

  // Verificar los requisitos previos para cada materia
  Object.keys(data_a).forEach((materia) => {
    const requisitosAprobado = data_a[materia];
    const requisitosRegular = data_r[materia];
    const requisitosAprobado_paraR = data_cursar_a[materia];
    const requisitosRegular_paraR = data_cursar_r[materia];
    if ((requisitosAprobado.every((req) => checkedNamesA.includes(req))) && (requisitosRegular.every((req) => checkedNamesR.includes(req)))) {
      approved.push(materia);
    } else if ((requisitosAprobado_paraR.every((req) => checkedNamesA.includes(req))) && (requisitosRegular_paraR.every((req) => checkedNamesR.includes(req)))) {
      regularidad.push(materia); 
    } else {
      disabled.push(materia); 
    }
  });

  return [approved, regularidad, disabled, checkedNamesA, checkedNamesR];
}

// Asignar eventos a los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => myFunction(e.target));
});

// Función para verificar si un año está completo
function isAnioCompleto(anio) {
  const materias = materiasPorAnio[anio];
  return materias.every((materia) => document.getElementById(`${materia}_i`).checked);
}

// Función para seleccionar todas las materias de un año
function seleccionarAnio(anio) {
  const materias = materiasPorAnio[anio];
  materias.forEach((materia) => {
    const checkbox = document.getElementById(`${materia}_i`);
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
    const checkboxA = document.getElementById(`${materia}_i`);
    const checkboxR = document.getElementById(`${materia}_j`);
    checkboxA.checked = false;
    checkboxR.checked = false;
    myFunction(checkboxA);
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
      alert("Debes completar todas las materias de Primer Año primero.");
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
      alert("Debes completar todas las materias de Segundo Año primero.");
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
      alert("Debes completar todas las materias de tercer Año primero.");
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
      alert("Debes completar todas las materias de Cuarto Año primero.");
      e.target.checked = false;
    }
  } else {
    deseleccionarAnio("quintoAnio");
  }
});

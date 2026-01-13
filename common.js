function myFunction(ele) {
  if (ele) {
    const idMateria = ele.id.slice(0, -2); 
    const checkAprobada = document.getElementById(`${idMateria}_i`);
    const checkRegular = document.getElementById(`${idMateria}_j`);

    if (ele === checkAprobada && checkAprobada.checked) {
      checkRegular.checked = true;
      checkRegular.style.backgroundColor = "#ffae00"; 
    }

    if (ele === checkRegular && !checkRegular.checked) {
      checkAprobada.checked = false;
      checkAprobada.style.backgroundColor = "#dfdfdf";
    }
  }

  const [approved, regularidad, disabled, checkedNamesA, checkedNamesR] = comprobar();
  const progress = (checkedNamesA.length / Object.keys(data_a).length) * 100;
  const progressElement = document.getElementById("r1");
  if (progressElement) {
      progressElement.innerHTML = `Carrera completada al ${progress.toFixed(2)}%`;
  }

  approved.forEach((materia) => {
    const aprobadaCheckbox = document.getElementById(`${materia}_i`);
    const regularCheckbox = document.getElementById(`${materia}_j`);

    aprobadaCheckbox.disabled = false;
    regularCheckbox.disabled = false;

    aprobadaCheckbox.style.backgroundColor = "#1eff00"; 
    regularCheckbox.style.backgroundColor = "#ffae00";  
  });

  regularidad.forEach((materia) => {
    const aprobadaCheckbox = document.getElementById(`${materia}_i`);
    const regularCheckbox = document.getElementById(`${materia}_j`);

    aprobadaCheckbox.disabled = true;
    aprobadaCheckbox.checked = false; 
    aprobadaCheckbox.style.backgroundColor = "#dfdfdf"; 

    regularCheckbox.disabled = false;
    regularCheckbox.style.backgroundColor = "#ffae00"; 
  });

  let huboCambioForzado = false; 

  disabled.forEach((materia) => {
    const checkI = document.getElementById(`${materia}_i`);
    const checkJ = document.getElementById(`${materia}_j`); 

    if (checkI.checked || checkJ.checked) {
        huboCambioForzado = true;
    }

    checkI.disabled = true;
    checkJ.disabled = true;

    checkI.checked = false;
    checkJ.checked = false;

    checkI.style.backgroundColor = "#dfdfdf";
    checkJ.style.backgroundColor = "#dfdfdf";
  });

  if (huboCambioForzado) {
      myFunction(null); 
  } else {
      guardarEnLocalStorage();
  }
}

function guardarEnLocalStorage() {
  const checkboxesA = document.querySelectorAll('.checkbox-materia-a:not(:disabled)');
  const checkboxesR = document.querySelectorAll('.checkbox-materia-r:not(:disabled)');
  
  const materiasAprobadas = Array.from(checkboxesA).map(c => c.checked);
  const materiasRegulares = Array.from(checkboxesR).map(c => c.checked);
  
  localStorage.setItem("materiasRegularesAntes", JSON.stringify(materiasRegulares));
  localStorage.setItem("materiasAprobadasAntes", JSON.stringify(materiasAprobadas));
}

function comprobar() {
  const approved = []; 
  const regularidad = [];
  const disabled = [];
  const checkedNamesR = []; 
  const checkedNamesA = [];

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

  Object.keys(data_a).forEach((materia) => {
    const requisitosAprobado = data_a[materia];
    const requisitosRegular = data_r[materia];
    const requisitosAprobado_paraR = data_cursar_a[materia];
    const requisitosRegular_paraR = data_cursar_r[materia];
    if (materia==='gi'){
      console.log("...");
      console.log((requisitosAprobado.every((req) => checkedNamesA.includes(req))),(requisitosRegular.every((req) => checkedNamesR.includes(req))));
      console.log(checkedNamesA,requisitosRegular);
      console.log(requisitosAprobado,requisitosRegular);
    }
    if (!primerCuatri.includes(materia)){
      if ((requisitosAprobado.every((req) => checkedNamesA.includes(req))) && 
          (requisitosRegular.every((req) => checkedNamesR.includes(req))) && 
          (requisitosAprobado.length != 0 || requisitosRegular.length != 0)) {
        approved.push(materia);
        
      } else if ((requisitosAprobado_paraR.every((req) => checkedNamesA.includes(req))) && 
                  (requisitosRegular_paraR.every((req) => checkedNamesR.includes(req))) && 
                  (requisitosAprobado_paraR.length != 0 || requisitosRegular_paraR.length != 0)) {
        regularidad.push(materia); 
        if (requisitosAprobado.length === 0 && requisitosRegular.length === 0){
          approved.push(materia);
        }
      } else {
        disabled.push(materia);
      }
    } else {
      approved.push(materia);
    }

  });

  return [approved, regularidad, disabled, checkedNamesA, checkedNamesR];
}

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => myFunction(e.target));
});

function isAnioCompleto(anio) {
  const materias = materiasPorAnio[anio];
  return materias.every((materia) => document.getElementById(`${materia}_i`).checked);
}

function seleccionarAnio(anio) {
  const materias = materiasPorAnio[anio];
  materias.forEach((materia) => {
    const checkboxA = document.getElementById(`${materia}_i`);
    const checkboxR = document.getElementById(`${materia}_j`);
    if (!checkboxA.disabled) {
      checkboxA.checked = true;
      checkboxR.checked = true; 
      myFunction(checkboxA);
    }
  });
}

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

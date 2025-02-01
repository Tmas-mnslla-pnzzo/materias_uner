function myFunction(ele) {
  const id = ele.id;
  const id2 = id.slice(0, -2);
  const box = document.getElementById(id2);
  const checkBox = document.getElementById(id);

  const [approved, disabled, checkedNames] = comprobar();

  const progress = (checkedNames.length / Object.keys(data).length) * 100;
  document.getElementById("r").innerHTML = `Carrera completada al ${progress.toFixed(2)}%`;

  approved.forEach((id) => {
    document.getElementById(id).style.background = "#59cd90";
    document.getElementById(`${id}_i`).disabled = false;
  });

  disabled.forEach((id) => {
    document.getElementById(id).style.background = "#FFFFFF";
    document.getElementById(`${id}_i`).disabled = true;
    document.getElementById(`${id}_i`).checked = false;
  });
}

function comprobar() {
  const estado = toggle();
  const approved = [];
  const disabled = [];
  const checkedNames = [];

  Object.keys(data).forEach((key, index) => {
    if (estado[index] === 1) {
      checkedNames.push(key);
    }
  });

  Object.keys(data).forEach((key) => {
    const requiredIndexes = getAllIndexes(data[key], 1);
    const requiredNames = requiredIndexes.map((index) => Object.keys(data)[index]);

    if (checkSubset(checkedNames, requiredNames)) {
      approved.push(key);
    } else {
      disabled.push(key);
    }
  });

  return [approved, disabled, checkedNames];
}

function toggle() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  return Array.from(checkboxes).map((checkbox) => (checkbox.checked ? 1 : 0));
}

function getAllIndexes(arr, val) {
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

function checkSubset(parentArray, subsetArray) {
  return subsetArray.every((el) => parentArray.includes(el));
}

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => myFunction(e.target));
});

const materiasPorAnio = {
  primerAnio: ["mb_i", "ic_i", "sr1_i", "if_i", "fi_i", "dcc_i", "ii_i", "f1_i", "c1_i", "sr2_i", "q_i", "co1_i"],
  segundoAnio: ["f2_i", "alga_i", "tmt_i", "co2_i", "i1_i", "f3_i", "c2_i", "et_i", "cm_i"],
  tercerAnio: ["edcn_i", "eb_i", "erm_i", "ss_i", "lmmee_i", "i2_i", "ed_i", "sm1_i", "mei_i", "iei_i"],
  cuartoAnio: ["est_i", "mr_i", "mc_i", "ti_i", "sc_i", "ai_i", "mem_i", "se_i", "r1_i", "ga_i"],
  quintoAnio: ["ep_i", "ia_i", "sm2_i", "sanh_i", "r2_i", "sorc_i", "ogi_i", "hsi_i", "pim_i"],
};

function isAnioCompleto(anio) {
  const materias = materiasPorAnio[anio];
  return materias.every((materia) => document.getElementById(materia).checked);
}

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

function deseleccionarAnio(anio) {
  const materias = materiasPorAnio[anio];
  materias.forEach((materia) => {
    const checkbox = document.getElementById(materia);
    checkbox.checked = false;
    myFunction(checkbox);
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
      alert("Debes completar todas las materias del Tercer Año primero.");
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

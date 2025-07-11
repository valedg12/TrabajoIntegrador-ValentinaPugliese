const form = document.getElementById('form-receta');
const lista = document.getElementById('lista-recetas');

const inputNombre = document.getElementById('input-nombre');
const inputPasos = document.getElementById('input-pasos');
const btnSubmit = document.getElementById('btn-submit');

let recetas = [];
let modoEdicion = false;
let indexAEditar = null;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const pasos = inputPasos.value.trim();

  if (!nombre || !pasos) return;

  const nuevaReceta = { nombre, pasos };

  if (modoEdicion) {
    recetas[indexAEditar] = nuevaReceta;
    modoEdicion = false;
    indexAEditar = null;
    btnSubmit.textContent = "Agregar Receta";
  } else {
    recetas.push(nuevaReceta);
  }

  inputNombre.value = '';
  inputPasos.value = '';
  renderizarRecetas();
});

const eliminarReceta = (index) => {
  recetas.splice(index, 1);
  renderizarRecetas();
};

const modificarReceta = (index) => {
  const receta = recetas[index];
  inputNombre.value = receta.nombre;
  inputPasos.value = receta.pasos;
  modoEdicion = true;
  indexAEditar = index;
  btnSubmit.textContent = "Guardar Cambios";
};

const renderizarRecetas = () => {
  lista.innerHTML = '';
  recetas.map((receta, index) => {
    const div = document.createElement('div');
    div.className = 'receta';
    div.innerHTML = `
      <h3>${receta.nombre}</h3>
      <p><strong>Pasos:</strong><br>${receta.pasos}</p>
      <button class="modificar-btn" onclick="modificarReceta(${index})">Modificar</button>
      <button class="eliminar-btn" onclick="eliminarReceta(${index})">Eliminar</button>
    `;
    lista.appendChild(div);
  });
};


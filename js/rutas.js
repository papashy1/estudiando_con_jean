var routes = [
  {
    id: 90,
    name: 'ruta1',
    value: '400000',
    cityo: 'Bucaramanga',
    cityd: 'Cartagena',
    fidelityp: '5',
  },
  {
    id: 91,
    name: 'ruta2',
    value: '300000',
    cityo: 'Cartagena',
    cityd: 'Bogota',
    fidelityp: '7',
  },
];
let tempRutas = routes;
var indice = 0;
var tempIndexRutas = 0;
const generarId = () => {
  let a = Date.now().toString(30);
  let b = Math.random().toString(30).substring(2);
  return a + b;
};

const agregarRutas = () => {
  const idGen = generarId();
  var nombre = document.getElementById('nombreRuta').value;
  var valor = document.getElementById('valorRuta').value;
  var origen = document.getElementById('ciudadOrigenNuevo').value;
  var destino = document.getElementById('ciudadDestinoNuevo').value;
  var puntosFidelidad = document.getElementById('fidelidadNuevo').value;

  let route = {
    id: idGen,
    name: nombre,
    value: valor,
    cityo: origen,
    cityd: destino,
    fidelityp: puntosFidelidad,
  };
  routes.push(route);
  localStorage.setItem('routes', JSON.stringify(routes));
  location.reload();
};

const nuevoUsuario = document.getElementById('agregarRutaBtn');
nuevoUsuario.addEventListener('click', () => {
  agregarRutas();
});

const listRoutes = () => {
  try {
    routes = JSON.parse(localStorage.getItem('routes'));
    if (routes == null) {
      routes = tempRutas;
      localStorage.setItem('routes', JSON.stringify(routes));
    }
    let content = ``;
    if (localStorage.getItem('routes') != null || routes != null) {
      routes.forEach((route, index) => {
        content += `
            <tr>
              <td>${route.name}</td>
              <td>${route.value}</td>
              <td>${route.cityo}</td>
              <td>${route.cityd}</td>
              <td>${route.fidelityp}</td>
              <td>
                <button id="btndelete${route.id}" onclick="eliminarUsuario(${index})" class="btn btn-danger mx-4" type="button">
                    <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>`;
      });
      tableBody_routes.innerHTML = content;
    }
  } catch (ex) {
    alert(ex);
  }
};

const eliminarUsuario = (index) => {
  routes.splice(index, 1);
  localStorage.setItem('routes', JSON.stringify(routes));
  location.reload();
};

listRoutes();

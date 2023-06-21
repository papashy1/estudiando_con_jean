let tickets = [];
let users = [];
let routes = [];
let tempCliente = '';
let tempRuta = '';
document.querySelector('#tituloRuta').style.display = 'none';
document.querySelector('#tabla_Rutas').style.display = 'none';
document.querySelector('#campoBuscarRuta').style.display = 'none';

const obtenerClientesRutas = () => {
  users = JSON.parse(localStorage.getItem('users'));
  routes = JSON.parse(localStorage.getItem('routes'));
};

//--------------------------------------Inicio Clientes---------------------------------------------------------------------------------
const listarClientes = () => {
  try {
    users = JSON.parse(localStorage.getItem('users'));
    if (users == null) {
      users = [];
    }
    tableBody_users.innerHTML = '';
    const texto = buscarCliente.value;
    if (localStorage.getItem('users') != null) {
      users.forEach((user, index) => {
        if (
          user.name.indexOf(texto) !== -1 ||
          user.lastname.indexOf(texto) !== -1 ||
          user.cc.indexOf(texto) !== -1
        ) {
          tableBody_users.innerHTML += `
              <tr>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.cc}</td>
                <td>${user.phonenumber}</td>
                <td>${user.citizen}</td>
                <td>${user.date}</td>
                <td><button id="btnseleccionarU${user.id}" onclick="obtenerCliente(${index})" class="btn btn-success mx-2" type="button">
                <i class="fa-solid fa-check" style="color: #ffffff;"></i>
                      </button>`;
        }
      });
    }
  } catch (ex) {
    alert(ex);
  }
};
//Actualizar la tabla por la busqueda
const buscarCliente = document.querySelector('#campoBuscarCliente');
buscarCliente.addEventListener('keyup', listarClientes);
//obteniendo el cliente
const obtenerCliente = (valor) => {
  tempCliente = users[valor];
  document.querySelector('#tituloCliente').style.display = 'none';
  document.querySelector('#campoBuscarCliente').style.display = 'none';
  document.querySelector('#tabla_clientes').style.display = 'none';
  document.querySelector('#tituloRuta').style.display = 'block';
  document.querySelector('#campoBuscarRuta').style.display = 'block';
  document.querySelector('#tabla_Rutas').style.display = 'block';
};
//------------------------------------fin clientes --------------------------------------------------------------------
//--------------------------------------Inicio Rutas-------------------------------------------------------------------
const listarRutas = () => {
  try {
    routes = JSON.parse(localStorage.getItem('routes'));
    if (routes == null) {
      routes = [];
    }
    tableBody_routes.innerHTML = '';
    const texto = buscarRutas.value;
    if (localStorage.getItem('routes') != null) {
      routes.forEach((route, index) => {
        if (route.name.indexOf(texto) !== -1) {
          tableBody_routes.innerHTML += `
                <tr>
                <td>${route.name}</td>
                <td>${route.value}</td>
                <td>${route.cityo}</td>
                <td>${route.cityd}</td>
                <td>${route.fidelityp}</td>
                  <td><button id="btnseleccionarR${route.id}" onclick="obtenerRuta(${index})" class="btn btn-success mx-2" type="button" data-bs-toggle="modal" data-bs-target="#modalNuevoTicket">
                  <i class="fa-solid fa-check" style="color: #ffffff;"></i>
                        </button>`;
        }
      });
    }
  } catch (ex) {
    alert(ex);
  }
};
//Actualizar la tabla por la busqueda
const buscarRutas = document.querySelector('#campoBuscarRuta');
buscarRutas.addEventListener('keyup', listarRutas);
//obteniendo la ruta
const obtenerRuta = (valor) => {
  tempRuta = routes[valor];
  datosTicket();
};

const datosTicket = () => {
  identificacion2.innerHTML = tempCliente.cc;
  nombre2.innerHTML = tempCliente.name + ' ' + tempCliente.lastname;
  telefono2.innerHTML = tempCliente.phonenumber;
  email2.innerHTML = tempCliente.email;
  nacionalidad2.innerHTML = tempCliente.citizen;
  valorRuta2.innerHTML = formatterPeso.format(tempRuta.value);
  tasaAeroportuaria2.innerHTML = formatterPeso.format(
    parseFloat(tempRuta.value * 0.04)
  );
  iva2.innerHTML = formatterPeso.format(parseFloat(tempRuta.value * 0.16));
  valorTotal2.innerHTML = formatterPeso.format(
    parseFloat(tempRuta.value * 1.2)
  );
  fidelizacion2.innerHTML = tempRuta.fidelityp;
};

//------------------------------------fin Rutas --------------------------------------------------------------------

//-----------cambia el formato del numeros a peso colombiano----------------------
const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
});

//Registrar tickets con cliente y rutas

const registrarTicket = () => {
  tempCliente.fidelity =
    parseInt(tempCliente.fidelity) + parseInt(tempRuta.fidelityp);
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};

const cerrarModalTickekBtn = document.getElementById('cerrarModalTicket');
cerrarModalTickekBtn.addEventListener('click', () => {
  location.reload();
});

const agregarTicketBtn = document.getElementById('agregarTicketBtn');
agregarTicketBtn.addEventListener('click', () => {
  registrarTicket();
});

obtenerClientesRutas();
listarClientes();
listarRutas();

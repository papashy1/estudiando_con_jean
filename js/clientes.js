let users = [
  {
    id: 90,
    name: 'jean',
    lastname: 'galvis',
    email: 'jean@gmail.com',
    cc: '1095835610',
    phonenumber: '3165444606',
    citizen: 'colombiano',
    date: '1960/06/13',
    fidelity: '0',
  },
  {
    id: 91,
    name: 'juan',
    lastname: 'roa',
    email: 'papashy@gmail.com',
    cc: '1098765879',
    phonenumber: '3154545908',
    citizen: 'colombiano',
    date: '1960/06/13',
    fidelity: '0',
  },
];
let tempUsers = users;
var indice = 0;
var tempIndexUsuario = 0;
const generarId = () => {
  let a = Date.now().toString(30);
  let b = Math.random().toString(30).substring(2);
  return a + b;
};

const agregarUsuario = () => {
  const idGen = generarId();
  var nombre = document.getElementById('validationDefault01').value;
  var apellido = document.getElementById('validationDefault02').value;
  var correo = document.getElementById('validationEmail').value;
  var cedula = document.getElementById('validationDefault03').value;
  var telefono = document.getElementById('validationDefault05').value;
  var nacionalidad = document.getElementById('exampleDataList').value;
  var fecha = document.getElementById('startDate').value;
  var fidelidad = 0;

  let prueba = {
    id: idGen,
    name: nombre,
    lastname: apellido,
    email: correo,
    cc: cedula,
    phonenumber: telefono,
    citizen: nacionalidad,
    date: fecha,
    fidelity: fidelidad,
  };
  users.push(prueba);
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};
const listarClientes = () => {
  try {
    users = JSON.parse(localStorage.getItem('users'));
    if (users == null) {
      users = tempUsers;
      localStorage.setItem('users', JSON.stringify(users));
    }
    tableBody_users.innerHTML = '';
    const texto = buscarCliente.value;
    if (localStorage.getItem('users') != null || users != null) {
      users.forEach((user, index) => {
        const client = document.createElement('tr');
        const { id, name, lastname, email, cc, phonenumber, citizen, date } =
          user;
        if (
          name.indexOf(texto) !== -1 ||
          lastname.indexOf(texto) !== -1 ||
          cc.indexOf(texto) !== -1
        ) {
          client.innerHTML = `

                <td>${name}</td>
                <td>${lastname}</td>
                <td>${email}</td>
                <td>${cc}</td>
                <td>${phonenumber}</td>
                <td>${citizen}</td>
                <td>${date}</td>
                             <td>
                             <div class="d-flex btnAcciones">
                             <button id="btnedit${id}" onclick="obtenerUsuario(${index})" class="btn btn-primary" type="button"
                             data-bs-toggle="modal"
                             data-bs-target="#modalEditarUsuario">
                                   <i class="fa-solid fa-pen-to-square"></i>
                                   </button>
                
                               <button id="btndelete${id}" onclick="eliminarUsuario(${index})" class="btn btn-danger" type="button">
                                   <i class="fa-solid fa-trash"></i>
                                   </button>
                                   </div>
                               </td>
                               `;
          tableBody_users.appendChild(client);
        }
      });
    }
  } catch (ex) {
    alert(ex);
  }
};
//Actualizar la tabla por la busqueda
const buscarCliente = document.querySelector('#campoBuscar');
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

const eliminarUsuario = (index) => {
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};

const obtenerUsuario = (index) => {
  indice = index;
  document.getElementById('nombreEdit').value = users[indice].name;
  var apellido = (document.getElementById('apellidoEdit').value =
    users[indice].lastname);
  var correo = (document.getElementById('emailEdit').value =
    users[indice].email);
  var cedula = (document.getElementById('cedulaEdit').value = users[indice].cc);
  var telefono = (document.getElementById('telefonoEdit').value =
    users[indice].phonenumber);
  var nacionalidad = (document.getElementById('nacionalidadEdit').value =
    users[indice].citizen);
  var fecha = (document.getElementById('fechaEdit').value = users[indice].date);
  tempIndexUsuario = index;
};

const btnModificarUsuario = document.getElementById('modificarUsuarioBtn');
btnModificarUsuario.addEventListener('click', () => {
  modificarUsuario(tempIndexUsuario);
});

const modificarUsuario = (index) => {
  indice = index;
  users[indice].name = document.getElementById('nombreEdit').value;
  users[indice].lastname = document.getElementById('apellidoEdit').value;
  users[indice].email = document.getElementById('emailEdit').value;
  users[indice].cc = document.getElementById('cedulaEdit').value;
  users[indice].phonenumber = document.getElementById('telefonoEdit').value;
  users[indice].citizen = document.getElementById('nacionalidadEdit').value;
  users[indice].date = document.getElementById('fechaEdit').value;

  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};

listarClientes();

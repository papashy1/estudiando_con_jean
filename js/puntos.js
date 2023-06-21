var users = [];
var tempCliente = '';

const obtenerClientesRutas = () => {
  users = JSON.parse(localStorage.getItem('users'));
  routes = JSON.parse(localStorage.getItem('routes'));
};

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
                  <td>${user.fidelity}</td>`;
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

obtenerClientesRutas();
listarClientes();

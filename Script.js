// LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const role = document.getElementById("role").value;
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
    });
  }

  const userForm = document.getElementById("userForm");
  const userTable = document.getElementById("userTable");

  if (userForm && userTable) {
    loadUsers();

    userForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("newUsername").value;
      const role = document.getElementById("newRole").value;
      addUser(username, role);
      userForm.reset();
    });
  }
});

function logout() {
  window.location.href = "index.html"; // ou login.html selon ton projet
}

// CRUD in localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input value="${user.name}" onchange="editUser(${index}, 'name', this.value)" /></td>
      <td>
        <select onchange="editUser(${index}, 'role', this.value)">
          <option value="user" ${user.role === "user" ? "selected" : ""}>Utilisateur</option>
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
        </select>
      </td>
      <td>
        <button onclick="deleteUser(${index})">Supprimer</button>
      </td>
    `;

    table.appendChild(row);
  });
}

function addUser(name, role) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ name, role });
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function editUser(index, key, value) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users[index][key] = value;
  localStorage.setItem("users", JSON.stringify(users));
}

// DATA pour les aéroports
const data = {
  "Paris": { route: "PAR001", conso: 5.0 },
  "New York": { route: "NYC456", conso: 6.3 },
  "Tokyo": { route: "TK789", conso: 7.1 },
  "Berlin": { route: "BER123", conso: 5.5 },
  "Madrid": { route: "MAD321", conso: 4.9 },
  "Rome": { route: "ROM987", conso: 5.2 },
  "London": { route: "LDN654", conso: 5.7 },
  "Beijing": { route: "BJ100", conso: 6.9 },
  "Dubai": { route: "DXB888", conso: 6.0 }
};

// Mise à jour automatique du résultat
function updateResult() {
  const aeroport = document.getElementById("aeroport-select").value;
  const meteo = document.getElementById("meteo-select").value;

  if (data[aeroport]) {
    let baseConso = data[aeroport].conso;
    if (meteo === "Pluvieux") {
      baseConso *= 1.1; // +10% si météo pluvieuse
    }

    document.getElementById("route").textContent = "Route : " + data[aeroport].route;
    document.getElementById("conso").textContent = "Consommation : " + baseConso.toFixed(1) + " Kp/L";
  } else {
    document.getElementById("route").textContent = "Route : ";
    document.getElementById("conso").textContent = "Consommation : ";
  }
}

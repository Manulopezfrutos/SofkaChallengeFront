// Objects
// Abstract class
class Vehicle {
    constructor(name, velocity) {
        this.name = name;
        this.velocity = velocity;
    }
    
    // overload
    speedUp() {
        this.velocity += 1;
    }
    speedUp(kmPerHour) {
        this.velocity += kmPerHour;
    }

    stop() {
        this.velocity = 0;
    }
}

class ShuttleVehicle extends Vehicle {
    constructor(name, velocity, isActive) {
        super(name, velocity);
        this.isActive = isActive;
    }

    toggleActivate() {
        this.isActive = !this.isActive;
    }
}

class UnmannedShip extends Vehicle {
    constructor(name, velocity, panelsDeployed) {
        super(name, velocity);
        this.panelsDeployed = panelsDeployed;
    }

    togglePanelsDeployed() {
        this.panelsDeployed = !this.panelsDeployed;
    }
}

class MannedShip extends Vehicle {
    constructor(name, velocity, crewPresent) {
        super(name, velocity);
        this.crewPresent = crewPresent;
    }

    recieveCrew() {
        this.crewPresent += 1;
    }

    ejectCrew() {
        this.crewPresent -= 1;
    }
}


// Variables
const endPoint = 'https://sofka-challenge-back.herokuapp.com/';

// Get data
let getShuttles = () => fetch(endPoint + 'ShuttleVehicles')
    .then(response => response.json())
    .then(json => {
        printShuttle(json);
    });
let getUnmanned = () => fetch(endPoint + 'UnmannedShip')
    .then(response => response.json())
    .then(json => {
        printUnmanned(json);
    });
let getManned = () => fetch(endPoint + 'MannedShips')
    .then(response => response.json())
    .then(json => {
        printManned(json);
    });


// Print data on UI
function printShuttle(data) {
    const table = document.getElementById('shuttle')
    data.forEach(vehicle => {
        table.innerHTML = `
          ${table.innerHTML}
          <tr id="${"shuttle" + vehicle.id}">
          <th scope="row">${vehicle.name}</th>
          <td>${vehicle.velocity}</td>
          <td>${vehicle.isActive}</td>
          <td><button class="btn btn-danger" onclick="deleteShuttle(${vehicle.id})">Del</button></td>
        </tr>
        `;
    });
}
function printUnmanned(data) {
    const table = document.getElementById('unmanned')
    data.forEach(vehicle => {
        table.innerHTML = `
          ${table.innerHTML}
          <tr id="${"unmanned" + vehicle.id}">
          <th scope="row">${vehicle.name}</th>
          <td>${vehicle.velocity}</td>
          <td>${vehicle.panelsDeployed}</td>
          <td><button class="btn btn-danger" onclick="deleteUnmanned(${vehicle.id})">Del</button></td>
        </tr>
        `;
    });
}
function printManned(data) {
    const table = document.getElementById('manned')
    data.forEach(vehicle => {
        table.innerHTML = `
          ${table.innerHTML}
          <tr id="${"manned" + vehicle.id}">
          <th scope="row">${vehicle.name}</th>
          <td>${vehicle.velocity}</td>
          <td>${vehicle.panelsDeployed}</td>
          <td><button class="btn btn-danger" onclick="deleteManned(${vehicle.id})">Del</button></td>
        </tr>
        `;
    });
}


// POST
// Submit form Shuttle
function postShuttle() {
    let newShuttle = new ShuttleVehicle(document.getElementById("newShuttleName").value, document.getElementById("newShuttleVelocity").value, document.getElementById("newShuttleIsActive").value);
    const table = document.getElementById('shuttle')
    const data = {
        "name": newShuttle.name,
        "velocity": newShuttle.velocity,
        "isActive": newShuttle.isActive
    };

    fetch(endPoint + 'ShuttleVehicles', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            table.innerHTML = `
            ${table.innerHTML}
            <tr id="${"shuttle" + data.id}">
            <th scope="row">${data.name}</th>
            <td>${data.velocity}</td>
            <td>${data.isActive}</td>
            <td><button class="btn btn-danger" onclick="deleteShuttle(${data.id})">Del</button></td>
          </tr>
          `;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Submit form UnmannedShip
function postUnmanned() {
    let newVehicle = new UnmannedShip(document.getElementById("newUnmannedName").value, document.getElementById("newUnmannedVelocity").value, document.getElementById("newUnmannedPanelsDeployed").value);
    const table = document.getElementById('unmanned')
    const data = {
        "name": newVehicle.name,
        "velocity": newVehicle.velocity,
        "panelsDeployed": newVehicle.panelsDeployed
    };

    fetch(endPoint + 'UnmannedShip', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            table.innerHTML = `
            ${table.innerHTML}
            <tr id="${"unmanned" + data.id}">
            <th scope="row">${data.name}</th>
            <td>${data.velocity}</td>
            <td>${data.panelsDeployed}</td>
            <td><button class="btn btn-danger" onclick="deleteUnmanned(${data.id})">Del</button></td>
          </tr>
          `;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Submit form MannedShip
function postManned() {
    let newVehicle = new MannedShip(document.getElementById("newMannedName").value, document.getElementById("newMannedVelocity").value, document.getElementById("newMannedCrewPresent").value);
    const table = document.getElementById('manned')
    const data = {
        "name": newVehicle.name,
        "velocity": newVehicle.velocity,
        "crewPresent": newVehicle.crewPresent
    };

    fetch(endPoint + 'MannedShips', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            table.innerHTML = `
            ${table.innerHTML}
            <tr id="${"manned" + data.id}">
            <th scope="row">${data.name}</th>
            <td>${data.velocity}</td>
            <td>${data.crewPresent}</td>
            <td><button class="btn btn-danger" onclick="deleteManned(${data.id})">Del</button></td>
          </tr>
          `;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE
function deleteShuttle(id) {
    fetch(endPoint + 'ShuttleVehicles/' + id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            document.getElementById("shuttle" + id).remove()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function deleteUnmanned(id) {
    fetch(endPoint + 'UnmannedShip/' + id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            document.getElementById("unmanned" + id).remove()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function deleteManned(id) {
    fetch(endPoint + 'MannedShips/' + id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            document.getElementById("manned" + id).remove()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Run app
getShuttles()
getUnmanned()
getManned()
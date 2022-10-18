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
const shuttleTable = document.getElementById('shuttle');
const unmannedTable = document.getElementById('unmanned');
const mannedTable = document.getElementById('manned');

// Get data
let getShuttles = () => fetch(endPoint + 'ShuttleVehicles')
    .then(response => response.json())
    .then(json => {
        printVehicle(json, shuttleTable, "shuttle");
    });
let getUnmanned = () => fetch(endPoint + 'UnmannedShip')
    .then(response => response.json())
    .then(json => {
        printVehicle(json, unmannedTable, "unmanned");
    });
let getManned = () => fetch(endPoint + 'MannedShips')
    .then(response => response.json())
    .then(json => {
        printVehicle(json, mannedTable, "manned");
    });


// Print data on UI
function printVehicle(data, table, vehicleType) {
    data.forEach(vehicle => {
        table.innerHTML = `
          ${table.innerHTML}
          <tr id="${vehicleType + vehicle.id}">
          <th scope="row">${vehicle.name}</th>
          <td>${vehicle.velocity}</td>
          <td>${vehicleType == "shuttle"
                ? vehicle.isActive : vehicleType == "unmanned"
                    ? vehicle.panelsDeployed : vehicle.crewPresent
            }</td>
          <td><button class="btn btn-danger" onclick="deleteVehicle(${"'"+ vehicleType +"'"}, ${vehicle.id})">Del</button></td>
        </tr>
        `;
    });
}


// POST
// Submit form Shuttle
function postShuttle() {
    let newShuttle = new ShuttleVehicle(document.getElementById("newShuttleName").value, document.getElementById("newShuttleVelocity").value, document.getElementById("newShuttleIsActive").value);
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
            printVehicle([data], shuttleTable, "shuttle");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Submit form UnmannedShip
function postUnmanned() {
    let newVehicle = new UnmannedShip(document.getElementById("newUnmannedName").value, document.getElementById("newUnmannedVelocity").value, document.getElementById("newUnmannedPanelsDeployed").value);
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
            printVehicle([data], unmannedTable, "unmanned");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Submit form MannedShip
function postManned() {
    let newVehicle = new MannedShip(document.getElementById("newMannedName").value, document.getElementById("newMannedVelocity").value, document.getElementById("newMannedCrewPresent").value);
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
            printVehicle([data], mannedTable, "manned");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE
function deleteVehicle(vehicleType, id) {
    fetch(endPoint + (vehicleType == "shuttle"
    ? 'ShuttleVehicles/' : vehicleType == "unmanned"
    ? 'UnmannedShip/' : 'MannedShips/')
    + id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then(() => {
            console.log('Success');
            document.getElementById(vehicleType + id).remove();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


// Run app
getShuttles()
getUnmanned()
getManned()
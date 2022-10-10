// Objects
class Vehicle {
    constructor(name, velocity) {
        this.name = name;
        this.velocity = velocity;
    }

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

// Variables
const endPoint = 'https://sofka-challenge-back.herokuapp.com/';

// Get data
let getShuttles = () => fetch(endPoint + 'ShuttleVehicles')
    .then(response => response.json())
    .then(json => {
        shuttles = json;
        printInfo();
    });


// Print data on UI
function printInfo() {
    const table = document.getElementById('shuttle')
    shuttles.forEach(vehicle => {
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
            shuttles.push(data);
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

// Run app
getShuttles()
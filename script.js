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
        </tr>
        `;
    });
}

// Run app
getShuttles()
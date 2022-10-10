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


export class TruckRoute {

    constructor(origin, destination, price){
        this.origin = origin
        this.destination = destination
        this.price = price
    }

}

export class Client {

    constructor(name, lastName, email){
        this.name = name
        this.lastName = lastName
        this.email = email
    }

}

export class Order {

    constructor(id, mail, origin, destination, space, price){
        this.id = id
        this.clientmail = mail
        this.origin = origin
        this.destination = destination
        this.space = space
        this.price = price
    }

}


const express = require("express")
const app = express()
const { faker } = require('@faker-js/faker');


app.use(express.json())
app.use(express.urlencoded({extended: true}))



class User {
    constructor(){
        this.password = faker.internet.password()
        this.email = faker.internet.email()
        this.phoneNumber = faker.phone.number()
        this.lastName = faker.name.firstName()
        this.firstName = faker.name.lastName()
        this._id = faker.datatype.number()
    }
}

class Company {
    constructor(){
        this._id = faker.datatype.number()
        this.name = faker.company.companyName()
        this.address = [
            {
                street: faker.address.street(),
                city: faker.address.city(),
                state: faker.address.state(),
                zipCode: faker.address.zipCode(),
                country: faker.address.country()
            }
        ]
    }
}

app.get("/api/users/new", (req, res) =>{
    const newUser = new User()
    res.json(newUser)
})

app.get("/api/companies/new", (req, res) =>{
    const newCompany = new Company()
    res.json(newCompany)
})

app.get("/api/user/company", (req, res) =>{
    const newUser = new User()
    const newCompany = new Company()
    res.json({newUser, newCompany})
})

app.listen(8000, () => console.log("Listening to port :8000"))
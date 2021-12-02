var schema = buildSchema(`
type Employee{
    _id: ID!
    Name: String!
    EmployeeNo: Int!
    email: String!
    HolidaysUsed: Int!
    Mobileno: String!
    cityName: String!
    Aadharno: String!
}

type {
    Name: String!
    EmployeeNo: Int!
    email: String!
    HolidaysUsed: Int!
    Mobileno: String!
    cityName: String!
    Aadharno: String!
}

input CreateEmployee{
    Name: String!
    EmployeeNo: Int!
    email: String!
    HolidaysUsed: Int!
    Mobileno: String!
    cityName: String!
    Aadharno: String!
}
input DeleteEmployee{
    _id: ID
}
type RootQuery{
    emp: [Employee!]!
    oneemp: Employee
}
type RootMutation{
    createEmp(createEmployee: CreateEmployee): Employee
    deleteEmp(deleteEmployee: DeleteEmployee): Employee
}
schema{
    query: RootQuery
    mutation: RootMutation
}
`)

var rootValue = {
    oneemp: (args) => {
        return Emp
            .findById(args._id)
            .then(emp => {
                return emp.map(emp => {
                    return {...emp._doc, _id: emp.id}
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    emp: () => {
        return Emp
            .find()
            .then(emp => {
                return emp.map(emp => {
                    return {...emp._doc, _id: emp.id}
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createEmp: (args) => {
        const newEmp = new Emp({
            Name: args.createEmployee.Name,
            EmployeeNo: args.createEmployee.EmployeeNo,
            email: args.createEmployee.email,
            HolidaysUsed: args.createEmployee.HolidaysUsed,
            Mobileno: args.createEmployee.Mobileno,
            cityName: args.createEmployee.cityName,
            Aadharno: args.createEmployee.Aadharno
        });
        return newEmp
            .save()
            .then(result => {
                console.log(result);
                return{...result._doc}
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteEmployee: (args) => {
        return Emp
            .findByIdAndDelete(args._id)
            .then(emp => {
                return {...emp._doc, _id: emp.id}
            })
            .catch(err => {
                console.log(err);
            })
        }
}
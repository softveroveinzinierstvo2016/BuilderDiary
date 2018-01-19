import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Employees = new Mongo.Collection('employee');

if(Meteor.isServer) {
    Meteor.publish('employees', function usersPublication() {
        return Employees.find();
    });
    Meteor.methods({
        'employee.insert': function(employee){
            console.log(employee);
            var id=Employees.insert({
                name: employee.name,
                surname: employee.surname,
                login: employee.login,
                password: employee.password,
                role: employee.role,
                sumAssistant: employee.sumAssistant
            });
            console.log(id);
            return id;
        }

        // other methods

    })
}

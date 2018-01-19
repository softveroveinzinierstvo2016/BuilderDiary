import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Employees = new Mongo.Collection('employee');

if(Meteor.isServer) {
    Meteor.publish('employees', function usersPublication() {
        return Employees.find({},{fields: {login: 0, password: 0}});
    });
    Meteor.methods({
        'employees.loggUser': function(loggName, password) {
            if (!loggName || !password)
                return null;
            let user = Employees.findOne({login: loggName, password: password});
            if (!user)
                return null;
            if (user.login != loggName || user.password != password)
                return null;
            user.id = user._id;
            user.login = '';
            user.password = '';
            return user;
        },
        'employee.insert': function(employee){
            var id=Employees.insert({
                name: employee.name,
                surname: employee.surname,
                login: employee.login,
                password: employee.password,
                role: employee.role,
                sumAssistant: employee.sumAssistant
            });
            return id;
        }

        // other methods

    })
}

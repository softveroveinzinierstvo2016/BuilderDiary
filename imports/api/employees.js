import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Employees = new Mongo.Collection('employee');

if(Meteor.isServer) {
    Meteor.publish('employees', function usersPublication() {
        return Employees.find();
    });
    Meteor.methods({
        'employees.loggUser': function(loggName, password){
            if(!loggName || !password)
                return null;
            let user = Employees.findOne({login: loggName, password: password});
            if(!user)
                return null;
            user.id = user._id;
            return user;
        }
    });
}

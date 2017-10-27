import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Employees = new Mongo.Collection('employee');

if(Meteor.isServer) {
    Meteor.publish('employees', function usersPublication() {
        return Employees.find();
    });
}

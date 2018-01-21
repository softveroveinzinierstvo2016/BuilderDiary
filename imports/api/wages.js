import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Wage } from '../../models/Wage';

export const Wages = new Mongo.Collection('wage');

if(Meteor.isServer) {
    Meteor.publish('wages', function usersPublication() {
        return Wages.find();
    });
    Meteor.methods({
        'wages.add'(employeeId, sum, day){
            Wages.insert({
                idEmployee: employeeId,
                sum: sum,
                period: day
            });
        }
    });
}
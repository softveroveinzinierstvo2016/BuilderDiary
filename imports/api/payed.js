import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Payeds = new Mongo.Collection('payed');

if(Meteor.isServer) {
    Meteor.publish('payeds', function usersPublication() {
        return Payeds.find();
    });
    Meteor.methods({
        'payeds.pay': function(employeeId, sum, notice){
            let date = new Date();
            date.setHours(0,0,0,0);
            Payeds.insert({
                employeeId: employeeId,
                sum: sum,
                notice: notice,
                date: date
            });
        }
    });
}
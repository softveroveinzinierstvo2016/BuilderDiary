import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Payed } from '../../models/Payed';

export const Payeds = new Mongo.Collection('payed');

if(Meteor.isServer) {
    Meteor.publish('payeds', function usersPublication() {
        return Payeds.find();
    });
    Meteor.methods({
        /**
         * @param {string} employeeId
         * @param {number} sum
         * @param {string} notice
         */
        'payeds.pay': function(employeeId, sum, notice){
            let date = new Date();
            date.setHours(0,0,0,0);
            let pay = new Payed();
            pay.employeeId = employeeId;
            pay.sum = sum;
            pay.notice = notice;
            pay.date = date;
            Payeds.insert(pay);
        }
    });
}
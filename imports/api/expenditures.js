import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Expenditure } from '../../models/Expenditure';

export const Expenditures = new Mongo.Collection('expenditure');

if(Meteor.isServer) {
     Meteor.publish('expenditures', function usersPublication() {
        return Expenditures.find();
    });
    Meteor.methods({
        /**
         * insert new expenditure
         * @param {Expenditure} expenditure
         */
        'expenditure.insert'(expenditure){
          
            Expenditures.insert({
                employeeID: expenditure.employeeID,
                projectID: expenditure.projectID,
                attendanceID: expenditure.attendaceID,
                sum: expenditure.sum,
                reason: expenditure.reason
            });
        }
    });
}
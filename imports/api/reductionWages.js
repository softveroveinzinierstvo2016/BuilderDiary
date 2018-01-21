import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ReductionWage } from '../../models/ReductionWage';

export const ReductionWages = new Mongo.Collection('reductionWage');

if(Meteor.isServer) {
    Meteor.publish('reductionWages', function usersPublication() {
        return ReductionWages.find();
    });

    Meteor.methods({
        'reductionWages.insert'(wage){
            let dateN = new Date();
            dateN.setHours(0,0,0,0);
            ReductionWages.insert({
                idEmployee:wage.idEmployee,
                reason:wage.reason,
                sum:wage.sum,
                date: dateN
        });
    }
    })
}

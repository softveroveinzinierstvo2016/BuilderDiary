import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {ReductionWage} from '../../models/ReductionWage';

export const ReductionWages = new Mongo.Collection('reductionWage');

if(Meteor.isServer) {
    Meteor.publish('reductionWages', function usersPublication() {
        return ReductionWages.find();
    });
    
}

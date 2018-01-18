import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Wages = new Mongo.Collection('wage');

if(Meteor.isServer) {
    Meteor.publish('wages', function usersPublication() {
        return Wages.find();
    });
}
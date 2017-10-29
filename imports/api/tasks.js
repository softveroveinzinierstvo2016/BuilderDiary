import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('task');

if(Meteor.isServer) {
    Meteor.publish('tasks', function usersPublication() {
        return Tasks.find();
    });
}
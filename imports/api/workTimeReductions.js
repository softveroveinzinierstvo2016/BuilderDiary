import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const WorkTimeReductions = new Mongo.Collection('workTimeReduction');
if(Meteor.isServer) {
    Meteor.publish('workTimeReductions', function usersPublication() {
        return WorkTimeReductions.find();
    });
    Meteor.methods({
     'workTimeReduction.insert' : function(workTimeReduction){
         //check(project,Projects);
        console.log(workTimeReduction);
    var id=WorkTimeReductions.insert({
       date:workTimeReduction.date,
       cause: workTimeReduction.cause,
       from: workTimeReduction.from,
       to: workTimeReduction.to
    });
    console.log(id);
    return id;

       }

    })
}
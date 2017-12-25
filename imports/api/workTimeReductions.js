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
            console.log(workTimeReduction);
            var id = WorkTimeReductions.insert({
                day : workTimeReduction.day,
                reason : workTimeReduction.reason,
                timeStart : workTimeReduction.timeStart,
                timeEnd : workTimeReduction.timeEnd,
                projectId: workTimeReduction.projectId
            });
            console.log(id);
            return id;
        }
    })
}
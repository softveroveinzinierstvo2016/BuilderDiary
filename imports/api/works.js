import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Tasks } from './tasks'; 
import { Attendances } from './attendances'; 

export const Works = new Mongo.Collection('work');

if(Meteor.isServer) {
    Meteor.publish('works', function usersPublication() {
        return Works.find();
    });
    Meteor.methods({
        'works.insert-update'(work){
            let found = Works.findOne({
                idProject: work.idProject,
                idAttendance: work.idAttendance,
                idTask: work.idTask
            });
            let task = Tasks.findOne({_id: work.idTask});
            if(task == null)
                return;
            let attendance = Attendances.findOne({_id: work.idAttendance, approved: false});
            if(attendance == null)
                return;
            let  pay = work.worked * task.payment;
            if(found == null){
                Works.insert({
                    idAttendance: work.idAttendance,
                    idProject: work.idProject,
                    idTask: work.idTask,
                    worked: work.worked,
                    payment: pay
                });
                return;
            }
            Works.update(found._id,{
                $set: {
                    worked: work.worked,
                    payment: pay
                }
            });
    }
    });
};
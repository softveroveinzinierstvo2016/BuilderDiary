import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Tasks } from './tasks'; 
import { Attendances } from './attendances';
import { Employees } from './employees';

import { Work } from '../../models/Work';
import { Attendance } from '../../models/Attendance';
import { Employee } from '../../models/Employee';

export const Works = new Mongo.Collection('work');

if(Meteor.isServer) {
    Meteor.publish('works', function usersPublication() {
        return Works.find();
    });
    Meteor.methods({
        /**
         * 
         * @param {Work} work 
         */
        'works.insert-update'(work){
            let found = Works.findOne({
                idProject: work.idProject,
                idAttendance: work.idAttendance,
                idTask: work.idTask
            });
            let task = Tasks.findOne({_id: work.idTask});
            if(task == null)
                return;
            /**
             * @type {Attendance}
             */
            let attendance = Attendances.findOne({_id: work.idAttendance, approved: false});
            if(attendance == null)
                return;
            /**
             * @type {Employee}
             */
            let empl = Employees.findOne({_id: attendance.idEmployee});
            if(empl == null)
                return;
            let pay = work.worked * task.payment;
            if(empl.role === 2)
                pay = work.worked * empl.sumAssistant;           
            
            if(found == null){
                Works.insert({
                    idAttendance: work.idAttendance,
                    idProject: work.idProject,
                    idTask: work.idTask,
                    worked: work.worked,
                    payment: pay,
                    approved: false
                });
                return;
            }
            Works.update(found._id,{
                $set: {
                    worked: work.worked,
                    payment: pay
                }
            });
    },
    'works.approve'(id){
        Works.update(id,{
            $set: {
                approved: true
            }
        });
    }
    });
};
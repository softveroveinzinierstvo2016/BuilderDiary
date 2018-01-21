import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Attendance } from '../../models/Attendance';

export const Attendances = new Mongo.Collection('attendance');

if(Meteor.isServer) {
    Meteor.publish('attendances', function usersPublication() {
        return Attendances.find();
    });
    Meteor.methods({
        /**
         * insert or update attendace for today
         * @param {Attendance} attendance
         */
       'attendance.insert-update'(attendance){
        let date = new Date();
        // we dont want time
        date.setHours(0,0,0,0);
        let found = Attendances.findOne({
                day: date, 
                idEmployee: attendance.idEmployee,
                idProject: attendance.idProject 
            });
        if(found == null) {
            Attendances.insert({
                idEmployee: attendance.idEmployee,
                idProject: attendance.idProject,
                day: date,
                arrivalTime: attendance.arrivalTime,
                departureTime: attendance.departureTime,
                approved: false
            });
            return;
        }
        Attendances.update(found._id, {
            $set: {
            arrivalTime: attendance.arrivalTime,
            departureTime: attendance.departureTime
            }
        });
       },
       /**
        * update attendace approval  
        * @param {Attendance} attendance
         */
        'attendance.update-approval'(attendance){
            if(attendance == null)
                return;
            /**
             * @type {Attendance}
             */
            let found = Attendances.findOne({
                day: attendance.day, 
                idEmployee: attendance.idEmployee, 
                idProject: attendance.idProject
            });
            Attendances.update(found._id, {    
                    $set: { 
                        approved: true    
                    }   
                }
            );
        }
    });
}
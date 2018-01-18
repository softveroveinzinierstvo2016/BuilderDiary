import { Attendances } from '../api/attendances';
import { Attendance } from '../../models/Attendance';

import { Meteor } from 'meteor/meteor';

export class AttendanceService {
    constructor() {
        Meteor.subscribe('attendances');
    }   
    /**
     * add (update if exists) today's attendance for current project
     * @param {string} userId
     * @param {string} projectId
     * @param {string} arrivalTime
     * @param {string} departureTime
     * @return {boolean}
     */
    add(
        userId,
        projectId,
        arrivalTime,
        departureTime
    ){
        let back = new Attendance();
        back.idEmployee = userId;
        back.idProject = projectId;
        back.arrivalTime = arrivalTime;
        back.departureTime = departureTime;
        let result = Meteor.call('attendance.insert-update', back);
        return result;
    };
    /**
     * get attendance record
     * @param {string} attendanceId
     * @return {Attendance}
     */
    getAttendance(attendanceId){
        return Attendances.findOne({_id: attendanceId});
    }
    /**
     * get today's arrival time on project for employee
     * @param {string} useId id of employee
     * @param {string} projectId id of project
     * @return {string} 
     */
    getArrivalTime(useId, projectId){
        let date = new Date();
        date.setHours(0,0,0,0);
        let answer = Attendances.findOne({idEmployee: useId, idProject: projectId, day: date});
        if(answer == null)
            return '--:--';
        return answer.arrivalTime;
    }
    /**
     * get today's departure time on project for employee
     * @param {string} useId id of employee
     * @param {string} projectId id of project
     * @return {string} 
     */
    getDepartureTime(useId, projectId){
        let date = new Date();
        date.setHours(0,0,0,0);
        let answer = Attendances.findOne({idEmployee: useId, idProject: projectId, day: date});
        if(answer == null)
            return '--:--';
        return answer.departureTime;
    }
    /**
     * get approved attendancies on project for employee
     * @param {string} userId 
     * @param {string} projectId
     * @return {Attendance[]}
     */
    getApprovedOnProjectWithUser(userId, projectId){
        return Attendances.find({idEmployee: userId, idProject: projectId, approved: true});
    }
    /**
     * get attaendance from today
     * @param {string} userId 
     * @param {string} projectId
     * @return {Attendance}
     */
    getToday(userId, projectId){
        let today = new Date();
        today.setHours(0,0,0,0);
        let answer = Attendances.findOne({idEmployee: userId, idProject: projectId, day: today});
        return answer;
    }
    /**
     * get attaendance from today 
     * @param {string} projectId
     * @return {Attendance[]}
     */
    getTodayOnProject(projectId){
        let today = new Date();
        today.setHours(0,0,0,0);
        let answer = Attendances.find({idProject: projectId, day: today});
        return answer;
    }
     /**
     * return true iff editing is locked
     * @param {string} userId 
     * @param {string} projectId
     * @return {boolean}
     */
    isLocked(userId, projectId) {
        let attendanceToday = this.getToday(userId, projectId);
        if(attendanceToday == null)
            return false;
        return attendanceToday.approved;
    }
    /**
     * 
     * @param {string} userId
     * @param {Date} startDay 
     * @param {Date} endDay 
     * @return {Attendance[]}
     */
    getIdRecordsBetween(userId, startDay, endDay){
        startDay.setHours(0,0,0,0);
        endDay.setHours(0,0,0,0);
        return Attendances.find({idEmployee: userId, day:{$gte: startDay, $lte: endDay}});
    }
    /**
     * @param {string} projectId
     * @param {Date} startDay 
     * @param {Date} endDay 
     * @return {Attendance[]}
     */
    getAllIdRecordsOnProjectBetween(projectId,startDay, endDay){
        startDay.setHours(0,0,0,0);
        endDay.setHours(0,0,0,0);
        return Attendances.find({idProject: projectId ,day:{$gte: startDay, $lte: endDay}});
    }
}
import { Works } from '../api/works';
import { Work } from '../../models/Work';

import { Meteor } from 'meteor/meteor';

import { AttendanceService } from '../services/attendanceService';

let attendanceService = new AttendanceService();
export class WorkService {
    constructor() {
        Meteor.subscribe('works');
    }
    /**
     * logg today's work (returns true on send to server)
     * !! today's attendace must exist
     * @param {string} userId 
     * @param {string} projectId 
     * @param {string} taskId 
     * @param {number} worked
     * @return {boolean} 
     */
    loggWork(userId, projectId, taskId, worked){
        let attendanceToday = attendanceService.getToday(userId, projectId);
        if(attendanceToday == null)
            return false;
        let back = new Work();
        back.idAttendance = attendanceToday._id || attendanceToday.id;
        back.idTask = taskId;
        back.idProject = projectId;
        back.worked = worked;
        Meteor.call('works.insert-update', back);
        return true;
    }
    /**
     * return true iff editing is locked
     * @param {string} userId 
     * @param {string} projectId
     * @return {boolean}
     */
    isLocked(userId, projectId) {
        let attendanceToday = attendanceService.getToday(userId, projectId);
        if(attendanceToday == null)
            return false;
        return attendanceToday.approved;
    }
    /**
     * get sum of approved worked project hours on task for employee
     * @param {string} userId 
     * @param {string} projectId 
     * @param {string} taskId 
     * @return {number}
     */
    getWorkedOnTask(userId, projectId, taskId){
        let approvedAttendanceIds = attendanceService.getApprovedOnProjectWithUser(userId, projectId)
                                                     .map((elemnt)=>{
                                                         return elemnt._id;
                                                     });
        let result = 0;
        Works.find({idProject: projectId, idTask: taskId, idAttendance:{$in: approvedAttendanceIds} })
                         .map((element)=>{
                             return element.worked;
                         }).forEach((worked)=>{
                            result = result + worked;
                         });
        return result;    
    }
    /**
     * get worked project hours today on task for employee
     * @param {string} userId 
     * @param {string} projectId 
     * @param {string} taskId
     * @return {number}
     */
    getWorkedOnTaskToday(userId, projectId, taskId){
        let attendanceToday = attendanceService.getToday(userId, projectId);
        if(attendanceToday == null)
            return 0;
        let result = Works.findOne({idProject: projectId, idTask: taskId, idAttendance: attendanceToday._id});
        return result ? result.worked : 0;
    }
    /**
     * get payed for today on task for employee
     * @param {string} userId 
     * @param {string} projectId 
     * @param {string} taskId
     * @return {number}
     */
    getPayedOnTaskToday(userId, projectId, taskId){
        let attendanceToday = attendanceService.getToday(userId, projectId);
        if(attendanceToday == null)
            return 0;
        let result = Works.findOne({idProject: projectId, idTask: taskId, idAttendance: attendanceToday._id});
        return result? result.payment : 0;
    }
    /**
     * get payed sum from approved works on task of project for employee
     * @param {string} userId 
     * @param {string} projectId 
     * @param {string} taskId 
     * @return {number}
     */
    getPayedOnTask(userId, projectId, taskId){
        let approvedAttendanceIds = attendanceService.getApprovedOnProjectWithUser(userId, projectId)
                                                     .map((elemnt)=>{
                                                         return elemnt._id;
                                                     });
        let result = 0;
        Works.find({idProject: projectId, idTask: taskId, idAttendance:{$in: approvedAttendanceIds} })
                         .map((element)=>{
                             return element.payment;
                         }).forEach((payed)=>{
                            result = result + payed;
                         });
        return result;    
    }
    /**
     * get all works from attendanceIds
     * @param {string[]} attendanceIds
     * @return {Work[]}
     */
    getWorksWithAttendanceIds(attendanceIds){
        return Works.find({idAttendance: {$in: attendanceIds}});
    }
    /**
     * get all works from attendanceIds
     * @param {string[]} attendanceIds
     * @param {string} projectId
     * @return {Work[]}
     */
    getWorksWithAttendanceIdsOnProject(attendanceIds,projectId){
        return Works.find({idAttendance: {$in: attendanceIds}, idProject: projectId});
    }

}
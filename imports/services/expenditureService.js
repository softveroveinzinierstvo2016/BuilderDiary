import { Expenditure } from '../../models/Expenditure';
import { Expenditures } from '../api/expenditures';

import { Meteor } from 'meteor/meteor';

import {AttendanceService} from './attendanceService';
import {UserService} from './userService';
import {ProjectService} from './projectService';

import { Attendance } from '../../models/Attendance';
import { EarningOverviewRecord } from  '../../models/EarningOverviewRecord';
import { RecordLine } from '../../models/RecordLine';
import EarningOverview from '../ui/EarningOverview';

let attendanceService = new AttendanceService();
let projectService = new ProjectService();
let userService = new UserService();

export class ExpenditureService {
    constructor() { 
        Meteor.subscribe('expenditures');
     }
     todayIsLocked() {
         let userId = userService.getLoggedId();
         let projectId = projectService.getChoosedProjectId();
         return attendanceService.isLocked(userId, projectId);
     }
     /**
      * return todays expenditures for logged employee and selected project
      * @return {Expenditure[]}
      */
     getTodayOnProjectForEmployee() {
        let employeeId = userService.getLoggedId();
        let projectId = projectService.getChoosedProjectId();
        let attendaceToday  = attendanceService.getToday(employeeId, projectId);
        if(attendaceToday == null)
            return [];
        let attendaceId = attendaceToday._id || attendaceToday.id;
        return Expenditures.find({employeeID: employeeId,projectID: projectId, attendanceID: attendaceId});
     }
     /**
      * 
      * @param {string} employeeId 
      * @param {string[]} projectIds 
      * @param {string[]} attendanceIds 
      * @returns {Expenditure[]}
      */
     getExpenditures(employeeId, projectIds, attendanceIds){
        return Expenditures.find({employeeID: employeeId,projectID: {$in: projectIds}, attendanceID: {$in: attendanceIds}});
     }
     /**
      * return project name connected to this expenditure list
      * @return {string}
      */
     getProjectName(){
        return projectService.getChoosedProject().nameOfProject;
     }
     /**
      * add new expenditure for logged employee and selected project
      * @param {number} sum
      * @param {string} reason
      * @return {boolean}
      */
      addExpenditure(sum, reason) {
        let userId = userService.getLoggedId();
        let projectId = projectService.getChoosedProjectId();
        let attendaceToday = attendanceService.getToday(userId, projectId);
         if(attendaceToday == null)
            return false;
        let newExpenditure = new Expenditure();
        newExpenditure.employeeID = userId;
        newExpenditure.projectID = projectId;
        newExpenditure.attendaceID = attendaceToday._id || attendaceToday.id;
        newExpenditure.sum = sum;
        newExpenditure.reason = reason;
        Meteor.call('expenditure.insert',newExpenditure);
        return true;
      }
     getExpenditureRecords(employeeId){
        /**
         * @type {string}
         */
        let attendanceIds = new Array();
        /**
         * @type {RecordLine[]}
         */
        let recordLines = new Array();
        attendanceService.getAttendanceByUser(employeeId).forEach((element)=>{
            attendanceId.add(element._id);
        });

        Expenditures.find({employeeID: employeeId, attendaceID:{$in: attendanceIds}}).forEach((element)=>{
            let recordLine = new RecordLine();
            recordLine.id = element._id;
            recordLine.name = element.reason;
            recordLine.value = element.sum;
            recordLines.push(recordLine);
        });
        return recordLines; 
    }
}
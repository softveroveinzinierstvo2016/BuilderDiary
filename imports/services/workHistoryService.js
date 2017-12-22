import { Meteor } from 'meteor/meteor';

import { AttendanceService } from '../services/attendanceService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { WorkService } from '../services/workService';
import { ProjectService } from '../services/projectService';
import { WorkHistoryRecord } from '../../models/WorkHistoryRecord';

let attendanceService = new AttendanceService();
let userService = new UserService();
let taskService = new TaskService();
let workService = new WorkService();
let projectService = new ProjectService();

let typeOfPeriod = 0;
let startDay = new Date();
let endDay = new Date();
export class WorkHistoryService{
    constructor() {
        let dayOfWeek = startDay.getDay() -1;
        let dayOfMonth = startDay.getDate() - dayOfWeek;
        startDay.setDate(dayOfMonth);
        endDay.setDate(dayOfMonth + 6);
    }
    /**
     * get records of works for logged user in choosed period
     *@return {WorkHistoryRecord[]}
     */
    getWorkHistoy(){
        let userId = userService.getLoggedId();
        let attendanceIds = new Array();
        let attendanceMap = new Map();
        let taskMap = new Map();
        let projectMap = new Map();
        attendanceService.getIdRecordsBetween(userId, startDay, endDay).forEach((element)=>{
            attendanceIds.push(element._id);
            attendanceMap.set(element._id, element.day);
        });
        taskService.getTasks().forEach((element)=>{
            taskMap.set(element.id,element);
        });
        projectService.getProjects().forEach((element)=>{
            projectMap.set(element.id,element.nameOfProject);
        });
        let workHistoryRecords = new Array();
        workService.getWorksWithAttendanceIds(attendanceIds).forEach((element)=>{
            let record = new WorkHistoryRecord();
            record.work = element;
            record.day = attendanceMap.get(element.idAttendance);
            record.projectName = projectMap.get(element.idProject);
            record.taskName = taskMap.get(element.idTask).nameOfTask;
            record.unit = taskMap.get(element.idTask).unit;
            workHistoryRecords.push(record);
        });
        return workHistoryRecords;
    } 
    previousePeriod(){
        let firstDay = startDay.getDate();
        let lastDay = endDay.getDate();
        startDay.setDate(firstDay - 7);
        endDay.setDate(lastDay - 7);
    }
    nextPeriod(){
        let firstDay = startDay.getDate();
        let lastDay = endDay.getDate();
        startDay.setDate(firstDay + 7);
        endDay.setDate(lastDay + 7);
    }
    /**
     * @return {string}
     */
    getPeriodString(){
        return "" + startDay.getDate() + "." + startDay.getMonth() + "." + startDay.getFullYear() + 
        " - " + endDay.getDate() + "." + endDay.getMonth() + "." + endDay.getFullYear();
    }
}
import { Meteor } from 'meteor/meteor';

import { AttendanceService } from '../services/attendanceService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { WorkService } from '../services/workService';
import { ProjectService } from '../services/projectService';
import { EmployeeService } from '../services/employeeService';
import { WorkTimeReductionService } from '../services/workTimeReductionService';


import { WorkHistoryRecord } from '../../models/WorkHistoryRecord';
import { WorkRecord } from '../../models/WorkRecord';
import { Task } from '../../models/Task';
import { Attendance } from '../../models/Attendance';
import { DayRecord } from  '../../models/DayRecord';
import { TimeReductionRecord } from '../../models/TimeReductionRecord';
import { WorkTimeReduction } from '../../models/WorkTimeReduction';


let attendanceService = new AttendanceService();
let userService = new UserService();
let taskService = new TaskService();
let workService = new WorkService();
let projectService = new ProjectService();
let employeeService = new EmployeeService();
let workTimeReductionService = new WorkTimeReductionService();

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
        return "" + startDay.getDate() + "." + (startDay.getMonth() + 1) + "." + startDay.getFullYear() + 
        " - " + endDay.getDate() + "." + (endDay.getMonth() + 1) + "." + endDay.getFullYear();
    }
    /**
     * 
     * @param {string} projectId
     * @returns {WorkRecord[]}
     */
    getWorkTodayOnProject(projectId){
        let attendanceIds = new Array();
        /**
         * @type {Map<string,Attendance>}
         */
        let attendanceMap = new Map();
        /**
         * @type {Map<string,Task>}
         */
        let taskMap = new Map();
        /**
         * @type {WorkRecord[]}
         */
        let workRecords = new Array();
        attendanceService.getTodayOnProject(projectId).forEach((element)=>{
            attendanceIds.push(element._id);
            attendanceMap.set(element._id, element);
        });
        taskService.getTaskOfProjectById(projectId).forEach((task)=>{
            taskMap.set(task.id, task);
        });
        workService.getWorksWithAttendanceIdsOnProject(attendanceIds, projectId).forEach((work)=>{
            let wr = new WorkRecord();
            let at = attendanceMap.get(work.idAttendance);
            wr.id = work._id;
            wr.fullname = employeeService.getEmployeeName(at.idEmployee);
            wr.time = at.arrivalTime + ' - ' + at.departureTime;
            wr.taskname = taskMap.get(work.idTask).nameOfTask;
            wr.description = 'Odrobene ' + work.worked +' '  + taskMap.get(work.idTask).unit + ' za ' + work.payment + ' e';   
            workRecords.push(wr);
        });
        return workRecords;
    }
    /**
     * 
     * @param {string} projectId 
     */
    getWorkHistoryOnProject(projectId){
        let attendanceIds = new Array();
        /**
         * @type {Map<string,Attendance>}
         */
        let attendanceMap = new Map();
        /**
         * @type {Map<string,Task>}
         */
        let taskMap = new Map();
        /**
         * @type {Map<string,WorkTimeReduction>}
         */
        let timeReductionMap = new Map();
        /**
         * @type {Map<string,WorkRecord[]>}
         */
        let workDayRecords = new Map();
        /**
         * @type {DayRecord[]}
         */
        let dayRecords = new Array();

        attendanceService.getAllIdRecordsOnProjectBetween(projectId,startDay,endDay).forEach((element)=>{
            attendanceIds.push(element._id);
            attendanceMap.set(element._id, element);
        });
        taskService.getTaskOfProjectById(projectId).forEach((task)=>{
            taskMap.set(task.id, task);
        });
        workTimeReductionService.getWorkTimeReductionOnProject(projectId).forEach((element)=>{
            timeReductionMap.set(element.day,element);
          });
        workService.getWorksWithAttendanceIdsOnProject(attendanceIds, projectId).forEach((work)=>{
            let at = attendanceMap.get(work.idAttendance);
            let stringKey = at.day.toDateString();
            let stringKeyTR = at.day.getDate()+'.'+(at.day.getMonth() + 1)+'.'+at.day.getFullYear();
            let workRecords = workDayRecords.get(stringKey);
            if(workRecords == null){
                workRecords = new Array();
                let dr = new DayRecord();
                dr.records = workRecords;
                dr.fullDate = at.day.getDate() + '.' + (at.day.getMonth() + 1) + '.' + at.day.getFullYear();
                let tr = new TimeReductionRecord();
                let timeRed = timeReductionMap.get(stringKeyTR);
                if(timeRed == null){
                    tr.was = false;
                } else {
                    tr.was = true;
                    tr.reason = timeRed.reason;
                    tr.time = timeRed.timeStart + ' - ' + timeRed.timeEnd;
                }
                dr.timeReduction = tr;
                dayRecords.push(dr);
            }
            let wr = new WorkRecord();
            wr.id = work._id;
            wr.fullname = employeeService.getEmployeeName(at.idEmployee);
            wr.time = at.arrivalTime + ' - ' + at.departureTime;
            wr.taskname = taskMap.get(work.idTask).nameOfTask;
            wr.description = 'Odrobené ' + work.worked +' '  + taskMap.get(work.idTask).unit + ' za ' + work.payment + ' e';   
            workRecords.push(wr);
            workDayRecords.set(stringKey, workRecords);
        });
        return dayRecords;
    }
}
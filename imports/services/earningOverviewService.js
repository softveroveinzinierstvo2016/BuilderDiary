import { Meteor } from 'meteor/meteor';


import { AttendanceService } from '../services/attendanceService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { WorkService } from '../services/workService';
import { ProjectService } from '../services/projectService';
import { ExpenditureService } from '../services/expenditureService';

import { EarningOverviewRecord } from '../../models/EarningOverviewRecord';
import { Task } from '../../models/Task';
import { RecordLine } from '../../models/RecordLine'; 
import { Project } from '../../models/Project';
import { Expenditure } from '../../models/Expenditure';


let attendanceService = new AttendanceService();
let userService = new UserService();
let taskService = new TaskService();
let workService = new WorkService();
let projectService = new ProjectService();
let expenditureService = new ExpenditureService();

let typeOfPeriod = 0;
let startDay = new Date();
let endDay = new Date();

let periodSum = 0;
export class EarningOverviewService{
    constructor(){
        let dayOfWeek = startDay.getDay() -1;
        let dayOfMonth = startDay.getDate() - dayOfWeek;
        startDay.setDate(dayOfMonth);
        endDay.setDate(dayOfMonth + 6);
    }
    /**
     * get earning overview for logged user in choosed period
     * @returns {EarningOverviewRecord[]}
     */
    getEarningOverview(){
        let userId = userService.getLoggedId();
         /**
         * @type {string[]}
         */
        let attendanceIds = new Array();
         /**
         * @type {string[]}
         */
        let projectIds = new Array();
        /**
         * @type {Map<string,EarningOverviewRecord>}
         */
        let earningOverviewRecords = new Map();
        /**
         * @type {Map<string,string>}
         */
        let projectMap = new Map();
        /**
         * @type {Map<string,Map<string,Task>>}
         */
        let taskMap = new Map();

        periodSum = 0;

        attendanceService.getIdRecordsBetween(userId, startDay, endDay).forEach((element)=>{
            attendanceIds.push(element._id);
        });
        projectService.getProjects().forEach((element)=>{
            projectMap.set(element.id,element.nameOfProject);
            projectIds.push(element.id);
        });
        taskService.getTasks().forEach((element)=>{
            let tasks = taskMap.get(element.idProject);
            if(tasks == null)
                tasks = new Map();
            tasks.set(element.id, element);
            taskMap.set(element.idProject,tasks);
        });
        // get how many get payed for every worked task (cumulate sum)
        workService.getWorksWithAttendanceIds(attendanceIds).forEach((element) => {
            let record = earningOverviewRecords.get(element.idProject);
            if(record == null){
                record = new EarningOverviewRecord();
                record.line = new Array();
                record.projectName = projectMap.get(element.idProject);
            }
            let tasks = taskMap.get(element.idProject);
            let task = tasks.get(element.idTask);
            let value = 0;
            /**
             * @type {RecordLine}
             */
            let nt = null;
            if(record.tasks == null){
                record.tasks = new Map();
            }
            if(record.tasks.has(element.idTask)){
                nt = record.tasks.get(element.idTask);
                value = nt.value;
            } else {
                nt = new RecordLine();
                nt.name = task.nameOfTask;
                nt.value = 0;
                nt.id = element.idTask;
            }
             
            value = value + (element.payment);
            nt.value = value;
            record.tasks.set(element.idTask, nt);
            earningOverviewRecords.set(element.idProject,record);
        });
        // get all expenditures (every expenditure on its own)
        expenditureService.getExpenditures(userId, projectIds, attendanceIds).forEach((element)=>{
            let record = earningOverviewRecords.get(element.idProject);
            if(record == null){
                record = new EarningOverviewRecord();
                record.line = new Array();
                record.projectName = projectMap.get(element.projectID);
            }
            let recordLine = new RecordLine();
            recordLine.id = element._id;
            recordLine.name = element.reason;
            recordLine.value = element.sum;
            periodSum = periodSum + Number(recordLine.value);
            record.line.push(recordLine);
            earningOverviewRecords.set(element.idProject, record);
        });
        /**
         * @type {EarningOverviewRecord[]}
         */
        let answer = new Array();
        earningOverviewRecords.forEach((element)=>{
            if(element.tasks != null)
                element.tasks.forEach((line)=>{
                    element.line.push(line);
                    periodSum = periodSum + Number(line.value);
                });
            answer.push(element);
        });
        return answer;
    }
    /**
     * returns worked sum in selected period
     * @returns {number}
     */
    getPeriodSum(){
        return periodSum;
    }
    /**
     * returns how many have been payed
     * @returns {number}
     */
    getPayed(){
        return 0;
    }
    /**
     * returns how many need to payed
     * @returns {number}
     */
    getToPay(){
        return 0;
    }
    /**
     * return how many have beed earned
     * @returns {number}
     */
    getEarned(){
        return 0;
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
}
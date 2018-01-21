import { Meteor } from 'meteor/meteor';

import { AttendanceService } from '../services/attendanceService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { WorkService } from '../services/workService';
import { ProjectService } from '../services/projectService';
import { EmployeeService } from '../services/employeeService';
import { WorkTimeReductionService } from '../services/workTimeReductionService';
import { ExpenditureService } from '../services/expenditureService';
import { WageService } from '../services/wageService';

import { WorkHistoryRecord } from '../../models/WorkHistoryRecord';
import { WorkRecord } from '../../models/WorkRecord';
import { Task } from '../../models/Task';
import { Attendance } from '../../models/Attendance';
import { DayRecord } from  '../../models/DayRecord';
import { TimeReductionRecord } from '../../models/TimeReductionRecord';
import { WorkTimeReduction } from '../../models/WorkTimeReduction';
import { TodayRecord } from '../../models/TodayRecord';
import { TodaysRecords } from '../../models/TodayRecords';
import { Project } from '../../models/Project';
import { Expenditure } from '../../models/Expenditure';


let attendanceService = new AttendanceService();
let userService = new UserService();
let taskService = new TaskService();
let workService = new WorkService();
let projectService = new ProjectService();
let employeeService = new EmployeeService();
let workTimeReductionService = new WorkTimeReductionService();
let expenditureService = new ExpenditureService();
let wageService = new WageService();

let day = new Date();

export class TodaysRecordsService {
    constructor(){
        
    }

    getTodaysRecords(){
        let project = new Array();
        /**
         * @type {Map<string,Project>}
         */
        let projectMap = new Map();
        let attendanceIds = new Array();
        /**
         * @type {Map<string,Attendance>}
         */
        let attendanceMap = new Map();

         /**
         * @type {Map<string,WorkTimeReduction>}
         */
        let timeReductionMap = new Map();
        /**
         * @type {Map<string,TodaysRecords[]>}
         */
        let workDayRecords = new Map();
        /**
         * @type {TodayRecord[]}
         */
        let todayRecords = new Array();
        /**
         * @type {Map<string,Task>}
         */
        let taskMap = new Map();
        
        projectService.getProjects().forEach((element)=>{
            project.push(element.id); 
            projectMap.set(element.id,element);          
        });
        
        for(i=0;i<project.length;i++){
            attendanceService.getOnProjectNonApproved(project[i]).forEach((element2)=>{
                    attendanceIds.push(element2._id);
                    attendanceMap.set(element2._id, element2);
            });
            workTimeReductionService.getWorkTimeReductionOnProject(project[i]).forEach((element3)=>{
                timeReductionMap.set(element3.day,element3);
            });
        }

        taskService.getTasks().forEach((element)=>{
            taskMap.set(element.id,element);
        });

        let workHistoryRecords = new Array();
        workService.getWorksWithAttendanceIds(attendanceIds).forEach((element)=>{
            let at = attendanceMap.get(element.idAttendance);
            let stringKey = at.day.toDateString();
            let stringKeyTR = at.day.getDate()+'.'+at.day.getMonth()+'.'+at.day.getFullYear();
            let workRecords = workDayRecords.get(stringKey);
            if(workRecords == null){
                workRecords = new Array();
                let dr = new TodayRecord();
                dr.tdsRcd = workRecords;
                dr.fullDate = at.day.getDate() + '.' + (at.day.getMonth()+1) + '.' + at.day.getFullYear();
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
                todayRecords.push(dr);
            }
            let wr = new TodaysRecords();
            wr.id = element.id;
            wr.fullname = employeeService.getEmployeeName(at.idEmployee);
            let expenditures = 0;
            /*expenditureService.getExpenditures(at.idEmployee,element.idProject,element.idAttendance).forEach((element4)=>{
                expenditures+=element4.sum;
            });*/
            wr.expenditures = expenditures;
            wr.time = at.arrivalTime + ' - ' + at.departureTime;
            wr.taskname = taskMap.get(element.idTask).nameOfTask;
            wr.description = 'Odrobené ' + element.worked +' '  + taskMap.get(element.idTask).unit + ' za ' + element.payment + ' e';   
            wr.wage = element.payment;
            wr.attendance = at;
            wr.projectName = projectMap.get(at.idProject).nameOfProject;
            workRecords.push(wr);
            workDayRecords.set(stringKey, workRecords);
        });

        return todayRecords;
    }

    getApprovedRecords(){
        let project = new Array();
        /**
         * @type {Map<string,Project>}
         */
        let projectMap = new Map();
        let attendanceIds = new Array();
        /**
         * @type {Map<string,Attendance>}
         */
        let attendanceMap = new Map();

         /**
         * @type {Map<string,WorkTimeReduction>}
         */
        let timeReductionMap = new Map();
        /**
         * @type {Map<string,TodaysRecords[]>}
         */
        let workDayRecords = new Map();
        /**
         * @type {TodayRecord[]}
         */
        let todayRecords = new Array();
        /**
         * @type {Map<string,Task>}
         */
        let taskMap = new Map();
        
        projectService.getProjects().forEach((element)=>{
            project.push(element.id); 
            projectMap.set(element.id,element);          
        });
        
        for(i=0;i<project.length;i++){
            attendanceService.getTodayApprovedOnProject(project[i]).forEach((element2)=>{
                attendanceIds.push(element2._id);
                attendanceMap.set(element2._id, element2);
            });
            workTimeReductionService.getWorkTimeReductionOnProject(project[i]).forEach((element3)=>{
                timeReductionMap.set(element3.day,element3);
            });
        }

        taskService.getTasks().forEach((element)=>{
            taskMap.set(element.id,element);
        });

        let workHistoryRecords = new Array();
        workService.getWorksWithAttendanceIds(attendanceIds).forEach((element)=>{
            let at = attendanceMap.get(element.idAttendance);
            let stringKey = at.day.toDateString();
            let stringKeyTR = at.day.getDate()+'.'+at.day.getMonth()+'.'+at.day.getFullYear();
            let workRecords = workDayRecords.get(stringKey);
            if(workRecords == null){
                workRecords = new Array();
                let dr = new TodayRecord();
                dr.tdsRcd = workRecords;
                dr.fullDate = at.day.getDate() + '.' + (at.day.getMonth()+1) + '.' + at.day.getFullYear();
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
                todayRecords.push(dr);
            }
            let wr = new TodaysRecords();
            wr.id = element.id;
            wr.fullname = employeeService.getEmployeeName(at.idEmployee);
            wr.time = at.arrivalTime + ' - ' + at.departureTime;
            wr.taskname = taskMap.get(element.idTask).nameOfTask;
            wr.description = 'Odrobené ' + element.worked +' '  + taskMap.get(element.idTask).unit + ' za ' + element.payment + ' e';   
            wr.attendance = at;
            wr.projectName = projectMap.get(at.idProject).nameOfProject;
            workRecords.push(wr);
            workDayRecords.set(stringKey, workRecords);
        });

        return todayRecords;

    }
    /**
     * @param {TodaysRecords} record
     */
    approve(record){
        /**
         * @type {Work}
         */
        let id = record.attendance.id;
        if(id == null)
            id = record.attendance._id;
        let work = workService.getWork(id);
        if(!work)
            return;
        attendanceService.approveAttendance(record.attendance);
        wageService.add(record.attendance.idEmployee,record.wage,record.attendance.day);
        taskService.addWorked(work.idTask, work.worked);
        workService.approve(work._id);
    }
}
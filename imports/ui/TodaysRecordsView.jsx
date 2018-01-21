import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView';

// for data manipulation
import { ProjectService } from '../services/projectService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { TodaysRecordsService } from '../services/todaysRecordService';
import { AttendanceService } from '../services/attendanceService';
import { WorkHistoryService } from '../services/workHistoryService';

import { DayRecord } from '../../models/DayRecord';
import  { WorkRecord } from '../../models/WorkRecord.js';
import { TimeReductionRecord } from '../../models/TimeReductionRecord';
import { TodayRecord } from '../../models/TodayRecord';
import { TodaysRecords } from '../../models/TodayRecords';
import { Expenditure } from '../../models/Expenditure';

let userService = new UserService();
let projectService = new ProjectService();
let taskService = new TaskService();
let todaysRecordsService = new TodaysRecordsService();
let attendanceService = new AttendanceService();
let workHistoryService = new WorkHistoryService();

let prevName = '';
let prevTime = '';
let approved;

export default class TodaysRecordsView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);

        this.handleApproved = this.handleApproved.bind(this);
        
        approved = false;
        prevName = '';
        prevTime = '';
    }

    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }

    handleApproved(record){
        todaysRecordsService.approve(record);
        render(<TodaysRecordsView/>,document.getElementById('app'));
    }

    handleCheckbox(){
        if(approved==false){
            approved = true;
        }
        else{
            approved = false;
        }
        prevName = '';
        prevTime = '';
        render(<TodaysRecordsView/>,document.getElementById('app'));
    }

    isNewPerson(record)
    {
        if(prevName === record.fullname && prevTime === record.time){
            return false;
        }
        prevName = record.fullname;
        prevTime = record.time;
        return true;
    }
    /**
     * 
     * @param {Expenditure[]} expenditures
     */
    renderExpenditures(expenditures){
        if(!expenditures)
            return "";
        return expenditures.map((record)=>(
            <div>
                <label className="expend"> {record.reason}  {record.sum}e</label> <br/>
            </div>
        ));
    }
    /**
     * 
     * @param {TaskRec[]} tasks 
     */
    renderTasks(tasks){
        if(!tasks)
            return "";
        return tasks.map((record)=>(
        <div>
            <label className="workRecordTaskName">{record.taskname}</label> <br/>
            <label className="workRecordDescription">{record.description}</label> <br/>
        </div>
        ));
    }
    /**
     * 
     * @param {TodaysRecords[]} records 
     */
    renderRecords(records){
        return records.map((record)=>(
         <div key = {record.id} className="workRecord">
             {this.renderNameAndTime(record)}
             {this.renderExpenditures(record.expenditures)}
             {this.renderTasks(record.taskRec)}
             {this.renderButton(record)}
         </div>
        ));
     }

     renderButton(record){
        if(record.attendance.approved==true){
            return (
                <div>
                    <label className="workRecordDescription">Schválené</label> <br/>
                </div>
            );
        } else{
            return(
                <div>
                    <button key={record.id} onClick={this.handleApproved.bind(this,record)} >Schváliť </button>
                </div>
            ); 
        }        
     }

     renderNameAndTime(record){
        if(!this.isNewPerson(record))
            return '';
        return(
            <div>
                <label className="workRecordFullName">{record.fullname}</label> <br/>
                <label className="workRecordFullName">{record.projectName}</label> <br/>
                <label className="workRecordTime">{record.time}</label> <br/>
            </div>
        );
    }

    getTodaysRecords(){
        if(approved==true){
            return todaysRecordsService.getApprovedRecords().map((pr) =>(
                <div>
                    {this.renderRecords(pr.tdsRcd)}
                </div>
            ));
        }
        return todaysRecordsService.getTodaysRecords().map((pr) =>(
            <div>
                {pr.fullDate}
                {this.renderRecords(pr.tdsRcd)}
            </div>
        ));
    }

    BossView(){
        return(
            <div>
                <h1>Dnešné záznamy</h1> 
                <hr/>    
                <label class="schvalene">
                Ukáž schválené <input type="checkbox" onClick={this.handleCheckbox.bind(this)}/>
                </label>
                {this.getTodaysRecords()}
            </div>
       );
    }

    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));

        var view;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            view = this.BossView();

        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
            </div> 
        );
    }
}
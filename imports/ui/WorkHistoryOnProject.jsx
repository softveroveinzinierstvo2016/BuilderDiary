import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView';

// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';
import { WorkHistoryService } from '../services/workHistoryService';

import  { WorkRecord } from '../../models/WorkRecord.js';
import { TimeReductionRecord } from '../../models/TimeReductionRecord';
import { DayRecord } from '../../models/DayRecord';

let userService = new UserService();
let projectService = new ProjectService();
let workHistoryService = new WorkHistoryService();

let prevName = '';
let prevTime = '';

export default class WorkHistoryOnProject extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleNextPeriod = this.handleNextPeriod.bind(this);
        this.handlePreviousePeriod = this.handlePreviousePeriod.bind(this);
        this.state = {period: workHistoryService.getPeriodString()};
        prevName = '';
        prevTime = '';

    }
    handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    handleNextPeriod(){
        workHistoryService.nextPeriod();
        this.setState({period: workHistoryService.getPeriodString()});
    }
    handlePreviousePeriod(){
        workHistoryService.previousePeriod();
        this.setState({period: workHistoryService.getPeriodString()});
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
     * @param {WorkRecord} record 
     */
    renderNameAndTime(record){
        if(!this.isNewPerson(record))
            return '';
        return(
            <div>
                <label className="workRecordFullName">{record.fullname}</label> <br/>
                <label className="workRecordTime">{record.time}</label> <br/>
            </div>
        );
    }
    /**
     * @param {WorkRecord[]} records 
     */
    renderRecords(records){
       return records.map((record)=>(
        <div key = {record.id} className="workRecord">
            {this.renderNameAndTime(record)}
            <label className="workRecordTaskName">{record.taskname}</label> <br/>
            <label className="workRecordDescription">{record.description}</label> <br/>
        </div>
       ));
    }
    /**
     * 
     * @param {TimeReductionRecord} timeReduction 
     */
    renderTimeReduction(timeReduction){
        if(!timeReduction.was)
            return '';
        return (
            <div>
                <label className="timeReducitonRecord">{timeReduction.time}</label><br/>
                <label className="timeReducitonRecord">{timeReduction.reason}</label><br/>
            </div>
        );
    }
    BossView(){
        return workHistoryService.getWorkHistoryOnProject(projectService.getChoosedProjectId()).map((day)=>(
            <div>
                <label className="workRecordFullDate">{day.fullDate}</label><br/>
                {this.renderTimeReduction(day.timeReduction)}
                {this.renderRecords(day.records)}
            </div>
        ));
    }
    EmplView(){
        if(projectService.isMaster(userService.getLoggedId()))
            return this.BossView();
        return '';
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var view;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            view = this.BossView();
        else
            view = this.EmplView();
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome}>Spet na projekt</button> <br/>
                <label> Historia prac: {projectService.getChoosedProject().nameOfProject}</label>
                <hr/> 
                <div className="choosePeriod">
                    {this.state.period}<br/>
                    <button className="left" onClick={this.handlePreviousePeriod}>{String.fromCharCode(60)}{String.fromCharCode(60)}</button>
                    <button className="right" onClick={this.handleNextPeriod}>{String.fromCharCode(62)}{String.fromCharCode(62)}</button>
                </div>
                <hr/>
                {view}
            </div> 
        );
    }
}
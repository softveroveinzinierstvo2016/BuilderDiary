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

let userService = new UserService();
let projectService = new ProjectService();
let workHistoryService = new WorkHistoryService();

let prevName = '';
let prevTime = '';

export default class WorkTodayOnProject extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        prevName = '';
        prevTime = '';
    }
    handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    BossView(){
        return (<div> </div>);
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
    EmplView(){
        return workHistoryService.getWorkTodayOnProject(projectService.getChoosedProjectId()).map((record)=>(
            <div key = {record.id} className="workRecord">
                {this.renderNameAndTime(record)}
                <label className="workRecordTaskName">{record.taskname}</label> <br/>
                <label className="workRecordDescription">{record.description}</label> <br/>
            </div>
        ));
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
                <button className="nav1" onClick={this.handleGoHome}>Späť na projekt</button> <br/>
                <label> Dnešný záznam prác </label>
                <hr/>
                {projectService.getChoosedProject().nameOfProject}
                <hr/>
                {view}
            </div> 
        );
    }
}
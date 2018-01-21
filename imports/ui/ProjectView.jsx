import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import TaskView from './TaskView';
import AddExpenditure from './AddExpenditure';
import ListTaskView from './ListTaskView';
import WorkHistoryOnProject from './WorkHistoryOnProject';
import WorkTodayOnProject from  './WorkTodayOnProject';
import WorkReductionView from  './WorkReductionView';
import EditProjectView from  './EditProjectView';
import EndedProjectsView from './EndedProjectsView';

// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';
import { AttendanceService } from '../services/attendanceService';
import { EmployeeService } from '../services/employeeService';

import { Project } from '../../models/Project';

let userService = new UserService();
let projectService = new ProjectService();
let taskService = new TaskService();
let attendanceService = new AttendanceService();
let employeeService = new EmployeeService();

let timePattern = /(^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$)|(^--:--$)/
let firstPattern = /(^(([0-1][0-9])|(2[0-3])))$/
let secondPattern = /(^:[0-5][0-9]$)/
export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleAddExpenditure = this.handleAddExpenditure.bind(this);
        this.project = projectService.getChoosedProject();

        this.SetAttendace = this.SetAttendace.bind(this);
        this.arrivalTimeChange = this.arrivalTimeChange.bind(this);
        this.departureTimeChange = this.departureTimeChange.bind(this);

        this.handleMasterWorkHistory = this.handleMasterWorkHistory.bind(this);
        this.handleMasterWorkToday = this.handleMasterWorkToday.bind(this);

        this.handleHistory = this.handleHistory.bind(this);

        this.state = {
            arrivalTime: attendanceService.getArrivalTime(userService.getLoggedId(),this.project.id), 
            departureTime: attendanceService.getDepartureTime(userService.getLoggedId(),this.project.id),
            arrivalTimeConf: attendanceService.getArrivalTime(userService.getLoggedId(),this.project.id),
            departureTimeConf: attendanceService.getDepartureTime(userService.getLoggedId(),this.project.id),
            info: ''
        };
    }
    handleAddExpenditure(){
        render(<AddExpenditure/>,document.getElementById('app'));
    }
    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
    handleHistory(){
        render(<WorkHistoryOnProject/>, document.getElementById('app'));
    }

    handleEndProject(){
        projectService.setEndOfProject(this.project.id);
        document.getElementById('displayButton').disabled=true;
        document.getElementById('workReduceButton').disabled=true;
        document.getElementById('editButton').disabled=true;
        document.getElementById('endButton').disabled=true;
        render(<Home/>, document.getElementById('app'));
    }
    BossView() {
        return (
            <div className="leftRight"> 
                <h1> {this.project.nameOfProject}</h1>
                <button onClick={this.handleHistory}>História prác</button><br/>
                <label className="left"> Zadávateľ:</label><label className="right"> {this.project.sponsor}</label><br/>
                <label className="left"> Adresa:</label><label className="right"> {this.project.adress}</label><br/>
                <label className="left"> Majster:</label><label className="right"> {employeeService.getEmployeeName(this.project.idMaster)}</label><br/>
                <label className="left"> Dátum ukončenia:</label><label className="right"> {this.project.endTime}</label><br/>
                <label className="left"> Celkový rozpočet:</label><label className="right"> {this.project.budget}</label><br/>
                <label className="left"> Minuté:</label><label className="right"> {this.project.expenditure}</label><br/>
                <button id="displayButton" onClick={this.handleTasks.bind(this)}>Zobraziť úlohy</button><br/>
                <button id="workReduceButton" onClick={this.handleWorkReduction.bind(this)}>Skrátenie pracovnej doby</button><br/>
                <button id="editButton" onClick={this.handleEditProject.bind(this)}>Upraviť projekt</button><br/>
                <button id="endButton" onClick={this.handleEndProject.bind(this)}>Ukončiť projekt</button><br/>
            </div>
        );
    }
    handleTask(task) {
        taskService.chooseTask(task);
        render(<TaskView/>, document.getElementById('app'));
    }
    handleTasks(idProject) {
        projectService.chooseProject(this.project);
        render(<ListTaskView/>, document.getElementById('app'));
    }
    handleWorkReduction(idProject) {
       projectService.chooseProject(this.project);
       render(<WorkReductionView/>, document.getElementById('app'));
    }
    handleEditProject(){
        projectService.chooseProject(this.project);
        render(<EditProjectView/>, document.getElementById('app'));
    }
    renderTaskList() {
        //TODO: render missing value from GUI
        return taskService.getTaskOfProjectByIdBasedOnStatus(this.project.id).map((task) => (
            <div key={task.id}>
            <button  className="list" onClick={this.handleTask.bind(this,task)}> {task.nameOfTask} {task.payment}e/{task.unit} </button> <br/>
            </div>
        ));
    }
    handleMasterWorkHistory(){
       render(<WorkHistoryOnProject/>, document.getElementById('app'));
    }
    handleMasterWorkToday(){
        render(<WorkTodayOnProject/>, document.getElementById('app'));
    }
    arrivalTimeChange(event) {
        let res = event.target.value;
        if(res.length>5)
            return;
        if(res == ''){
            res = ":";
        }
         else
        if(firstPattern.test(res)){
            res = res + ":";
        }
        this.setState({arrivalTime: res});
    }
    departureTimeChange(event) {
        let res = event.target.value;
        if(res.length>5)
            return;
        if(res == ''){
            res = ":";
        }
        else
        if(firstPattern.test(res)){
            res = res + ":";
        }
        this.setState({departureTime: res});
    }
    SetAttendace() {
        if(!timePattern.test( this.state.arrivalTime) || !timePattern.test(this.state.departureTime)) {
            this.setState({info: 'čas musí mať formát hh:mm'});
            return;
        }
        else
            this.setState({info: ''});
        
        attendanceService.add(
            userService.getLoggedId(),
            this.project.id,
            this.state.arrivalTime,
            this.state.departureTime
        );
        this.setState({
            arrivalTimeConf: this.state.arrivalTime,
            departureTimeConf: this.state.departureTime
        });
    }
    renderMaster(){
        return (
            <div>
                <button onClick={this.handleMasterWorkToday}>Dnešný záznam prác</button>
                <button onClick={this.handleMasterWorkHistory}>História prác</button>
            </div>
        );
    }
    renderAttendance(){
        return (
            <div>
                   <label className="left"> Príchod:</label><input className="right" type="text" value={this.state.arrivalTime} onChange={this.arrivalTimeChange}/> <br/>
                   <label className="left"> Odchod: </label><input className="right" type="text" value={this.state.departureTime} onChange={this.departureTimeChange}/><br/>
                <div className="error"> {this.state.info} </div>
                <br/>
                <button onClick={this.SetAttendace}>Zaznamenať</button>
            </div>
        );
    }
    EmplView() {
        let masterView = '';
        if(projectService.isMaster(userService.getLoggedId())){
            masterView = this.renderMaster();
        }
        let attendanceView = '';
        if(!attendanceService.isLocked(userService.getLoggedId(),this.project.id))
            attendanceView = this.renderAttendance();
        return (
            <div className="leftRight">
                <h1>{this.project.nameOfProject}</h1>
                <hr/>
                <label className="blue">Majster: {employeeService.getEmployeeName(this.project.idMaster)}</label>
                <br/>
                {masterView}
                <button onClick={this.handleAddExpenditure}>Výdaje</button> <br/> <br/>
                {attendanceView}
                <br/>
                    Príchod: {this.state.arrivalTimeConf} Odchod: {this.state.departureTimeConf}
                <br/>
                {this.renderTaskList()}
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
        else
            view = this.EmplView();
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
            </div> 
        );
    }
}
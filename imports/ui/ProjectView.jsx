import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import TaskView from './TaskView';
import AddExpenditure from './AddExpenditure';

// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';
import { AttendanceService } from '../services/attendanceService';

import { Project } from '../../models/Project';

let userService = new UserService();
let projectService = new ProjectService();
let taskService = new TaskService();
let attendanceService = new AttendanceService();

let timePattern = /(^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$)|(^--:--$)/

export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleAddExpenditure = this.handleAddExpenditure.bind(this);
        this.project = projectService.getChoosedProject();

        this.SetAttendace = this.SetAttendace.bind(this);
        this.arrivalTimeChange = this.arrivalTimeChange.bind(this);
        this.departureTimeChange = this.departureTimeChange.bind(this);

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
    BossView() {
        //TODO: create view for boss
        return (
            this.project.nameOfProject
        );
    }
    handleTask(task) {
        taskService.chooseTask(task);
        render(<TaskView/>, document.getElementById('app'));
     }
    renderTaskList() {
        //TODO: render missing value from GUI
        return taskService.getTasksOfProject(this.project.id).map((task) => (
            <div key={task.id}>
            <button onClick={this.handleTask.bind(this,task)}> {task.nameOfTask} {task.payment}e/{task.unit} </button> <br/>
            </div>
        ));
    }
    arrivalTimeChange(event) {
        this.setState({arrivalTime: event.target.value});
    }
    departureTimeChange(event) {
        this.setState({departureTime: event.target.value});
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
    EmplView() {
        //TODO: add special functionality for master
        return (
            <div>
                <label>{this.project.nameOfProject}</label> <br/>
                <button onClick={this.handleAddExpenditure}>Vydaje</button> <br/>
                    Prichod: <input type="text" value={this.state.arrivalTime} onChange={this.arrivalTimeChange}/>
                    Odchod: <input type="text" value={this.state.departureTime} onChange={this.departureTimeChange}/> 
                <br/>
                {this.state.info}
                <br/>
                <button onClick={this.SetAttendace}>Zaznamenat</button>
                <br/>
                    Prichod: {this.state.arrivalTimeConf} Odchod: {this.state.departureTimeConf}
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
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
            </div> 
        );
    }
}
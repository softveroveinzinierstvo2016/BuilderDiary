import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import TaskView from './TaskView';

// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';

import { Project } from '../../models/Project';

let userService = new UserService();
let projectService = new ProjectService();
let taskService = new TaskService();
export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.project = projectService.getChoosedProject();

        this.SetAttendace = this.SetAttendace.bind(this);
        this.arrivalTimeChange = this.arrivalTimeChange.bind(this);
        this.departureTimeChange = this.departureTimeChange.bind(this);

        this.state = {arrivalTime: '--:--', departureTime: '--:--'};
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
        return taskService.getTasks().map((task) => (
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
        console.log("arrive: "+this.state.arrivalTime+ " departure: "+this.state.departureTime);
        //TODO: add this to database and display change in view
        //TODO: validate values
    }
    EmplView() {
        //TODO: add special functionality for master
        //TODO: implement button for Vydaje
        return (
            <div>
                <label>{this.project.nameOfProject}</label> <br/>
                <button>Vydaje</button> <br/>
                    Prichod: <input type="text" value={this.state.arrivalTime} onChange={this.arrivalTimeChange}/>
                    Odchod: <input type="text" value={this.state.departureTime} onChange={this.departureTimeChange}/> 
                <br/>
                <button onClick={this.SetAttendace}>Zaznamenat</button>
                <br/>
                    Prichod: --:-- Odchod: --:--
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
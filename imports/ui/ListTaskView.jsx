import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

// for navigation
import App from './App';
import AddTaskView from './AddTaskView';
import ProjectView from './ProjectView';
import EditTaskView from './EditTaskView';

// for data manipulation
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { ProjectService } from '../services/projectService';

let userService = new UserService();
let taskService = new TaskService();
let projectService = new ProjectService();

export default class ListTaskView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.project = projectService.getChoosedProject();
        this.renderStateTask=this.renderStateTask.bind(this);
        this.addTask=this.addTask.bind(this);
        }
    
    handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    handleEditTask(task) {
        taskService.chooseTask(task);
        render(<EditTaskView/>,document.getElementById('app'));
    }
    renderStateTask(expediture, payment,duration, unit){
        this.stav=expediture*payment;
        if(this.stav==NaN)
            this.stav=0;
        return (
           <div>{this.stav}/{this.duration} {this.unit}</div>
        );
    }
    renderTaskList() {
        return taskService.getTaskOfProjectById(this.project.id).map((task) => (
            <div key={task.id}>
                <label>{task.nameOfTask}</label><br/>
                Stav: {this.renderStateTask(task.expenditure,task.payment, task.duration,task.unit)} 
                Vyplatiť:0e<br/>
                Minuté:{task.expediture}<br/>
                Zákazník:0 e<br/>
                Zisk:0e<br/>
                <button onClick={this.handleEditTask.bind(this,task)}>Upraviť ulohu</button><br/>
            </div>
        ));
    }

    NavBoss() {
        //TODO: implement other functionalities for boss
        return (
        <div>
            <h1>Zoznam úloh pre projekt</h1><br/>
           <button onClick={this.addTask}>Pridať úlohu</button><br/>
           {this.renderTaskList()}
        </div>
        );
    }
   addTask(){
         taskService.setProjectId(this.project.id);
         render(<AddTaskView/>, document.getElementById('app')); 
    }
   
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var nav;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            nav = this.NavBoss();
        return (
            <div className="container">
            <button className="nav1" onClick={this.handleGoHome} >Späť</button> <br/>
               {nav}
            </div> 
        );
    }
}// JavaScript Document

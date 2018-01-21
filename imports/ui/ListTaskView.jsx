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
        this.addTask=this.addTask.bind(this);
     
        }
    
    handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    handleEditTask(task) {
        taskService.chooseTask(task);
        render(<EditTaskView/>,document.getElementById('app'));
    }
 
    renderTaskList() {
        return taskService.getTaskOfProjectById(this.project.id).map((task) => (
        <div key={task.id} >
        <div className="taskName">
         <label className="displayName">{task.nameOfTask}</label><br/>
        </div>
        <div  className="displayTask">
           <label className="left">Stav:</label><label className="right"> {task.worked}/{task.duration} {task.unit}</label><br/>
           <label className="left">Vyplatiť:</label><label className="right">{task.sum}e</label><br/>
           <label className="left"> Minuté:</label><label className="right">{task.expenditure}e</label><br/>
           <label className="left"> Zákazník:</label><label className="right">{task.payment_boss}e</label><br/>
           <label className="leftProfit"> Zisk:</label><label className="rightProfit">{taskService.getProfitOfTask(task)}e</label><br/>
            <button onClick={this.handleEditTask.bind(this,task)}>Upraviť úlohu</button><br/>
        </div>
        </div>
        ));
    }

    NavBoss() {
        //TODO: implement other functionalities for boss
        return (
        <div>
            <h1>Zoznam úloh pre projekt {this.project.nameOfProject}</h1><br/>
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

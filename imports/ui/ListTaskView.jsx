import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

// for navigation
import App from './App';
import AddTaskView from './AddTaskView';
import Home from './Home';


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
        
        
        }
    
  handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
    renderTaskList() {
        //TODO: render missing value from GUI
        //TODO: ako sa prid8vaju metody v gui
        return taskService.getTaskOfProjectById(this.project.id).map((task) => (
            <div key={task.id}>
            <label>{task.nameOfTask}</label>
            Stav:<label value="{this.taskService.getStateOfTask(expediture,payment)}"/> /{task.duration} {task.unit}
            Vyplatiť:0e
            Minuté:{task.expediture}
            Zákazník:0 e
            Zisk:
            </div>
        ));
    }

    NavBoss() {
        //TODO: implement other functionalities for boss
        return (
        <div>
            <label>Zoznam úloh pre projekt</label><br/>
           <button onClick={this.handleaddTask.bind(this)} />Pridať úlohu<br/>
           {this.renderTaskList()}
        </div>
        );
    }
    handleaddTask(){
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
            <button onClick={this.handleGoHome} >Domov</button> <br/>
               {nav}
            </div> 
        );
    }
}// JavaScript Document

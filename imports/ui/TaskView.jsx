import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView';

// for data manipulation
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { WorkService } from '../services/workService'; 

let userService = new UserService();
let taskService = new TaskService();
let workService = new WorkService();

export default class TaskView extends Component {
    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.workedTodayOnChange = this.workedTodayOnChange.bind(this);
        this.handleLoggWork = this.handleLoggWork.bind(this);
        this.task = taskService.getChoosedTask();
        this.state = {
            info: '',
            taskName: this.task.nameOfTask,
            workedToday: workService.getWorkedOnTaskToday(userService.getLoggedId(),this.task.idProject,this.task.id),
            paymentToday: workService.getPayedOnTaskToday(userService.getLoggedId(),this.task.idProject,this.task.id),
            unit: this.task.unit,
            worked: workService.getWorkedOnTask(userService.getLoggedId(),this.task.idProject,this.task.id),
            payment: workService.getPayedOnTask(userService.getLoggedId(),this.task.idProject,this.task.id)
        };
    }
    handleGoBack() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    workedTodayOnChange(event) {
        this.setState({workedToday: event.target.value});
    }
    handleLoggWork(){
        let answer = workService.loggWork(userService.getLoggedId(),this.task.idProject,this.task.id,this.state.workedToday);
        if(!answer) {
            this.setState({info: 'Najprv si zapíš príchod'});
            return;
        } else
            this.setState({info: ''});

        result = this.state.workedToday * this.task.payment;
        this.setState({paymentToday: result});
    }
    BossView() {
        //TODO: implement view iff needed
        return(<div> sef </div> );
    }
    EmplView() {
        var viewWorked = <label>{this.state.workedToday}</label>;
        var confirmButton;
        if(!workService.isLocked(userService.getLoggedId(),this.task.idProject)){
            viewWorked = <input type="text" value={this.state.workedToday} onChange={this.workedTodayOnChange}/>;
            confirmButton = (
                <div>
                    <button onClick={this.handleLoggWork}> Potvrdiť zmenu </button> <br/>
                    {this.state.info} 
                </div>
            );
        }
        return(
            <div>
                <label>{this.state.taskName}</label><br/>
                <label>Odrobil som: </label> {viewWorked} <label>{this.state.unit}</label> <br/>
                <label>Dnešný zárobok: </label> <label >{this.state.paymentToday} e</label> <br/>
                {confirmButton}
                <label>Celkovo odrobené: </label> <label>{this.state.worked} {this.state.unit}</label> <br/>
                <label>Zárobok: </label> <label>{this.state.payment} e</label>
            </div>
        );
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        let view;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            view = this.BossView();
        else
            view = this.EmplView();
        return (
            <div className="container">
                <button onClick={this.handleGoBack} >Projekt</button> <br/>
                {view}
            </div> 
        );
    }
}
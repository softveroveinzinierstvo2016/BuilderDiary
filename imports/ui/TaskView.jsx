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
let numberPattern = /^(()|[0]|([1-9]([0-9])*))$/
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
        let val = event.target.value;
        if(!numberPattern.test(val))
            return;
        this.setState({workedToday: val});
    }
    handleLoggWork(){
        if(this.state.workedToday === '')
            this.setState({workedToday: 0});
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
            viewWorked = <input className="right2input" type="text" value={this.state.workedToday} onChange={this.workedTodayOnChange}/>;
            confirmButton = (
                <div>
                    <button onClick={this.handleLoggWork}> Potvrdiť zmenu </button> <br/>
                    {this.state.info} 
                </div>
            );
        }
        return(
            <div className="leftRight">
                <h1>{this.state.taskName}</h1>
                <label className="left">Odrobil som: </label> <label className="right">{viewWorked} {this.state.unit}</label> <br/>
                <label className="left">Dnešný zárobok: </label> <label className="right" >{this.state.paymentToday} e</label> <br/>
                {confirmButton}
                <label className="left">Celkovo odrobené: </label> <label className="right">{this.state.worked} {this.state.unit}</label> <br/>
                <label className="left">Zárobok: </label> <label className="right">{this.state.payment} e</label>
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
                <button className="nav1" onClick={this.handleGoBack} >Projekt</button> <br/>
                {view}
            </div> 
        );
    }
}
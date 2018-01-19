import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import WorkHistory from './WorkHistory';

// for data manipulation
import { UserService } from '../services/userService';
import { WorkService } from '../services/workService'; 

let userService = new UserService();
let workService = new WorkService();

export default class EditWorkView extends Component {
    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.workedOnChange = this.workedOnChange.bind(this);
        this.handleEditWork = this.handleEditWork.bind(this);
        this.task = workService.getEditingTask();
        this.state = {
            info: '',
            taskName: this.task.nameOfTask,
            worked: workService.getWorkedOnEditing(),
            payment: workService.getPayedOnEditing(),
            unit: this.task.unit,
        };
    }
    handleGoBack() {
        render(<WorkHistory/>,document.getElementById('app'));
    }
    workedOnChange(event) {
        this.setState({worked: event.target.value});
    }
    handleEditWork(){
        let answer = workService.editWork(this.state.worked);
        result = this.state.worked * this.task.payment;
        this.setState({payment: result});
    }
    EmplView() {
        var viewWorked = <label>{this.state.worked}</label>;
        var confirmButton;
        if(!workService.isLockedWork()){
            viewWorked = <input className="right2input" type="text" value={this.state.worked} onChange={this.workedOnChange}/>;
            confirmButton = (
                <div>
                    <button onClick={this.handleEditWork}> Potvrdiť zmenu </button> <br/>
                    {this.state.info} 
                </div>
            );
        }
        return(
            <div className="leftRight">
                <h1>{this.state.taskName}</h1>
                <label className="left">Odrobil som: </label> <label className="right">{viewWorked} {this.state.unit}</label> <br/>
                <label className="left">Zárobok: </label> <label className="right" >{this.state.payment} e</label> <br/>
                {confirmButton}
            </div>
        );
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        let view;
        const isBoss = userService.isLoggedBoss();
        if(!isBoss)
           view = this.EmplView();
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoBack}>Späť</button> <br/>
                {view}
            </div> 
        );
    }
}
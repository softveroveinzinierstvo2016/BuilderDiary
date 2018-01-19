import React, { Component } from 'react';

import { render } from 'react-dom';

import Home from './Home';
import App from './App';
import EmployeesView from './EmployeesView';

import { EmployeeService } from '../services/employeeService';

let employeeService = new EmployeeService();

export default class AddEmployeeView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state = {name:'', surname:'', loginNew:'', passwordNew:'', assistant: false};

        this.nameChange = this.nameChange.bind(this);
        this.surnameChange = this.surnameChange.bind(this);
        this.loginNewChange = this.loginNewChange.bind(this);
        this.passwordNewChange = this.passwordNewChange.bind(this);
        this.assistantChange = this.assistantChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.add = this.add.bind(this);
    }

    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }

    handleBack() {
        render(<EmployeesView/>,document.getElementById('app'));
    }

    nameChange(event) {
        this.setState({name: event.target.value});
    }

    surnameChange(event) {
        this.setState({surname: event.target.value});
    }

    loginNewChange(event) {
        this.setState({loginNew: event.target.value});
    }

    passwordNewChange(event) {
        this.setState({passwordNew: event.target.value});
    }

    assistantChange(event) {
        //this.setState({assistant: event.target.value});
        if (true === document.getElementById("assistCheckBox").checked){
            this.setState({assistant: true})
        } else {
            this.setState({assistant: false})
        }
    }

    add(){
        employeeService.rememberThisEmoployee(
            this.state.name,
            this.state.surname,
            this.state.loginNew,
            this.state.passwordNew,
            this.state.assistant
        )
        render(<AddTaskView/>, document.getElementById('app'));
    }

    BossView(){
        // for adding employees there should be ONLY BossView
        return(
            <div>
                <h1>Pridanie zamestnanca</h1>
                <div className="leftRight">
                    <label className="left">Meno:</label><input className="right" type="text" value={this.state.name} onChange={this.nameChange}/><br/>
                    <label className="left">Priezvisko:</label><input className="right" type="text" value={this.state.surname} onChange={this.surnameChange}/><br/>
                    <label className="left">Login:</label><input className="right" type="text" value={this.state.loginNew} onChange={this.loginNewChange}/><br/>
                    <label className="left">Heslo:</label><input className="right" type="password" value={this.state.passwordNew} onChange={this.passwordNewChange}/><br/>
                    <label className="left">Je pomocník:</label><input id="assistCheckBox" className="right" type="checkbox" value={this.state.assistant} onChange={this.assistantChange}/><br/>

                </div>
                <br/>
                <button onClick={this.add} >Pridať zamestnanca</button>
            </div>
        );
    }

    render() {
        var view = this.BossView();
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <button className="nav1" onClick={this.handleBack} >Späť</button> <br/>
                {view}
            </div>
        );
    }


}
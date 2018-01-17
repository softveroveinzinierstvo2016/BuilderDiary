import React, { Component } from 'react';

import { render } from 'react-dom';

// Nav
import Home from './Home';
import App from './App';

import { EmployeeService } from '../services/employeeService';

import { Employee } from '../../models/Employee';

let employeeService = new EmployeeService();

// Todo: Dorobit cele view
export default class EmployeeDetailView extends Component {

    constructor(props) {
        super(props);
        this.employee = employeeService.getChosenEmployee();
        this.handleGoHome = this.handleGoHome.bind(this);
    }

    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }

    bossView(){
        return(
        <div>
            <label>Meno: </label> <label>{this.employee.name}</label> <br/>
            <label>Priezvisko: </label> <label>{this.employee.surname}</label> <br/>
            <label>Login: </label> <label>{this.employee.login}</label> <br/>
            <label>Sum: </label> <label>{this.employee.sumAssistant}</label> <br/>
        </div>
        );
    }



    render() {
        var view;

        view = this.bossView();
        return(
            <div className="container">
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
            </div>
        );
    }

}
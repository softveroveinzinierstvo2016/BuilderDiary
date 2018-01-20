import React, { Component } from 'react';

import { render } from 'react-dom';

// Nav
import App from './App';
import EmployeesView from './EmployeesView';

import { EmployeeService } from '../services/employeeService';

import { Employee } from '../../models/Employee';

let employeeService = new EmployeeService();

export default class EmployeeDetailView extends Component {

    constructor(props) {
        super(props);
        this.employee = employeeService.getChosenEmployee();
        this.handleGoHome = this.handleGoHome.bind(this);
    }

    handleGoHome() {
        render(<EmployeesView/>,document.getElementById('app'));
    }
    handleAddWageDeduction(){
        // tu prepni na pridavanie zrazok
    }
    bossView(){
        return(
        <div>
            <button onClick={this.handleGoBack}></button> <br/>
            <h1>{employeeService.getEmployeeName(this.employee.id)}</h1>
            <button onClick={this.handleAddWageDeduction}>Pridať zrážky</button><br/>
        </div>
        );
    }
    render() {
        var view;

        view = this.bossView();
        return(
            <div className="container">
                <button onClick={this.handleGoHome} >Späť na zamestnancov</button> <br/>
                {view}
            </div>
        );
    }

}
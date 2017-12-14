import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';
import EmployeeDetailView from './EmployeeDetailView';



import { EmployeeService } from '../services/employeeService';

let employeeService = new EmployeeService();

export default class EmployeesView extends Component {

    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        //this.handleEmployee = this.handleEmployee.bind(this);
    }

    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }

    handleEmployee(employee) {
        employeeService.chooseEmployee(employee);
        render(<EmployeeDetailView/>, document.getElementById('app'));
    }
    renderEmployees() {
        return employeeService.getEmployees().map((employee) => (
                <button key={employee.id} onClick={this.handleEmployee.bind(this,employee)}>{employee.login} ({employee.name} {employee.surname})</button>
        ));
    }

    render() {
        return(
            <div className="container">
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                {this.renderEmployees()}
            </div>
        );
    }
}
import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';
import EmployeeDetailView from './EmployeeDetailView';
import EmployerPayView from './EmployerPayView';
import AddEmployeeView from './AddEmployeeView';
import AttendanceEmployeeView from './AttendanceEmployeeView';

import { EmployeeService } from '../services/employeeService';
import { PayedService } from '../services/payedService';
import { Attendance } from '../../models/Attendance';

let employeeService = new EmployeeService();
let payedService = new PayedService();

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
    handleAttendance(employee){
         employeeService.chooseEmployee(employee);
         render(<AttendanceEmployeeView/>, document.getElementById('app'));
    }
    handleFinance(employee){
        payedService.setEmployee(employee);
        render(<EmployerPayView/>, document.getElementById('app'));
    }
    handleAddEmpl(){
        render(<AddEmployeeView/>, document.getElementById('app'));
    }
    renderEmployees() {
        return employeeService.getEmployees().map((employee) => (
            <div>
                <button className="list" key={employee.id} onClick={this.handleEmployee.bind(this,employee)}>{employee.name + ' ' + employee.surname}</button>
                <br/>
                <div className="leftRight">
                    <button className="left"  onClick={this.handleAttendance.bind(this, employee)}>Dochádzka</button>
                    <button className="right" onClick={this.handleFinance.bind(this, employee)}>Vyplatiť</button>
                </div>
                <br/>
            </div>
        ));
    }

    render() {
        return(
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                <button onClick={this.handleAddEmpl}>Pridať zamestnanca</button> <br/>
                {this.renderEmployees()}
            </div>
        );
    }
}
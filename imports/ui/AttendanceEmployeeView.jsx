import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';
import EmployeesView from './EmployeesView';

import { Attendance } from '../../models/Attendance';
import { EmployeeService } from '../services/employeeService';
import { WorkHistoryService } from '../services/workHistoryService';
import { AttendanceService } from '../services/attendanceService';
import { ProjectService } from '../services/projectService';

let employeeService = new EmployeeService();
let workHistoryService = new WorkHistoryService();
let attendanceService= new AttendanceService();
let projectService= new ProjectService();

let prevName = '';
let prevTime = '';

export default class AttendanceEmployeeView extends Component {

    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleNextPeriod = this.handleNextPeriod.bind(this);
        this.handlePreviousePeriod = this.handlePreviousePeriod.bind(this);

        this.employee=employeeService.getChosenEmployee();
        this.state = {period: workHistoryService.getPeriodString()};
        prevName = '';
        prevTime = '';
    }
    handleGoHome() {
        render(<EmployeesView/>,document.getElementById('app'));
    }

    handleAttendance(employee){
         employeeService.chooseEmployee(employee);
         render(<AttendanceEmployeeView/>, document.getElementById('app'));
    }
    handleNextPeriod(){
        workHistoryService.nextPeriod();
        prevName = '';
        prevTime = '';
        this.setState({period: workHistoryService.getPeriodString()});
    }
    handlePreviousePeriod(){
        workHistoryService.previousePeriod();
        prevName = '';
        prevTime = '';
        this.setState({period: workHistoryService.getPeriodString()});
    }
    renderBetween(attendance){
        if(workHistoryService.isBetween(attendance.day)){
            return(
                <div className="attendanceRecord">
                 <label className="attendanceRecordDayAttendance">{attendanceService.getDayString(attendance)}</label><br/>   
                <label className="attendanceRecordProjectName">{projectService.getProjectNameById(attendance.idProject)}</label><br/>
                <label className="attendanceRecordTime">{attendance.arrivalTime}-{attendance.departureTime}</label><br/>
                 </div>
            );
        }
    }
    renderAttendance() {
        return attendanceService.getEmployeeAttendance(this.employee.id).map((attendance) => (
            <div key={attendance.id}>
             {this.renderBetween(attendance)}
            </div>
        ));
    }

    render() {
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome}>Späť</button> <br/>
                <label>{employeeService.getEmployeeName(this.employee.id)}-dochádzka</label>
                <hr/> 
                <div className="choosePeriod">
                    {this.state.period}<br/>
                    <button className="left" onClick={this.handlePreviousePeriod}>{String.fromCharCode(60)}{String.fromCharCode(60)}</button>
                    <button className="right" onClick={this.handleNextPeriod}>{String.fromCharCode(62)}{String.fromCharCode(62)}</button>
                </div>
                <hr/>
                {this.renderAttendance()}
            </div> 
        );
    }
}
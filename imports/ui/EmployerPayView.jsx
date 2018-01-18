import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';
import EmployeesView from './EmployeesView';

import { EmployeeService } from '../services/employeeService';
import { PayedService } from '../services/payedService';

let employeeService = new EmployeeService();
let payedService = new PayedService();

export default class EmployeerPayView extends Component {

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.pay = this.pay.bind(this);
        this.employee = payedService.getEmployee();

        this.state = { sum: 0, notice: "mesacna vyplata"};

        this.sumOnChange = this.sumOnChange.bind(this);
        this.noticeOnChange = this.noticeOnChange.bind(this);

    }
    handleGoBack() {
        render(<EmployeesView/>,document.getElementById('app'));
    }
    sumOnChange(event) {
        this.setState({sum: event.target.value});
    }
    noticeOnChange(event) {
        this.setState({notice: event.target.value});
    }
    pay(){
        payedService.pay(this.employee.id, this.state.sum, this.state.notice);
        this.setState({sum: 0, notice: "mesacna vyplata"});
    }
    renderContent() {
        return (
            <div>
                <h1> {this.employee.name + ' ' + this.employee.surname} </h1>
                <div className="leftRight">
                    <label className = "left">Suma</label> <input className="right" type="text" value={this.state.sum} onChange={this.sumOnChange}></input> <br/>
                    <label className = "left">Poznamka</label> <input className = "right" type = "text" value = {this.state.notice} onChange={this.noticeOnChange}></input> <br/>
                </div>
                <button onClick={this.pay}> Vyplat </button>
            </div>
        );
    }
    render() {
        return(
            <div className="container">
                <button onClick={this.handleGoBack} >Späť</button> <br/>
                {this.renderContent()}
            </div>
        );
    }
}
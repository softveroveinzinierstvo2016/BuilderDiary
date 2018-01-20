import React, { Component } from 'react';

import { render } from 'react-dom';

// Nav
import App from './App';
import EmployeeDetailView from './EmployeeDetailView';

import { EmployeeService } from '../services/employeeService';
import { ReductionWagesService } from '../services/reductionWagesService';

import { Employee } from '../../models/Employee';

let employeeService = new EmployeeService();
let reductionWagesService= new ReductionWagesService();

export default class AddReductionWageView extends Component {

    constructor(props) {
        super(props);
        this.employee = employeeService.getChosenEmployee();
        this.handleGoHome = this.handleGoHome.bind(this);
        this.state={
            reason:'',
            sum:''
        }
        this.sumChange=this.sumChange.bind(this);
        this.reasonChange=this.reasonChange.bind(this);
        this.handleAddWageDeduction=this.handleAddWageDeduction.bind(this);
    
    }
    sumChange(event) {
        // this.setState({name: event.target.value});
         this.setState({sum: event.target.value});
     }
 
     reasonChange(event) {
         this.setState({reason: event.target.value});
     }
    
    handleGoHome() {
        render(<EmployeeDetailView/>,document.getElementById('app'));
    }
    handleAddWageDeduction(){
        reductionWagesService.setWagesDeduction(this.employee.id, this.state.reason,this.state.sum);
        render(<EmployeeDetailView/>,document.getElementById('app'));
    }

    bossView(){
        return(
        <div>
            <button onClick={this.handleGoBack}></button> <br/>
            <h1>Zrážka zo mzdy</h1>
        <div className="leftRight">
            
            <label className="left">Zamestanec:</label><label className="right">{employeeService.getEmployeeName(this.employee.id)}</label><br/>
            <label className="left">Dôvod:</label><input className="right" type="text" value={this.state.reason} onChange={this.reasonChange}/><br/>
            <label className="left">Suma:</label><input className="right" type="text" value={this.state.sum} onChange={this.sumChange}/><br/>       
            <button onClick={this.handleAddWageDeduction}>Pridať</button><br/>
        </div>
        </div>
        );
    }
    render() {
        var view;

        view = this.bossView();
        return(
            <div className="container">
                <button onClick={this.handleGoHome} >Späť</button> <br/>
                {view}
            </div>
        );
    }
}
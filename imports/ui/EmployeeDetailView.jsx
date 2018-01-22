import React, { Component } from 'react';

import { render } from 'react-dom';

// Nav
import App from './App';
import EmployeesView from './EmployeesView';
import AddReductionWageView from  './AddReductionWageView';
import { EmployeeService } from '../services/employeeService';
import { ExpenditureService } from '../services/expenditureService';
import { EarningOverviewService } from '../services/earningOverviewService';
import { ReductionWagesService } from '../services/reductionWagesService';

import { Employee } from '../../models/Employee';

let employeeService = new EmployeeService();
let expenditureService = new ExpenditureService();
let earningOverviewService = new EarningOverviewService();
let reductionWagesService = new ReductionWagesService();

export default class EmployeeDetailView extends Component {

    constructor(props) {
        super(props);
        this.employee = employeeService.getChosenEmployee();
        this.handleAddWageDeduction = this.handleAddWageDeduction.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleGoBack() {
        render(<EmployeesView/>,document.getElementById('app'));
    }
    handleAddWageDeduction(){
        // tu prepni na pridavanie zrazok
        render(<AddReductionWageView/>,document.getElementById('app'));
    }
    handlePromotion(){
        employeeService.promoteChoosenEmployee();
    }
    renderExpenditures(){
        return expenditureService.getExpenditureRecords(this.employee.id).map((record)=>(
            <div key={record.id}>
            <label className="left">{this.dateString(record.date)}</label><br/>
            <div className="expendEmplView">
            <label className="left">{record.name}</label><label className="right">{record.value}</label><br/>
            </div>
            </div>
        ));
    }
    /**
     * 
     * @param {Date} date 
     */
    dateString(date){
        if(!date)
            return "";
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    renderWageDeduction(){
        return reductionWagesService.getReductions(this.employee.id).map((record)=>(
            <div key={record.id}>
                <label className="left">{this.dateString(record.date)}</label><br/>                
                <div  className="wage">
                <label className="left">{record.reason}</label><label className="right">-{record.sum}</label> <br/>
                </div>
            </div>
        ));
    }
    bossView(){
        let promoteView = '';
        if(employeeService.isAssistant())
            promoteView = (
                <div>
                    <button onClick={this.handlePromotion}>Povýšiť zamestnanca</button>
                    <br/>
                </div>
            );
        return(
        <div>
            <h1>{employeeService.getEmployeeName(this.employee.id)}</h1>
            {promoteView}
            <button onClick={this.handleAddWageDeduction}>Pridať zrážky</button><br/>
            <label>Zrážky zo mzdy</label><br/>
            <hr/>
            <div className = "leftRight">
                {this.renderWageDeduction()}
            </div>
            <hr/>
            <label>Výdavky</label><br/>
            <hr/>
            <div className ="leftRight">
                {this.renderExpenditures()}
            </div>
            <hr/>
            <div className="leftRight">
                <label className="leftBl">Celkom</label> <label className="rightBl">{earningOverviewService.getEarnedForEmployee(this.employee.id)}e</label><br/>
                <label className="leftYe">Vyplatené</label> <label className="rightYe">{earningOverviewService.getPayedForEmployee(this.employee.id)}e</label><br/>
                <label className="leftBl">Ostáva vyplatiť</label> <label className="rightBl">{earningOverviewService.getToPayForEmployee(this.employee.id)}e</label>
            </div>
        </div>
        );
    }
    render() {
        var view;

        view = this.bossView();
        return(
            <div className="container">
                <button className="nav1" onClick={this.handleGoBack} >Späť na zamestnancov</button> <br/>
                {view}
            </div>
        );
    }

}
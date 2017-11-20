import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';

// for data manipulation
import { UserService } from '../services/userService';
import { WorkHistoryService } from '../services/workHistoryService';
let userService = new UserService();
let workHistoryService = new WorkHistoryService();

export default class WorkHistory extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleNextPeriod = this.handleNextPeriod.bind(this);
        this.handlePreviousePeriod = this.handlePreviousePeriod.bind(this);
        this.state = {period: workHistoryService.getPeriodString()};
    }
    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
    handleNextPeriod(){
        workHistoryService.nextPeriod();
        this.setState({period: workHistoryService.getPeriodString()});
    }
    handlePreviousePeriod(){
        workHistoryService.previousePeriod();
        this.setState({period: workHistoryService.getPeriodString()});
    }
    renderWorkHistory(){
        return workHistoryService.getWorkHistoy().map((record)=>(
            <div key={record.work._id}>
                {record.day.getDate()}.{record.day.getMonth()}.{record.day.getFullYear()}
                <br/>
                {record.projectName}
                <br/>
                {record.taskName}: {record.work.worked}{record.unit}{" "}{record.work.payed}e
            </div>
        ));
    }
    render() {
        //TODO: implement view
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        return (
            <div className="container">
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                <div>
                    <button onClick={this.handlePreviousePeriod}>{String.fromCharCode(60)}{String.fromCharCode(60)}</button>
                    {this.state.period}
                    <button onClick={this.handleNextPeriod}>{String.fromCharCode(62)}{String.fromCharCode(62)}</button>
                </div>
                <br/>
                <div>
                    {this.renderWorkHistory()}
                </div>
            </div> 
        );
    }
}
import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import EditWorkView from './EditWorkView';

// models
import {Work} from '../../models/Work';

// for data manipulation
import { UserService } from '../services/userService';
import { WorkHistoryService } from '../services/workHistoryService';
import { WorkService} from '../services/workService';
let userService = new UserService();
let workHistoryService = new WorkHistoryService();
let workService = new WorkService();

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
    /**
     * 
     * @param {Work} work 
     */
    handleEditTask(work){
        workService.prepareToEdit(work);
        render(<EditWorkView/>, document.getElementById('app'));
    }
    /**
     * 
     * @param {Work} work 
     */
    renderIfNotApproved(work){
        if(work.approved == true)
            return;
        return <button key={work._id} onClick={this.handleEditTask.bind(this, work)}>Nebola schválená (Upraviť)</button>;
    }
    renderWorkHistory(){
        return workHistoryService.getWorkHistoy().map((record)=>(
            <div key={record.work._id}>
                <div className="dayField">
                    {record.day.getDate()}.{record.day.getMonth()+1}.{record.day.getFullYear()}
                    <br/>
                    <div className="projectField">
                        {record.projectName}
                        <br/>
                            {this.renderIfNotApproved(record.work)}
                        <div className="taskField">
                            {record.taskName}: {record.work.worked}{record.unit}{" "}{record.work.payment}e
                        </div>
                    </div>
                </div>
            </div>
        ));
    }
    render() {
        //TODO: implement view
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        return (
            <div className="container">
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                <div className="choosePeriod">
                    {this.state.period}<br/>
                    <button className="left" onClick={this.handlePreviousePeriod}>{String.fromCharCode(60)}{String.fromCharCode(60)}</button>
                    <button className="right" onClick={this.handleNextPeriod}>{String.fromCharCode(62)}{String.fromCharCode(62)}</button>
                </div>
                <br/>
                <div>
                    {this.renderWorkHistory()}
                </div>
            </div> 
        );
    }
}
import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView'

import { UserService } from '../services/userService';
import { WorkTimeReductionService } from '../services/workTimeReductionService';
import { ProjectService } from '../services/projectService';

let userService = new UserService();
let workTimeReductionService= new WorkTimeReductionService();
let projectService = new ProjectService();

let timePattern = /(^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$)/

export default class WorkReductionView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        let today = new Date();
        let dateString = today.getDate()+'.'+today.getMonth()+'.'+today.getFullYear();
        this.state = {info: '',date: dateString, cause:'', from:'--:--', to:'--:--'};
        this.dateChange = this.dateChange.bind(this);
        this.causeChange = this.causeChange.bind(this);
        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
        this.add=this.add.bind(this);
       
    }
     handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
    }

    dateChange(event) {
        this.setState({date: event.target.value});
    }

    causeChange(event) {
        this.setState({cause: event.target.value});
    }
    fromChange(event) {
       this.setState({from: event.target.value});
    }
    toChange(event) {
        this.setState({to: event.target.value});
    }
    BossView(){
        return(
            <div className="leftRight">
                <label className="left">Dátum:</label><input className="right" type="text" value={this.state.date} onChange={this.dateChange}/><br/>
                <label className="left">Dôvod:</label><input className="right" type="text" value={this.state.cause} onChange={this.causeChange}/><br/>
                <label className="left">Nepracovalo sa</label> <br/>
                <label className="left">Od:</label><input className="right" type="text" value={this.state.from} onChange={this.fromChange}/><br/>
                <label className="left">Do:</label><input className="right" type="text" value={this.state.to} onChange={this.toChange}/><br/>
                <button onClick={this.add}>Pridat</button><br/>
            </div>
        );

    }
    add(){
        if(!timePattern.test(this.state.from) || !timePattern.test(this.state.to)){
            this.setState({info: 'čas musí mať formát hh:mm'});
            return;
        }
        else
            this.setState({info: ''});
        
            workTimeReductionService.rememberThisWorkTimeReduction(
                projectService.getChoosedProjectId(),
                this.state.date,
                this.state.cause,
                this.state.from,
                this.state.to
        );
        render(<ProjectView/>,document.getElementById('app'));
    }
        render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var view;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            view = this.BossView();
        return (
            <div className="container">
                <button onClick={this.handleGoHome} >Späť</button> <br/>
                <h1>Skrátenie pracovnej doby</h1>
                <hr/>
                {view}
                <div className="error"> {this.state.info} </div>
            </div> 
        );
    }
}
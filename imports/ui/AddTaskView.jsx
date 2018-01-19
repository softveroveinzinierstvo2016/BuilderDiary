import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import AddTaskView from './AddTaskView';

import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';
import { UserService } from '../services/userService';

let projectService = new ProjectService();
let taskService = new TaskService();
let userService = new UserService();
export default class AddProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.defaultType = 0;
        this.typeN = this.defaultType;
        this.typeM = 1;
        this.type = [
            "odborna",
            "pomocna"
        ]
        this.state = {name:'', duration:'', payment:'', unit:'', sumBoss:'',type: this.type[this.typeN]};

        this.nameChange = this.nameChange.bind(this);
        this.durationChange = this.durationChange.bind(this);
        this.paymentChange = this.paymentChange.bind(this);
        this.unitChange = this.unitChange.bind(this);
        this.sumBossChange = this.sumBossChange.bind(this);
        this.switchType = this.switchType.bind(this);
        this.add = this.add.bind(this);
       
    }
    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
    renderTaskById() {
        return taskService.getTaskOfActualProjectById().map((task) => (
            <div>
            <label key={task.id}>{task.nameOfTask} </label> <label key={task.id}>{task.duration} </label> <label key={task.id}>{task.unit} </label><label key={task.id}>{task.payment} </label>  <label key={task.id}>{task.payment_boss} </label><br/>
            </div>
        ));
    }
    nameChange(event) {
        this.setState({name: event.target.value});
    }
    durationChange(event) {
        this.setState({duration: event.target.value});
    }
    paymentChange(event) {
       this.setState({payment: event.target.value});
    }
    unitChange(event) {
        this.setState({unit: event.target.value});
    }
    sumBossChange(event) {
        this.setState({sumBoss: event.target.value});
    }
    switchType() {
        this.typeN++;
        if(this.typeN > this.typeM)
            this.typeM = 0;
        this.setState({type: this.type[this.typeN]});
    }
    add(){
        taskService.setProjectId();
        let help  = false;
        if(this.state.type === "pomocna")
            help = true;
        taskService.rememberThisTask(this.state.name,this.state.duration,this.state.payment,this.state.unit,this.state.sumBoss, help);
        this.setState({name: ''});
        this.setState({duration: ''});
        this.setState({payment:''});
        this.setState({unit: ''});
        this.setState({sumBoss: ''});
        this.typeN = this.defaultType;
        this.setState({type: this.type[this.typeN]});
    }
    BossView(){
        // Todo: opravit jednotka na input combobox
        return(
          <div>
           <h1>Pridanie Úlohy</h1>
           <div className="leftRight">
                <label className="left">Typ úlohy:</label><button className="right" onClick={this.switchType}>{this.state.type}</button><br/>
                <label className="left">Názov úlohy:</label><input className="right" type="text" value={this.state.name} onChange={this.nameChange}/><br/>
                <label className="left">Trvanie úlohy:</label><input className="right" type="text" value={this.state.duration} onChange={this.durationChange}/><br/>
                <label className="left">Plat:</label><input className="right" type="text" value={this.state.payment} onChange={this.paymentChange}/><br/>
                <label className="left">Jednotka:</label><input className="right" type="text" value={this.state.unit} onChange={this.unitChange}/><br/>
                <label className="left">Plat pre šéfa:</label><input className="right" type="text"value={this.state.sumBoss} onChange={this.sumBossChange}/><br/>
           </div>
           <button onClick={this.add} >Pridať úlohy</button>
          </div>

        );

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
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
                 {this.renderTaskById()}
            </div> 
        );
    }
}
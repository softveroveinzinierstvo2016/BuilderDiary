import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ListTaskView from './ListTaskView';

import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';
import { UserService } from '../services/userService';

let projectService = new ProjectService();
let taskService = new TaskService();
let userService = new UserService();
export default class EditTaskView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.task=taskService.getChoosedTask();
        this.state = {name:this.task.nameOfTask, 
            duration:this.task.duration, 
            payment:this.task.payment, 
            unit:this.task.unit, 
            sumBoss:this.task.payment_boss};
        
        this.nameChange = this.nameChange.bind(this);
        this.durationChange = this.durationChange.bind(this);
        this.paymentChange = this.paymentChange.bind(this);
        this.unitChange = this.unitChange.bind(this);
        this.sumBossChange = this.sumBossChange.bind(this);
        this.edit = this.edit.bind(this);
       
    }
     handleGoHome() {
        render(<ListTaskView/>,document.getElementById('app'));
    }
     
    nameChange(event) {
       // this.setState({name: event.target.value});
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

   
  edit(){
      taskService.setProjectId();
      taskService.rememberThisTaskEdit(this.task.id,this.state.name,this.state.duration,this.state.payment,this.state.unit,this.state.sumBoss);
      this.setState({name: ''});
       this.setState({duration: ''});
       this.setState({payment:''});
        this.setState({unit: ''});
        this.setState({sumBoss: ''});
        render(<ListTaskView/>,document.getElementById('app'));
      
      
 }
    BossView(){
        // Todo: opravit jednotka na input combobox
        return(
          <div>
           <h1>Úprava  úlohy</h1>
           <div className="leftRight">
                <label className="left">Názov úlohy:</label><input className="right" type="text" value={this.state.name} onChange={this.nameChange}/><br/>
                <label className="left">Trvanie úlohy:</label><input className="right" type="text" value={this.state.duration} onChange={this.durationChange}/><br/>
                <label className="left">Jednotka:</label><input className="right" type="text" value={this.state.unit} onChange={this.unitChange}/><br/>
                <label className="left">Plat:</label><input className="right" type="text" value={this.state.payment} onChange={this.paymentChange}/><br/>
                 <label className="left">Plat pre šéfa:</label><input className="right" type="text"value={this.state.sumBoss} onChange={this.sumBossChange}/><br/>
           </div>
           <button onClick={this.edit} >Editovať</button>
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
                <button className="nav1" onClick={this.handleGoHome} >Späť</button> <br/>
                {view}
                 
            </div> 
        );
    }
}
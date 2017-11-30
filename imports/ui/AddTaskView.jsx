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
        this.state = {name:'', duration:'', payment:'', unit:'', sumBoss:''};

        this.nameChange = this.nameChange.bind(this);
        this.durationChange = this.durationChange.bind(this);
        this.paymentChange = this.paymentChange.bind(this);
        this.unitChange = this.unitChange.bind(this);
        this.sumBossChange = this.sumBossChange.bind(this);
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

   
  add(){
      taskService.setProjectId();
      taskService.rememberThisTask(this.state.name,this.state.duration,this.state.payment,this.state.unit,this.state.sumBoss);
      this.setState({name: ''});
       this.setState({duration: ''});
       this.setState({payment:''});
        this.setState({unit: ''});
        this.setState({sumBoss: ''});

      
      
 }
    BossView(){
        // Todo: opravit jednotka na input combobox
        return(
          <div>
           <label>Pridanie Úlohy</label><br/>
           Názov úlohy:<input type="text" value={this.state.name} onChange={this.nameChange}/><br/>
           Trvanie úlohy:<input type="text" value={this.state.duration} onChange={this.durationChange}/><br/>
           Plat:<input type="text" value={this.state.payment} onChange={this.paymentChange}/><br/>
           Jednotka:<input type="text" value={this.state.unit} onChange={this.unitChange}/><br/>
           Plat pre šéfa:<input type="text"value={this.state.sumBoss} onChange={this.sumBossChange}/><br/>
           <button onClick={this.add} >Pridat ulohy</button>
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
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
                 {this.renderTaskById()}
            </div> 
        );
    }
}
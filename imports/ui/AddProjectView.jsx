import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import AddTaskView from './AddTaskView';


import { ProjectService } from '../services/projectService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';

let projectService = new ProjectService();
let userService = new UserService();
let taskService = new TaskService();
export default class AddProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state = {name:'', sponsor:'', adress:'', time:'', majster:'', budget:''};

        this.nameChange = this.nameChange.bind(this);
        this.sponsorChange = this.sponsorChange.bind(this);
        this.adressChange = this.adressChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.majsterChange = this.majsterChange.bind(this);
        this.badgetChange = this.badgetChange.bind(this);
        this.add = this.add.bind(this);
       
    }
     handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }

    nameChange(event) {
       // this.setState({name: event.target.value});
        this.setState({name: event.target.value});
    }

    sponsorChange(event) {
        this.setState({sponsor: event.target.value});
    }
    adressChange(event) {
       this.setState({adress: event.target.value});
    }
    timeChange(event) {
        this.setState({time: event.target.value});
    }
    majsterChange(event) {
        this.setState({majster: event.target.value});
    }
    badgetChange(event) {
        this.setState({badget: event.target.value});
    }
  add(){
   projectService.rememberThisProject(this.state.name,this.state.sponsor,this.state.adress,this.state.time,this.state.majster,this.state.badget);
   taskService.setProjectId();
   render(<AddTaskView/>, document.getElementById('app')); 
 }
    BossView(){
        // Todo: opravit majster na input combobox
        return(
          <div>
           <label>Pridanie projektu</label><br/>
           Názov projektu:<input type="text" value={this.state.name} onChange={this.nameChange}/><br/>
           Zadavateľ:<input type="text" value={this.state.sponsor} onChange={this.sponsorChange}/><br/>
           Adresa:<input type="text" value={this.state.adress} onChange={this.adressChange}/><br/>
           Čas ukončenia:<input type="text" value={this.state.time} onChange={this.timeChange}/><br/>
           Majster:<input type="text"value={this.state.majster} onChange={this.majsterChange}/><br/>
           Rozpočet:<input type="text" value={this.state.badget} onChange={this.badgetChange}/><br/>
           <button onClick={this.add} >Pridat ulohu</button>
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
            </div> 
        );
    }
}
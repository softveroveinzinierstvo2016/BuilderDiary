import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import AddTaskView from './AddTaskView';


import { ProjectService } from '../services/projectService';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import { EmployeeService } from '../services/employeeService';

let projectService = new ProjectService();
let userService = new UserService();
let taskService = new TaskService();
let employeeService = new EmployeeService();

export default class AddProjectView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state = {showDropDown: false, choosedDropDown: '--vyber majstra--',name:'', sponsor:'', adress:'', time:'', majster: null, budget:''};

        this.nameChange = this.nameChange.bind(this);
        this.sponsorChange = this.sponsorChange.bind(this);
        this.adressChange = this.adressChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.majsterChange = this.majsterChange.bind(this);
        this.badgetChange = this.badgetChange.bind(this);
        this.add = this.add.bind(this);

        this.toogleDropDown = this.toogleDropDown.bind(this);
       
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
        projectService.rememberThisProject(
            this.state.name,
            this.state.sponsor,
            this.state.adress,
            this.state.time,
            this.state.majster,
            this.state.badget
        );
        taskService.setProjectId();
        render(<AddTaskView/>, document.getElementById('app')); 
    }
    toogleDropDown(){
        let show = !this.state.showDropDown;
        this.setState({showDropDown: show});
    }
    dropDownChoose(item){
        let text = item.name + ' '+ item.surname;
        this.setState({choosedDropDown: text, showDropDown: false, majster: item.id | item._id});
    }
    rednerEmployees(){
        return  employeeService.getEmployees().map((employee)=>(
            <button className="dropdown-item" key= {employee.id} onClick={this.dropDownChoose.bind(this, employee)}> {employee.name} {employee.surname}</button>   
        ));
    }
    renderDropdownContent(){
        return (
            <div>
                <br/>
                <div className="dropdown-items">
                    <ul>
                        {this.rednerEmployees()}
                    </ul>
                </div>
            </div>
        );
    }
    renderDropDown(){
        let content;
        if(this.state.showDropDown){
            content = this.renderDropdownContent();
        } else {
            content = "";
        }
        return (
            <div id="dropdown" className="dropdown">
                <label className="dropdown-choosed"> {this.state.choosedDropDown}</label>
                <button className="dropdown-button" onClick={this.toogleDropDown}>vyber</button>
                {content}
            </div>
        );
    }
    BossView(){
        return(
          <div>
           <h1>Pridanie projektu</h1>
           <div className="leftRight">
                <label className="left">Názov projektu:</label><input className="right" type="text" value={this.state.name} onChange={this.nameChange}/><br/>
                <label className="left">Zadavateľ:</label><input className="right" type="text" value={this.state.sponsor} onChange={this.sponsorChange}/><br/>
                <label className="left"> Adresa:</label><input className="right" type="text" value={this.state.adress} onChange={this.adressChange}/><br/>
                <label className="left">Čas ukončenia:</label><input className="right" type="text" value={this.state.time} onChange={this.timeChange}/><br/>
{/*                <label className="left"> Majster:</label><input className="right" type="text"value={this.state.majster} onChange={this.majsterChange}/><br/>*/}
                <label className="left">Majster:</label><div className = "right">{this.renderDropDown()}</div><br/>
                <label className="left">Rozpočet:</label><input className="right" type="text" value={this.state.badget} onChange={this.badgetChange}/><br/>
           </div>
           <br/>
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
                <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
                {view}
            </div> 
        );
    }
}
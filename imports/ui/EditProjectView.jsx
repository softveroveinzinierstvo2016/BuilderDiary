import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView'

import { UserService } from '../services/userService';
import { WorkTimeReductionService } from '../services/workTimeReductionService';
import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';
import { EmployeeService } from '../services/employeeService';

let projectService = new ProjectService();
let userService = new UserService();
let taskService = new TaskService();
let employeeService = new EmployeeService();



export default class EditProjectView extends Component {
    constructor(props) {
        super(props);
        this.project = projectService.getChoosedProject();
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state = {showDropDown: false, choosedDropDown: '--vyber majstra--',
        name:this.project.nameOfProject, 
        sponsor:this.project.sponsor, 
        adress:this.project.adress, 
        time:this.project.time,
        majster: this.project.majster,
        budget:this. project.budget};

        this.nameChange = this.nameChange.bind(this);
        this.sponsorChange = this.sponsorChange.bind(this);
        this.adressChange = this.adressChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.majsterChange = this.majsterChange.bind(this);
        this.badgetChange = this.badgetChange.bind(this);
        this.edit = this.edit.bind(this);

        this.toogleDropDown = this.toogleDropDown.bind(this);
        }
    
    handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
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
    edit(){
         projectService.rememberThisProjectEdit(
             this.project.id,
             this.state.name,
             this.state.sponsor,
             this.state.adress,
             this.state.time,
             this.state.majster,
             this.state.badget
         );
         render(<ProjectView/>,document.getElementById('app'));
      
     }
     toogleDropDown(){
         let show = !this.state.showDropDown;
         this.setState({showDropDown: show});
     }
     dropDownChoose(item){
         let text = item.name + ' '+ item.surname;
         let id = item.id;
         this.setState({choosedDropDown: text, showDropDown: false, majster: id});
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
   
    NavBoss() {
        //TODO: implement other functionalities for boss
        return (
            <div>
           <h1>Úprava projektu</h1>
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
           <button onClick={this.edit} >Editovať</button>
          </div>
        );
    }
  
   
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var nav;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            nav = this.NavBoss();
        return (
            <div className="container">
            <button className="nav1" onClick={this.handleGoHome} >Späť</button> <br/>
               {nav}
            </div> 
        );
    }
}
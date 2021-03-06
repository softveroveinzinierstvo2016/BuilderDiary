import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

// for navigation
import App from './App';
import EarningOverview from './EarningOverview'; 
import WorkHistory from './WorkHistory';
import ProjectView from './ProjectView';
import AddProjectView from './AddProjectView';
import EmployeesView from './EmployeesView';
import EndedProjectsView from './EndedProjectsView';
import TodaysRecordsView from './TodaysRecordsView';


// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';

let userService = new UserService();
let projectService = new ProjectService();
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLoggOut = this.handleLoggOut.bind(this);
        this.handleEarningOverview = this.handleEarningOverview.bind(this);
        this.handleWorkHistory = this.handleWorkHistory.bind(this);
        this.handleNewProject=this.handleNewProject.bind(this);
        this.handleEmployees = this.handleEmployees.bind(this);
    }
    handleProject(project) {
       projectService.chooseProject(project);
       render(<ProjectView/>, document.getElementById('app'));
    }
    renderProjects() {
        return projectService.getNotEndedProjects().map((project) => (
            <div>
                <button className="list" key={project.id} onClick={this.handleProject.bind(this,project)}>{project.nameOfProject}</button><br/>
            </div>
        ));
    }
    handleLoggOut() {
        userService.loggOut();
        render(<App/>,document.getElementById('app'));
    }
    handleEarningOverview() {
        render(<EarningOverview/>, document.getElementById('app'));
    }
    handleWorkHistory() {
        render(<WorkHistory/>,document.getElementById('app'));
    }
    handleNewProject() {
        render(<AddProjectView/>,document.getElementById('app'));
    }
    handleEmployees(){
        render(<EmployeesView/>,document.getElementById('app'));
    }
    handleEndedProjects(){
        render(<EndedProjectsView/>,document.getElementById('app'));
    }
   handleTodaysRecords(){
       render(<TodaysRecordsView/>, document.getElementById('app'));
   }
    
    NavBoss() {
        //TODO: implement other functionalities for boss
        return (
        <div>
            <button className="nav1" onClick={this.handleLoggOut} >Odhlásiť</button> <br/>
            <button className="nav2" onClick={this.handleEndedProjects.bind(this)}>Ukončené projekty</button> 
            <button className="nav2" onClick={this.handleTodaysRecords.bind(this)}>Dnešné záznamy</button> <br/>
            <button className="nav2" onClick={this.handleEmployees}>Zamestnanci</button> 
            <button className="nav2" onClick={this.handleNewProject}>Pridať projekt</button> <br/>
        </div>
        );
    }
    NavEmpl() {
        return (
        <div>
            <button className="nav1" onClick={this.handleLoggOut}>Odhlásiť</button> <br/>
            <button className="nav1" onClick={this.handleEarningOverview}>Prehľad zárobku</button> <br/>
            <button className="nav1" onClick={this.handleWorkHistory}>História prác</button> <br/>
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
        else
            nav = this.NavEmpl();
        return (
            <div className="container">
               {nav}
                {this.renderProjects()}
            </div> 
        );
    }
}
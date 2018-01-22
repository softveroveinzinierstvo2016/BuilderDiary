import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';
import ProjectView from './ProjectView';

import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';

let userService = new UserService();
let projectService = new ProjectService();

export default class EndedProjectsView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state={profit:'0'};
    }
    handleGoHome() {
        
        render(<Home/>,document.getElementById('app'));
    }
    handleProfit(project){
        if(project.expenditure!=null)
           result=project.budget-project.expenditure;
        else
           result=project.budget;
        this.setState({profit: result});
    }
    showDetail(project){
        projectService.chooseProject(project);
        render(<ProjectView/>, document.getElementById('app'));
    }
    renderProjects() {
        return projectService.getEndedProjects().map((project) => (
         <div key={project.id}>
           <button className="endedProject" onClick={this.showDetail.bind(this,project)}>{project.nameOfProject}</button><br/>
           <table className="tableTask">
               <tr>
                 <th className="tableTaskTh">Zákazník</th>
                 <th className="tableTaskTh">Minuté</th> 
                 <th className="tableTaskTh">Zisk</th>
                </tr>
                <tr>
                 <td className="tableTaskTd">{project.budget}e</td>
                 <td className="tableTaskTd">{project.expenditure}e</td>
                 <td className="tableTaskTd">{projectService.getProjectProfit(project)}e</td>
                </tr>
            </table>
         </div>
        ));
    }

    NavBoss() {
        return (
        <div>
           
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
            <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
               {nav}
                {this.renderProjects()}
            </div> 
        );
    }

}
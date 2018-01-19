import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';

import App from './App';
import Home from './Home';

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

    renderProjects() {
        return projectService.getEndedProjects().map((project) => (
         <div key={project.id}>
           <label className="">{project.nameOfProject}</label><br/>
           <table className="table">
               <tr>
                 <th>Zakaznik</th>
                 <th>Minute</th> 
                 <th>Zisk</th>
                </tr>
                <tr>
                 <td>{project.budget}e</td>
                 <td>{project.expenditure}e</td>
                 <td>{projectService.getProjectProfit(project)}e</td>
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
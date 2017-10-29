import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView';

// for data manipulation
import { UserService } from '../services/userService';
import { ProjectService } from '../services/projectService';
import { TaskService } from '../services/taskService';

let userService = new UserService();
let taskService = new TaskService();

export default class TaskView extends Component {
    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.task = taskService.getChoosedTask();
    }
    handleGoBack() {
        render(<ProjectView/>,document.getElementById('app'));
    }
    BossView() {
        //TODO: implement view iff needed
        return(<div> sef </div> );
    }
    EmplView() {
        //TODO: implement view
        return(<div> zamestnanec </div>);
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var view;
        const isBoss = userService.isLoggedBoss();
        if(isBoss)
            view = this.BossView();
        else
            view = this.EmplView();
        return (
            <div className="container">
                <button onClick={this.handleGoBack} >Projekt</button> <br/>
                {view}
            </div> 
        );
    }
}
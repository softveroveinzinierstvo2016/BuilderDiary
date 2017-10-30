import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';

// for data manipulation
import { UserService } from '../services/userService';
let userService = new UserService();

export default class WorkHistory extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
    }
    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
   
    render() {
        //TODO: implement view
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        return (
            <div className="container">
                <button onClick={this.handleGoHome} >Domov</button> <br/>
                Historia prac
            </div> 
        );
    }
}
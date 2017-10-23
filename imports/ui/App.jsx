import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';

// for navigation
import Home from './Home';

// for data manipulation
import { UserService } from '../services/userService';
let userService = new UserService();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password: ''};

        this.nameChange = this.nameChange.bind(this);
        this.psswChange = this.psswChange.bind(this);
        this.stepIn  = this.stepIn.bind(this);
    }

    stepIn() {
        console.log("name: " + this.state.name+" password: "+this.state.password);
        if(userService.loggUser(this.state.name,this.state.password))
            render(<Home/>,document.getElementById('app'));
    }
    nameChange(event) {
        this.setState({name: event.target.value});
    }
    psswChange(event) {
        this.setState({password: event.target.value});
    }
    render() {
        return (
            <div className="container">
               <input type="text" value={this.state.name} onChange={this.nameChange}/> <br/>
               <input type="password" value={this.state.password} onChange={this.psswChange} /> <br/>  
               <button onClick={this.stepIn}>Step in</button> 
            </div> 
        );
    }
}
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';

// for navigation
import Home from './Home';

// for data manipulation
import { UserService } from '../services/userService';
let userService = new UserService();

export default class App extends Component {
    static enter(){
        render(<Home/>, document.getElementById('app'));
    }
    constructor(props) {
        super(props);
        this.state = {name: '', password: ''};

        this.nameChange = this.nameChange.bind(this);
        this.psswChange = this.psswChange.bind(this);
        this.stepIn  = this.stepIn.bind(this);
    }
    stepIn() {
        userService.loggUser(this.state.name,this.state.password);
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
                <div className="loggin">
                    <input type="text"  onChange={this.nameChange}/> <br/>
                    <input type="password" onChange={this.psswChange} /> <br/>  
                    <button onClick={this.stepIn}>Prihlásiť</button> 
                </div>
            </div> 
        );
    }
}
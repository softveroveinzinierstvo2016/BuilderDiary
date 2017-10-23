import React, { Component } from 'react';

// for data manipulation
import { UserService } from '../services/userService';
let userService = new UserService();

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {name: userService.getLoggedUserName()};
    }
    render() {
        return (
            <div className="container">
               Home <br></br>
               <label>{this.state.name}</label>
           </div> 
        );
    }
}
import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView'

import { UserService } from '../services/userService';
import { WorkTimeReductionService } from '../services/workTimeReductionService';

let userService = new UserService();
let workTimeReductionService= new WorkTimeReductionService();

export default class WorkReductionView extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome=this.handleGoHome.bind(this);
        this.state = {date:'', cause:'', from:'', to:''};

        this.dateChange = this.dateChange.bind(this);
        this.causeChange = this.causeChange.bind(this);
        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
       this.add=this.add.bind(this);
       
    }
     handleGoHome() {
        render(<ProjectView/>,document.getElementById('app'));
}

    dateChange(event) {
       // this.setState({name: event.target.value});
        this.setState({date: event.target.value});
    }

    causeChange(event) {
        this.setState({cause: event.target.value});
    }
    fromChange(event) {
       this.setState({from: event.target.value});
    }
    toChange(event) {
        this.setState({to: event.target.value});
    }
    BossView(){
        // Todo: opravit majster na input combobox
        return(
          <div>
           <label>Skrátenie pracovnej doby</label><br/>
           Dátum:<input type="text" value={this.state.date} onChange={this.dateChange}/><br/>
           Dôvod:<input type="text" value={this.state.cause} onChange={this.causeChange}/><br/>
           Nepracovalo sa <br/>
           Od:<input type="text" value={this.state.from} onChange={this.fromChange}/><br/>
           Do:<input type="text" value={this.state.to} onChange={this.toChange}/><br/>
          <button onClick={this.add}>Pridat</button><br/>
          </div>
        );

    }
    add(){
         workTimeReductionService.rememberThisWorkTimeReduction(
            this.state.date,
            this.state.cause,
            this.state.from,
            this.state.to
        );
         render(<ProjectView/>,document.getElementById('app'));
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
                <button onClick={this.handleGoHome} >Späť</button> <br/>
                {view}
            </div> 
        );
    }
}
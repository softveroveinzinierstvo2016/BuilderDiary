import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView'

// for data manipulation
import { UserService } from '../services/userService';
import { ExpenditureService } from '../services/expenditureService';

let userService = new UserService();
let expenditureService = new ExpenditureService();

let sumPattern = /^([0-9])*$/;

export default class AddExpenditure extends Component {
    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleAddExpenditure = this.handleAddExpenditure.bind(this);
        
        this.projectName = expenditureService.getProjectName();

        this.state = {
            sum: 0,
            reason: "",
            info: ""
        };
        this.sumOnChange = this.sumOnChange.bind(this);
        this.reasonOnChange = this.reasonOnChange.bind(this);
        
    }
    handleGoBack(){
        render(<ProjectView/>,document.getElementById('app'));
    }
    sumOnChange(event){
        this.setState({sum: event.target.value});
    }
    reasonOnChange(event){
        this.setState({reason: event.target.value});
    }
    handleAddExpenditure(){
        if(expenditureService.todayIsLocked()){
            this.setState("Dnes sa uz nedaju pridavat zaznamy");
            return;
        }
        if(this.state.reason == null || this.state.reason.trim() === "" || !sumPattern.test(this.state.sum))
            return;
        if(sumPattern)
        if(!expenditureService.addExpenditure(this.state.sum,this.state.reason)){
            this.setState({info: "Najprv si zapis dochadzku"});
            return;
        } else {
            this.setState({info: "", reason: "", sum: 0});
        }
    }
    renderToday(){
        return expenditureService.getTodayOnProjectForEmployee().map((element)=>(
                    <div key={element._id}>
                    <label>{element.reason}</label> <label>{element.sum}e</label> <br/>
                    </div>
                ));
    }
    view(){
        return (
            <div>
                {this.projectName} - Vydaje <br/>
                <label>Suma</label> <input type="text" value={this.state.sum} onChange={this.sumOnChange}/> <br/>
                <label>Dovod</label> <input type="text" value={this.state.reason} onChange={this.reasonOnChange}/> <br/>
                <button onClick={this.handleAddExpenditure}>Zaznamenat</button> <br/>
                {this.state.info}<br/>
                <label>Dnesne vydaje</label> <br/>
                {this.renderToday()}
            </div>
        );
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        var view;
        const isBoss = userService.isLoggedBoss();
        if(!isBoss)
            view = this.view();
        return (
            <div className="container">
                <button onClick={this.handleGoBack} >Projekt</button> <br/>
                {view}
            </div>
        )
    }
}
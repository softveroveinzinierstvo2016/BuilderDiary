import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';
import ProjectView from './ProjectView';

// for data manipulation
import { UserService } from '../services/userService';
import { ExpenditureService } from '../services/expenditureService';

let userService = new UserService();
let expenditureService = new ExpenditureService();

let numberPattern = /^(()|[0]|([1-9]([0-9])*))$/

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
        let val = event.target.value;
        if(!numberPattern.test(val))
            return;
        this.setState({sum: val});
    }
    reasonOnChange(event){
        this.setState({reason: event.target.value});
    }
    handleAddExpenditure(){
        let sum = this.state.sum;
        if(sum === '')
            sum = 0;
        if(expenditureService.todayIsLocked()){
            this.setState({info: "Dnes sa uz nedaju pridavat zaznamy"});
            return;
        }
        if(this.state.reason == null || this.state.reason.trim() === "" || !numberPattern.test(sum))
            return;
        if(!expenditureService.addExpenditure(sum,this.state.reason)){
            this.setState({info: "Najprv si zapis dochadzku"});
            return;
        } else {
            this.setState({info: "", reason: "", sum: 0});
        }
    }
    renderToday(){
        return expenditureService.getTodayOnProjectForEmployee().map((element)=>(
                    <div key={element._id}>
                        <label className="left">{element.reason}</label> <label className="right">{element.sum}e</label> <br/>
                    </div>
                ));
    }
    view(){
        return (
            <div>
                <h1>{this.projectName} - Vydaje</h1>
                <div className="leftRight">
                    <label className="left">Suma</label> <input className="right" type="text" value={this.state.sum} onChange={this.sumOnChange}/> <br/>
                    <label className="left">Dovod</label> <input className="right" type="text" value={this.state.reason} onChange={this.reasonOnChange}/><br/>
                </div>
                <br/>
                <button onClick={this.handleAddExpenditure}>Zaznamenat</button> <br/>
                <div className="error">{this.state.info}</div>
                <h1>Dnesne vydaje</h1>
                <div className="leftRight">
                    {this.renderToday()}
                </div>
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
                <button className="nav1" onClick={this.handleGoBack} >Projekt</button> <br/>
                {view}
            </div>
        )
    }
}
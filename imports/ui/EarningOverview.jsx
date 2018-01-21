import React, { Component } from 'react';

import { render } from 'react-dom';

// for navigation
import Home from './Home';
import App from './App';

// models
import { EarningOverviewRecord } from '../../models/EarningOverviewRecord';
import { Task } from '../../models/Task';
import { RecordLine } from '../../models/RecordLine';

// for data manipulation
import { UserService } from '../services/userService';
import { EarningOverviewService } from '../services/earningOverviewService';

let userService = new UserService();
let earningOverviewService = new EarningOverviewService();

export default class EarningOverview extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleNextPeriod = this.handleNextPeriod.bind(this);
        this.handlePreviousePeriod = this.handlePreviousePeriod.bind(this);
        this.state = {period: earningOverviewService.getPeriodString()};
    }
    handleGoHome() {
        render(<Home/>,document.getElementById('app'));
    }
    handleNextPeriod(){
        earningOverviewService.nextPeriod();
        this.setState({period: earningOverviewService.getPeriodString()});
    }
    handlePreviousePeriod(){
        earningOverviewService.previousePeriod();
        this.setState({period: earningOverviewService.getPeriodString()});
    }
    /**
     * 
     * @param {RecordLine} line 
     */
    renderLine(line){
        if(line.value < 0)
            return (
                <div className="minusReason">
                    <label className="left">{line.name}</label> 
                    <label className="right">{line.value}</label>
                </div>
            );
        return (
               <div>
                    <label className="left">{line.name}</label> 
                    <label className="right">{line.value}</label>
                </div>
            );
        
    }
    /**
     * 
     * @param {RecordLine[]} lines
     */
    renderElements(lines){
        return lines.map((line)=>(
            <div key={line.id}>
                 {this.renderLine(line)}
                <br/>
            </div>
        ));
    };
    renderEarningOverview(){
        return earningOverviewService.getEarningOverview().map((record) => (
            <div className="leftRight" key={record.projectName}>
                <hr/>
                <div className="left"> {record.projectName} </div><br/>
                <hr/>
                <br/>
                {this.renderElements(record.line)}
            </div>
        ));
    }
    renderPeriodSum(){
        return (
            <div className="leftRight">
                <label className="leftBl"> Spolu </label>
                <label className="rightBl"> {earningOverviewService.getPeriodSum()}</label>
            </div>
        );
    }
    renderWholeSum(){
        return (
            <div className="leftRight">
                <label className="leftBl">Zarobené </label>
                <label className="rightBl">{earningOverviewService.getEarned()} </label>
                <br/>
                <label className="leftYe">Vyplatené </label>
                <label className="rightYe">{earningOverviewService.getPayed()}</label>
                <br/>
                <label className="leftBl">Ostáva vyplatiť </label>
                <label className="rightBl">{earningOverviewService.getToPay()}</label>
            </div>
        );
    }
    render() {
        if(!userService.isLogged())
            render(<App/>,document.getElementById('app'));
        return (
            <div className="container">
               <button className="nav1" onClick={this.handleGoHome} >Domov</button> <br/>
               <div className="choosePeriod">
                    {this.state.period}<br/>
                   <button className="left" onClick={this.handlePreviousePeriod}>{String.fromCharCode(60)}{String.fromCharCode(60)}</button>
                   <button className="right" onClick={this.handleNextPeriod}>{String.fromCharCode(62)}{String.fromCharCode(62)}</button>
               </div>
                {this.renderEarningOverview()}
                <br/>
                <hr/>
                {this.renderPeriodSum()}
                <br/> <br/>
                <hr/>
                <hr/>
                {this.renderWholeSum()}
            </div> 
        );
    }
}
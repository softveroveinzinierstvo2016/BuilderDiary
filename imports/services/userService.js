import  { Employee } from '../../models/Employee';
import { Employees } from '../api/employees';

import { Meteor } from 'meteor/meteor';

// for navigation
import App from '../ui/App';
/**
 * @type {Employee}
 */
let loggedUser;

export class UserService {
    
    constructor() { 
     }
     /**
      * logg user out
      */
     loggOut() {
        loggedUser = null;
     }
    /**
     * log employee
     * @param {string} login 
     * @param {string} password
     */
    loggUser(login, password) {
        loggedUser = null;
        if(!login || !password)
            return;
        let loginMatchPattern = /^([a-z]|[A-Z])*$/;
        let passwordMatchPattern = /^([a-z]|[A-Z]|[0-9])*$/;
        if(!loginMatchPattern.test(login) || !passwordMatchPattern.test(password)){
            return; 
        }
        Meteor.call("employees.loggUser",login, password, function(error, result){
            if(error)
                return;
            loggedUser = result;
            if(!loggedUser)
                return;
            App.enter();
        });
    }
    /**
     * get if employee is logged
     * @return {boolean}
     */
    isLogged() {
        return loggedUser != null;
    }
    /**
     * get name of the logged employee
     * @return {string}
     */
    getLoggedUserName() {
        return loggedUser.name + " " + loggedUser.surname || "<no employee logged>";
    }
    /**
     * get sum for assistant
     * @return {number}
     */
    getLoggedSumAssistant() {
        return loggedUser.sumAssistant;
    }
    /**
     * get id of logged employee
     * @return {string}
     */
    getLoggedId() {
        return loggedUser.id;
    }
    /**
     * returns true iff logged user is a boss
     * @return {boolean}
     */
    isLoggedBoss() {
        return loggedUser.role === 1;
    }
    /**
     * returns true iff logged user is an employee
     * @return {boolean}
     */
    isLoggedEmployee() {
        return loggedUser.role === 0 || 
               loggedUser.role === 2;
    }
    /**
     * returns true iff logged user is an assistant
     * @return {boolean}
     */
    isLoggedAssistant() {
        return loggedUser.role === 2;
    }
    /**
     * 
     * @param {number} role 
     */
    static isAssistant(role){
        return role === 2;
    }
    /**
     * 
     * @param {number} role 
     */
    static isEmployee(role){
        return role === 0 || role === 2;
    }
    /**
     * 
     * @param {number} role 
     */
    static isBoss(role){
        return role === 1;
    }
}

import  {Employee } from '../../models/Employee';
import { Employees } from '../api/employees';

import { Meteor } from 'meteor/meteor';

var loggedUser;

export class UserService {
    
    constructor() { 
      Meteor.subscribe('employees');
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
        //TODO: move this to server and return user id or null - Meteor.call('function_name');
        if(!login || !password)
            return false;
        let employees = Array;
        employees = Employees.find({}).map((employee) => {
            let back = new Employee();
            back.login = employee.login;
            back.password = employee.password;
            back.name = employee.name;
            back.surname = employee.surname;
            back.role = employee.role;
            back.id = employee._id;
            back.sumAssistant = employee.sumAssistant;
            return back;
        });
        for(let i = 0; i < employees.length; i++) {
            console.log(employees[i].login);
            if(employees[i].login === login && 
              employees[i].password === password
            ) {
                loggedUser = new Employee();
                loggedUser.login = employees[i].login;
                loggedUser.password = employees[i].password;
                loggedUser.name = employees[i].name;
                loggedUser.surname = employees[i].surname;
                loggedUser.id = employees[i].id;
                loggedUser.role = employees[i].role;
                loggedUser.sumAssistant = employees[i].sumAssistant;
                return true;
            }
        }
        console.log('not such combination');
        loggedUser = null;
        return false;
    }
    /**
     * get if employee is logged
     */
    isLogged() {
        return loggedUser != null;
    }
    /**
     * get name of the logged employee
     */
    getLoggedUserName() {
        return loggedUser.name + " " + loggedUser.surname || "<no employee logged>";
    }
    /**
     * returns true iff logged user is a boss
     */
    isLoggedBoss() {
        return loggedUser.role === 1;
    }
    /**
     * returns true iff logged user is an employee
     */
    isLoggedEmployee() {
        return loggedUser.role === 0 || 
               loggedUser.role === 2;
    }
    /**
     * returns true iff logged user is an assistant
     */
    isLoggedAssistant() {
        return loggedUser.role === 2;
    }
}

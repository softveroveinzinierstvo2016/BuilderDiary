import  {Employee } from '../../models/Employee';
import { Employees } from '../api/employees';

import { Meteor } from 'meteor/meteor';

var loggedUser;

export class UserService {
    
    constructor() { 
      Meteor.subscribe('employees');
     }
    /**
     * log employee
     * @param {string} login 
     * @param {string} password 
     */
    loggUser(login, password) {
        if(!login || !password)
            return false;
        let employees = Array;
        employees = Employees.find({}).map((employee) => {
            let back = new Employee();
            back.login = employee.login;
            back.password = employee.password;
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
        return loggedUser.login || "<no employee logged>";
    }
}

import { Employee } from '../../models/Employee';
import { Employees } from '../api/employees';

import { Meteor } from 'meteor/meteor';

var selectedEmployee;
//var rememberEmployee;

export class EmployeeService {

    constructor() {
        Meteor.subscribe('employees');
    }

    getEmployees() {
        return Employees.find({}).map((employee) => {
            let back = new Employee();
            back.id = employee._id;
            back.name = employee.name;
            back.surname = employee.surname;
            back.login = employee.login;
            back.password = employee.password;
            back.role = employee.role;
            back.sumAssistant = employee.sumAssistant;
            return back;
        });
    }


    /**
     * set employee as chosen for detail view
     * @param {Employee} employee to be set for detail view
     */

    chooseEmployee(employee) {
        selectedEmployee = employee;
    }

    /**
     * get chosen employee
     * @return {Employee}
     */

    getChosenEmployee() {
        return selectedEmployee;
    }


}

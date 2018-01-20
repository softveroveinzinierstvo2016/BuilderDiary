import { Employee } from '../../models/Employee';
import { Employees } from '../api/employees';

import { Meteor } from 'meteor/meteor';
import { UserService } from './userService';

var selectedEmployee;

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
     * get full name of employee with id
     * @param {string} id
     * @return {string} 
     */
    getEmployeeName(id){
        let result = '';
        let employee = Employees.findOne({_id: id});
        if(employee != null)
            result = employee.name + ' ' + employee.surname;
        return result;
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
    /**
     * promote employee choosed by chooseEmployee(employee)
     */
    promoteChoosenEmployee(){
        let id = selectedEmployee.id;
        if(!id){
            id = selectedEmployee._id;
        }
        Meteor.call('employees.promote',id);
    }
    isAssistant(){
        if(!selectedEmployee)
            return true;
        return UserService.isAssistant(selectedEmployee.role);
    }
    rememberThisEmoployee(name,surname,login,password,assistant){
        let newEmployee = new Employee();
        newEmployee.name=name;
        newEmployee.surname=surname;
        newEmployee.login=login;
        newEmployee.password=password;
        if(assistant===true){
            newEmployee.role=2;
        } else {
            newEmployee.role=0;
        }
        newEmployee.sumAssistant=0;
        selectedEmployee=newEmployee;
        Meteor.call('employee.insert',selectedEmployee,function(error,result){
            selectedEmployee.id=result;
        });
    }


}

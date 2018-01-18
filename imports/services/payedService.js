import { Meteor } from 'meteor/meteor';

import { Payeds } from '../api/payed';
import { Payed } from '../../models/Payed';
import { Employee } from '../../models/Employee';
/**
 * @type{Employee}
 */
let employeeRem;

export class PayedService{
    constructor(){
        Meteor.subscribe('payeds');
    }
    /**
     * 
     * @param {String} employeeId 
     * @return {number}
     */
    getSum(employeeId){
        let sum = 0;
        console.log(Payeds.find({}).fetch());
        this.getList(employeeId).forEach((payed)=>{
            /**
             * @type {number}
             */
            let num = Number(payed.sum);
            sum = sum + num;
        });
        return sum;
    }
    /**
     * 
     * @param {String} employeeId 
     * @param {number} sum 
     * @param {String} notice 
     */
    pay(employeeId, sum, notice){
        Meteor.call('payeds.pay',employeeId, sum, notice);
    }
    /**
     * 
     * @param {String} employeeId
     * @return {Payed[]} 
     */
    getList(employeeId){
        return Payeds.find({employeeId: employeeId});
    }
    setEmployee(employee){
        employeeRem = employee;
    }
    getEmployee(){
        return  employeeRem;
    }
}
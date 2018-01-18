import { Meteor } from 'meteor/meteor';

import { Payeds } from '../api/payed';
import { Payed } from '../../models/Payed';

export class PayedService{
    constructor(){
        Meteor.subscribe('payeds');
    }
    /**
     * 
     * @param {String} employeeId 
     */
    getSum(employeeId){
        let sum = 0;
        Payeds.find({idEmployee: employeeId}).forEach((payed)=>{
            sum = sum + payed.sum;
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
}
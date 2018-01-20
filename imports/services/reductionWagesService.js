import { ReductionWage } from '../../models/ReductionWage';
import { ReductionWages } from '../api/reductionWages';

import { Meteor } from 'meteor/meteor';

export class ReductionWagesService {
    
    constructor() { 
        Meteor.subscribe('reductionWages');
     }
     /**
      * @param {string} employeeId
      * @return {ReductionWage[]}
      */
    getReductions(employeeId){
        return ReductionWages.find({idEmployee: employeeId}).map((element)=>{
            element.id = element._id;
            return element;
        });
    }
    /**
     * @param {string} employeeId 
     * @param {Date} startDay 
     * @param {Date} endDay 
     * @return {ReductionWage[]}
     */
    getReductionsBetween(employeeId, startDay, endDay){
        return ReductionWages.find({idEmployee: employeeId, date:{$gte: startDay, $lte: endDay}})
    }
    getSum(employeeId){
        let sum = 0;
        return ReductionWage.find({idEmployee: employeeId}).forEach((wage)=>{
            sum = sum + wage.sum;
        });
        return sum;
    }
}
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
            let rec = new ReductionWage();
            rec = element;
            rec.id = element._id;
            return rec;
        });
    }
    /**
     * @param {string} employeeId 
     * @param {Date} startDay 
     * @param {Date} endDay 
     * @return {ReductionWage[]}
     */
    getReductionsBetween(employeeId, startDay, endDay){
        startDay.setHours(0,0,0,0);
        endDay.setHours(0,0,0,0);
        return ReductionWages.find({idEmployee: employeeId, date:{$gte: startDay, $lte: endDay}});
    }
    getSum(employeeId){
        let sum = 0;
        ReductionWages.find({idEmployee: employeeId}).forEach((wage)=>{
            sum = sum + Number(wage.sum);
        });
        return sum;
    }
     setWagesDeduction(idEmployee, reason, sum){
         let newWage= new ReductionWage();
         newWage.idEmployee=idEmployee;
         newWage.reason=reason;
         newWage.sum=sum;
         Meteor.call('reductionWages.insert',newWage);
     }

}

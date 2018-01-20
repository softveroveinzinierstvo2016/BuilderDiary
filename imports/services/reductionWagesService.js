import { ReductionWage } from '../../models/ReductionWage';
import { ReductionWages } from '../api/reductionWages';

import { Meteor } from 'meteor/meteor';

export class ReductionWagesService {
    
    constructor() { 
        Meteor.subscribe('reductionWages');
     }

     setWagesDeduction(idEmployee,reason,sum){
         let newWage= new ReductionWage();
         newWage.idEmployee=idEmployee;
         newWage.reason=reason;
         newWage.sum=sum;
         Meteor.call('reductionWages.insert',newWage);
     }

    }
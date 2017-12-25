import { WorkTimeReduction } from '../../models/WorkTimeReduction';
import { WorkTimeReductions } from '../api/workTimeReductions';

import { Meteor } from 'meteor/meteor';

/**
 * @type {Project}
 */
var sellectedWorkTimeReduction;

export class WorkTimeReductionService {
    
    constructor() { 
        Meteor.subscribe('workTimeReductions');
     }
      
      rememberThisWorkTimeReduction(date,cause,from,to){
         let newWorkTimeReduction=new WorkTimeReduction();
         newWorkTimeReduction.date=date;
         newWorkTimeReduction.cause=cause;
         newWorkTimeReduction.from=from;
         newWorkTimeReduction.to=to;
         sellectedWorkTimeReduction=newWorkTimeReduction;
         Meteor.call('workTimeReduction.insert',sellectedWorkTimeReduction,function(error,result){
             sellectedWorkTimeReduction.id=result;
             console.log(result);
         });
     }
}
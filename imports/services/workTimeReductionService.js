import { WorkTimeReduction } from '../../models/WorkTimeReduction';
import { WorkTimeReductions } from '../api/workTimeReductions';

import { Meteor } from 'meteor/meteor';

/**
 * @type {WorkTimeReduction}
 */
let sellectedWorkTimeReduction;

export class WorkTimeReductionService {
    
    constructor() { 
        Meteor.subscribe('workTimeReductions');
    }
    /**
     * 
     * @param {string} projectId 
     * @param {string} date 
     * @param {string} cause 
     * @param {string} from 
     * @param {string} to 
     */
    rememberThisWorkTimeReduction(projectId,date,cause,from,to){
        let newWorkTimeReduction=new WorkTimeReduction();
        newWorkTimeReduction.day= date;
        newWorkTimeReduction.reason=cause;
        newWorkTimeReduction.timeStart=from;
        newWorkTimeReduction.timeEnd=to;
        newWorkTimeReduction.projectId = projectId;
        sellectedWorkTimeReduction=newWorkTimeReduction;
        Meteor.call('workTimeReduction.insert',sellectedWorkTimeReduction,function(error,result){
            sellectedWorkTimeReduction._id=result;
        });
    }
    /**
     * @param {string} projectId
     * @returns {WorkTimeReduction[]}
     */
    getWorkTimeReductionOnProject(projectId){
        return WorkTimeReductions.find({projectId: projectId});
    }
}
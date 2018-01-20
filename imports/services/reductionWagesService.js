import { ReductionWage } from '../../models/ReductionWage';
import { ReductionWages } from '../api/reductionWages';

import { Meteor } from 'meteor/meteor';

export class ReductionWagesService {
    
    constructor() { 
        Meteor.subscribe('reductionWages');
     }
    }
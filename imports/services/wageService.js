import { Meteor } from 'meteor/meteor';

import { Wages } from '../api/wages';
import { Wage } from '../../models/Wage';

export class WageService{
    constructor(){
        Meteor.subscribe('wages');
    }
    getSum(employeeId){
        let sum = 0;
        Wages.find({idEmployee: employeeId}).forEach((wage)=>{
            sum = sum + wage.sum;
        });
        return sum;
    }
}
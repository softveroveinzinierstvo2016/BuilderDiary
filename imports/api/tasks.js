import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Task} from '../../models/Task';

export const Tasks = new Mongo.Collection('task');

if(Meteor.isServer) {
    Meteor.publish('tasks', function usersPublication() {
        return Tasks.find();
    });
     Meteor.methods({
       /**
        * @param {Task} task
        */
       'task.insert'(task){
          Tasks.insert({
          idProject:task.idProject,
          nameOfTask:task.nameOfTask,
          duration:task.duration,
          payment:task.payment,
          unit:task.unit,
          payment_boss:task.payment_boss,
          sum:task.sum,
          expenditure:task.expenditure,
          help: task.help,
          worked: 0
        });
       },
       /**
        * 
        * @param {Task} task 
        */
       'task.update'(task){
         Tasks.update({_id: task.id},{$set:{
         nameOfTask:task.nameOfTask,
         duration:task.duration,
         payment:task.payment,
         unit:task.unit,
         payment_boss:task.payment_boss,
         sum:task.sum
       }});
      },
      'tasks.addWorked'(taskId, worked, payed){
        /**
         * @type {Task}
         */
         let task = Tasks.findOne({_id: taskId});
         if(!task)
            return;
          if(!task.worked)
            task.worked = 0;
          if(!task.expenditure)
            task.expenditure = 0;
          let newWorked = Number(task.worked) + Number(worked);
          let newExpend = Number(task.expenditure) + Number(payed);
         Tasks.update({_id: taskId},{$set:{
              worked: newWorked,
              expenditure : newExpend
         }})  
      }
     })
}

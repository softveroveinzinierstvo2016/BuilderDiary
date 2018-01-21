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
          worked:task.worked,
          help: task.help
        });
       },
       /**
        * 
        * @param {Task} task 
        */
       'task.update'(task){
         Tasks.update({id:task.id},{$set:{
         nameOfTask:task.nameOfTask,
         duration:task.duration,
         payment:task.payment,
         unit:task.unit,
         payment_boss:task.payment_boss,
         sum:task.sum
       }});
      }
     })
}

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('task');

if(Meteor.isServer) {
    Meteor.publish('tasks', function usersPublication() {
        return Tasks.find();
    });
     Meteor.methods({
       'task.insert'(task){
         //check(project,Projects);
        console.log(task);
       Tasks.insert({
      idProject:task.idProject,
    nameOfTask:task.nameOfTask,
    duration:task.duration,
    payment:task.payment,
    unit:task.unit,
    payment_boss:task.payment_boss,
    sum:task.sum,
    expenditure:task.expenditure
    });
    }
     })
}

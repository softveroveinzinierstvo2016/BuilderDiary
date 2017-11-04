import { Task } from '../../models/Task';
import { Tasks } from '../api/tasks';

import { Meteor } from 'meteor/meteor';

var sellectedTask;

export class TaskService {
    
    constructor() { 
        Meteor.subscribe('tasks');
     }
     /**
      * return all tasks
      */
     getTasks() {
         return Tasks.find({}).map((task) => {
            let back = new Task();
            back.idProject  = task.idProject;
            back.nameOfTask = task.nameOfTask;
            back.duration = task.duration;
            back.payment = task.payment;
            back.unit = task.unit;
            back.payment_boss = task.payment_boss;
            back.sum = task.sum;
            back.expenditure = task.expenditure;
            back.id = task._id;
            return back;
          });
     }
     /**
      * return tasks in project
      * @param {string} projectId
      */
      getTasksOfProject(projectId) {
         //TODO: get tasks using user id - IMPORTANT FOR ASSISTANT
         return Tasks.find({idProject: projectId}).map((task) => {
            let back = new Task();
            back.idProject  = task.idProject;
            back.nameOfTask = task.nameOfTask;
            back.duration = task.duration;
            back.payment = task.payment;
            back.unit = task.unit;
            back.payment_boss = task.payment_boss;
            back.sum = task.sum;
            back.expenditure = task.expenditure;
            back.id = task._id;
            return back;
          });
     }
     /**
      * set task as choosed for detail view
      * @param {Task} task 
      */
     chooseTask(task) {
         sellectedTask = task;
     }
     /**
      * get choosed task
      */
     getChoosedTask() {
         return sellectedTask;
     }
}
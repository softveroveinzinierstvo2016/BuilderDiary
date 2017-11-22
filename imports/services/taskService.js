import { Task } from '../../models/Task';
import { Tasks } from '../api/tasks';
import { Project } from '../../models/Project';
import { Projects } from '../api/projects';

import { Meteor } from 'meteor/meteor';

import { ProjectService } from './projectService';

var sellectedTask;
var idProjektu;
var projektName;
let projectService = new ProjectService();

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
      setProjectId(){
         idProjektu=projectService.getProjectId();
        // projektName=projektName.nameOfProject;
        console.log(idProjektu);
     }
    
     /**
      * return tasks in project
      * @param {string} projectId
      */
      getTaskOfProjectById(projectId) {
         //TODO: get tasks using user id - IMPORTANT FOR ASSISTANT
         return Tasks.find({'idProject': projectId}).map((task) => {
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
            console.log(task.nameOfTask);
            return back;
          });
     }
      getTaskOfActualProjectById() {
         //TODO: get tasks using user id - IMPORTANT FOR ASSISTANT
         return Tasks.find({'idProject': idProjektu}).map((task) => {
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
            console.log(task.nameOfTask);
            return back;
          });
     }
      getTaskByNameOfProjekt() {
        // return Tasks.find({'idProject':projektName}).map((task) => {
            /*let back = new Task();
            back.idProject  = task.idProject;
            back.nameOfTask = task.nameOfTask;
            back.duration = task.duration;
            back.payment = task.payment;
            back.unit = task.unit;
            back.payment_boss = task.payment_boss;
            back.sum = task.sum;
            back.expenditure = task.expenditure;
            back.id = task._id;
            return back;*/
          //});
         
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
    
     rememberThisTask(name,duration,payment, unit, sumBoss,sum){
           let back=new Task();
            back.idProject  = idProjektu;
            back.nameOfTask =name;
            back.duration = duration;
            back.payment = payment;
            back.unit = unit;
            back.payment_boss = sumBoss;
            back.sum = sum;
            back.expenditure = 0;
         Meteor.call('task.insert',back);
     }
    /**
     * 
     * @param {string} taskIdList
     * @return {Task[]}
     */
    getTasksByIds(taskIdList){
        return Tasks.find({_id: {$in: taskIdList}});
    }
}
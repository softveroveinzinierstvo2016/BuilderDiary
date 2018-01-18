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
     }

     getProjectId(){
         return idProjektu;
     }

      stateOfTask(expenditure,payment){
          if((expenditure!=null)&&(payment!=null)){
              var stav=expenditure*payment;
            }else{
             var stav=0;
            }

          return stav;
      }
     /**
      * return tasks in project
      * @param {string} projectId
      */
      getTaskOfProjectById(projectId) {
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
            return back;
          });
     }
      getTaskOfActualProjectById() {
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
    
     rememberThisTask(name,duration,payment, unit, sumBoss){
           let back=new Task();
            back.idProject  = idProjektu;
            back.nameOfTask =name;
            back.duration = duration;
            back.payment = payment;
            back.unit = unit;
            back.payment_boss = sumBoss;
            back.sum = payment*duration;
            back.expenditure = 0;
         Meteor.call('task.insert',back);
     }
     rememberThisTaskEdit(id,name,duration,payment, unit, sumBoss){
        let back=new Task();
         back.id=id;
         back.idProject  = idProjektu;
         back.nameOfTask =name;
         back.duration = duration;
         back.payment = payment;
         back.unit = unit;
         back.payment_boss = sumBoss;
         back.sum = payment*duration;
         back.expenditure = 0;
      Meteor.call('task.update',back);
  }
    /**
     * 
     * @param {string} taskIdList
     * @return {Task[]}
     */
    getTasksByIds(taskIdList){
        return Tasks.find({_id: {$in: taskIdList}});
    }
    /**
     * @param {string} id
     * @return {Task}
     */
    getTask(id){
        return Tasks.findOne({_id: id});
    }
}
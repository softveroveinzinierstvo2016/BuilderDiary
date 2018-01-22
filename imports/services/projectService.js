import { Project } from '../../models/Project';
import { Projects } from '../api/projects';

import { Meteor } from 'meteor/meteor';

/**
 * @type {Project}
 */
var sellectedProject;
//let taskService = new TaskService();
export class ProjectService {
    
    constructor() { 
        Meteor.subscribe('projects');
     }
     /**
      * get all projects
      */
     getProjects() {
         return Projects.find({'ended':{$ne:1}}).map((project) => {
            let back = new Project();
            back.nameOfProject = project.nameOfProject;
            back.sponsor = project.sponsor;
            back.adress = project.adress;
            back.endTime = project.endTime;
            back.idMaster = project.idMaster;
            back.budget = project.budget;
            back.expenditure = project.expenditure;
            back.id = project._id;
            back.worked = project.worked;
            return back;
          });
     }

     getEndedProjects() {
        return Projects.find({'ended':1}).map((project) => {
           let back = new Project();
           back.nameOfProject = project.nameOfProject;
           back.sponsor = project.sponsor;
           back.adress = project.adress;
           back.endTime = project.endTime;
           back.idMaster = project.idMaster;
           back.budget = project.budget;
           back.expenditure = project.expenditure;
           back.id = project._id;
           back.worked = project.worked;
           return back;
         });
    }
     /**
      * set project as choosed for detail view
      * @param {Project} project project to be set for detail view
      */
     chooseProject(project) {
         sellectedProject = project
     }
     /**
      * get choosed project
      * @return {Project}
      */
     getChoosedProject() {
         return sellectedProject;
     }
     /**
      * get choosed project id
      * return null if no project selected
      * @return {string}
      */
     getChoosedProjectId() {
         return sellectedProject.id || sellectedProject._id || null;
     }
     /**
      * 
      * @param {string} name 
      * @param {string} sponzor 
      * @param {string} adress 
      * @param {string} time 
      * @param {string} majster 
      * @param {number} badget 
      */
     rememberThisProject(name,sponzor,adress,time,majster,badget){
         let newProject=new Project();
         newProject.nameOfProject=name;
         newProject.adress=adress;
         newProject.budget=badget;
         newProject.endTime=time;
         newProject.idMaster=majster;
         newProject.expenditure=0;
         newProject.sponsor=sponzor;
         sellectedProject=newProject;
         Meteor.call('project.insert',sellectedProject,function(error,result){
             sellectedProject.id=result;
         });
     }
     rememberThisProjectEdit(id,name,sponzor,adress,time,majster,badget){
        let newProject=new Project();
        newProject.id=id;
        newProject.nameOfProject=name;
        newProject.adress=adress;
        newProject.budget=badget;
        newProject.endTime=time;
        newProject.idMaster=majster;
        newProject.sponsor=sponzor;
        sellectedProject=newProject;
        Meteor.call('project.update',sellectedProject,function(error,result){
            sellectedProject.id=result;
        });
    }
    setEndOfProject(id){
        let newProject=new Project();
        newProject.id=id;
        newProject.ended=1;
        sellectedProject=newProject;
        Meteor.call('project.setEnded',sellectedProject,function(error,result){
            sellectedProject.id=result;
        });
    }
    getrememberProject(){
        return sellectedProject;
    }
    getProjectId(){
       return sellectedProject.id;
   }
   /**
    * return true iff user defined by id is master on sellected project
    * @param {string} id
    * @return {boolean} 
    */
   isMaster(id){
        if(sellectedProject == null)
            return false;
        return sellectedProject.idMaster == id;
   } 
   getProjectProfit(project){
    let result='';
    if(project.budget!=null && project.expenditure!=null)
      result=parseInt(project.budget)-parseInt(project.expenditure);
    else
      result='0';
    return result;
   }
   getProjectNameById(id){
    let result = 'Nemam meno';
    let project = Projects.findOne({_id: id});
    if(project != null)
        result = project.nameOfProject;
    return result;
   }
    addWorked(projectId, worked, payed){
        Meteor.call('projects.addWorked',projectId, worked, payed);
    }
}
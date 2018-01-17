import { Project } from '../../models/Project';
import { Projects } from '../api/projects';

import { Meteor } from 'meteor/meteor';

/**
 * @type {Project}
 */
var sellectedProject;

export class ProjectService {
    
    constructor() { 
        Meteor.subscribe('projects');
     }
     /**
      * get all projects
      */
     getProjects() {
         return Projects.find({}).map((project) => {
            let back = new Project();
            back.nameOfProject = project.nameOfProject;
            back.sponsor = project.sponsor;
            back.adress = project.adress;
            back.endTime = project.endTime;
            back.idMaster = project.idMaster;
            back.budget = project.budget;
            back.expenditure = project.expenditure;
            back.id = project._id;
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
             console.log(result);
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
        newProject.expenditure=0;
        newProject.sponsor=sponzor;
        sellectedProject=newProject;
        Meteor.call('project.update',sellectedProject,function(error,result){
            sellectedProject.id=result;
            console.log(result);
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
}
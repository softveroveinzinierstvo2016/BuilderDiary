import { Project } from '../../models/Project';
import { Projects } from '../api/projects';

import { Meteor } from 'meteor/meteor';

var sellectedProject;
var rememberProject;

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
      * @param {Project} project 
      */
     chooseProject(project) {
         sellectedProject = project
     }
     /**
      * get choosed project
      */
     getChoosedProject() {
         return sellectedProject;
     }
     rememberThisProject(name,sponzor,adress,time,majster,badget){
         let newProject=new Project();
         newProject.nameOfProject=name;
         newProject.adress=adress;
         newProject.budget=badget;
         newProject.endTime=time;
         //Todo:hladanie id majstra podla mena
         newProject.idMaster=null;
         newProject.expenditure=0;
         newProject.sponsor=sponzor;
         rememberProject=newProject;
         Meteor.call('project.insert',rememberProject);
     }
}
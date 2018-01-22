import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('project');

if(Meteor.isServer) {
    Meteor.publish('projects', function usersPublication() {
        return Projects.find();
    });
    Meteor.methods({
     'project.insert' : function(project){
    var id=Projects.insert({
       nameOfProject:project.nameOfProject,
       sponsor: project.sponsor,
       adress: project.adress,
       endTime: project.endTime,
       idMaster:project.idMaster,
       budget: project.budget,
       expenditure: project.expenditure,
       worked: 0,
       ended: 0
    });
    return id;
    },

    'project.update' : function(project){
      var id=Projects.update({_id:project.id},{$set:{
      nameOfProject:project.nameOfProject,
      sponsor: project.sponsor,
      adress: project.adress,
      endTime: project.endTime,
      idMaster:project.idMaster,
      budget: project.budget
      }});
    return id;
    },

    'project.setEnded':function(project){
      let id=Projects.update({_id:project.id},{$set:{
      ended: 1,
      budget:  project.budget
      }});
      return id;
    },
    'projects.addWorked'(projId, worked, payed){
        /**
         * @type {Project}
         */
         let  project = Projects.findOne({_id: projId});
         if(!project)
            return;
          if(!project.worked)
            project.worked = 0;
          if(!project.expenditure)
            project.expenditure = 0;
          let newWorked = Number(project.worked) + Number(worked);
          let newExpend = Number(project.expenditure) + Number(payed);
         Projects.update({_id: projId},{$set:{
              worked: newWorked,
              expenditure : newExpend
         }})  
      }
    })
}
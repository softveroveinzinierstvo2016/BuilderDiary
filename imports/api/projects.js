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
         //check(project,Projects);
        console.log(project);
    var id=Projects.insert({
       nameOfProject:project.nameOfProject,
       sponsor: project.sponsor,
       adress: project.adress,
       endTime: project.endTime,
       idMaster:project.idMaster,
       budget: project.budget,
       expenditure: project.expenditure
    });
    console.log(id);
    return id;
    },

    'project.update' : function(project){
        //check(project,Projects);
       console.log(project);
      var id=Projects.update({_id:project.id},{$set:{
      nameOfProject:project.nameOfProject,
      sponsor: project.sponsor,
      adress: project.adress,
      endTime: project.endTime,
      idMaster:project.idMaster,
      budget: project.budget,
      expenditure: project.expenditure
      }});
    console.log(id);
    return id;
    },

    'project.setEnded'(project){
     Projects.update({_id:project.id},
        {$set:{ended:project.ended}})
    }
    })
}
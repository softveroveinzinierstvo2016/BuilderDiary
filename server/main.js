import { Meteor } from 'meteor/meteor';

// define collections on server
import '../imports/api/employees';
import '../imports/api/attendances';
import '../imports/api/projects';
import '../imports/api/wages';
import '../imports/api/tasks';
import '../imports/api/workTimeReductions';
import '../imports/api/works';
import '../imports/api/expenditures';

// for initial data manipulation
import { Employees } from '../imports/api/employees';
import { Projects } from '../imports/api/projects';
import { Tasks } from '../imports/api/tasks'; 
import { Attendances } from '../imports/api/attendances';

import { Project } from '../models/Project';
/*
  set specific database:
    open cmd in root project folder
    type without "",<>: "set MONGO_URL=mongodb://<username>:<password>@dsNNNNNN.mlab.com:<port>/database"
    then run server as allways
*/

Meteor.startup(() => {
  // code to run on server at startup
  
  // uncomment next call if user collection is empty 
  // BEFORE RUN TYPE: meteor reset - to clear database
  //    - put into comment before next run
  /*
  Employees.insert({
      name: 'Jan', 
      surname: 'Vesely',
      login: 'boss', 
      password: 'pssw',
      role: 1,
      sumAssistant: 0
    });
  Employees.insert({
    name: 'Juro', 
    surname: 'Odborny',
    login: 'juro', 
    password: 'pssw',
    role: 0,
    sumAssistant: 0
  });
  Employees.insert({
    name: 'Jozo', 
    surname: 'Ochotny',
    login: 'jozo', 
    password: 'pssw',
    role: 2,
    sumAssistant: 13
  });

  Projects.insert({
    nameOfProject: 'PF-UPJS',
    sponsor: 'PF-UPJS',
    adress: 'Jesenna 9, Kosice',
    endTime: '21.12.2017',
    idMaster: null,
    budget: 300,
    expenditure: 0
  });
 
  let projRes = Projects.find({}).map((project) => {
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

  console.log(projRes);
  let idProject;
  for(let i = 0; i < projRes.length; i++) {
     idProject = projRes[i].id;
     break;
  }
  console.log(idProject);

  Tasks.insert({
    idProject: idProject,
    nameOfTask: 'demontaz strechy',
    duration: 20,
    payment: 5,
    unit: 'm2',
    payment_boss: 10,
    sum:  200,
    expenditure: 0
  });
  Tasks.insert({
    idProject: idProject,
    nameOfTask: 'montaz strechy',
    duration: 20,
    payment: 10,
    unit: 'm2',
    payment_boss: 20,
    sum:  400,
    expenditure: 0
  });
*/
//  console.log(projRes);
  // get users from databse and display for debug controll
  let res = Employees.find({}).fetch();
  console.log(res);
  console.log(Attendances.find({}).fetch());
  // display database address
  console.log(process.env.MONGO_URL);
});

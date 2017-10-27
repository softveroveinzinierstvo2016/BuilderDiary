import { Meteor } from 'meteor/meteor';

// define collections on server
import '../imports/api/employees';
import '../imports/api/attendances';
import '../imports/api/projects';
import '../imports/api/wages';
import '../imports/api/tasks';
import '../imports/api/workTimeReductions';
import '../imports/api/works';

// for initial data manipulation
import { Employees } from '../imports/api/employees';
/*
  set specific database:
    open cmd in root project folder
    type without "",<>: "set MOGNO_URL=mongodb://<username>:<password>@dsNNNNNN.mlab.com:<port>/database"
    then run server as allways
*/

Meteor.startup(() => {
  // code to run on server at startup
  
  // uncomment next call if user collection is empty 
  //    - put into comment before next run
  //Employees.insert({login: 'boss', password: 'pssw'});
  
  // get users from databse and display for debug controll
  let res = Employees.find({}).fetch();
  console.log(res);
  // display database address
  console.log(process.env.MONGO_URL);
});

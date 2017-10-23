import { Meteor } from 'meteor/meteor';

// define collections on server
import '../imports/api/users';

// for initial data manipulation
import { Users } from '../imports/api/users';
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
  // Users.insert({logname: 'boss', password: 'pssw'});
  
  // get users from databse and display for debug controll
  let res = Users.find({}).fetch();
  console.log(res);
  // display database address
  console.log(process.env.MONGO_URL);
});

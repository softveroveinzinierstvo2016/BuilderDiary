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
import '../imports/api/payed';

/*
  set specific database:
    open cmd in root project folder
    type without "",<>: "set MONGO_URL=mongodb://<username>:<password>@dsNNNNNN.mlab.com:<port>/database"
    then run server as allways
*/

Meteor.startup(() => {
});

import  { User } from '../../models/user';
import { Users } from '../api/users';

import { Meteor } from 'meteor/meteor';

var loggedUser;

export class UserService {
    
    constructor() { 
      Meteor.subscribe('users');
     }
    /**
     * log user
     * @param {string} logName 
     * @param {string} password 
     */
    loggUser(logName, password) {
        if(!logName || !password)
            return false;
        let users = Array;
        users = Users.find({}).map((user) => {
            let back = new User();
            back.logname = user.logname;
            back.password = user.password;
            return back;
        });
        for(let i = 0; i < users.length; i++) {
            console.log(users[i].logname);
            if(users[i].logname === logName && 
              users[i].password === password
            ) {
                loggedUser = new User();
                loggedUser.logname = users[i].logname;
                loggedUser.password = users[i].password;
                return true;
            }
        }
        console.log('not such combination');
        loggedUser = null;
        return false;
    }
    /**
     * get if user is logged
     */
    isLogged() {
        return loggedUser != null;
    }
    /**
     * get name of the logged user
     */
    getLoggedUserName() {
        return loggedUser.logname || "<no user logged>";
    }
}

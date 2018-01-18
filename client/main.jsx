import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App  from '../imports/ui/App.jsx';

/*
  set IP of your computer
  phone has to be in the same network if you dont have
  public IP on computer

  check your firewall on computer
    - allow port 3000
*/

var theURL = 'localhost:3000';
//var theURL = '192.168.1.13:3000';

if(Meteor.isClient) {
  // display client connection to the server in console 
  Meteor.autorun(function () {
      var stat = Meteor.status().status;
      if (stat === "connected") {
          console.log("connected");
          return;
      } else if (stat === "connecting") {
          console.log("connecting to: ");
      } else if(stat === "failed") {
        console.log("failed");
        return;
      } else if(stat === "waiting") {
        console.log("waiting");
      } else if(stat === "offline") {
        console.log("offline");
        return;
      }
      else {
        console.log("disconnected");
        return;
      }
  });
}

Meteor.absoluteUrl.defaultOptions.rootUrl = theURL;
process.env.ROOT_URL = theURL;
process.env.MOBILE_ROOT_URL = theURL;
process.env.MOBILE_DDP_URL = theURL;
process.env.DDP_DEFAULT_CONNECTION_URL = theURL;

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
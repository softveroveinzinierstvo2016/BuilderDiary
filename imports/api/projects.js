import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('project');

if(Meteor.isServer) {
    Meteor.publish('projects', function usersPublication() {
        return Projects.find();
    });
}
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const WorkTimeReductions = new Mongo.Collection('workTimeReduction');

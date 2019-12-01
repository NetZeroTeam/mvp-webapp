import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Promise } from 'meteor/promise';

export const UserCo = new Mongo.Collection('userCo');

if (Meteor.isServer) {
    Meteor.publish('userCo', function() {
    return UserCo.find();
    });
}

Meteor.methods({
  'user.insert'(_id) {

    return UserCo.insert({
    _id: '1'
    });
    },
'user.update'(_id, details) {

     UserCo.update({
      _id,
      }, {
          $set: {
              ...details
          }
      });

},
});

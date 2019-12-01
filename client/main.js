import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { routes } from '../imports/routes/routes.js';
import { userCo } from '../imports/api/userCo';
import { UserCo } from '../imports/api/userCo';

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));

Meteor.subscribe('userCo');

setTimeout(() => {

console.log(UserCo.find({}).count());

if (UserCo.find({}).count() === 0) {
  Meteor.call('user.insert', '1', { }, (error, result) => { console.log('error', error)});
}

}, 1000);



  // if (userId) {
  //   console.log('exists!');
  // } else {
  //   cookies.set('userId', '');
  //   cookies.set('accounts', '');
  //   cookies.set('transactions', '');
  //   console.log('created!', document.cookie);
  // }

});

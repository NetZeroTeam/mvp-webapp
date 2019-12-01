import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { HTTP } from 'meteor/http';

import { Session } from 'meteor/session';

export class Signup extends React.Component {
constructor(props) {
super(props);
this.state = {
error: '',
selected: 'c1'
};
}
componentDidMount() {
  let accounts, transactions;

  Meteor.call("accounts.get", (error, result) => {
    accounts = result;
    console.log('result', result);
    console.log('loggedin', Session.get('loggedin'));
  });

  setTimeout(() => {

    console.log('accounts', accounts);

    Session.set('accounts', accounts);
    this.setState({ 'accounts': accounts });
    console.log('state was set');
  }, 1000);

}
onSubmit(e) {
e.preventDefault();

let userEmail = this.refs.email.value.trim();
userEmail = userEmail.toLowerCase();

if (this.state.selected === 'c1' || 'st') {

let user, transactions, localAccounts;

setTimeout(() => {

try {
localAccounts = this.state.accounts.data.Accounts;

console.log('accounts', this.state.accounts);

user = localAccounts.find( ({ email }) => email.toLowerCase() === userEmail);

if (user) {
  transactions = Meteor.call("transactions.get", user.accountId, (error, result) => {
    transactions = result;
  });
} else {
  console.log('set error 1');
  this.setState({ 'error': 'Invalid Username or Password' });
}
} catch (e) {
  console.log('set error 2', e);
  this.setState({ 'error': 'Invalid Username or Password' });
}

}, 1000);


if (!this.state.error) {

setTimeout(() => {

console.log('it worked!!!!', user);

Session.set('transactions', transactions);

Session.set('loggedin', true);

console.log('loggedin', Session.get('loggedin'));

}, 650);
}

// 72364636
// Carlos.Toy@bmail.com

} else {
  let userPassword = this.refs.password.value.trim();
}
}
resetError() {
this.setState({ error: '' });
}
changeSelected(select) {
this.setState({ selected: select });
}
render() {
    return (
      <div>

    <div className="login__logo">NetZero</div>

      <div className="login__background">
  <div className="login__mobileView">

  <div className="floatLeft login__leftContainer" width="350">
  <div className="login__topTitleLogin">Sign up <Link className="login__topTitleSignup" to="/login"> / Log in</Link></div>
  <hr className="flex login__hrTop"/>
  <br className="clearBoth"/>

  <div className="login__allTopButtons">

  <div onClick={() => this.changeSelected('c1')} className={`${this.state.selected === 'c1' ? 'login__topButtonsSelected' : 'login__topButtons'}`}>
  <div className="login_topButtonInner">Capital One</div></div>

  <div onClick={() => this.changeSelected('st')} className={`${this.state.selected === 'st' ? 'login__topButtonsSelected' : 'login__topButtons'}`}><div className="login_topButtonInner">Starling</div></div>

  <div onClick={() => this.changeSelected('cs')} className={`${this.state.selected === 'cs' ? 'login__topButtonsSelected' : 'login__topButtons'}`}><div className="login_topButtonInner">Custom</div></div>

  </div>

  <br/>

  {this.state.error ? <div className="login__errorBox"><p>{this.state.error}</p></div> : undefined}

  <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">

  <div className="login__rightSubtitle">Email</div>
  <input type="email" ref="email" name="email" onChange={() => { this.resetError()}} className="settings__mainAuthorTextArea floatLeft" />

  <div className="login__rightSubtitle">Password</div>
  <input type="password" ref="password" name="password" onChange={() => { this.resetError()}} className="settings__mainAuthorTextArea floatLeft" />

  <br className="clearBoth"/>
  <button className="login__loginButton">Login</button>
  </form>

  <br/>
  <Link to="/forgot-password" className="link login__forgotPasword">Forgot Your Password?</Link>

  <hr className="flex login__hrBottom"/>
  <br className="clearBoth"/>
  <p>Don't Have an Account? <Link className="link" to="/signup">Sign up</Link></p>
  </div>

  <div className="clearBoth"></div>
  <div className="login__veryBottomSpacing"></div>
  </div></div>
  </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(Signup);

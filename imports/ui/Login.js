import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Promise } from 'meteor/promise';

import { HTTP } from 'meteor/http';

import { Session } from 'meteor/session';

import { funcReplace } from '../routes/routes.js';

import Cookies from 'universal-cookie';

import { UserCo } from '../api/userCo';
import { Tracker } from 'meteor/tracker';

export class Login extends React.Component {
constructor(props) {
super(props);
this.state = {
error: '',
selected: 'c1'
};
}
componentDidMount() {

  // let accounts, transactions;

  // Meteor.call("accounts.get", (error, result) => {
  //   this.setState({ 'accounts': accounts });
  //   accounts = result;
  //   console.log('result', result);
  // });

  // setTimeout(() => {

  // //   console.log('accounts', accounts);


    // Meteor.call('user.update', '1', { accounts: accounts.data.Accounts }, (error, result) => {
    //   console.log('accounts update error', error);
    // } );

  //   console.log('accounts2', accounts.data.Accounts);


  // }, 4500);

  let transactions = [
    [15.00, "Tesco Express", "food"],
    [120.00, "Gucci", "clothes"],
    [140.00, "British Airways", "transport"],
    [25.00, "McDonald’s", "food"],
    [38.00,"Lidl", "food"],
    [60.00, "Esso",  "transport"],
    [18.00, "Five Guys",  "food"],
    [72.00, "TKMax", "clothes"],
    [51.00, "BP", "transport"],
    [31.00,"KFC", "food"],
    [46.00, "Sainsbury’s" ,  "food"],
    [71.00, "easyJet", "transport"],
    [44.00, "Primark", "clothes"]
  ];

    let envCost = {
      "food": 0.00100902,
      "clothes": 0.00024791,
      "tech": 0.00048663,
      "transport": 0.002
      }

for(let i=0; i<transactions.length;i++){
  let exchangeRateGBPToUSD = 1.29;
  let emissionPerPurchase = exchangeRateGBPToUSD*transactions[i][0]*envCost[transactions[i][2]]
  transactions[i].push(emissionPerPurchase)
  transactions[i].push(i.toString() +"/11");
}

  Meteor.call('user.update', '1', { accounts: "Carlos.Toy@bmail.com", "transactions": transactions}, (error, result) => {
    console.log('accounts update error', error);
  } );
}

// runCallback(transactionsInput) {
//   Meteor.call('user.update', '1', {transactionsInput}, (error, result) => {
//     console.log('transactions update error', error);
//   } );
// }
onSubmit(e) {
e.preventDefault();

let userEmail = this.refs.email.value.trim();
userEmail = userEmail.toLowerCase();

if (this.state.selected === 'c1' || 'st') {

let user, localAccounts;

setTimeout(() => {

try {


localAccounts = UserCo.find().fetch()[0].accounts;

console.log('localAccounts', localAccounts);
user = localAccounts

// user = localAccounts.find( ({ email }) => email.toLowerCase() === userEmail);

console.log('ussssssser', user);


if (user=="Carlos.Toy@bmail.com") {

  
  

    


  // Meteor.call("transactions.get", user.accountId, (error, result) => {
  //   transactions = result;

  //   let MerchantLocations = [
  //     ["Tesco Express", "52.955930", "-1.177240"],
  //     ["Gucci", "52.478026", "-1.89265"],
  //     ["McDonald’s", "52.944826", "-1.162937"],
  //     ["Five Guys",  "52.935409", "-1.176690"],
  //     ["KFC", "52.927052", "-1.204132"],
  //     ["Lidl", "52.955983", "-1.183809"],
  //     ["Sainsbury’s" ,  "52.951587", "-1.172622"],
  //     ["British Airways", "51.503465", "0.049534"],
  //     ["easyJet", "52.453110", "-1.732528"],
  //     ["Esso",  "52.984762", "-1.232006"],
  //     ["BP", "52.946535", "-1.128402"],
  //     ["TKMax", "52.903411", "-1.245659"],
  //     ["Primark", "52.954013", "-1.148429"]];

  //     let envCost = {
  //       "food": 0.00100902,
  //       "clothes": 0.00024791,
  //       "tech": 0.00048663,
  //       "transport": 0.002
  //       }


  //     let newArray = {};
  //     // let newT = transactions;

  //     let callFront = (newT)=> {

  //     var len =transactions.data.Transactions.length;
  //     for (let i=0; i<len; i++){
  //       let rand = Math.floor(Math.random()*MerchantLocations.length);
  //       // transactions.data.Transactions[i].latitude = MerchantLocations[rand][1];
  //       // transactions.data.Transactions[i].longitude = MerchantLocations[rand][2];

  //       transactions.data.Transactions[i].merchant = MerchantLocations[rand][0];
  //         Meteor.call('autoML.get',MerchantLocations[rand][0], (error, result) => {
  //           console.log('transactions update error', error);
  //           transactions.data.Transactions[i].category = result;
  //           let exchangeRateGBPToUSD = 1.29;
  //           transactions.data.Transactions[i].emissions = envCost[result]*exchangeRateGBPToUSD*transactions.data.Transactions[i].amount;

  //          console.log('one transaction', newT.data.Transactions[i]);
  //          newArray[transactions.data.Transactions[i].transactionUUID] = (newT.data.Transactions[i]);
  //     } );
  //     };
  //   }
  //     callFront(transactions);


  // });
} else {
  console.log('set error 1');
  this.setState({ 'error': 'Invalid Username or Password' });
}
} catch (e) {
  console.log('set error 2', e);
  this.setState({ 'error': 'Invalid Username or Password' });
}

}, 2500);


if (!this.state.error) {

setTimeout(() => {

// console.log('it worked!!!!', user);

// console.log('it worked!!!!', transactions);

// Meteor.call('user.update', '1', { userId: user.accountId }, (error, result) => {
//   console.log('userId update error', error);
// } );

setTimeout(() => {
// console.log('it worked!!!!', transactions);
// Meteor.call('user.update', '1', {transactions}, (error, result) => {
//   console.log('transactions update error', error);
// },800);


if (!this.state.error) {
funcReplace('/overview');
}
}, 1800);

}, 100);

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

    <div className="login__logo"> 
    <img className="logo_header" src="images/logo.png"/> 
        NetZero </div> 

      <div className="login__background">
  <div className="login__mobileView">

  <div className="floatLeft login__leftContainer" width="350">
  <div className="login__topTitleLogin">Log in <Link className="login__topTitleSignup" to="/signup"> / Sign up</Link></div>
  <hr className="flex login__hrTop"/>
  <br className="clearBoth"/>

  <div className="login__allTopButtons">

  <div onClick={() => this.changeSelected('c1')} className={`${this.state.selected === 'c1' ? 'login__topButtonsSelectedCapital2' : 'login__topButtonsSelectedCapital'}`}>
  <div className="login_topButtonInner"><img className="capitalOneImage" src="images/capitalOne.jpg"/></div></div>

  <div onClick={() => this.changeSelected('st')} className={`${this.state.selected === 'st' ? 'login__topButtonsSelectedStarling2' : 'login__topButtonsSelectedStarling'}`}><div className="login_topButtonInner"><img className="starlingBankImage" src="images/starlingBank.png"/></div></div>

  <div onClick={() => this.changeSelected('cs')} className={`${this.state.selected === 'cs' ? 'login__topButtons2' : 'login__topButtons'}`}><div className="login_topButtonInner">Custom</div></div>

  </div>

  <br/>
  

  {this.state.error ? <div className="login__errorBox"><p>{this.state.error}</p></div> : undefined}

  <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">

  <div className="login__rightSubtitle">Email</div>
  <input type="email" ref="email" name="email" value="Carlos.Toy@bmail.com" onChange={() => { this.resetError()}}className="settings__mainAuthorTextArea floatLeft" />

  <div className="login__rightSubtitle">Password</div>
  <input type="password" ref="password" value="example" name="password" onChange={() => { this.resetError()}} className="settings__mainAuthorTextArea floatLeft" />

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
Meteor.subscribe('userCo');
return {

};
})(Login);

import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {BottomButtons} from './Components/BottomButtons';

import { UserCo } from '../api/userCo';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { userAlt } from '@fortawesome/free-solid-svg-icons';
import { leaf } from '@fortawesome/free-solid-svg-icons';
import { cogs } from '@fortawesome/free-solid-svg-icons';

library.add(far);
library.add(fas);

export class Settings extends React.Component {
constructor(props) {
super(props);
this.state = {
done: false,
userName: 'User Name',
checked1: true,
checked2: true,
checked3: true,
week: '<0.1t',
month: '<0.5t',
year: '<5t',
};
}
componentDidMount() {

setTimeout(() => {
this.returnUserName();
this.setState({ done: true })
}, 600);
}
returnUserName() {
let accounts = UserCo.find().fetch()[0].accounts;
// let userId = UserCo.find().fetch()[0];

// let r;

// for (let i = 0; i < accounts.length; i++) {
//   if (accounts[i].accountId === userId) {
//     r = i;
// }
// }

name = " Carlos Toy"
// let name = accounts[r].firstname + ' ' + accounts[r].lastname;

this.setState({ userName: name });

}
render() {
    return (
      <div>

            {this.state.done ? <div className="settingsPositioning">
            <div className="settingsTop">
            <img className="settings__mainImage" src="images/userImage.png"/>

            <div className="settings__topNames">
            <div className="settigns__userName">{this.state.userName}</div>
            <div className="settings__userDescription">Member since 2019<div>
            </div>
            </div>

            <br/>

            <div className="settingsList">

            <div className="settings__goals">

            <div className="offset__bottomHeaders">Set Goals 🎯</div>
            <hr className="settings__bottomHeaderHr"/>

            <div className="settings__allIndvGoals">
            <div className="clearBoth"></div>
            <div className="settings__joinInputAndText"><div className="settings__individualGoals">This Week:</div><input placeholder="<0.15t" ref="email" className="settings__mainAuthorTextArea2 floatLeft" /></div>
            <div className="clearBoth"></div>
            <div className="settings__joinInputAndText"><div className="settings__individualGoals">This Month:</div><input placeholder="<0.6t" ref="email" className="settings__mainAuthorTextArea2 floatLeft" /></div>
            <div className="clearBoth"></div>
            <div className="settings__joinInputAndText"><div className="settings__individualGoals">This Year:</div><input placeholder="<7.2t" ref="email" className="settings__mainAuthorTextArea2 floatLeft" /></div>
            </div>

            </div>

            <div className="settings__notifications">

            <div className="offset__bottomHeaders">Set Notifications 🔔</div>
            <hr className="settings__bottomHeaderHr"/>

            <div className="settings__checkmarks">
              <div className="clearBoth"></div>

              <div className="settings__moveOneCheckmark">
              <div className="feedbackCheckmark_container"><div onClick={() => { this.setState({ checked1: !this.state.checked1 })}} className="floatLeft inputSignupPage cursorDefault"><input onClick={() => { this.setState({ checked1: !this.state.checked1 })}} checked={this.state.checked1} className="feedback__signUpPageMarginRight" ref='profile' type="checkbox" name="profile" /><span className={`feedbackCheckmark`}></span><p className="feedback__inputSignupPage">Weekly Reminders</p></div></div>
              </div>



        <div className="clearBoth"></div>
        <div className="feedbackCheckmark_container"><div onClick={() => { this.setState({ checked2: !this.state.checked2 })}} className="floatLeft inputSignupPage cursorDefault"><input onClick={() => { this.setState({ checked2: !this.state.checked2 })}} checked={this.state.checked2} className="feedback__signUpPageMarginRight" ref='profile' type="checkbox" name="profile" /><span className={`feedbackCheckmark`}></span><p className="feedback__inputSignupPage">High CO2 Reminders</p></div></div>
        </div>

        <div className="clearBoth"></div>
      <div className="feedbackCheckmark_container"><div onClick={() => { this.setState({ checked3: !this.state.checked3 })}} className="floatLeft inputSignupPage cursorDefault"><input onClick={() => { this.setState({ checked3: !this.state.checked3 })}} checked={this.state.checked3} className="feedback__signUpPageMarginRight" ref='profile' type="checkbox" name="profile" /><span className={`feedbackCheckmark`}></span><p className="feedback__inputSignupPage">Low CO2 Reminders</p></div></div>
      </div>
</div>


      </div>



          {/*  <div className="settings__bottomofPage">
            <div className="settings__individualContainers"><div className="settings__option">Account</div><FontAwesomeIcon icon="user-alt" className="settings__icon" />
            </div>


            <div className="settings__individualContainers"><div className="settings__option">Privacy</div><FontAwesomeIcon icon="user-secret" className="settings__icon" />
              </div>*/}
          </div>
        <BottomButtons pageInput="settings"/>

      </div>: false}</div>
    );
  }
}

export default withTracker(() => {
return {

};
})(Settings);

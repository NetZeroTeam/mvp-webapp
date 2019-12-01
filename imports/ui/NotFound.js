import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {BottomButtons} from './Components/BottomButtons';

import createBrowserHistory from 'history/createBrowserHistory';

browserHistory = createBrowserHistory();

export class NotFound extends React.Component {
constructor(props) {
super(props);
this.state = {

};
}
componentDidMount() {
    /* Meteor.subscribe('allUsers', () => {
    Tracker.autorun(() => {

      });
    }); */
}
render() {
    return (
      <div>
            {/* <Navbar route={''} users={this.state.users} /> */}
            <h1>This is the notfound page</h1>
            {/*<Footer/>*/}
            <BottomButtons/>
      </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(NotFound);

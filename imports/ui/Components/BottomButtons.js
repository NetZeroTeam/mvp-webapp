import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { browserHistory } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

browserHistory = createBrowserHistory();

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { home } from '@fortawesome/free-solid-svg-icons';
// import { pieChart } from '@fortawesome/free-solid-svg-icons';
import { leaf } from '@fortawesome/free-solid-svg-icons';
import { cogs } from '@fortawesome/free-solid-svg-icons';

library.add(far);
library.add(fas);

export class BottomButtons extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  page: ''
};
}
findPage() {
return browserHistory.location.pathname.slice(1, browserHistory.location.pathname.length);
}
componentDidMount() {
Tracker.autorun(() => {
let location = browserHistory.location;
// this.setState({ page: this.findPage() });
});

console.log('finding', this.findPage());
}
  render() {
    return (
      <div>
      <div className="bottomButtonsTop">

      <div className="bottomButtonsBox">
      <div className="bottomButtons__centering">
      <Link to='/overview' className="BottomButtonsLink">
      <FontAwesomeIcon icon="home" className={`bottomButtons__icon ${this.findPage() === 'ov' ? "bottomButtons__iconOn" : ''}`} />
      <div className={`bottomButtons__text ${this.state.page === 'overew' ? 'bottomButtons__textOn' : ''}`}>Overview</div>
      </Link>
      </div>
      </div>

      <div className="bottomButtonsBox">
      <div className="bottomButtons__centering">
      <Link to='/insights/travel' className="BottomButtonsLink">
      <FontAwesomeIcon icon={['fas', 'chart-pie']} className={`bottomButtons__icon ${this.findPage() === 'inghts' ? "bottomButtons__iconOn" : ''}`} />
      <div className={`bottomButtons__text ${this.state.page.slice(0,7) === 'insts' ? 'bottomButtons__textOn' : ''}`}>Insights</div>
      </Link>
      </div>
      </div>

      <div className="bottomButtonsBox">
      <div className="bottomButtons__centering">
      <Link to='/offset' className="BottomButtonsLink">
      <FontAwesomeIcon icon="leaf" className={`bottomButtons__icon ${this.findPage() === 'oft' ? "bottomButtons__iconOn" : ''}`} />
      <div className={`bottomButtons__text ${this.state.page === 'oet' ? 'bottomButtons__textOn' : ''}`}>Offset</div>
      </Link>
      </div>
      </div>

      <div className="bottomButtonsBox">
      <div className="bottomButtons__centering">
      <Link to='/settings' className="BottomButtonsLink">
      <FontAwesomeIcon icon="cogs" className={`bottomButtons__icon ${this.findPage() === 'offt' ? "bottomButtons__iconOn" : ''}`} />
      <div className={`bottomButtons__text ${this.state.page === 'settgs' ? 'bottomButtons__textOn' : ''}`}>Settings</div>
      </Link>
      </div>
      </div>

      </div>

      </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(BottomButtons);

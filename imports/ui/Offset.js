import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {BottomButtons} from './Components/BottomButtons';

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

import { LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export class Offset extends React.Component {
constructor(props) {
super(props);
this.state = {
timeSelect: 'Weekly',
organisations: ['Greenpeace', 'Solutions Project', 'Solar Aid', 'Stand for Trees', 'Savory', 'Earth Justice'],
source: ['Protests', 'Renewables', 'Renewables', 'Reforestation', 'Regeneration', 'Legal'],
dollarCO2: [20, 12, 7, 10, 9, 15],
time: ['3rd Sep', '28th Aug', '14 Apr'],
organisation2: ['Solar Aid', 'Solar Aid', 'Stand for Trees'],
CO2Offset: [0.7, 0.9, 1.5],
CO2Total: [4.9, 6.3, 15],
toggleDropDown: 'dropdown-content',
data: [{name: '14/10', "CO2 Emissions": 0.85},{name: '21/10', "CO2 Emissions": 0.8}, {name:"28/10", "CO2 Emissions": 0.9}, {name:"4/11", "CO2 Emissions": 1},{name:"11/11", "CO2 Emissions": 1.03},{name:"18/11", "CO2 Emissions": 1.01}]
};
this.setWrapperRef = this.setWrapperRef.bind(this);
this.setWrapperRef2 = this.setWrapperRef2.bind(this);
this.handleClickOutside = this.handleClickOutside.bind(this);
}
componentDidMount() {
document.addEventListener('mousedown', this.handleClickOutside);
window.addEventListener('resize', this.handleResize);
}
componentWillUnmount() {
document.removeEventListener('mousedown', this.handleClickOutside);
window.removeEventListener('resize', this.handleResize);
}
handleClickOutside(e) {
if (this.wrapperRef && this.wrapperRef2 && !this.wrapperRef.contains(e.target) && !this.wrapperRef2.contains(e.target)) {
    this.setState({ toggleDropDown: 'dropdown-content' });
}
}
changeSortOptions(sort) {
if (sort === 'Weekly') {
this.setState({ timeSelect: 'Weekly' });
} else if (sort === 'Monthly') {
this.setState({ timeSelect: 'Monthly' });
} else if (sort === 'Yearly') {
this.setState({ timeSelect: 'Yearly' });
}
}
toggleDropDown() {
if (this.state.toggleDropDown === 'dropdown-content') {
this.setState({ 'toggleDropDown': 'dropdown-content1' });
} else {
this.setState({ toggleDropDown: 'dropdown-content' });
}
}
setWrapperRef(node) {
    this.wrapperRef = node;
}
setWrapperRef2(node) {
    this.wrapperRef2 = node;
}
returnTimeText() {
if (this.state.timeSelect === 'Weekly') {
  return 'Weekly Carbon Footprint';
} else if (timeSelect === 'Monthly') {
  return 'Weekly Carbon Footprint';
} else {
  return 'Yearly Carbon Footprint';
}
}
render() {
    return (
      <div className="overview__centerWindow">
          <h1 className="offsetTitleEnlarge">Offset Your Carbon Footprint♻️</h1>
          <div className="offset__somewhatTopHeader">{this.returnTimeText()}:</div><div className="offset__amount">{50}t</div>

          <div className="positionZIndexPositionsTags">
        <div className="floatRight explore__positionDropDown">
          <div className="dropdown">
            <div ref={this.setWrapperRef} onClick={this.toggleDropDown.bind(this)} className="sort__sortByButton dropbtn"><FontAwesomeIcon icon={['fas', 'sort-amount-up']} className="sort__mainIcon"/><div className="sort__mainText">Sort by</div></div>
            <div ref={this.setWrapperRef2} className={this.state.toggleDropDown}>
            <div className="dropdown-content__innerMargins">
              <div onClick={() => { this.changeSortOptions('Weekly') }} className="sort__popularContainer"><FontAwesomeIcon icon={['fas', 'stopwatch']} className={`${this.state.timeSelect === 'Weekly' ? 'sort__greenIconPop' : 'sort__popularIcon'}`}  /><div className={`${this.state.timeSelect === 'Weekly' ? 'sort__greenText' : 'sort__popularText'}`}>Weekly</div></div>
              <div className="clearBoth"></div>
              <div onClick={() => { this.changeSortOptions('Monthly') }} className=""><FontAwesomeIcon icon={['fas', 'hourglass-start']} className={`${this.state.timeSelect === 'Monthly' ? 'sort__greenIcon' : 'sort__newestIcon'}`} /><div className={`${this.state.timeSelect === 'Monthly' ? 'sort__greenText' : 'sort__newestText'}`}>Monthly</div></div>
              <div className="clearBoth"></div>
              <div onClick={() => { this.changeSortOptions('Yearly') }} className=""><FontAwesomeIcon icon={['fas', 'hourglass-end']} className={`${this.state.timeSelect === 'Yearly' ? 'sort__greenIcon' : 'sort__oldestIcon'}`} /><div className={`${this.state.timeSelect === 'Yearly' ? 'sort__greenText' : 'sort__oldestText'}`}>Yearly</div></div>
            </div></div>
          </div>
          </div>
          </div>

<div className="offset__moveLineChart">
          <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  <Line type="monotone" name="Weekly Emissions" dataKey="CO2 Emissions" stroke="#8884d8" />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
</LineChart>
</div>

          <div className="offset__bottomHeaders">Offset Your Carbon Footprint</div>
          <hr className="offset__bottomHeaderHr"/>

          <div className="offset__mainContainer">

          <div className="offset__tagsRow"><div className="offset__tags">Organisation</div><div className="offset__tags">Source</div><div className="offset__tags">$/tonne CO2</div><div className="offset__tags">Total</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank"><div className="offset__tags">Donate</div></a>
          </div>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[0]}</div><div className="offset_middleSource">{this.state.source[0]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[0]}</div><div className="offset__middleTotal">{900}</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank" className="offset__middleDonate">Donate</a>
          </div>

          <hr className="offset__middleHr"/>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[1]}</div><div className="offset_middleSource">{this.state.source[1]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[1]}</div><div className="offset__middleTotal">{900}</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank" className="offset__middleDonate">Donate</a>
          </div>

          <hr className="offset__middleHr"/>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[2]}</div><div className="offset_middleSource">{this.state.source[2]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[2]}</div><div className="offset__middleTotal">{900}</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank" className="offset__middleDonate">Donate</a>
          </div>

          <hr className="offset__middleHr"/>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[3]}</div><div className="offset_middleSource">{this.state.source[3]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[3]}</div><div className="offset__middleTotal">{900}</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank" className="offset__middleDonate">Donate</a>
          </div>

          <hr className="offset__middleHr"/>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[4]}</div><div className="offset_middleSource">{this.state.source[4]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[4]}</div><div className="offset__middleTotal">{900}</div><a href="https://carbonfund.org/carbon-offsets/" target="_blank" className="offset__middleDonate">Donate</a>
          </div>

          <hr className="offset__middleHr"/>

          <div className="offset__middleRows"><div className="offset__middleOganisation">{this.state.organisations[5]}</div><div className="offset_middleSource">{this.state.source[5]}</div><div className="offset__middleDollarTonne">{this.state.dollarCO2[5]}</div><div className="offset__middleTotal">{900}</div><div className="offset__middleDonate">Donate</div>
          </div>

          </div>

          <div className="offset__middleSpacing"></div>


          <div className="offset__bottomHeaders">Most Recent Offsets</div>
          <hr className="offset__bottomHeaderHr"/>

          <div className="offset__tagsRow"><div className="offset__tags">Time</div><div className="offset__tags">Organisation</div><div className="offset__tags">CO2 Offset (T)</div><div className="offset__tags">Total</div></div>

          <div className="offset__middleRows"><div className="offset__middleTime">{this.state.time[0]}</div><div className="offset_middleOrg">{this.state.organisation2[0]}</div><div className="offset__middletotOffset">{this.state.CO2Offset[0]}</div><div className="offset__middleTotalCost">${this.state.CO2Total[0]}</div>
          </div>

          <hr className="offset__middleOffsetHr"/>

          <div className="offset__middleRows"><div className="offset__middleTime">{this.state.time[1]}</div><div className="offset_middleOrg">{this.state.organisation2[1]}</div><div className="offset__middletotOffset">{this.state.CO2Offset[1]}</div><div className="offset__middleTotalCost">${this.state.CO2Total[1]}</div>
          </div>

          <hr className="offset__middleOffsetHr"/>

          <div className="offset__middleRows"><div className="offset__middleTime">{this.state.time[2]}</div><div className="offset_middleOrg">{this.state.organisation2[2]}</div><div className="offset__middletotOffset">{this.state.CO2Offset[2]}</div><div className="offset__middleTotalCost">${this.state.CO2Total[2]}</div>
          </div>

            <div className="offset__bottomSpacing"></div>


            <BottomButtons pageInput="offset"/>
            </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(Offset);

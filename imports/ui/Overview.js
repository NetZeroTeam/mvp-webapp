import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { LineChart, Pie, Legend, PieChart, Cell, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import {BottomButtons} from './Components/BottomButtons';

import {UserCo} from '../api/userCo';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(far);
library.add(fas);

export class Overview extends React.Component {
constructor(props) {
super(props);
this.state = {

userName: '',

timeSelect: 'Weekly',
toggleDropDown: 'dropdown-content',
colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
data: [{name: 'Tech 💾', "CO2 Emissions": 8},{name: 'Food 🥘', "CO2 Emissions": 35}, {name:"Travel ✈️", "CO2 Emissions": 50}, {name:"Clothes 👚", "CO2 Emissions": 7}]
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
componentDidMount() {
Meteor.subscribe('userCo');

setTimeout(() => {
this.returnUserName();
this.setState({ done: true })
}, 600);
}
returnUserName() {
let accounts = UserCo.find().fetch()[0].accounts;
let userId = UserCo.find().fetch()[0].userId;

console.log('accounts', accounts);
console.log('userId', userId);

let r;

for (let i = 0; i < accounts.length; i++) {
  if (accounts[i].accountId === userId) {
    r = i;
}
}

console.log('r', r);

let name = "Carlos";
// let name = accounts[r].firstname;

this.setState({ userName: ' ' + name });

};
returnTransactions() {

return UserCo.find().fetch()[0].transactions;
}
render() {
    return (

      // <div>{this.state.done ?
        <div>
        <div className="overview__centerWindow">
            <h1 className="overview__welcomeBackHeader">Hey! Welcome back {this.state.userName}! 👋</h1>

<PieChart dataKey="CO2 Emissions" nameKey="name" width={600} height={250}>
        <Pie
          data={this.state.data}
          cx={'50%'}
          cy={'50%'}
          labelLine={false}
          outerRadius={80}
          innerRadius={60}
          fill="#8884d8"
          dataKey="CO2 Emissions"
        >
          {
            this.state.data.map((entry, index) => <Cell dataKey="CO2 Emissions" key={`cell-${index}`} fill={this.state.colors[index % this.state.colors.length]} />)
          }
        </Pie>
        <CartesianGrid stroke="#cfcfcf" strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
      </PieChart>


            <div className="offset__bottomHeaders">Recent</div>
            <hr className="offset__bottomHeaderHr"/>

            <div className="positionZIndexPositionsTagsPositioningOverview">
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

            <div className="overview__mainContainer">

            <div className="offset__tagsRow">
              <div className="offset__tags w60">Category</div>
              <div className="offset__tags w32">Price</div>
              <div className="offset__tags w32">CO2 Emissions</div>
              <div className="offset__tags w32">Total</div>
              <div className="offset__tags marginRight w32 leftMargin100">Donate</div>
            </div>

          
           {UserCo.find().fetch()[0].transactions.map((tran)=>{
            return <div key={tran[0]} className="offset__tagsRow">
                        <div className="offset__tags w60" >{tran[2]}</div>
                        <div className="offset__tags w32">{tran[0] ? tran[0].toFixed(2):tran[0]}</div>
                        <div className="offset__tags w32">{tran[3] ? tran[3].toFixed(2):tran[3]}</div>
                        <div className="offset__tags w32">{(tran[3]+tran[0])?(tran[3]+tran[0]).toFixed(2):(tran[3]+tran[0])}</div>
                        <div className="offset__middleDonate">Donate</div>
                        </div>
            })}

            {/* 
               
              
              
              
              
              
              
              
              
              
              UserCo.find().fetch()[0].transactions.data.Transactions.map((tran)=>{
            return <div key={tran.transactionUUID} className="offset__tagsRow">
                        <div className="offset__tags w60" >{tran.category}</div>
                        <div className="offset__tags">{tran.amount ? tran.amount.toFixed(2):tran.amount}</div>
                        <div className="offset__tags w60">{tran.emissions ? tran.emissions.toFixed(2):tran.emissions}</div>
                        <div className="offset__tags">{(tran.emissions*12)?(tran.emissions*12).toFixed(2):(tran.emissions*12)}</div>
                        <div className="offset__middleDonate">Donate</div>
                        </div>
            })*/}

            {/*
            {UserCo.find().fetch()[0].transactions.data.Transactions.map((tran)=>{
              return <div key={tran.transactionUUID}> {tran.merchant}</div>

            })}


           {/*


     {<div>{JSON.stringify(UserCo.find().fetch()[0].transactions.data.Transactions)}</div>}


            this.returnTransactions.map((transaction) => {
           <Link to={creator.profileUrl} key={creator._id} className="creatorContainer">
           <img src={creator.profilePhoto ? creator.profilePhoto : 'images/noImage.png'} className="creatorImageBelowCategories" />
           <div className="creatorNameCatContainer">{creator.username.length > 18 ? creator.username.slice(0, 18) + '...' : creator.username}</div>
           <div className="joinedDateAuthorCat">{`Joined ${moment(creator.joinDate).format('MMMM YYYY')}`}</div>
           <div className="authorDescriptionBelowContainer">{creator.description.length > 67 ? creator.description.slice(0, 67) + '...' : creator.description}</div>
           </Link>
          })*/}


      <div className="overview__bottomSpacing"></div>

       <div className="offset__bottomHeaders">Categories</div>
       <hr className="offset__bottomHeaderHr" />

       <div className="offset__tagsRow"><div className="offset__tags">Name</div><div className="offset__tags">Total Emissions</div><div className="offset__tags">% of Emissions</div><div className="offset__tags">View</div>
       </div>
       </div>


       </div>
            <BottomButtons pageInput="overview" />
      </div>
      // : undefined }
      // </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(Overview);

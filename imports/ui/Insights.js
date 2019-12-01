import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {BottomButtons} from './Components/BottomButtons';
import {UserCo} from '../api/userCo';

import { AreaChart, LineChart, Legend, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { funcReplace } from '../routes/routes.js';

import createBrowserHistory from 'history/createBrowserHistory';

browserHistory = createBrowserHistory();

library.add(far);
library.add(fas);

export class Insights extends React.Component {
constructor(props) {
super(props);
this.state = {
timeSelect: 'Weekly',
categ: "transport",
toggleDropDown: 'dropdown-content',
categorySelect: 'Travel ✈️',
icon: ' ✈️',
toggleCategoryDropDown: 'dropdown-contentc',
data: [{name: '14/10', "CO2 Emissions": 0.25},{name: '21/10', "CO2 Emissions": 0.2}, {name:"28/10", "CO2 Emissions": 0.15}, {name:"4/11", "CO2 Emissions": 0.45},{name:"11/11", "CO2 Emissions": 0.18},{name:"18/11", "CO2 Emissions": 0.3}]
};
this.setWrapperRef = this.setWrapperRef.bind(this);
this.setWrapperRef2 = this.setWrapperRef2.bind(this);
this.setWrapperRef3 = this.setWrapperRef3.bind(this);
this.setWrapperRef4 = this.setWrapperRef4.bind(this);
this.handleClickOutside = this.handleClickOutside.bind(this);
}
loadComponentData(){
  let dataArr  = []
  for(let i=0;i<UserCo.find().fetch()[0].transactions.length;i++){
    console.log(UserCo.find().fetch()[0].transactions[i]);
    if(UserCo.find().fetch()[0].transactions[i][2]== this.state.categ){
      let timestamp = UserCo.find().fetch()[0].transactions[i][4];
      let emissions = UserCo.find().fetch()[0].transactions[i][3];
      dataArr.push({name:timestamp,"CO2 Emissions":emissions});
    }
  }



  // let dataArr  = []
  // for(let i=0;i<UserCo.find().fetch()[0].transactions.data.Transactions.length;i++){
  //   console.log(UserCo.find().fetch()[0].transactions.data.Transactions[i].category);
  //   if(UserCo.find().fetch()[0].transactions.data.Transactions[i].category == this.state.categ){
  //     let timestamp = UserCo.find().fetch()[0].transactions.data.Transactions[i].timestamp.split(" ")[0].split("-").slice(1, 3).reverse().join("/");
  //     let emissions = UserCo.find().fetch()[0].transactions.data.Transactions[i].emissions;
  //     dataArr.push({name:timestamp,"CO2 Emissions":emissions});
  //   }
  // }
  console.log("DATA ARR",dataArr);
  if(dataArr.length>0){
    this.setState({"data":dataArr});
  }

}

componentDidMount() {

this.loadComponentData();
document.addEventListener('mousedown', this.handleClickOutside);
console.log(this.findCategory());

this.setState({ categorySelect: this.findFullText() });
}
componentWillUnmount() {
document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(e) {
if (this.wrapperRef && this.wrapperRef2 && !this.wrapperRef.contains(e.target) && !this.wrapperRef2.contains(e.target)) {
    this.setState({ toggleDropDown: 'dropdown-content' });
    console.log('it was also clicked');
}
if (this.wrapperRef3 && this.wrapperRef4 && !this.wrapperRef3.contains(e.target) && !this.wrapperRef4.contains(e.target)) {
    this.setState({ toggleCategoryDropDown: 'dropdown-contentc' });
    console.log('it was clicked!!!');
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
changeCategorySortOptions(sort) {
if (sort === 'Food 🥘') {
browserHistory.replace('/insights/food');
this.setState({ categorySelect: 'Food 🥘' });
} else if (sort === 'Tech 💾') {
browserHistory.replace('/insights/tech');
this.setState({ categorySelect: 'Tech 💾' });
} else if (sort === 'Travel ✈️') {
browserHistory.replace('/insights/travel');
this.setState({ categorySelect: 'Travel ✈️' });
} else if (sort === 'Clothes 👚') {
browserHistory.replace('/insights/clothes');
this.setState({ categorySelect: 'Clothes 👚' });
}
}
toggleDropDown() {
if (this.state.toggleDropDown === 'dropdown-content') {
this.setState({ 'toggleDropDown': 'dropdown-content1' });
} else {
this.setState({ toggleDropDown: 'dropdown-content' });
}
}
toggleCategoryDropDown() {
if (this.state.toggleCategoryDropDown === 'dropdown-contentc') {
this.setState({ 'toggleCategoryDropDown': 'dropdown-content1c' });
} else {
this.setState({ toggleCategoryDropDown: 'dropdown-contentc' });
}
}
setWrapperRef(node) {
    this.wrapperRef = node;
}
setWrapperRef2(node) {
    this.wrapperRef2 = node;
}
setWrapperRef3(node) {
    this.wrapperRef3 = node;
}
setWrapperRef4(node) {
    this.wrapperRef4 = node;
}
findIcon(category) {
 if (category === 'food') {
  this.setState({'categ':'food'});
  this.setState({'icon':'🥘'});
   return '🥘';
 } else if (category === 'travel') {
  this.setState({'categ':'transport'});
  this.setState({'icon':'✈️'});
   return '✈️';
 } else if (category === 'tech') {
  this.setState({'categ':'tech'});
  this.setState({'icon':'💾'});
   return '💾'
 } else if (category === 'clothes') {
  this.setState({'categ':'clothes'});
  this.setState({'icon':'👚'});
   return '👚';
 }
}
findCategory() {
console.log(browserHistory.location.pathname.slice(10, browserHistory.location.pathname.length));
return browserHistory.location.pathname.slice(10, browserHistory.location.pathname.length);
}
findFullText(){
return this.capitaliseCategory(this.findCategory()) + ' ' + this.state.icon;
ret
}
capitaliseCategory(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
returnTitle() {
return this.capitaliseCategory(this.state.categ) + ' ' + this.state.icon;
}
render() {
    return (
      <div className="overview__centerWindow">
            <h1 className="insight__topHeader">{this.returnTitle()}</h1>

            <div className="positionZIndexPositionsTagsMoveRight">
          <div className="floatRight explore__positionDropDown">
            <div className="dropdownc">
              <div ref={this.setWrapperRef3} onClick={this.toggleCategoryDropDown.bind(this)} className="insights__sortByButton dropbtn"><FontAwesomeIcon icon={['fas', 'sort-amount-up']} className="insights__mainIcon"/><div className="sort__mainText">{this.state.categorySelect}</div></div>
              <div ref={this.setWrapperRef4} className={this.state.toggleCategoryDropDown}>
              <div className="dropdown-content__innerMargins">
                <div onClick={() => { this.changeCategorySortOptions('Travel ✈️') }} className="sort__popularContainer"><div className={`${this.state.categorySelect === 'Travel ✈️' ? 'sort__blackText' : 'sort__popularText'}`}>Travel ✈️</div></div>
                <div className="clearBoth"></div>
                <div onClick={() => { this.changeCategorySortOptions('Food 🥘') }} className=""><div className={`${this.state.categorySelect === 'Food 🥘' ? 'sort__blackText' : 'sort__newestText'}`}>Food 🥘</div></div>
                <div className="clearBoth"></div>
                <div onClick={() => { this.changeCategorySortOptions('Tech 💾') }} className=""><div className={`${this.state.categorySelect === 'Tech 💾' ? 'sort__blackText' : 'sort__oldestText'}`}>Tech 💾</div></div>
                <div className="clearBoth"></div>
                <div onClick={() => { this.changeCategorySortOptions('Clothes 👚') }} className=""><div className={`${this.state.categorySelect === 'Clothes 👚' ? 'sort__blackText' : 'sort__oldestText'}`}>Clothes 👚</div></div>
              </div></div>
            </div>
            </div>
            </div>

            <div className="insights__moveLineChart">
                      <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" name="Weekly Transport Emissions" dataKey="CO2 Emissions" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
            </LineChart>

            </div>

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

            <div className="offset__tagsRow"><div className="offset__tags">Time</div><div className="offset__tags">Merchant</div><div className="offset__tags">Price</div><div className="offset__tags">CO2 Emissions</div>
            </div>

            {UserCo.find().fetch()[0].transactions.map((tran)=>{

              return ( tran[2] == this.state.categ ? <div key={tran[0]} className="offset__tagsRow">
                 <div className="offset__tags w32">{tran[4]}</div>
                        <div className="offset__tags w60">{tran[1]}</div>
                        <div className="offset__tags w32">{tran[0]}</div>
                        <div className="offset__tags w60">{tran[3].toFixed(2)}</div>

                        </div>: undefined);

            })}

            {/* this.returnTransactions.map((creator) => {
             <Link to={creator.profileUrl} key={creator._id} className="creatorContainer">
             <img src={creator.profilePhoto ? creator.profilePhoto : 'images/noImage.png'} className="creatorImageBelowCategories" />
             <div className="creatorNameCatContainer">{creator.username.length > 18 ? creator.username.slice(0, 18) + '...' : creator.username}</div>
             <div className="joinedDateAuthorCat">{`Joined ${moment(creator.joinDate).format('MMMM YYYY')}`}</div>
             <div className="authorDescriptionBelowContainer">{creator.description.length > 67 ? creator.description.slice(0, 67) + '...' : creator.description}</div>
             </Link>
            })
         */}

            </div>

            <div className="insights__bottomSpacing"></div>

            <BottomButtons pageInput="overview"/>
      </div>
    );
  }
}

export default withTracker(() => {
return {

};
})(Insights);

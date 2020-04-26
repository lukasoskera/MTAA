import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, MemoryRouter} from 'react-router-dom';

import AddNews from './AddNews';
import AllNews from './AllNews';
import NewsId from './NewsId';
import AddEvents from './AddEvents';
import AllEvents from './AllEvents';
import EventsId from './EventsId'; 
import EditEvent from './EditEvent';
import Homescreen from './Homesreen';
import RegisterUser from './RegisterUser';
import EditNews from './EditNews';
import getProfile from './getProfile';
import editProfile from './editProfile';

export default class App extends React.Component{

  render(){

    return(
      <MemoryRouter>
        <Switch>
            <Route exact path='/allnews' component={AllNews}/> 
            <Route exact path='/addnews' component={AddNews}/> 
            <Route exact path='/newsid/:id' component={NewsId}/>
            <Route exact path='/' component={Homescreen}/>
            <Route exact path='/register' component={RegisterUser}/>  
            <Route exact path='/allevents' component={AllEvents}/> 
            <Route exact path='/addevents' component={AddEvents}/> 
            <Route exact path='/eventsid/:id' component={EventsId}/>
            <Route exact path='/editevent/:id' component={EditEvent}/>
            <Route exact path='/editnews/:id' component={EditNews}/>
            <Route exact path='/profile' component={getProfile}/>
            <Route exact path='/editProfile' component={editProfile}/>
        </Switch>
      </MemoryRouter>
    );
  }
}


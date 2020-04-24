import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, MemoryRouter} from 'react-router-dom';

import AddEvents from './AddEvents';
import AllEvents from './AllEvents';
import EventsId from './EventsId'; 
import EditEvent from './EditEvent';
import Homescreen from './Homesreen';
import RegisterUser from './RegisterUser'

export default class App extends React.Component{

  render(){

    return(
      <MemoryRouter>
        <Switch>
            <Route exact path='/' component={Homescreen}/>
            <Route exact path='/register' component={RegisterUser}/>  
            <Route exact path='/allevents' component={AllEvents}/> 
            <Route exact path='/addevents' component={AddEvents}/> 
            <Route exact path='/eventsid/:id' component={EventsId}/>
            <Route exact path='/editevent/:id' component={EditEvent}/>
        </Switch>
      </MemoryRouter> 
    );
  }
}

import React from "react";
import {Header, Icon, Text, Button} from 'react-native-elements';
import { View, ActivityIndicator} from "react-native";
import axios from 'axios';
import ReactDOM from 'react-dom';
// import React, { Component } from 'react';



export default class EventsId extends React.Component{
    
    state={
        id:'',
        loading : 1, 
        events :null,
    }

    componentWillMount() {
        const id = this.props.match.params.id
        axios.get('http://127.0.0.1:3000/events/' + id).then((response) => {
            this.setState({
                loading: 0, events: response.data, id: response.data[0].id
            })
        });
      }

    onClick = () => {
        console.log('ahoj')
        //console.log(this.props.match.params.id);
        this.props.history.push("/allevents");
    }

    deleteEvents () {
        const id = this.state.id
        console.log('ahoj id ', id)
        axios.delete('http://127.0.0.1:3000/events/' + id).then((response) => {
            console.log('ahoj response')
        });
        setTimeout(this.onClick, 1000);
      }
    
    editEvents = (x) => {
        var path = '/editevent/';
        var id = (x.id).toString();
        this.props.history.push(path.concat(id));
    }
    
    render(){
        const isLoading = this.state.loading;
        let zobraz;
        if (isLoading) {
            zobraz = <ActivityIndicator size="large" color="#0000ff" />;
          } else {
            zobraz = <View><Text>{this.state.events[0].id}</Text><Text>{this.state.events[0].title}</Text><Text>{this.state.events[0].description}</Text></View>;
          }

        return(
            <View>

            <Header
                containerStyle={{
                backgroundColor: 'lightgreen',
                justifyContent: 'space-around',
                }}
                leftComponent={ <Icon name= 'undo' color = 'black' onClick={this.onClick}/>}
                centerComponent={{ text: 'Nadpis udalosti', style: { color: 'black' } }}
                rightComponent={ <Icon name= 'clear' color = 'black' onClick={() => this.deleteEvents()}/>}
            />
            
            <View>
                {zobraz}
            </View>
            <Button title={"Edit Event"} onPress={() => this.editEvents(this.state.events[0])}/>

            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
            <Icon name= 'storage' color = 'black' onClick={this.onClick}/>
            <Icon name= 'today' color = 'black' onClick={this.onClick}/>
            <Icon name= 'person' color = 'black' onClick={this.onClick}/>
            </View>
            
            </View>
    
        );
    }   
}
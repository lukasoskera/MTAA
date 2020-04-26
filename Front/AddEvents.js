import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import axios from 'axios';


export default class AddEvents extends React.Component{
    state = { 
        title: '',
        date: '',
        time: '',
        capacity: '',
        points: '',
        type: '',
        adress: '',
        description: '',
    }

    AddEvents = () => {
     if(this.state.title == '' || this.state.date == '' || this.state.time == '' || this.state.capacity == '' || this.state.points == '' || this.state.type == '' || this.state.adress == '' || this.state.description == '') {
       Alert.alert(
      'Yo fokd up m8',
      'Provid all filds',
      [
        {text: 'Sure thing m8'},
      ],
      {cancelable: true},
    );}
     else{
        axios.post('http://192.168.100.23:3000/events?', {
          body: JSON.stringify({
            title: this.state.title,
            when_date: this.state.date,
            when_time: this.state.time,
            capacity: this.state.capacity,
            points: this.state.points,
            type: this.state.type,
            adress: this.state.adress,
            description: this.state.description,
          })
        }).then((response) => {
          let { events } = this.state;
          events.push(response.data);
          this.setState({ events,  
            title: '',
            when_date: '',
            when_time: '',
            capacity: '',
            points: '',
            type: '',
            adress: '',
            description: '',  
          });
        });
        console.log('niiiieeeeco')
        Alert.alert(
          'Yo got it right m8',
          'U can continue now',
          [
            {text: 'Lemme back on eventz', onPress: () => setTimeout(this.onClick, 1000)},
          ],
          {cancelable: true},
        );
     
      }  }

    onClick = () => {
        this.props.history.push("/allevents"); 
      }

    handleTitle = (text) => {
      this.setState({ title: text })
      }

    handleDate = (text) => {
      this.setState({ date: text })
      }

    handleTime = (text) => {
      this.setState({ time: text })
      }

    handleCapacity = (text) => {
      this.setState({ capacity: text })
      }

    handlePoints = (text) => {
      this.setState({ points: text })
      }

    handleType = (text) => {
      this.setState({ type: text })
      }

    handleAdress = (text) => {
      this.setState({ adress: text })
      }

    handleDescription = (text) => {
      this.setState({ description: text })
      }

    render(){ 
        return(
          <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>

            <View  style={{flex:1, width:'100%', marginBottom:15}}>
              <Header
                  containerStyle={{
                  backgroundColor: 'lightgreen',
                  justifyContent: 'space-around',
                  }}
                  leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.onClick}/>}
                  centerComponent={{ text: 'Pridaj udalost', style: { color: 'black' } }}
              />
            </View>

            <View style={{flex:8, width:'100%'}}>
              <ScrollView>
                <Text>Title</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Title"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleTitle}/>
              
                <Text>Date</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Date"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleDate}/>

                <Text>Time</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Time"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleTime}/>

                <Text>Capacity</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Capacity"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleCapacity}/>

                <Text>Points</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Points"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handlePoints}/>

                <Text>Type</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Type"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleType}/>

                <Text>Adress</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Adress"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleAdress}/>

                <Text>Description</Text>
                <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Description"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleDescription}/>
              </ScrollView>
            </View>

          
            <View style={{width:'100%',  backgroundColor:'lightgreen', height:40}}>
            <Button style={{width:'100%'}} title={"Add Event"} onPress={this.AddEvents}/>
            </View>
            
            </View>
    
        );
    }   
}
import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View, ScrollView, Text, TextInput } from "react-native";
import axios from 'axios';


export default class RegisterUser extends React.Component{
    state = { 
      username: '',
      password: '',
      rights: 0,
      points: 0,
      adress: '',  
    }

    AddUser = () => {
        console.log(this.state.newUser)
        axios.post('http://192.168.100.23:3000/users', {
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            rights: this.state.rights,
            points: this.state.points,
            adress: this.state.adress,
          })
        }).then((response) => {
          this.setState({ newUser: {
            username: '',
            password: '',
            adress: '',
          }});
        });
        console.log('niiiieeeeco pekne')     
       setTimeout(this.onClick, 1000);
      }  

    onClick = () => {
        this.props.history.push("/"); 
      }

    handleName = (text) => {
      this.setState({ username: text })
      }

    handlePassword = (text) => {
      this.setState({ password: text })
      }

    handleAdress = (text) => {
      this.setState({ adress: text })
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
                centerComponent={{ text: 'Create your account!', style: { color: 'black' } }}
            />
          </View>

          <View style={{flex:8, width:'100%'}}>
            <ScrollView>
              <Text>Userame</Text>
              <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleName}/>

              <Text>Password</Text>
              <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword}/>

              <Text>Adress</Text>
              <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                underlineColorAndroid = "transparent"
                placeholder = "Adress"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleAdress}/>
            </ScrollView>
          </View>


            
            <View style={{width:'100%',  backgroundColor:'lightgreen', height:40}}>
            <Button style={{width:'100%'}} title={"Register"} onPress={this.AddUser}/>
            </View>
            </View>
    
        );
    }   
}
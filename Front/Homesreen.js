import React from "react";
import {Header, Button, Text} from 'react-native-elements';
import {View , TextInput} from "react-native";
import axios from 'axios';

export default class Homescreen extends React.Component{
    
    state={
      username: '',
      password: '',
    }

    LogUser = () => {
        console.log(this.state)
        axios.get('http://192.168.100.23:3000/users/'+ this.state.username +'/'+ this.state.password).then((response) => {
            console.log('niiiieeeeco')
          this.setState({ 
            username: '',
            password: '',
          });
        });
        console.log('niiiieeeeco')
        setTimeout(this.onClick, 1000);
      }  

    onClick = () => {
      this.props.history.push("/allnews");
      }

    register = () => {
      this.props.history.push("/register");
      }

    handleUsername = (text) => {
      this.setState({ username: text })
      }

    handlePassword = (text) => {
      this.setState({ password: text })
      }
    
    render(){
        return(
            <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>

               <View style={{flex:1, width:'100%'}}>
                  <Header
                      containerStyle={{
                      backgroundColor: 'lightgreen',
                      justifyContent: 'space-around',
                      }}
                      centerComponent={{ text: 'Prihlásenie', style: { color: 'black' } }}
                  />
                </View>

                <View style={{flex:8 ,width:'100%',alignItems: "center", justifyContent:"center"}}>

                  <View style={{width:'80%'}}>
                    <Text style={{alignSelf:'flex-start'}}>username</Text>
                    <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                      underlineColorAndroid = "transparent"
                      placeholder = "Username"
                      placeholderTextColor = "#9a73ef"
                      autoCapitalize = "none"
                      onChangeText = {this.handleUsername}/>
                  
                    <Text>password</Text>
                    <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                      underlineColorAndroid = "transparent"
                      placeholder = "Password"
                      placeholderTextColor = "#9a73ef"
                      autoCapitalize = "none"
                      onChangeText = {this.handlePassword}/>
                  

  
                    <View style={{width:'70%', alignSelf:'center'}}>
                      <Button title={"Login"} onPress={this.LogUser}/>
                      <Text>Or create a new account.</Text>
                      <Button title={"Register"}  onPress={this.register}/>
                    </View>
                  </View>
                </View>
        
                <View style={{flexDirection: 'row',width:'100%', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}/>
        
            </View>  
        );
    }       
}


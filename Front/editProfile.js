import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View,Text, TextInput, ScrollView } from "react-native";
import axios from 'axios';


export default class EditNews extends React.Component{

    state = {  
      username:'',
      password:'',
    }


    updateProfile = () => {
        axios.put('http://192.168.100.23:3000/users/' , {
         body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then((response) => {
            this.setState({
                username: '',
                password: ''
            });
        });
        console.log('niiiieeeeco')
        setTimeout(this.onClick, 1000);
    }
    
    onClick = () => {
      this.props.history.push('/profile');
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

          <View  style={{flex:1, width:'100%', marginBottom:15}}> 
            <Header
                containerStyle={{
                backgroundColor: 'lightgreen',
                justifyContent: 'space-around',
                }}
                leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.onClick}/>}
                centerComponent={{ text: 'Uprav profil', style: { color: 'black' } }}
            />
          </View>

          <View style={{flex:8, width:'100%'}}>
            <ScrollView>

                    <Text>Username</Text>
                    <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                    underlineColorAndroid = "transparent"
                    placeholder = "Username"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleUsername}/>

                    <Text>Password</Text>
                    <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword}/>
           
            </ScrollView>
         </View>    
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
            <Button title={"Update profile"} onPress={this.updateProfile}/>
            </View>
            
            </View>
    
        );
    }   
}
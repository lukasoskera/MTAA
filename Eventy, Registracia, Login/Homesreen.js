import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View } from "react-native";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, CardTitle} from 'reactstrap';

export default class Homescreen extends React.Component{
    
    state={
        Login_params: {
            username: '',
            password: '',
        },
    }

    LogUser = () => {
        console.log(this.state.Login_params)
        axios.get('http://127.0.0.1:3000/users/'+ this.state.Login_params.username +'/'+ this.state.Login_params.password).then((response) => {
            console.log('niiiieeeeco')
          this.setState({ Login_params: {
            username: '',
            password: '',
          }});
        });
        console.log('niiiieeeeco')
        setTimeout(this.onClick, 1000);
      }  

    onClick = () => {
        //console.log(this.props)
        this.props.history.push("/allevents");
      }

    register = () => {
        //console.log(this.props)
        this.props.history.push("/register");
      }
    
    render(){
        return(
            <View>

            <Header
                containerStyle={{
                backgroundColor: 'lightgreen',
                justifyContent: 'space-around',
                }}
                leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.onClick}/>}
                centerComponent={{ text: 'Log In', style: { color: 'black' } }}
            />

        <View style={{alignItems: "center"}}>
            <FormGroup>
                    <br></br>
                    <Label for="username">username</Label>
                    <br></br>
                    <Input id="username" value={this.state.Login_params.username} onChange={(e) => {
                      let { Login_params } = this.state;
                      Login_params.username = e.target.value;
                      this.setState({ Login_params });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="password">password</Label>
                    <br></br>
                    <Input id="password" value={this.state.Login_params.password} onChange={(e) => {
                      let { Login_params } = this.state;
                      Login_params.password = e.target.value;
                      this.setState({ Login_params });
                    }}/>
            </FormGroup>
            <Button title={"Login"} style={{ width: 200}} onPress={this.LogUser}/>
            <br></br>
            <p>Or create a new account.</p>
            <br></br>
            <Button title={"Register"} style={{ width: 200}} onPress={this.register}/>
        </View>

            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
            <Icon name= 'storage' color = 'black' onClick={this.onClick}/>
            <Icon name= 'today' color = 'black' onClick={this.onClick}/>
            <Icon name= 'person' color = 'black' onClick={this.onClick}/>
            </View>
            
            </View>
    
        );
    }  
     
}


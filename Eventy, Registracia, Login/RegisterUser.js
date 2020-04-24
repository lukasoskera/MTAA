import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View } from "react-native";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, CardTitle} from 'reactstrap';


export default class RegisterUser extends React.Component{
    state = { 
        newUser: {
            username: '',
            password: '',
            rights: '',
            points: '',
            adress: '',
          },
    }

    AddUser = () => {
        console.log(this.state.newUser)
        axios.post('http://127.0.0.1:3000/users?', {
          body: JSON.stringify({
            username: this.state.newUser.username,
            password: this.state.newUser.password,
            rights: this.state.newUser.rights,
            points: this.state.newUser.points,
            adress: this.state.newUser.adress,
          })
        }).then((response) => {
          this.setState({ newUser: {
            username: '',
            password: '',
            rights: '',
            points: '',
            adress: '',
          }});
        });
        console.log('niiiieeeeco pekne')     
       setTimeout(this.onClick, 1000);
      }  

    onClick = () => {
        //console.log(this.props)
        this.props.history.push("/"); 
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
                centerComponent={{ text: 'Create your account!', style: { color: 'black' } }}
            />

            <View>
            <FormGroup>
                    <Label for="username">username</Label>
                    <br></br>
                    <Input id="username" value={this.state.newUser.usename} onChange={(e) => {
                      let { newUser } = this.state;
                      newUser.username = e.target.value;
                      this.setState({ newUser });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="password">password</Label>
                    <br></br>
                    <Input id="password" value={this.state.newUser.password} onChange={(e) => {
                      let { newUser } = this.state;
                      newUser.password = e.target.value;
                      this.setState({ newUser });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="rights">rights</Label>
                    <br></br>
                    <Input id="rights" value={this.state.newUser.rights} onChange={(e) => {
                      let { newUser } = this.state;
                      newUser.rights = e.target.value;
                      this.setState({ newUser });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="points">points</Label>
                    <br></br>
                    <Input id="points" value={this.state.newUser.points} onChange={(e) => {
                      let { newUser } = this.state;
                      newUser.points = e.target.value;
                      this.setState({ newUser });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="adress">adress</Label>
                    <br></br>
                    <Input id="adress" value={this.state.newUser.adress} onChange={(e) => {
                      let { newUser } = this.state;
                      newUser.adress = e.target.value;
                      this.setState({ newUser });
                    }}/>
            </FormGroup>
            <Button title={"Register"} onPress={this.AddUser}/>
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
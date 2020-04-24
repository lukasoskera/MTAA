import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View } from "react-native";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, CardTitle} from 'reactstrap';


export default class AddEvents extends React.Component{
    state = { 
        events: [],
        newEventData: {
            title: '',
            when_date: '',
            when_time: '',
            capacity: '',
            points: '',
            type: '',
            adress: '',
            description: '',
            modified: '',
          },
    }

    AddEvents = () => {
        console.log(this.state.newEventData)
        console.log(this.state.newEventData.description)
        axios.post('http://127.0.0.1:3000/events?', {
          body: JSON.stringify({
            title: this.state.newEventData.title,
            when_date: this.state.newEventData.when_date,
            when_time: this.state.newEventData.when_time,
            capacity: this.state.newEventData.capacity,
            points: this.state.newEventData.points,
            type: this.state.newEventData.type,
            adress: this.state.newEventData.adress,
            description: this.state.newEventData.description,
            modified: this.state.newEventData.modified,
          })
        }).then((response) => {
          let { events } = this.state;
          events.push(response.data);
          this.setState({ events,  newEventData: {
            title: '',
            when_date: '',
            when_time: '',
            capacity: '',
            points: '',
            type: '',
            adress: '',
            description: '',
            modified: '',
          }});
        });
        console.log('niiiieeeeco')
       setTimeout(this.onClick, 1000);
      }  

    onClick = () => {
        //console.log(this.props)
        this.props.history.push("/allevents"); 
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
                centerComponent={{ text: 'Pridaj udalost', style: { color: 'black' } }}
            />

            <View>
            <FormGroup>
                    <Label for="title">title</Label>
                    <br></br>
                    <Input id="title" value={this.state.newEventData.title} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.title = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="when_date">when_date</Label>
                    <br></br>
                    <Input id="when_date" value={this.state.newEventData.when_date} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.when_date = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="when_time">when_time</Label>
                    <br></br>
                    <Input id="when_time" value={this.state.newEventData.when_time} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.when_time = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="capacity">capacity</Label>
                    <br></br>
                    <Input id="capacity" value={this.state.newEventData.capacity} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.capacity = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="points">points</Label>
                    <br></br>
                    <Input id="points" value={this.state.newEventData.points} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.points = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="type">type</Label>
                    <br></br>
                    <Input id="type" value={this.state.newEventData.type} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.type = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="adress">adress</Label>
                    <br></br>
                    <Input id="adress" value={this.state.newEventData.adress} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.adress = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="description">description</Label>
                    <br></br>
                    <Input id="description" value={this.state.newEventData.description} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.description = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <FormGroup>
                    <Label for="modified">modified</Label>
                    <br></br>
                    <Input id="modified" value={this.state.newEventData.modified} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.modified = e.target.value;
                      this.setState({ newEventData });
                    }}/>
            </FormGroup>
            <Button title={"Add Event"} onPress={this.AddEvents}/>
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
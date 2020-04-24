import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View } from "react-native";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, CardTitle} from 'reactstrap';

export default class EditEvent extends React.Component{

    state = {
        newEventData: {
            capacity: '',
          },
    }
  //    editEvent = (id, title, when_date, when_time, capacity, points, type, adress, description, modified) =>{
  //      this.setState({
  //        newEventData: { id, title, when_date, when_time, capacity, points, type, adress, description, modified }
  //      });
  //    }

    updateEvent = () => {
        const id = this.props.match.params.id
        axios.put('http://127.0.0.1:3000/events/' + id + '?', {
         body: JSON.stringify({
          capacity: this.state.newEventData.capacity,
        })
      }).then((response) => {
            this.setState({ newEventData: {
              capacity: '',
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
                centerComponent={{ text: 'Uprav článok', style: { color: 'black' } }}
            />

        <View>
            <p>You can change the capacity of this event.</p>
            <FormGroup>
                    <Label for="capacity">capacity</Label>
                    <br></br>
                    <Input id="capacity" value={this.state.newEventData.capacity} onChange={(e) => {
                      let { newEventData } = this.state;
                      newEventData.capacity = e.target.value;
                      this.setState({ newEventData });
                    }}/>
                    <br></br>
            </FormGroup>
            <Button title={"Update Event"} onPress={this.updateEvent}/>
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
import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View,Text, TextInput, ScrollView } from "react-native";
import axios from 'axios';


export default class EditEvent extends React.Component{

    state = {  
      capacity: '',
    }


    updateEvent = () => {
        const id = this.props.match.params.id
        axios.put('http://192.168.100.23:3000/events/' + id , {
         body: JSON.stringify({
          capacity: this.state.capacity,
        })
      }).then((response) => {
            this.setState({
              capacity: '',
            });
        });
        console.log('niiiieeeeco')
        setTimeout(this.onClick, 1000);
    }
    
    onClick = () => {
      var path = '/eventsid/';
      var id = (this.props.match.params.id).toString();
      this.props.history.push(path.concat(id));
    }

    handleCapacity = (text) => {
      this.setState({ capacity: text })
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
                centerComponent={{ text: 'Uprav článok', style: { color: 'black' } }}
            />
          </View>

          <View style={{flex:8, width:'100%'}}>
            <ScrollView>
                    <Text>Capacity</Text>
                    <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                    underlineColorAndroid = "transparent"
                    placeholder = "Capacity"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleCapacity}/>
            </ScrollView>
         </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
            <Button title={"Update Event"} onPress={this.updateEvent}/>
            </View>
            
            </View>
    
        );
    }   
}
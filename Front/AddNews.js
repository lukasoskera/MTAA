
import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import axios from 'axios';  


export default class AddNews extends React.Component{
    
    state = { 
        title: '',
        description: ''
    }

    AddNews = () => {
     if (!(isNaN(this.state.title))||!(isNaN(this.state.description))){ Alert.alert(
        'Yo fokd up m8',
        'No numberz only alowd',
        [
          {text: 'Sure thing m8'},
        ],
        {cancelable: true},
      );}
     else{
        axios.post('http://192.168.100.23:3000/news', {
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description
          })
        }).then((response) => {
          let { events } = this.state;
          events.push(response.data);
          this.setState({ events,  
            title: '',
            description: ''
          });
        });
        console.log('niiiieeeeco')
       setTimeout(this.onClick, 1000);
      }  
    }

    onClick = () => {
        //console.log(this.props)
        this.props.history.push("/allnews");
      }

    handleTitle = (text) => {
    this.setState({ title: text })
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
                    centerComponent={{ text: 'Pridaj článok', style: { color: 'black' } }}
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
                
                    <Text>Description</Text>
                    <TextInput style={{margin: 15,height: 120, borderColor: '#7a42f4',  borderWidth: 1}}
                    underlineColorAndroid = "transparent"
                    placeholder = "Date"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleDescription}/>
                </ScrollView>
            </View>
            
            <View style={{width:'100%',  backgroundColor:'lightgreen', height:40}}>
            <Button style={{width:'100%'}} title={"Add news"} onPress={this.AddNews}/>
            </View>
            
            </View>
    
        );
    }   
}
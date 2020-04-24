import React from 'react';
import {Text, View,ScrollView} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import axios from 'axios';
import { string } from 'prop-types';
import ReactDOM from 'react-dom';

export default class AllEvents extends React.Component{
 
  state={
    events : [],
  }
/*
  async componentDidMount(){
    const url = 'http://127.0.0.1:3000/events';
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data)
    for (var i = 0; i < data.length; i++) {
      this.setState({events: this.state.events.concat(data[i])})
    } 
  } 
*/
  async componentDidMount() {
    const url = 'http://127.0.0.1:3000/events'
    axios.get(url)
    .then(res => {
         console.log(res);
         for (var i = 0; i < res.data.length; i++) {
          this.setState({events: this.state.events.concat(res.data[i])})
        } 
    })
  }  
 
  onClick = () => {
    this.props.history.push("/addevents");
  }
  
  onClickk = (x) => {
    var path = '/eventsid/';
    var id = (x.id).toString();
    this.props.history.push(path.concat(id));
  }

  render(){ 
    return(
      <View style={{backgroundColor:'white'}}>

      <View >
        <Header
          containerStyle={{
            backgroundColor: 'lightgreen',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: 'Udalosti', style: { color: 'black' } }}
          rightComponent={<Icon name= 'add' color = 'black' onPress={this.onClick}/>}
        />
      </View>
        
        <ScrollView>
            {
              this.state.events.map((u, i) => {
                if(u.title!=null){  
                return (
                  <View key={u.id}  backgroundColor={'gray'} onClick={()=> this.onClickk(u)}>
                    <Card title={u.title}>
                      <Text>{u.description}</Text>
                    </Card>
                  </View>
                );}
              })
            }
        </ScrollView>

      
        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
          <Icon name= 'storage' color = 'black' onClick={this.onClick}/>
          <Icon name= 'today' color = 'black' onClick={this.onClick}/>
          <Icon name= 'person' color = 'black' onClick={this.onClick}/>
        </View>

      </View>
    );
  }
}



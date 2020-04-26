import React from 'react';
import {Text, View,ScrollView} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default class AllEvents extends React.Component{
 
  state={
    events : [],
  }

  async componentDidMount() {
    const url = 'http://192.168.100.23:3000/events'
    axios.get(url)
    .then(res => {
         console.log(res);
         for (var i = 0; i < res.data.length; i++) {
          this.setState({events: this.state.events.concat(res.data[i])})
        } 
    })
  }  
 
  onClick = () => {
    this.props.history.push("/AddEvents");
  }

  toNews = () => {
    this.props.history.push("/allnews");
  }

  toEvents = () => {
    this.props.history.push("/allevents");
  }

  onClickk = (x) => {
    var path = '/eventsid/';
    var id = (x.id).toString();
    this.props.history.push(path.concat(id));
  }
  
  toProfile = () => {
    this.props.history.push("/profile");
  }

  render(){ 
    return(
      <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>

        <View  style={{flex:1, width:'100%'}}>
          <Header
            containerStyle={{
              backgroundColor: 'lightgreen',
              justifyContent: 'space-around',
            }}
            centerComponent={{ text: 'Udalosti', style: { color: 'black' } }}
            rightComponent={<Icon name= 'add' color = 'black' onPress={this.onClick}/>}
          />
        </View>
        
        <View style={{flex:8 ,width:'100%'}}>
          <ScrollView>
              {
                this.state.events.map((u, i) => {
                  if(u.title!=null){  
                  return (
                    <View key={u.id}  backgroundColor={'gray'}>
                      <TouchableOpacity onPress={()=> this.onClickk(u)}>
                      <Card title={u.title}>
                        <Text>{u.description}</Text>
                      </Card>
                      </TouchableOpacity>
                    </View>
                  );}
                })
              }
          </ScrollView>
        </View>
      
        <View style={{flexDirection: 'row',width:'100%', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40, alignItems:'center'}}>
          <Icon name= 'storage' color = 'black' onPress={this.toNews}/>
          <Icon name= 'today' color = 'black' onPres={this.toEvents}/>
          <Icon name= 'person' color = 'black' onPress={this.toProfile}/>
        </View>

      </View>
    );
  }
}



import React from 'react';
import {Text, View,ScrollView} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AllNews extends React.Component{

  state={
    news : [],
  }

 async componentDidMount(){ 
    const url = 'http://192.168.100.23:3000/news/';
      axios.get(url)
      .then(res => {
          console.log(res);
          for (var i = 0; i < res.data.length; i++) {
            this.setState({news: this.state.news.concat(res.data[i])})
          } 
      })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  }

  onClick = () => {
    this.props.history.push("/addnews");
  }

  toEvents = () => {
    this.props.history.push("/allevents");
  }

  toLogin = () => {
    this.props.history.push("/");
  }

  toProfile = () => {
    this.props.history.push("/profile");
  }

  onClickk = (x) => {
    var path = '/newsid/';
    var id = (x.id).toString();
    this.props.history.push(path.concat(id));
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
            leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.toLogin}/>}
            centerComponent={{ text: 'Články', style: { color: 'black' } }}
            rightComponent={<Icon name= 'add' color = 'black' onPress={this.onClick}/>}
          />
        </View>
        
        <View style={{flex:8 ,width:'100%'}}>
          <ScrollView>
              {
                this.state.news.map((u, i) => {
                  if(u.title!=null){  
                  return (
                    <View key={u.id}  backgroundColor={'gray'} >
                      <TouchableOpacity onPress={()=> this.onClickk(u)}>
                      <Card title={u.title} >
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
          <Icon name= 'storage' color = 'black' onPress={this.onClick}/>
          <Icon name= 'today' color = 'black' onPress={this.toEvents}/>
          <Icon name= 'person' color = 'black' onPress={this.toProfile}/>
        </View>

      </View>
    );
  }
}



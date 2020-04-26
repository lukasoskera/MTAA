import React from "react";
import {Header, Icon, Text, Button, Card} from 'react-native-elements';
import { View, ActivityIndicator, Alert, ScrollView} from "react-native";
import axios from 'axios';

export default class EventsId extends React.Component{
    
    state={
        id:'',
        loading : 1,
        loadingg:1, 
        events :null,
        participation:null,
    }

    componentWillMount() {
        const id = this.props.match.params.id
        axios.get('http://192.168.100.23:3000/events/' + id).then((response) => {
            this.setState({
                loading: 0, events: response.data, id: response.data[0].id
            })
        });
       
        axios.get('http://192.168.100.23:3000/participation/' + id).then((res) => {
            this.setState({
                participation: res.data, loadingg:0
            })  
            console.log("fsdfsdf")
            console.log(res)
        });
      }

    onClick = () => {
        console.log('ahoj')
        this.props.history.push("/allevents");
    }

    deleteEvents () {   
        console.log(this.state)
        const id = this.state.id
        console.log('ahoj id ', id)
        axios.delete('http://192.168.100.23:3000/events/' + id).then((response) => {
            console.log('ahoj response')
        });
        setTimeout(this.onClick, 1000);
      }
    
    editEvents = (x) => {
        var path = '/editevent/';
        var id = (x.id).toString();
        this.props.history.push(path.concat(id));
    }
    

    addParticipation () {
        axios.post('http://192.168.100.23:3000/participation?', {
          body: JSON.stringify({  
            id: this.state.id,
          })
          }).then((response) => {
              if(response.status == 201){
                Alert.alert(
                    'U r added',
                    'So u better show up',
                    [
                      {text: 'Understand'},
                    ],
                    {cancelable: true},
                  );
              }
    });
    }
    

    render(){
        const isLoading = this.state.loading;
        const isLoadingg = this.state.loadingg;
        let zobraz;
        let zobrazz;
        if (isLoading) {
            zobraz = <ActivityIndicator size="large" color="#0000ff" />;
          } else {
            zobraz = <View>
                        <Text>{this.state.events[0].id}</Text>
                        <Text>{this.state.events[0].title}</Text>
                        <Text>{this.state.events[0].description}</Text>
                        <Text>{this.state.events[0].capacity}</Text>
                    </View>;
          }

        if (isLoadingg) {
        zobrazz = <ActivityIndicator size="large" color="#0000ff" />;
        } else {
        zobrazz = <ScrollView>
                    {
                    this.state.participation.map((u, i) => {
                    return (
                        <View key={u.id_user}  backgroundColor={'gray'} >
                        
                        <Card title={u.id_user} >
                            <Text>{u.username}</Text>
                        </Card>
                        </View>
                    );
                    })
                    }
                  </ScrollView>
        }

        return(
            <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>

            <View  style={{flex:1, width:'100%', marginBottom:20}}>
            <Header
                containerStyle={{
                backgroundColor: 'lightgreen',
                justifyContent: 'space-around',
                }}
                leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.onClick}/>}
                centerComponent={{ text: 'Nadpis udalosti', style: { color: 'black' } }}
                rightComponent={ 
                    <View style={{flexDirection:'row'}}>
                    <Icon name= 'edit' color = 'black' onPress={() => this.editEvents(this.state.events[0])}/>
                    <Icon name= 'clear' color = 'black' onPress={() => this.deleteEvents()}/>
                    </View>
                }
            />
            </View>
            
            <View>
                {zobraz}
            </View>
            
            <View style={{flex:8 ,width:'100%'}}>
            {zobrazz}
            </View>

           
            
            <View style={{width:'100%', justifyContent: 'space-around', backgroundColor:'lightgreen', height:40}}>
            <Button title={"Add to Participation"} onPress={() => this.addParticipation()}/>
            </View>
            
            </View>
    
        );
    }   
}
import React from "react";
import {Header, Icon, Text} from 'react-native-elements';
import { View, ActivityIndicator, ScrollView, Image} from "react-native";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default class GetProfile extends React.Component{
    
    state={
        id:'',
        loading1 : 1,
        loading2 : 1,
        info :[],
        typee:'',
        namee:'',
        dataa:'',
        type:'',
        name:'',
        data:'',
        image:null,
    }

    async componentDidMount(){ 
        const url = 'http://192.168.100.23:3000/users';
        axios.get(url)
        .then(res => {
            this.setState({loading1:0, info: res.data, id:res.data[0].id})
        })
        .catch(function(error) {
            throw error;
        });


        const urll = 'http://192.168.100.23:3000/image/';
        axios.get(urll)
        .then(resp => {
            this.setState({loading2:0, typee:resp.data[0].type, namee:resp.data[0].name, dataa:resp.data[0].data})
        })
        .catch(function(error) {
            throw error;
        });
    }

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }


          axios.post('http://192.168.100.23:3000/image', {
          body: JSON.stringify({
            type: result.uri.slice(-4),
            name: result.uri.slice(result.uri.lastIndexOf('/')+1,-4),
            data: result.base64,
          })
        }).then((response) => {
          let { events } = this.state;
          events.push(response.data);
          this.setState({ events,  
            title: '',
            when_date: '',
            when_time: '',
          });
        });
 
        } catch (E) {
        }

        this.setState({id:'',loading1 : 1,loading2 : 1, info :[],typee:'',namee:'',dataa:'',type:'',name:'',data:'',image:null,});
        const url = 'http://192.168.100.23:3000/users';
        axios.get(url)
        .then(res => {
            this.setState({loading1:0, info: res.data, id:res.data[0].id})
        })
        .catch(function(error) {
            throw error;
        });


        const urll = 'http://192.168.100.23:3000/image';
        axios.get(urll)
        .then(resp => {
            this.setState({loading2:0, typee:resp.data[0].type, namee:resp.data[0].name, dataa:resp.data[0].data})
        })
        .catch(function(error) {
            throw error;
        });

      };


    editProfile = () =>{
        this.props.history.push("/editProfile");
    }


    onClick = () => {
        this.props.history.push("/allnews");
    } 

    onClickk = () => {
        this.props.history.push("/allevents");
    } 

    toEvents = () => {
    this.props.history.push("/allevents");
  }

  toProfile = () => {
    this.props.history.push("/profile");
  }


    render(){
        const isLoading1 = this.state.loading1;
        const isLoading2 = this.state.loading2;
        let zobraz;
        if (Number(isLoading1) == 1 && Number(isLoading2) ==1) {
            zobraz = <ActivityIndicator size="large" color="#0000ff" />;
          } else if((Number(isLoading1) == 0 && Number(isLoading2) ==1) || (Number(isLoading1) == 1 && Number(isLoading2) ==0 )) {
            zobraz = <View style={{alignItems:'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>{this.state.info[0].id}</Text>
                <Text>{this.state.info[0].username}</Text>
                <Text>{this.state.info[0].adress}</Text>
                <Text>{this.state.info[0].rights}</Text></View>;
          } else{
            zobraz = <View style={{alignItems:'center'}}>
                <Image style={{width:200, height:200}} source={{uri: `data:image/jpeg;base64,${this.state.dataa}`}} />
                <Text>{this.state.info[0].id}</Text>
                <Text>{this.state.info[0].username}</Text>
                <Text>{this.state.info[0].adress}</Text>
                <Text>{this.state.info[0].rights}</Text>
                </View>;
          }

        return(
            <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>
        
        <View  style={{flex:1, width:'100%', marginBottom:15}}> 
            <Header
                containerStyle={{
                backgroundColor: 'lightgreen',
                justifyContent: 'space-around',
                }}
                centerComponent={{ text: 'Profil', style: { color: 'black' } }}
                rightComponent={ 
                <View style={{flexDirection:'row'}}>
                    <Icon name= 'attachment' color = 'black' onPress={this._pickImage}/>
                    <Icon name= 'edit' color = 'black' onPress={this.editProfile}/>
                </View>    
                    }

            />
            </View>
            
            <View style={{flex:8, width:'100%'}}>
            <ScrollView>
                <View>
            {zobraz}
            </View>
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
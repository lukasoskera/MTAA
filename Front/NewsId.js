    import React from "react";
    import {Header, Icon, Text} from 'react-native-elements';
    import { View, ActivityIndicator, ScrollView} from "react-native";
    import axios from 'axios';


    export default class AddNews extends React.Component{
        
        state={
            id:'',
            loading : 1,
            news :null,
        }

        deleteNews= () => {
            //event.preventDefault();
            const url = 'http://192.168.100.23:3000/news/';
            console.log(this.state.id)
            const id = this.state.id;
            axios.delete(url.concat(id))
            .then(res => {
                 console.log(res);
             console.log(res.data);
            })
            setTimeout(this.onClick, 1000);
        }

 async componentDidMount(){ 
    const url = 'http://192.168.100.23:3000/news/';
    const id = this.props.match.params.id
    axios.get(url.concat(id))
    .then(res => {
        console.log(res.data[0].id);
        console.log(res.data)
        this.setState({loading:0, news: res.data, id:res.data[0].id})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
    }

editNews = (x) => {
    var path = '/editnews/';
    var id = (x).toString();
    this.props.history.push(path.concat(id));
}
    
      

        onClick = () => {
            console.log('ahoj')
            //console.log(this.props.match.params.id);
            this.props.history.push("/allnews");
        }
        
        render(){
            const isLoading = this.state.loading;
            let zobraz;
            if (isLoading) {
                zobraz = <ActivityIndicator size="large" color="#0000ff" />;
              } else {
                zobraz = <View style={{alignItems:'center'}}><Text>{this.state.news[0].id}</Text><Text>{this.state.news[0].author}</Text><Text>{this.state.news[0].title}</Text><Text>{this.state.news[0].description}</Text></View>;
              }

            return(
                <View style={{flex: 1, width:'100%', justifyContent:'space-around', alignItems:'center', flexDirection:'column', backgroundColor:'white'}}>
            
            <View  style={{flex:1, width:'100%', marginBottom:15}}> 
                <Header
                    containerStyle={{
                    backgroundColor: 'lightgreen',
                    justifyContent: 'space-around',
                    }}
                    leftComponent={ <Icon name= 'undo' color = 'black' onPress={this.onClick}/>}
                    centerComponent={{ text: 'Nadpis článku', style: { color: 'black' } }}
                    rightComponent={ 
                        <View style={{flexDirection:'row'}}>
                        <Icon name= 'edit' color = 'black' onPress={() => this.editNews(this.state.news[0].id)}/>
                        <Icon name= 'clear' color = 'black' onPress={() => this.deleteNews()}/>
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
                <Icon name= 'today' color = 'black' onPress={this.onClick}/>
                <Icon name= 'person' color = 'black' onPress={this.onClick}/>
                </View>
                
                </View>
        
            );
        }   
    }
    import React from "react";
    import {Header, Icon, Button} from 'react-native-elements';
    import { View,Text, TextInput, ScrollView } from "react-native";
    import axios from 'axios';


    export default class EditNews extends React.Component{

        state = {  
        description:'',
        }


        updateNews = () => {
            const id = this.props.match.params.id
            axios.put('http://192.168.100.23:3000/news/' + id , {
            body: JSON.stringify({
            description: this.state.description,
            })
        }).then((response) => {
                this.setState({
                    description:'',
                });
            });
            console.log('niiiieeeeco')
            setTimeout(this.onClick, 1000);
        }
        
        onClick = () => {
        var path = '/newsid/';
        console.log(this.props.match.params.id)
        var id = (this.props.match.params.id).toString();
        this.props.history.push(path.concat(id));
        }


        handleDesription = (text) => {
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
                    centerComponent={{ text: 'Uprav článok', style: { color: 'black' } }}
                />
            </View>

            <View style={{flex:8, width:'100%'}}>
                <ScrollView>

                        <Text>Description</Text>
                        <TextInput style={{margin: 15,height: 40, borderColor: '#7a42f4',  borderWidth: 1}}
                        underlineColorAndroid = "transparent"
                        placeholder = "Desription"
                        placeholderTextColor = "#9a73ef"
                        autoCapitalize = "none"
                        onChangeText = {this.handleDesription}/>
            
                </ScrollView>
            </View>    
                
                <View style={{width:'100%', backgroundColor:'lightgreen', height:40,}}>
                <Button title={"Update News"} onPress={this.updateNews}/>
                </View>
                
                </View>
        
            );
        }   
    }
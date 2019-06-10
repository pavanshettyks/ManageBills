import React from 'react'
import {Text, TextInput, View, TouchableOpacity, Button, StyleSheet, FlatList } from 'react-native';

export default class Friend_Row extends React.Component{
  constructor(props){
    super(props);
  //  console.log(this.props);

  }
        render(){
          return(
            <View style = {styles.container}>
                <Text style = {styles.input}>{this.props.name}</Text>
                <Text style = {styles.input}>{this.props.email}</Text>
                <Text style = {styles.input}>{this.props.mobile}</Text>
            </View>
          );
        }
}

const styles = StyleSheet.create({
  container:{

    flexDirection: 'row',
    backgroundColor: '#f2e6ff',
    borderColor: 	 '#8080ff',
    padding: 4,
    borderWidth: 1,
  //  marginTop:2
},
  input:{
    fontSize: 20,
  //  backgroundColor:'white',
    padding: 1,
    marginLeft: 5,
    marginRight:5,

  }

});

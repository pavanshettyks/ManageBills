import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Bills_Row extends React.Component{
  constructor(props){
    super(props);
  //  console.log(this.props);

  }
  ButtonP = () => {
  //  Alert.alert(this.props.BillID); issue
    this.props.valueBillToDetails(this.props);
  }

        render(){
          return(
            <View style = {styles.container}>
                 <View style = {{ flexDirection:'column',flex: 4 }}>
                      <Text style = {styles.input}>Bill Name: {this.props.BillID}</Text>
                      <Text style = {styles.input}>Total Cost: {this.props.totalCost}$</Text>
                      <Text style = {styles.input}>Paid By: {this.props.PaidBy}</Text>
                 </View>
                 <View  style= {{justifyContent: 'center', marginRight: 5}}>
                        <TouchableOpacity onPress ={this.ButtonP}>
                        <Icon name="ios-arrow-dropright-circle"  size = {35}/></TouchableOpacity>
                 </View>
            </View>
          );
        }
}

const styles = StyleSheet.create({
  container:{

    flexDirection: 'row',
    backgroundColor: '#9fd7db',
    borderColor: 	 '#c5dde4',
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

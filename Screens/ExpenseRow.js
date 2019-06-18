import React from 'react'
import {Text, Alert, TextInput, View, TouchableOpacity, Button, StyleSheet, FlatList } from 'react-native';

export default class ExpenseRow extends React.Component{
  constructor(props){
    super(props);
  //  console.log(this.props);
  this.state = {
    title: this.props.title,
    cost: this.props.total,
  }
}
  valueChanged_Title = (text) =>{

      this.setState( {title: text} );
      this.props.valueChangedTitle(this.props.id, text);
  }

  valueChanged_Cost = (text) =>{
      this.setState( {cost: text} );
      this.props.valueChangedCost(this.props.id, text);
  }
  deleteRow = () =>{
      this.props.DeleteRow(this.props.id);
  }
        render(){
          return(
            <View style = {styles.container}>
                <TextInput placeholder ="Enter Item " style = {styles.input_title}
                            onChangeText ={this.valueChanged_Title}  value = {this.props.title} />
                <TextInput keyboardType="numeric" placeholder ="Enter Amount" style = {styles.input_cost}
                            onChangeText ={this.valueChanged_Cost}    value = {this.props.cost}/>
                <Button   title="X" onPress = {this.deleteRow} color = 'red' style  = {styles.delete_Button}/>
            </View>
          
          );
        }
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: '#d9b3ff',
    borderColor: 	 '#e6e6ff',
    padding: 4,
    borderWidth: 1,
  //  marginTop:2
},
  input_title:{
    fontSize: 20,
    backgroundColor:'#e6ccff',
    marginLeft: 5,
    marginRight:5,
    flex: 1

  },
  input_cost:{
    fontSize: 20,
    backgroundColor:'#e6ccff',
    marginLeft: 5,
    marginRight:5,
    flex: 0.5
  },
  delete_Button:{
    fontSize: 20,
    marginLeft: 5,
    marginRight:5,
    flex: 0.5
  }
});

import React from 'react'
import {Text ,Alert,View, TouchableOpacity, ToastAndroid, Button, StyleSheet, FlatList,BackHandler  } from 'react-native';
import { Container, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ExpenseRow from './ExpenseRow';
import styles from './Styles/AddExpenseStyles'

export default class ViewBills extends React.Component{

  constructor(props){
    super(props);
    var id_n = 3;
      this.state = {

            editable: false,
            id:"4",
            totalCost:"176",

            PaidBy:"Me",
            Friends: [],
            Expense : [
              {
              id: "1",
              title: "Test2",
              cost: "10",
              with: [
                "raj",
                "tom",
                "me"
              ]
              },
              {
              id: "2",
              title: "Onoion",
              cost: "43",
              with: [
                "raj",
                "tom",
                "me"
              ]
            },
            {
            id: "3",
            title: " Milk",
            cost: "3",
            with: ["ab"]
          },
            {
            id: "4",
            title: "Test",
            cost: "120",
            with: ["ab"]
            }
            ]
    }
  }

  componentWillMount = () => {

          BackHandler.addEventListener('hardwareBackPress', this.home_action);
 }

 componentWillUnMount = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.home_action);
}

  home_action = () =>{
    this.props.navigation.navigate('ManageMain', { screen_id:"AddExpense_noAction" })
    BackHandler.removeEventListener('hardwareBackPress', this.home_action);
    return true;
  }

  valueChangedTitle = (id,title) =>{
        this.setState({ Expense: this.state.Expense.map(expense => {
            if(expense.id === id){
                  expense.title = title;
            }
            return expense;
          })
       });
  }

  valueChangedCost = (id,cost) =>{
        this.setState({ Expense: this.state.Expense.map(expense => {
            if(expense.id === id){
                  expense.cost = cost;
            }
            let totalcost = this.state.Expense.reduce( (total,expense) => total + Number(expense.cost), 0 )
            this.setState({totalCost: String(totalcost)});
            return expense;
          })
       });
  }


  setTotalCost = () => {
                let totalcost = this.state.Expense.reduce( (total,expense) => total + Number(expense.cost), 0 );
                this.setState({totalCost: String(totalcost)});
  }

  DeleteRow = (id) => {
    this.setState({ Expense: [...this.state.Expense.filter(expense => expense.id !== id) ] }, () => { this.setTotalCost() }  );  //to set state and wait to
    console.log(this.state.Expense);
  }

  clear_action = ()  => {
    this.setState({ Expense:[  { id: "1", title: "", cost: "0", with: [ ] },],
                    totalCost:"0",
                    id:"1" });
    //  ToastAndroid.show('All rows cleared', ToastAndroid.SHORT);
  }

  cancel_action = ()  => {
    this.setState({editable:!this.state.editable})
  //  this.setState({ Expense:[  { id: "1", title: "", cost: "0", with: [ ] },],
    //                totalCost:"0",
      //              id:"1" });
    //  ToastAndroid.show('All rows cleared', ToastAndroid.SHORT);
  }

  save_action = ()  => {
     Alert.alert("Do you want to save?", "Total Cost: "+ this.state.totalCost +"$",
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {  this.save_and_home() }},
                    ]
                  );
  //
  }
  save_and_home =() => {
    new_bill = { totalCost: this.state.totalCost,  PaidBy: this.state.PaidBy , Friends: this.state.Friends , Expense: this.state.Expense }
    this.props.navigation.navigate('ManageMain', { screen_id:"AddExpense", new_bill: new_bill });
    this.clear_action();
  //  this.setState({...this.Init_State});
    ToastAndroid.show('Bill Saved', ToastAndroid.SHORT);

  }

  float_action = ()  => {
     let id = String(Number(this.state.id)+1);
      this.setState({id:String(Number(this.state.id)+1)});
     const new_row = {
              id: id,
              title: "",
              cost: "0",
              with:[]
     }
     this.setState({Expense: [...this.state.Expense,new_row]});
  }


  render(){
    return(
      <Container>
      <View style = {{ flex : 1}} >

          <View style = {styles.header}>
                <Text style = {styles.text} >Total Cost: {this.state.totalCost}$ </Text>
                <Text style = {styles.text}>Paid By: {this.state.PaidBy} </Text>
                { !this.state.editable&&
                <Button title="Edit Bill" onPress = { ()=>{ this.setState({editable:!this.state.editable}) } } color = 'red'/>
                }
          </View>
          <View style = {styles.container}>

            <FlatList  data = {this.state.Expense}
                extraData={this.state}
                renderItem = { ({item}) => <ExpenseRow {...item} editable = {this.state.editable} valueChangedTitle = {this.valueChangedTitle}
                valueChangedCost = {this.valueChangedCost} DeleteRow = {this.DeleteRow}  /> }  keyExtractor={(item, index) => index.toString()}
              />
          </View>

          { this.state.editable &&
          <TouchableOpacity   style={styles.Floating_Btn} onPress={this.float_action} >
                              <Icon name="ios-add"  size={30} color="#ffff" />
          </TouchableOpacity>
          }

          <View style = {{ flex : 1, marginBottom:15}} >
             { this.state.editable&&
               <View>
              <TouchableOpacity style={styles.Save_Btn} >
                  <Button  title='Save' onPress ={this.save_action}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Clear_Btn}>
                  <Button title='Cancel' onPress ={this.cancel_action}/>
              </TouchableOpacity>
              </View>
            }
              <TouchableOpacity style={styles.Home_Btn}>
                  <Button title='Go To Home' onPress ={this.home_action}/>
              </TouchableOpacity>
          </View>
      </View>
      </Container>

    );
  }
}

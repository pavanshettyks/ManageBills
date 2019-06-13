import React from 'react'
import {Text ,Alert,View, TouchableOpacity, Button, StyleSheet, FlatList,BackHandler  } from 'react-native';
import { Container, Fab,Icon} from 'native-base';
import ExpenseRow from './ExpenseRow';
import Dummy from './Dummy';

export default class AddExpense extends React.Component{
  constructor(props){
    super(props);
    var id_n = 3;
      this.state = {
            id:"4",
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
          //Alert.alert("tesdddt");
          BackHandler.addEventListener('hardwareBackPress', this.home_action);
 }

 componentWillUnMount = () => {
  // this.backHandler.remove()
  Alert.alert("tesdddt");
        BackHandler.removeEventListener('hardwareBackPress', this.home_action);
}




  home_action = () =>{
  //  Alert.alert("test");
    //this.props.navigation.goBack(null);

    this.props.navigation.navigate('ManageMain', { screen_id:"AddExpense" })
    BackHandler.removeEventListener('hardwareBackPress', this.home_action);
    return true;
  }

  valueChangedTitle = (id,title) =>{
   //  Alert.alert(title+' '+id)
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
            return expense;
          })
       });
  }
  DeleteRow = (id) => {
//   Alert.alert(id);
    this.setState({ Expense: [...this.state.Expense.filter(expense => expense.id !== id) ] });
      console.log(this.state.Expense);
  }

  clear_action = ()  => {
    this.setState({Expense:[]});
  }
  save_action = ()  => {
     Alert.alert('coming soon');
  //  this.setState({...Init_State});
  }
  fab_action = ()  => {
     let id = String(Number(this.state.id)+1);
      this.setState({id:String(Number(this.state.id)+1)});
     //console.log(String(id_n));
     //Alert.alert(this.state.id);
     const new_row = {
              id: id,
              title: "",
              cost: "",
              with:[]
     }

    // Alert.alert(num);
     this.setState({Expense: [...this.state.Expense,new_row]});
    // console.log(this.state.Expense);
//this.setState({ todos: [...this.state.todos, newTodo] });
  }


  render(){
    return(
      <Container>
      <View style = {{ flex : 1}} >

          <View style = {styles.container}>

            <FlatList  data = {this.state.Expense}
                renderItem = { ({item}) => <ExpenseRow {...item}  valueChangedTitle = {this.valueChangedTitle}
                valueChangedCost = {this.valueChangedCost} DeleteRow = {this.DeleteRow}  /> }  keyExtractor={(item, index) => index.toString()}
              />
          </View>
          <Fab
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="topRight"
            onPress={this.fab_action}>
            <Icon name="share" />
          </Fab>

          <View style = {{ flex : 1}} >
              <TouchableOpacity style={styles.Save_Btn} >
                  <Button  title='Save' onPress ={this.save_action}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Clear_Btn}>
                  <Button title='Clear All' onPress ={this.clear_action}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Home_Btn}>
                  <Button title='Go To Home' onPress ={this.home_action}/>
              </TouchableOpacity>
          </View>
      </View>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 5,
  //  height: "70%",
  },
   Save_Btn:{
      borderColor:'white',
      padding: 1,
    },
    Clear_Btn:{
        borderColor:'white',
      padding: 1,
    },
    Home_Btn:{
        borderColor:'white',
      padding: 1,
    }

})

import React from 'react'
import {Text ,Alert,View, TouchableOpacity, ToastAndroid, Button, StyleSheet, FlatList,BackHandler,Picker  } from 'react-native';
import { Container, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ExpenseRow from './ExpenseRow';
import AsyncStorage from '@react-native-community/async-storage';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
//import Dummy from './Dummy';
import styles from './Styles/AddExpenseStyles';


export default class AddExpense extends React.Component{

  constructor(props){
    super(props);
    var id_n = 3;
      this.state = {
            sharedWith: [ "0" ],
            id:"4",
            totalCost:"176",
            PaidBy:"Me",
            Friends:[ {
                      id: "0",
                      name: "Me",
                      },
                    ],
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

            ]
    }
      this.get();
  }

  get  = async () =>{
    let Friends = '';

    try {
          Friends = await AsyncStorage.getItem('Friends');
          if(Friends){
            let friends_JSON =JSON.parse(Friends);

            this.setState({ Friends: [...this.state.Friends,...friends_JSON] });
           }
         } catch (error) {
          console.log(error.message);
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
      ToastAndroid.show('All rows cleared', ToastAndroid.SHORT);
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
    new_bill = { totalCost: this.state.totalCost,  PaidBy: this.state.PaidBy , Friends: this.state.Friends , Expense: this.state.Expense, id:this.state.id,
                 sharedWith:this.state.sharedWith  }
    this.props.navigation.navigate('ManageMain', { screen_id:"AddExpense", new_bill: new_bill });
    this.clear_action();
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

  onSelectedItemsChange = (sharedWith) => {
    this.setState({ sharedWith });
  };

  render(){
    return(

      <View style = {{ flex : 1}} >

          <View style = {styles.header}>

                <Text style = {styles.text} >Total Cost: {this.state.totalCost}$ </Text>

                <View style={{flexDirection:'row', paddingBottom:5}}>
                      <Text style = {styles.text}>Paid By:</Text>
                      <Picker selectedValue={this.state.PaidBy}
                          style={{height: 45, width: 100, fontWeight: 'bold', }}
                          onValueChange={(itemValue, itemIndex) =>
                          this.setState({PaidBy: itemValue})
                          }>
                          {
                            this.state.Friends.map( (v)=>{
                              return <Picker.Item label={v.name} value={v.name} key={v.id} />
                            })
                          }
                      </Picker>
                </View>
                <View style={{flexDirection:'column', marginTop:-30}}>

                      <SectionedMultiSelect
                      items={this.state.Friends}
                      uniqueKey="id"
                      selectText="Shared Between..."
                      showDropDowns={true}
                      highlightChildren ={true}
                      readOnlyHeadings={false}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={this.state.sharedWith}
                    />

                </View>

          </View>
          <View style = {styles.container}>

            <FlatList  data = {this.state.Expense}
                renderItem = { ({item}) => <ExpenseRow {...item}  editable = {true} valueChangedTitle = {this.valueChangedTitle}
                valueChangedCost = {this.valueChangedCost} DeleteRow = {this.DeleteRow}  /> }  keyExtractor={(item, index) => index.toString()}
              />
          </View>


          <TouchableOpacity   style={styles.Floating_Btn} onPress={this.float_action} >
                              <Icon name="ios-add"  size={30} color="#ffff" />
          </TouchableOpacity>

          <View style = {{  justifyContent: 'flex-end', paddingBottom:9}} >
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


    );
  }
}

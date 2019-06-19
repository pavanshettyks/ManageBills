import React from 'react';
import {Alert,FlatList,StyleSheet, Platform, Button, Image,TouchableOpacity, TextInput, Text, View, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';
import Friend_Row from './Friend_Row'
import styles from './Styles/ManageMainStyles'

class ManageMain extends React.Component {
  state = {
      owe: 20 ,
      owed: 30,
      collapse: true,
      NextBillId: "1" ,
      Bills:  [ ],
      Friends:[
                {
                  id: "1",
                  name: "Johny Walker",
                  mobile:"+1657",
                  email:"test@mail.com"
                },
              ]
  }

  constructor(props){
    super(props);
    this.get();
  }

  get  = async () =>{
     //AsyncStorage.clear();
    let Friends = '';
    try {
          Friends = await AsyncStorage.getItem('Friends');
          if(Friends){
            let friends_JSON =JSON.parse(Friends);
            //console.log("Friends:",Friends);
          //  console.log("Friends in get:",friends_JSON);
            this.setState({ Friends: friends_JSON});
          }

          Bills = await AsyncStorage.getItem('Bills');
          if(Bills){
            let bills_json = JSON.parse(Bills);
            this.setState({Bills:bills_json});
            console.log("Bills in get:",bills_json)
          }
          NextBillId = await AsyncStorage.getItem('Next_Bill_ID');
          if(NextBillId){
            let nextBill_json = JSON.parse(NextBillId);
            this.setState({NextBillId: NextBillId});
            //console.log("Bill_ID in get:",NextBillId)
          }

         } catch (error) {
          console.log(error.message);
    }

   }


  willFocusAction = (payload) => {
    let params = payload.state.params;
    console.log("Mounting Friend.",this.state.Friends);
    console.log("Mounting Bills.",this.state.Bills);
    if (params) {
            let screen_id = payload.state.params.screen_id;
            if(screen_id == 'AddFriend'){
                let new_friend = payload.state.params.new_friend;
                console.log("New ROW",new_friend);
                new_friend = [...this.state.Friends,new_friend]
                this.setState({ Friends:new_friend});
                AsyncStorage.setItem('Friends', JSON.stringify(new_friend));
                console.log("Updated",new_friend);
            }
            else if (screen_id == 'AddExpense') {
                let new_bill = payload.state.params.new_bill;
                //console.log("New Bill",new_bill);
                let all_bills = [...this.state.Bills,new_bill]
                let nextBillId = Number(this.state.NextBillId)+1;
                this.setState({Bills: all_bills,
                                NextBillId: nextBillId });
                //console.log("Past Bill",this.state.NextBillId);

                //console.log("Past Bill in Num",Number(this.state.NextBillId));
                console.log("Next Bill",nextBillId);
                AsyncStorage.setItem('Bills', JSON.stringify(all_bills));
                AsyncStorage.setItem('Next_Bill_ID', JSON.stringify(nextBillId));
                console.log("Updated Bill",all_bills);
            }
   }

  }



  ButtonClickCheckFunction = () =>{
        console.log(this.state.Friends);
        this.props.navigation.navigate('AddFriend')
  }

  AddExpenseButton = () =>{
        this.props.navigation.navigate('AddExpense')
  }

    render() {
      return (

        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'skyblue'}}>
            <NavigationEvents
            onWillFocus={this.willFocusAction}

            />
            <Text style={styles.welcome}>Expense Manager</Text>
            <View style={{flex: 1, backgroundColor: 'powderblue'}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 3, flexDirection: 'column'}}>
                    <Text style={styles.header}>You owe: {this.state.owe}$</Text>
                    <Text style={styles.header}>You are owed: {this.state.owed}$</Text>
                    </View>
                    <Icon />
                  <Button style={styles.button_add_frnd} title='Add   Friend' onPress= {this.ButtonClickCheckFunction} />
                </View>
           </View>
           <View style = {styles.friends_view}>
                <TouchableOpacity onPress={ () => {this.setState({collapse:!this.state.collapse})} } style ={{flexDirection:'row', backgroundColor: '#1aa3ff'}}>
                                <Text style = {{ flex: 3, padding: 5, fontWeight: 'bold',fontSize: 20}} >List of Friends</Text>
                                <Icon name="ios-arrow-dropdown-circle" style = {{padding:5}} size={25} />
                </TouchableOpacity>

           <View style={{ flex: this.state.collapse ? 1: 0,  height: this.state.collapse ? null : 0, overflow: 'hidden' }}>
        { /*          }  <FlatList data = {this.state.Friends }
                    renderItem = { ({item}) => <Friend_Row {...item}  /> }
                    keyExtractor={(item, index) => index.toString()}
                    />
                    {[...this.state.Friends].map((friend) => { return (  <Friend_Row {...friend}  />  ) })}
                    */ }


                    <FlatList data = {this.state.Friends }
                        renderItem = { ({item}) => <Friend_Row {...item}  /> }
                        keyExtractor={(item, index) => index.toString()}
                        />

                  </View>


        { /*           <Collapse>
                        <CollapseHeader >
                              <Text style= {this.header_List}>List of Friends</Text>
                        </CollapseHeader>
                        <CollapseBody>

                        <FlatList data = {this.state.Friends }
                        renderItem = { ({item}) => <Friend_Row {...item}  /> }
                        keyExtractor={(item, index) => index.toString()}
                        />

                        </CollapseBody>
               </Collapse>  */ }
           </View>
          <View style={{flex: 5, backgroundColor: 'skyblue'}}>

          </View>
          <Button title='Add Expense' style={styles.button} onPress = {this.AddExpenseButton} />
        </View>
        );
      }
}



export default ManageMain;

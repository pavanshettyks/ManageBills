import React from 'react';
import {Alert,FlatList,StyleSheet, Platform, Button, Image,TouchableOpacity, TextInput, Text, View, ScrollView,AsyncStorage, BackHandler } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Friend_Row from './Friend_Row'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';

class ManageMain extends React.Component {
  state = {
      owe: 20 ,
      owed: 30,
      collapse: true,
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
    let friends_JSON =JSON.parse(Friends);
    console.log("Friends:",Friends);
    if(Friends){
      console.log("Friends_JSON_:",friends_JSON);
      this.setState({ Friends: friends_JSON});
      //console.log("Friends__:",Friends);
    }
    } catch (error) {
    console.log(error.message);
   }

}


  willFocusAction = (payload) => {
    let params = payload.state.params;
    console.log("Mounting.",this.state.Friends);
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

  //      Alert.alert(params.value);
 }

}


  ButtonClickCheckFunction = () =>{
  //Alert.alert("Button Clicked")
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 5,
  },
  header: {
    textAlign: 'left',
    fontSize: 20,
    color: '#333333',
    marginBottom: 5,
  },
  header_List: {
    textAlign: 'left',
    fontSize: 26,
    color: '#333333',
    marginBottom: 5,
  },
  friends_view:{
    flex: 5,
    backgroundColor: '#22FCFF',

  },
  button: {
    textAlign: 'left',
    fontSize: 20,
    justifyContent: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button_add_frnd: {
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',

 backgroundColor:'#00BCD4',
 borderRadius:10,
 borderWidth: 1,
 borderColor: '#fff'

  }
});

export default ManageMain;

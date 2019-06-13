import React from 'react'
import {Alert,TouchableOpacity,ToastAndroid,StyleSheet, Button, TextInput, Text, View, ScrollView, BackHandler } from 'react-native';

class AddFriend extends React.Component{

  state = {
    name :'',
    mobile:'',
    email:'',
  }


 save_action = () =>{
   const new_row = {
            id: "2",
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email,
   }
   this.props.navigation.navigate('ManageMain', { screen_id:"AddFriend" , new_friend : new_row  })
  this.setState(  {
                name :'',
                mobile:'',
                email:'',
              });
    ToastAndroid.show('Data Saved', ToastAndroid.SHORT);

//   console.log('test')
 }
 componentWillMount = () => {
         //Alert.alert("tesdddt");
         BackHandler.addEventListener('hardwareBackPress', this.GoBack); // to handle back button
}

 GoBack = () =>{
   //ToastAndroid.show('Home', ToastAndroid.SHORT);
   this.setState(  {
                 name :'',
                 mobile:'',
                 email:'',
               });
   this.props.navigation.navigate('ManageMain',{ screen_id:"AddFriend_G"  })
   BackHandler.removeEventListener('hardwareBackPress', this.GoBack);
   return true;  //else back button will close the app
 }

  render(){
    return(
      <View style = {styles.container}>
          <View style ={{ flex :3}} >
              <Text style = {styles.Heading}>Add New Friend</Text>
              <View style ={styles.RowStyle}>
                    <Text style = {styles.FormText}>Name: </Text>
                    <TextInput style = {styles.FormInput}  placeholderTextColor = "#9a73ef" selectionColor="#947eef"  placeholder ="Enter Name"  value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>
              </View>
              <View style ={styles.RowStyle}>
                    <Text style = {styles.FormText}>Mobile:</Text>
                    <TextInput style = {styles.FormInput}  placeholderTextColor = "#9a73ef" selectionColor="#947eef" placeholder ="Enter Mobile Number" value={this.state.mobile} onChangeText={(text) => this.setState({mobile:text})} />
              </View>
              <View style ={styles.RowStyle}>
                    <Text style = {styles.FormText}>Email:  </Text>
                    <TextInput style = {styles.FormInput}  placeholderTextColor = "#9a73ef" selectionColor="#947eef" placeholder ="Enter Email Address" value={this.state.email} onChangeText={(text) => this.setState({email:text})} />
              </View>
          </View>
          <View style ={{ flex :1}} >
              <TouchableOpacity style={styles.Save_Btn} >
                  <Button  title='Save' onPress ={this.save_action}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Cancel_Btn}>
                  <Button title='Go Back' onPress ={this.GoBack}/>
              </TouchableOpacity>
          </View>
      </View>
    );
  }
}
export default AddFriend;

const styles = StyleSheet.create({
  Heading:{
    textAlign: 'center',
    color :'#9a73ef',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft :30,
    marginRight:30,
    marginTop :15,
    marginBottom :10,
  },
  FormText:{
    textAlign: 'center',
    //backgroundColor: 'white',
    fontSize: 20,
    marginLeft :30,
    padding: 2,
    color :'#9a73ef',

    //marginRight:30,
    //marginTop :15,
  },
  FormInput:{
    //textAlign: 'left',
    height: 40,
    borderColor: '#947eef',
    borderWidth: 1,
    color :'#9a73ef',
    //backgroundColor: 'white',
    fontSize: 20,
    flex: 2,
    marginLeft: 5,
    marginRight:29,
    padding: 2,
    //marginTop :15,
  },
  RowStyle:{
    flexDirection: 'row',
    marginTop:20,
  //  padding: 10,
  },
  container : {
    //backgroundColor: 'skyblue',
    flex: 1
  },
  Save_Btn:{
    backgroundColor: 'white',
    //borderColor:'white',
    marginLeft :30,
    marginRight:30,
    marginTop :15,
    padding: 1,
  },
  Cancel_Btn:{
    backgroundColor: 'white',
    marginLeft :30,
    marginRight:30,
    marginTop :10,
    padding: 1,
  }
})

import {StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    marginBottom: 5,


  },
  button: {
    textAlign: 'left',
    fontSize: 20,
    justifyContent: 'center',
    color: '#333333',
    marginBottom: 8,
    marginTop:10,
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

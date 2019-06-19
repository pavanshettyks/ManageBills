import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 5,
    //  height: "70%",
  },
  header: {
    backgroundColor:'#e6ccff',
    flex: 0.8,
    //  height: "70%",
  },
  text:{
    fontSize: 24,
    color:'#000000',
    fontWeight: 'bold',
    marginTop: 6,
  //  marginRight:5,
  },
  Save_Btn: {
    borderColor: 'white',
    padding: 1,
  },
  Clear_Btn: {
    borderColor: 'white',
    padding: 1,
  },
  Home_Btn: {
    borderColor: 'white',
    padding: 1,
  },
  Floating_Btn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 150,
    right: 15,
    height: 70,
    backgroundColor: '#5067FF',
    borderRadius: 100,
  }

})

import React from 'react'
import MultiSelect from 'react-native-multiple-select';
import {Text, TextInput, View, TouchableOpacity, Button, StyleSheet, FlatList } from 'react-native';


const items = [
    {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  }];

export default class ExpenseRow extends React.Component{
  state = {
        selectedItems :[]
      };

      onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems:selectedItems });
      }

      render() {
        const { selectedItems } = this.state;
        return (
          <View style={{ flex: 1 }}>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={ (text)=> console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#48d22b"
              submitButtonText="Submit"
            />
          </View>
        )
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
  input:{
    fontSize: 20,
    backgroundColor:'white'

  }

});

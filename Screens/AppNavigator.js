import { createStackNavigator, createAppContainer } from 'react-navigation';

import AddFriend from './AddFriend'
import AddExpense from './AddExpense'
import ManageMain from './ManageMain'

//const AppNavigator = createStackNavigator({
  //ManageMain: { screen: ManageMain },
  //AddFriend: {screen: AddFriend}
//});

const RootStack = createStackNavigator(
  {
    AddExpense: {
              screen: AddExpense,
              navigationOptions: {
                //header: true,
                title:"Add Expense",
                alignItems: 'center',
              }
            },
    AddFriend: {
                screen: AddFriend,
                navigationOptions: {
                header: null,
                }
              },
    ManageMain: {
                screen: ManageMain,
                navigationOptions: {
                header: null,
                }},
  },
  {
    initialRouteName: 'AddExpense',
  }
);


const AppContainer = createAppContainer(RootStack);

export default AppContainer;

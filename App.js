import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import Extra from './components/Extra'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer)

function InfiniaStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <Ionicons name="plus-square" size={30} color={tintColor} />
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  },
  Extra: {
    screen: Extra,
    navigationOptions: {
      tabBarLabel: 'Extra',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
},  {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.os === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.os === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <InfiniaStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
          {/*<AddEntry/>*/}
        </View>
      </Provider>
    );
  }
}

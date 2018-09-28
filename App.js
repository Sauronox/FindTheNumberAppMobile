import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, StatusBar } from 'react-native'
import Navigator from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex:1,}}>
         <StatusBar barStyle = "dark-content" hidden = {true}/>
         {/* <View style={{flex:1,}}> */}
        <Provider store={Store}>
          <Navigator />
        </Provider>
         {/* </View> */}
       </SafeAreaView>
    )
  }
}

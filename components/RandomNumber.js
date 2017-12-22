/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';




export default class RandomNumber extends Component<{}> {

handlePress = () => {
  if(this.props.isDisabled){return;}
 this.props.onPress(this.props.id);
};

  render() {
    return (
     <TouchableOpacity onPress={this.handlePress}>
              <Text style={[styles.random,this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
         </TouchableOpacity>

 
    );
  }
}

 const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
         width:100,
         marginHorizontal:15,
         marginVertical: 25,
         fontSize:35,
         textAlign:'center'
     },
     disabled: {
       opacity: 0.3
     }
});

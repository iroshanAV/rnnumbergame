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
  View
} from 'react-native';
import RandomNumber from './RandomNumber';


export default class Game extends Component<{}> {

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds
  };
    gameStatus ='PLAYING';
    target = 10+ Math.floor(40* Math.random());
    randomNumbers = Array.from({length: this.props.randomNumberCount})
                         .map(() => 1 + Math.floor(10*Math.random()));

    target = this.randomNumbers.slice(0,this.props.randomNumberCount -2)
                               .reduce((acc,curr) => acc+ curr,0);
    

    componentDidMount(){
      this.intervalId = setInterval(() => {
      this.setState((prevState) => {
           return {remainingSeconds: prevState.remainingSeconds - 1};
         }, () => { 
            if(this.state.remainingSeconds === 0){
              clearInterval(this.intervalId);
            }
         });  
      }, 1000);
    }
     
    componentWillUpdate(nextProps,nextState){
      if(nextState.selectedIds != this.state.selectedIds || nextState.remainingSeconds === 0){
        this.gameStatus = this.calcGameStatus(nextState);
      }
    }

    componentWillUnmount(){
      clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
       return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
      this.setState((prevState) => ({
         selectedIds: [...prevState.selectedIds,numberIndex]
      }));
    };


calcGameStatus = (nextState) => {
  const sumSelected = nextState.selectedIds.reduce((acc,curr) => {
    return acc + this.randomNumbers[curr];
  },0);
  if(this.state.remainingSeconds === 0){
   return 'LOST';
  }
  if(sumSelected < this.target){
    return 'PLAYING';
  }
  if(sumSelected === this.target){
    return 'WON';
  }if(sumSelected > this.target){
    return 'LOST';
  }
}



  render() {
   const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target,styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
      
          <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber,index) =>(
        <RandomNumber
         key={index} 
         id={index}
         number={randomNumber}
         isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}  
         onPress = {this.selectNumber}
         />
        ))}
          </View>
          <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5FCFF',
  },
  target: {
      fontSize:50,
      backgroundColor:'#aaa',
      marginHorizontal: 50,
      textAlign:'center',
      margin:50
  },
  randomContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap:'wrap',
      justifyContent:'space-around'
  },
  STATUS_WON: {
    backgroundColor: 'green',

  },

  STATUS_LOST: {
    backgroundColor:'red'
  }


});

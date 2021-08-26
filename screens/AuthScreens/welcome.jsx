import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { getUser } from '../../actions/user';


const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({getUser}, dispatch)
}

class Welcome extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.getUser(user.uid)
        if (this.props.user !== null){
          this.props.navigation.navigate('StackNavigator')
          this.props.navigation.reset({
              index: 0,
              routes: [{name: 'StackNavigator'}]
          })
        }
      }else{
        this.props.navigation.navigate('Login')
      }
    })
  }

  render(){
    return (
      <View style={styles.container}>
          <Text>Waiting</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  
});


export default connect(mSTP, mDTP)(Welcome)
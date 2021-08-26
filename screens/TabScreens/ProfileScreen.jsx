import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';
import * as firebase from 'firebase';

const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({getUser}, dispatch)
}

class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
          <Text>This is the ProfileScreen</Text>
          <TouchableOpacity onPress={() => firebase.auth().signOut()}>
            <Text>logout</Text>
          </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});


export default connect(mSTP, mDTP)(ProfileScreen)
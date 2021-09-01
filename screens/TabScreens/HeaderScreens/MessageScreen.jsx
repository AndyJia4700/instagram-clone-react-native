import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView,FlatList, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user';
import { addMessage } from '../../../actions/post'
import firebase from 'firebase'

const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({getUser, addMessage}, dispatch)
}

const keyboardVerticalOffset = Platform.OS == 'ios' ? 120 : 100
const screenWidth = Dimensions.get('window').width

class MessageScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        messages: [],
        message: ''
    }
    this.subscriber = firebase.firestore()
        .collection('messages')
        .limit(50)
        .orderBy('date', 'asc')
        .onSnapshot(docs => {
        let messages = []
        docs.forEach(doc => {
            messages.push(doc.data())
        })
        this.setState({
            messages: messages
        })
    })
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(){
    if(this.state.message.replace(/\s/g, '').length){
        this.props.addMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
            // inverted
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{flex: 1}}
            data={this.state.messages}
            keyExtractor={(item) => JSON.stringify(item.date)}
            renderItem={({item}) => (
                <View>
                    <Text>{item.message}</Text>
                </View>
            )}
        />
        <View style={{marginBottom: 200, width: screenWidth }}>
            <TextInput
                placeholder='send message here'
                style={{backgroundColor: 'red', marginBottom: 200, width: screenWidth }}
                onChangeText={(message) => this.setState({message: message})}
                value={this.state.message}
                returnKeyType= 'send'
                onSubmitEditing={this.sendMessage}
                autoCapitalize='none'
            />
            <TouchableOpacity
                onPress={()=> this.sendMessage()}
            >
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  
});


export default connect(mSTP, mDTP)(MessageScreen)
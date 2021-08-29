import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, updateUsername, signup} from '../../actions/user';

const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({updateEmail, updatePassword, updateUsername, signup}, dispatch)
}

const screeHeight = Dimensions.get('window').height
const screeWidth = Dimensions.get('window').width

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      repeat: ''
    }
    this.onSignupPress = this.onSignupPress.bind(this);
  }

  onSignupPress(){
    if (this.props.user.password == this.state.repeat && this.props.username !== ""){
      this.props.signup()
    } else {
      alert('the passwords are different')
      alert('pass' + this.props.user.password + 'repeat' + this.state.repeat)
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('ProfilePicture')}
        >
          <Text>
           photo upload
          </Text>
        </TouchableOpacity>

        <View style={styles.innerContainer}>
          <View style={styles.subtitle}>
            <Text>Username</Text>
          </View>

          <TextInput 
            style={styles.input}
            placeholder="Your username"
            value={this.props.user.username}
            onChangeText={input => this.props.updateUsername(input)}
          />
          <View style={styles.subtitle}>
            <Text>Email</Text>
          </View>

          <TextInput 
            style={styles.input}
            placeholder="example@example.com"
            value={this.props.user.email}
            onChangeText={input => this.props.updateEmail(input)}
          />

          <View style={styles.subtitle}>
            <Text>Create Password</Text>
          </View>
        
          <TextInput 
            style={styles.input}
            placeholder="Password123"
            secureTextEntry={true}
            value={this.props.user.password}
            onChangeText={input => this.props.updatePassword(input)}
          />

          <View style={styles.subtitle}>
            <Text>Repeat Password</Text>
          </View>
        
          <TextInput 
            style={styles.input}
            placeholder="Password123"
            secureTextEntry={true}
            value={this.state.repeat}
            onChangeText={input => this.setState({repeat: input})}
          />   
        </View>

        <View style={styles.sessionContainer}>    
          <TouchableOpacity style={styles.sessionButton} onPress={this.onSignupPress}>
            <Text style={styles.sessionButtonTitle}>SIGNUP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={styles.switch}>
            <Text style={{fontSize: 18}}>Have an account?</Text>
            <Text style={{fontSize: 18, color: '#0095f6'}}>Login!</Text>
          </TouchableOpacity>
        </View>      
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 50, 
    width: screeWidth*0.9, 
    color:"black", 
    paddingHorizontal: 20,
    margin:20, 
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  innerContainer:{
    margin: 30
  },
  sessionContainer:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  sessionButton:{
    width: screeWidth*0.6,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#0095f6',
    justifyContent: "center",
    alignItems: "center"
  },
  sessionButtonTitle:{
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  subtitle:{
    width: screeWidth*0.9,
    height:15,
    marginTop: 10,
    left:20
  },
  switch:{
    width: '100%', 
    flexDirection: "row",
    marginTop: 20
  },
  title:{
    fontSize: 30,
    fontFamily: 'Handlee',
    marginTop: 180,
  },
});

export default connect(mSTP, mDTP)(Signup)

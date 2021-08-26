import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, login } from '../../actions/user';

const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({updateEmail, updatePassword, login}, dispatch)
}

const screeHeight = Dimensions.get('window').height
const screeWidth = Dimensions.get('window').width

class Login extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>INSTAGRAM?</Text>
        <View style={styles.innerContainer}>
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
            <Text>Password</Text>
          </View>
        
          <TextInput 
            style={styles.input}
            placeholder="Password123"
            secureTextEntry={true}
            value={this.props.user.password}
            onChangeText={input => this.props.updatePassword(input)}

          />   
        </View>

        <View style={styles.sessionContainer}>    
          <TouchableOpacity style={styles.sessionButton} onPress={() => this.props.login()}>
            <Text style={styles.sessionButtonTitle}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')} style={styles.switch}>
            <Text style={{fontSize: 18}}>Don't Have an account?</Text>
            <Text style={{fontSize: 18, color: '#0095f6'}}>Signup!</Text>
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



{/* <TouchableOpacity 
  onPress={() => {this.props.navigation.setOptions({
    title: this.state.num
  }), this.setState({
    num: this.state.num + 1
  })}}
>
    <Text>change title + 1</Text>
</TouchableOpacity> */}


export default connect(mSTP, mDTP)(Login)
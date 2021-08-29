import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { updatePhoto } from '../../actions/user';
import { uploadPhoto } from '../../actions/index';
const mSTP = state => {
  return{
    user: state.user,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({uploadPhoto, updatePhoto}, dispatch)
}

const screeHeight = Dimensions.get('window').height
const screeWidth = Dimensions.get('window').width

class ProfilePicture extends React.Component{
  constructor(props){
    super(props);
    this.openLibrary = this.openLibrary.bind(this);
  }

  openLibrary = async() => {
    try{
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        if( status == 'granted'){
            const image = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            })
            if (!image.cancelled){
                const url = await this.props.uploadPhoto(image)
                this.props.updatePhoto(url)
            }
        }
    }catch(e){
        alert(e)
    }
  }

  render(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a profile picture</Text>
            {
                !this.props.user.photo ? 
                <TouchableOpacity
                    onPress={()=>this.openLibrary()}
                >
                    <View style={styles.userUploadPicture}/>
                </TouchableOpacity>
                : 
                <TouchableOpacity
                    onPress={()=>this.openLibrary()}
                >
                    <Image source={{uri: this.props.user.photo}} style={styles.userUploadPicture}/>
                </TouchableOpacity>
            }
            <TouchableOpacity 
                style={styles.continue}
                onPress={() => this.props.navigation.navigate('Signup')}
            >
                <Text style={styles.title}>Continue</Text>
            </TouchableOpacity>
        
        </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userUploadPicture:{
    width: screeWidth* .5,
    height: screeWidth* .5,
    backgroundColor: 'beige',
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    margin: 15
  },
  continue:{
      margin: 25,
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default connect(mSTP, mDTP)(ProfilePicture)

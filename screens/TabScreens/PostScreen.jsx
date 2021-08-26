import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, SafeAreaView, Platform, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';
import { uploadPhoto } from '../../actions/index';
import { updateNextPhoto, removeImage } from '../../actions/post';
import { FontAwesome } from '@expo/vector-icons'
const mSTP = state => {
  return{
    user: state.user,
    post: state.post,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({getUser, uploadPhoto, updateNextPhoto, removeImage}, dispatch)
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class PostScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        urlChosen: null
    }
    this.openLibrary = this.openLibrary.bind(this);
    this.changeChosenUrl = this.changeChosenUrl.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.uploadPost = this.uploadPost.bind(this);
  }

  openLibrary = async () =>{
    try{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if(status == 'granted'){
            const image = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            })
            if (!image.cancelled){
                const url = await this.props.uploadPhoto(image)
                this.props.updateNextPhoto(url)
                this.setState({
                    urlChosen: url
                })
            }
        }
    }catch(err){
        alert(err)
    }
  }

  changeChosenUrl(url){
    this.setState({
        urlChosen: url
    })
  }

  removeImage(url){
    const index = this.props.post.photos.indexOf(url)
    this.props.removeImage(index)
    // const photos = this.props.post.photos
    // if (photos.length == 2){
    //     this.setState({
    //         urlChosen: photos[0]
    //     })
    // }else{
    //     this.setState({
    //         urlChosen: null
    //     })
    // }
  }

  uploadPost(){
    alert('upload')
    this.props.navigation.navigate('PostCheckout')
  }

  render(){
    
    return (
      <SafeAreaView style={(Platform.OS =='ios' ? styles.iosContainer: styles.androidContainer)}>
        <View style={(Platform.OS =='ios' ? styles.iosPost: styles.androidPost)}>  
            <Text style={styles.topBarTitle}>Create a new post</Text>
            <TouchableOpacity onPress={this.uploadPost}>
                <Text style={styles.topBarUpload}>Upload</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
            {
                !this.props.post.photos[0] ? 
                <TouchableOpacity 
                    style={styles.imagesContainer}
                    onPress={this.openLibrary}
                >
                    <View style={styles.postCircle}>
                        <Text style={styles.postPlus}>+</Text>
                    </View>
                </TouchableOpacity>
                :
                <View>
                    <Image 
                        source={{uri: this.state.urlChosen}} 
                        style={styles.imageIcon}
                    />
                    <TouchableOpacity onPress={()=>this.removeImage(this.state.urlChosen)}>
                        <FontAwesome 
                            name='trash' 
                            color={'red'} 
                            size={25}
                            style={styles.trashIcon}
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
        <View style={styles.postContainer}>
            {
                this.props.post?.photos.map(url => 
                <TouchableOpacity 
                    onPress={()=>this.changeChosenUrl(url)}
                >
                    <Image source={{uri: url}} style={styles.preview}/>
                </TouchableOpacity>
                )
            }

            {
                !this.props.post.photos || this.props.post.photos?.length == 4 || this.props.post.photos?.length == 0 ? null :
                <TouchableOpacity 
                    style={styles.postSquare} 
                    onPress={this.openLibrary}
                >
                    <View style={styles.postCircle}>
                        <Text style={styles.postPlus}>+</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  androidContainer: {
    flex: 1,
    marginTop: 20,
  },
  iosContainer: {
    flex: 1,
  },
  androidPost:{
    width: screenWidth,
    height: 55,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  iosPost:{
    width: screenWidth,
    height: 55,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  imageIcon:{
    width: screenWidth,
    height: 300,
    resizeMode: 'stretch'
  },
  imageContainer:{
    width: screenWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagesContainer:{
    width: screenWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postContainer:{
    flexDirection: 'row',
    width: screenWidth,
    justifyContent:'center',
    alignItems: 'center'
  },
  postSquare:{
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 5
  },
  postPlus:{
    color: 'white',
    fontSize: 50
  },
  postCircle:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview:{
    width: 100,
    height: 100,
    borderRadius: 5
  },
  topBarTitle:{
    margin: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },
  topBarUpload:{
    margin: 10,
    fontWeight: 'bold',
    fontSize: 22,
    color: 'blue'
  },
  trashIcon:{
    position: 'absolute',
    bottom: 20,
    right: 30
  }
  
});


export default connect(mSTP, mDTP)(PostScreen)
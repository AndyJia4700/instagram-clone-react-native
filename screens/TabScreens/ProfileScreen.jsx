import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser, followUser, unfollowUser } from '../../actions/user';
import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

const mSTP = state => {
  return{
    user: state.user,
    profile: state.profile,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({getUser, followUser, unfollowUser}, dispatch)
}

const screenWidth = Dimensions.get('window').width


class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)
  }

  componentDidMount(){
    const {params}  = this.props.route
    if(params){
      this.props.getUser(params, 'PROFILE')
    }
    this.props.navigation.setOptions({
      title: this.props.profile.username,
  
    })
  }

  follow(){
    this.props.followUser(this.props.profile.uid)
  }

  unfollow(){
    this.props.unfollowUser(this.props.profile.uid)
  }

  render(){
    const {params} = this.props.route
    // this.props.navigation.setOptions({
    //   title: this.props.profile.username,
    // //   headerHideShadow: true,
    // //   headerStyle:{
    // //     shadowColor: 'transparent',
    // //     elevation: 0 
    // //   }
    // })
    if (!params){
      return (
        <View style={styles.container}>
            <Text>This is the ProfileScreen</Text>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ProfilePicture')}>
              <Text>ProfilePicture</Text>
            </TouchableOpacity>

            <Text>Your Profile</Text>

            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
              <Text>logout</Text>
            </TouchableOpacity>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source = {{uri: this.props.profile.photo}} style={styles.image}/>

            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text>{this.props.profile.posts?.length}</Text>
                <Text>Posts</Text>
              </View>
              <View style={styles.details}>
                <Text>{this.props.profile.followers?.length}</Text>
                <Text>Followers</Text>
              </View>
              <View style={styles.details}>
                <Text>{this.props.profile.following?.length}</Text>
                <Text>Following</Text>
              </View>
            </View>  
          </View>

          <View style={{padding: 20, width: '100%'}}>
            <Text>{this.props.profile.email}</Text>
            <Text>{this.props.profile.bio}</Text>
          </View>

          {
            (this.props.profile.followers?.includes(this.props.user.uid)) 
            ? 
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.menuOption}
                onPress={() => this.unfollow()}
              >
                <Text>Following</Text>
                <AntDesign name="down" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuOption}>
                <Text>Message</Text>
                <AntDesign name="down" size={24} color="black" />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.followerButton}
                onPress={() => this.follow()}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: '15'}}>Follow</Text>
              </TouchableOpacity>
            </View>

          }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  details:{
    alignItems: 'center',
    marginRight: 20
  },
  detailsContainer:{
    flexDirection: 'row'
  },
  followerButton:{
    backgroundColor: '#0095f6',
    height: 35,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20
  },
  menuContainer:{
    height: 60, 
    width: '100%', 
    flexDirection:'row', 
    justifyContent: 'center',
    
  },
  menuOption:{
    flexDirection: 'row',
    width: screenWidth*.4,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer:{
    width: '100%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
  
});


export default connect(mSTP, mDTP)(ProfileScreen)
import React from 'react';
import { RefreshControl, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image, SafeAreaView, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user';
import { getPosts, likePost, unlikePost, savePost, unsavePost, getSavedPosts } from '../../../actions/post';
import PostComponent from '../../../components/postComponent';



const mSTP = state => {
  return{
    user: state.user,
    post: state.post,
  }
}

const mDTP = dispatch => {
  return bindActionCreators({
    getUser, 
    getPosts, 
    likePost, 
    unlikePost,
    savePost, 
    unsavePost,
    getSavedPosts,
  }, dispatch)
}


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class SavedPosts extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getSavedPosts()
  }

  render(){
    return (
      <SafeAreaView style={(Platform.OS =='ios' ? styles.iosContainer: styles.androidContainer)}>
       
        <FlatList
          data={this.props.post.savedFeed}
          keyExtractor={item => JSON.stringify(item.uid)}
          renderItem={({item}) =>(
            <PostComponent 
              item={item}
              user={this.props.user}
              likePost={(item)=> this.props.likePost(item)}
              unlikePost={(item)=> this.props.unlikePost(item)}
              savePost={(item)=> this.props.savePost(item)}
              unsavePost={(item)=> this.props.unsavePost(item)}
            />
        )}

        />

      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  iosContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  androidContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 30,
  },
  feedPhotos:{
    width: screenWidth,
    height: 360
  },
  headerContainer:{
    // backgroundColor: 'red',
    width: screenWidth,
    height: 50,
    borderBottomColor: 'rgba(0,0,0,1)',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIconsContainer:{
    flexDirection: 'row'
  },
  icons:{
    paddingRight: 20
  },
  logo:{
    fontSize: 22,
    fontFamily:'Handlee',
    marginHorizontal: 10
  }
  
});


export default connect(mSTP, mDTP)(SavedPosts)
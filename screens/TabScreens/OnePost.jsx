import React from 'react';
import { RefreshControl, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image, SafeAreaView, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';
import { getPosts, getPost, likePost, unlikePost, savePost, unsavePost } from '../../actions/post';
import PostComponent from '../../components/postComponent';



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
    getPost, 
    likePost, 
    unlikePost,
    savePost, 
    unsavePost,
  }, dispatch)
}


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class OnePost extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
      this.props.navigation.setOptions({
          title: this.props.post.onePost.username + "'s post"
      })
  }

  render(){
    return (
        <PostComponent 
            item={this.props.post.onePost}
            user={this.props.user}
            likePost={(item)=> this.props.likePost(item)}
            unlikePost={(item)=> this.props.unlikePost(item)}
            savePost={(item)=> this.props.savePost(item)}
            unsavePost={(item)=> this.props.unsavePost(item)}
            navigation={this.props.navigation}
        />
    );
  }
  
}

const styles = StyleSheet.create({

  
});


export default connect(mSTP, mDTP)(OnePost)
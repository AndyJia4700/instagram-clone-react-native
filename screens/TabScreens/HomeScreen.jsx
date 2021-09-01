import React from 'react';
import { RefreshControl, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image, SafeAreaView, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';
import { getPosts, likePost, unlikePost, savePost, unsavePost } from '../../actions/post';
import PostComponent from '../../components/postComponent';
import { AntDesign } from '@expo/vector-icons';



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
  }, dispatch)
}


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.goToMessages = this.goToMessages.bind(this);
  }

  componentDidMount(){
    this.props.getPosts(10)
  }

  goToMessages(){
    try{
      this.props.navigation.navigate('MessageScreen')
    }catch(e){
      alert(e)
    }
  }

  render(){
    return (
      <SafeAreaView style={(Platform.OS =='ios' ? styles.iosContainer: styles.androidContainer)}>
        <View style={styles.headerContainer}>
          <Text style={styles.logo}>INSTA-CLONE</Text>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SavedPosts')}
            >
              <AntDesign name="hearto" size={24} color="black" style={styles.icons}/>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('MessageScreen')}
              onPress={() => this.goToMessages()}
            >
              <AntDesign name="message1" size={24} color="black" style={styles.icons}/>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.props.post.feed}
          keyExtractor={item => JSON.stringify(item.uid)}
          renderItem={({item}) =>(
            <PostComponent 
              item={item}
              user={this.props.user}
              likePost={(item)=> this.props.likePost(item)}
              unlikePost={(item)=> this.props.unlikePost(item)}
              savePost={(item)=> this.props.savePost(item)}
              unsavePost={(item)=> this.props.unsavePost(item)}
              navigation={this.props.navigation}
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


export default connect(mSTP, mDTP)(HomeScreen)
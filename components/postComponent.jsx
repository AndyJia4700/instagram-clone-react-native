//rncredux
import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import moment from 'moment';
import { AntDesign, Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const screeHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class PostComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            liked: undefined,
            likedNum: 0,
            saved: undefined,
        }
        this.switchlikePost = this.switchlikePost.bind(this)
        this.switchSavedPost = this.switchSavedPost.bind(this)
    }

    // static propTypes = {
    //     prop: PropTypes
    // }

    switchSavedPost(){
        const savedPost = this.props.item.savedBy.includes(this.props.user.uid)
        if (savedPost || this.state.saved == true){
            if (this.state.liked == false){
                this.setState({
                    saved: true,
                })
                this.props.savePost(this.props.item)
            } else {
                this.setState({
                    saved: false,
                })
                this.props.unsavePost(this.props.item)
            }
        } else {
            this.setState({
                saved: true,
            })
            this.props.savePost(this.props.item)
        }

    }

    switchlikePost(){
        const likedPost = this.props.item.likes.includes(this.props.user.uid)
        if (likedPost || this.state.liked == true){
            if (this.state.liked == false){
                this.setState({
                    liked: true,
                    likedNum: this.state.likedNum+1,
                })
                this.props.likePost(this.props.item)
            } else {
                this.setState({
                    liked: false,
                    likedNum: this.state.likedNum-1,
                })
                this.props.unlikePost(this.props.item)
            }
        } else {
            this.setState({
                liked: true,
                likedNum: this.state.likedNum+1,
            })
            this.props.likePost(this.props.item)
        }
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <View style={styles.userPhotoName}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('ProfileScreen', this.props.item.uid)}
                        >

                            <Image source={{uri: this.props.item.photo}} style={styles.userPhoto}/>
                        </TouchableOpacity>
                        <Text style={styles.userName}>{this.props.item.username}</Text>
                    </View>
                    <Text style={styles.postTime}>{moment(this.props.item.date).format('YYYY-MM-DD')}</Text>
                </View>
                   
                <ScrollView
                    style={styles.feedPhotos}
                    horizontal={true}
                    pagingEnabled={true}
                >
                    {
                        this.props.item.photos?.map(url => 
                            <Image 
                                source={{uri: url}}
                                style={styles.feedPhotos}
                            />
                        )
                    }
                </ScrollView>

                <View style={styles.underContainer}>
                    
                    <View style={styles.likeCommentIcons}>

                        <TouchableOpacity
                            onPress={()=>this.switchlikePost()}
                        >
                            {
                                this.props.item.likes.includes(this.props.user.uid) && this.state.liked == undefined ?   
                                <AntDesign name="heart" size={24} color="red" style={styles.icons}/>
                                : 
                                (
                                    this.state.liked == true ? 
                                    <AntDesign name="heart" size={24} color="red" style={styles.icons}/>
                                    :
                                    <AntDesign name="hearto" size={24} color="black" style={styles.icons}/>
                                )
                            }
                        </TouchableOpacity>
                        <Feather name="message-square" size={24} color="black" style={styles.icons}/>
                        <SimpleLineIcons name="paper-plane" size={24} color="black" style={styles.icons}/>
                    </View>

                    <View style={styles.likeCommentIcons}>
                        <TouchableOpacity
                            onPress={()=>this.switchSavedPost()}
                        >
                            {
                                this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined ?   
                                <Ionicons name="md-bookmark" size={24} color="tomato" style={styles.icons}/>
                                : 
                                (
                                    this.state.saved == true ? 
                                    <Ionicons name="md-bookmark" size={24} color="tomato" style={styles.icons}/>
                                    :
                                    <Feather name="bookmark" size={24} color="black" style={styles.icons}/>
                                )
                            }
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <Text style={styles.numberLikes}>{this.props.item.likes.length + this.state.likedNum} likes</Text>
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.numberLikes}>{this.props.item.username}: </Text>
                    <Text style={styles.description}>{this.props.item.description} </Text>
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.commentcontainer}>View all {this.props.item.comments.length} comments</Text>
                </TouchableOpacity>

                <View style={styles.commentSection}>
                    <Image
                        style={styles.userPhoto}
                        source={{uri: this.props.user.photo}}
                    />
                    <TextInput
                        placeholder={'add a comment'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  feedPhotos:{
    width: screenWidth,
    height: 360
  },
  userContainer:{
    width: screenWidth,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  userPhoto:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15
  },
  userPhotoName:{
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  postTime:{
    marginHorizontal: 15
  },
  underContainer:{
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeCommentIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons:{
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  numberLikes:{
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingVertical: 10,
  },
  description:{

  },
  commentcontainer:{
    color: 'grey',
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  commentSection:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
  
});


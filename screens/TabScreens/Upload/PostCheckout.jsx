import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateDescription} from '../../../actions/post'

const mSTP = state => {
  return{
    user: state.user,
    post: state.post
  }
}

const mDTP = dispatch => {
  return bindActionCreators({updateDescription}, dispatch)
}

const screeHeight = Dimensions.get('window').height
const screeWidth = Dimensions.get('window').width
class PostCheckout extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput
          multiline = {true}
          numberOfLines = {4}
          style={styles.post}
          placeholder={'What is in your mind?'}
          onChangeText={(input) => this.props.updateDescription(input)}
          value={this.props.post.description}
        /> 
        <View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
          >
            {
              this.props.post.photos?.map(url => 
                <Image 
                  source={{uri: url}}
                  style={styles.imagePreview}
                />
              )
            }

          </ScrollView>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  post:{
    fontSize: 20,
    marginTop: 40,
    padding: 20,
    marginHorizontal: 10
  },
  imagePreview:{
    height: 360,
    width: screeWidth,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
  
});


export default connect(mSTP, mDTP)(PostCheckout)
// import * as React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import AppLoading from 'expo-app-loading';
// import * as firebase from 'firebase';


// export default function App(){
//     return(
//         <View>
//             <Text>You are logged in</Text>
//             <TouchableOpacity onPress={() => firebase.auth().signOut()}>
//                 <Text style={{color: 'blue'}}>Logout</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import PostCheckout from '../screens/TabScreens/Upload/PostCheckout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';
import { uploadPost, 
  // getPosts 
} from '../actions/post';

const mSTP = state => {
  return{
    user: state.user,
    post: state.post
  }
}

const mDTP = dispatch => {
  return bindActionCreators({
    uploadPost, 
    // getPosts
  }, dispatch)
}

const Stack = createStackNavigator();

class MyStack extends React.Component{
  constructor(props){
    super(props)
    this.uploadPost = this.uploadPost.bind(this)
  }

  uploadPost(){
    this.props.navigation.navigate('TabNavigator');
    this.props.uploadPost();
    // this.props.getPosts();
  }

  render(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen 
          name="PostCheckout" 
          component={PostCheckout} 
          options={{
            headerShown: true, 
            headerTitle: 'See your post',
            headerRight: () => (
              <TouchableOpacity 
                style={styles.headerRight}
                onPress={()=>this.uploadPost()}
              >
                <Text style={styles.headerRight}>POST</Text>
                <FontAwesome
                  name='check'
                  color='black'
                  size={20}
                />
              </TouchableOpacity>
            )
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  headerRight:{
    flexDirection: 'row',
    marginHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue'
  },

})

export default connect(mSTP, mDTP)(MyStack);
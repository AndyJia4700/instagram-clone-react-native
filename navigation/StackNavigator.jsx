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

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="PostCheckout" component={PostCheckout} options={{headerShown: true}}/>

      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
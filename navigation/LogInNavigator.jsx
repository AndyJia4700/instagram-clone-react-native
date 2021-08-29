import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import Login from '../screens/AuthScreens/login';
import Signup from '../screens/AuthScreens/signup';
import Welcome from '../screens/AuthScreens/welcome';
import ProfilePicture from '../screens/AuthScreens/profilePicture';
import StackNavigator from './StackNavigator';
// import TabNavigator from './TabNavigator';


const Stack = createStackNavigator();

export default function App(){
    let [fontsLoaded] = useFonts({
        'Handlee': require('../assets/fonts/Handlee-Regular.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: true}}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Signup" component={Signup} options={{headerShown: true}}/>
                    <Stack.Screen name="ProfilePicture" component={ProfilePicture} options={{headerShown: true}}/>
                    {/* <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: true}}/> */}
                    <Stack.Screen name="StackNavigator" component={StackNavigator} options={{headerShown: false}}/>
                    {/* <Stack.Screen name="Login" component={Login} options={{headerShown: true, title: 0}}/> */}
                    
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
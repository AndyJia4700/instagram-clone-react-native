import React from 'react';
import SwitchNavigator from './navigation/LogInNavigator'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/root-reducer';
import { Provider } from 'react-redux';

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>
    );
  }
  
}

export default App;
import React, { Component } from 'react';
import Login from './components/Login.js';
import Channels from './components/Channels.js';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

export default class chatApp extends Component {

    constructor(props){
        super(props);
    }

    _renderScene(route, navigator){

        switch(route.name){
            case 'login':
                return (<Login navigator={navigator}/>);
            break;

            case 'channels':
                return (<Channels />);
            break;
        }

    }

    render() {
        return (
            <Navigator
            initialRoute={{name: 'login'}}
            renderScene={this._renderScene}
            configureScene={ () => Navigator.SceneConfigs.FloatFromRight}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

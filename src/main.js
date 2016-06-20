import React, { Component } from 'react';
import Login from './components/Login.js';
import Channels from './components/Channels.js';
import Chat from './components/Chat.js';
import Sendbird from 'sendbird';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

const NavBar = {

    LeftButton: function(route, navigator, index, navState){

        if(index > 0){

            return (
                <TouchableHighlight
                onPress={ () => {

                    if(route.name == 'chat'){
                        Sendbird.disconnect();
                    }

                    navigator.pop()
                } }
                style={styles.navBar}>

                    <Text style={styles.navBarText}>Back</Text>

                </TouchableHighlight>
            );

        }

        return null;

    },

    RightButton: function(route, navigator, index, navState){



    },

    Title: function(route, navigator, index, navState){



    }

}

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
                return (<Channels navigator={navigator}/>);
            break;

            case 'chat':
                return (<Chat />);
            break;
        }

    }

    render() {
        return (
            <Navigator
            initialRoute={{name: 'login'}}
            renderScene={this._renderScene}
            navigationBar={ <Navigator.NavigationBar routeMapper={NavBar}/> }
            configureScene={ () => Navigator.SceneConfigs.FloatFromBottom}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    navBar: {
        backgroundColor: '#6A60B9',
        padding: 8
    },
    navBarText: {
        color: 'white'
    }
});

import React from 'react';
import Sendbird from 'sendbird';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: null
        };

        this.login = this.login.bind(this);

    }

    login(){

        console.log('Login...' + this.state.username);

    }

    render(){
        return (
            <View style={styles.container}>

                <TextInput
                onChangeText={ text => {this.setState({username: text})} }
                value={this.state.username}
                placeholder='Nickname'/>

                <TouchableHighlight
                style={styles.btn}
                onPress={this.login}
                underlayColor='transparent'>

                    <Text style={styles.btnText}>Login</Text>

                </TouchableHighlight>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btn: {
        backgroundColor: '#6B60BA',
        padding: 7
    },

    btnText: {
        color: 'white'
    }

});

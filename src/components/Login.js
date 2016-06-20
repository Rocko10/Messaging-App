import React from 'react';
import Sendbird from 'sendbird';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

const APP_ID = 'E26A8ED5-6B79-4AD7-91CC-F6866A7C1169';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: null
        };

        this.login = this.login.bind(this);
        this._successLogin = this._successLogin.bind(this);
        this._errorLogin = this._errorLogin.bind(this);

    }

    _successLogin(data){

        this.props.navigator.push({
            name: 'channels'
        });

    }

    _errorLogin(status, error){

        console.log('[Error Sendbird Login]');
        console.log(error);
        this.setState({
            username: ''
        });

    }

    login(){

        Sendbird.init({
            app_id: APP_ID,
            guest_id: this.state.username,
            user_name: this.state.username,
            image_url: '',
            access_token: '',
            successFunc: this._successLogin,
            errorFunc: this._errorLogin
        });

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

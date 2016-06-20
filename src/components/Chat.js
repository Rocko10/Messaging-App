import React from 'react';
import Sendbird from 'sendbird';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Dimensions,
    ScrollView
} from 'react-native';

const windowSize = Dimensions.get('window');

export default class Chat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            message: null,
            messageList: []
        }

        this.onSendPress = this.onSendPress.bind(this);
        this.getMessages = this.getMessages.bind(this);

    }


    componentWillMount(){

        /*Handle when a message is received, it conctats to the messageList in the state*/
        Sendbird.events.onMessageReceived = obj => {
            this.setState({
                messageList: this.state.messageList.concat([obj])
            });
        };

        /*Then obtain all the messages in the connected channel*/
        this.getMessages();

    }

    getMessages(){

        /*Gets the messages from the channel connected*/
        Sendbird.getMessageLoadMore({

            limit: 100,
            successFunc: data => {
                let _messageList = [];

                data.messages.reverse().forEach((msg, index) => {

                    if(Sendbird.isMessage(msg.cmd)){
                        _messageList.push(msg.payload);
                    }

                });

                this.setState({
                    messageList: _messageList.concat(this.state.messageList)
                });
            },
            errorFunc: (status, error) => {
                console.log('[Error load more msgs]: ' + error)
            }

        });

    }

    /*Send the message to the channel connected, with the nickname established in the Login component*/
    onSendPress(){

        /*Send message to the channel connected*/
        Sendbird.message(this.state.message);

        this.setState({
            message: null
        });

    }

    render(){

        /*Format the messages*/
        let list = this.state.messageList.map((item, index) => {
            return (
                <View
                style={styles.messageContainer}
                key={index}>

                    <Text style={styles.nameLabel}> {item.user.name} says: </Text>
                    <Text style={styles.messageLabel}>{item.message} </Text>

                </View>
            );
        });

        /*Main return render from Chat component*/
        return(
            <View style={styles.container}>

                <View style={styles.chatContainer}>

                    <ScrollView
                    ref={ c => {this._scrollView = c} }
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    onContentSizeChange={ e => {} }>

                        {list}

                    </ScrollView>

                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>

                        <TextInput
                        onChangeText={ text => {this.setState({message: text})} }
                        value={this.state.message}
                        style={styles.input}/>

                    </View>

                    <View style={styles.sendContainer}>

                        <TouchableHighlight
                        underlayColor='transparent'
                        onPress={this.onSendPress}>

                            <Text style={styles.sendLabel}>Send</Text>

                        </TouchableHighlight>

                    </View>

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#6E5BAA'
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
  },
  input: {
      width: windowSize.width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderColor: '#6E5BAA',
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
    nameLabel: {
        color: 'black'
    }
});

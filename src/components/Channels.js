import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Channels extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>

                <Text>Channels comp</Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

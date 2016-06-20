import React from 'react';
import Sendbird from 'sendbird';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ListView,
    TouchableHighlight
} from 'react-native';

const PULLDOWN_DISTANCE = 40;

export default class Channels extends React.Component{

    constructor(props){
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.name !== r2.name});

        this.state = {
            channelList: [],
            dataSource: ds.cloneWithRows([]),
            page: 0,
            next: 0,
            channelName: ''
        };

        this.getChannelList = this.getChannelList.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.onChannelPress = this.onChannelPress.bind(this);
    }

    componentWillMount(){

        this.getChannelList(1);

    }

    getChannelList(page){

        if(page == 0){ return; }

        Sendbird.getChannelList({
            page: 1,
            limit: 20,
            successFunc: data => {

                this.setState({
                    channelList: this.state.channelList.concat(data.channels)
                }, () => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.state.channelList),
                        page: data.page,
                        next: data.next
                    });
                });

            },
            errorFunc: (status, error) => {console.log('[E]: ' + error)}
        });

    }

    onChannelPress(url){

        Sendbird.joinChannel(url, {

            successFunc: data => {

                Sendbird.connect({

                    successFunc: data => {

                        Sendbird.getChannelInfo(channel => {
                            console.log(channel);
                        });

                    },
                    errorFunc: (status, error) => {
                        console.log('[Error connect] ' + error)
                    }

                });

            },
            errorFunc: (status, error) => {
                console.log('[Error join channel] ' + error)
            }

        });

    }

    _renderRow(rowData){

        return (
            <TouchableHighlight
            onPress={() => {this.onChannelPress(rowData.channel_url)} }>

                <View style={styles.listItem}>

                    <View style={styles.listIcon}>
                        <Image style={styles.channelIcon} source={{uri: rowData.cover_img_url}}/>
                    </View>

                    <View style={styles.listInfo}>
                        <Text style={styles.titleLabel}> # {rowData.name}</Text>
                        <Text style={styles.memberLabel}> {rowData.member_count} members </Text>
                    </View>

                </View>

            </TouchableHighlight>
        );

    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>

                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReached={ () => this.getChannelList(this.state.next) }
                    onEndReachedThreshold={PULLDOWN_DISTANCE}
                    enableEmptySections={true}/>

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
  listContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 10
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#abb8c4',
  }

});

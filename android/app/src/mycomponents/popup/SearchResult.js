import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    
    render() {
        return this.props.showsearchresult ? (
            <View style={{width:"100%",height:"100%",position:"absolute",backgroundColor:"rgba(0,0,0,0.5 )",top:80}}>
                <View style={MyStyle.SearchResult}>
                <FlatList
                    extraData={this.state}
                    data={Array.from(this.props.searchresults)}
                    renderItem={({ item, index }) => {
                        return (<TouchableOpacity onPress={async () => {
                            this.props.handlers.closesearchresult()
                            await this.props.handlers.updateplaylist(this.props.activemix_tracklist, "Mix")
                            this.props.handlers.clearsearchhistory()
                            this.props.handlers.changeplaystate(item);                            
                        }}>
                            <View style={[MyStyle.MixItem, { height: this.props.screenheight * 0.0694 }]}>
                                <Text style={MyStyle.MixItemTitle}>{item.trackTitle}</Text>
                                <View style={MyStyle.MixItemSubTitle}>
                                    <Icon name="cloud" size={9} color="#FE672E"> </Icon>
                                    <Text style={{
                                        position: "absolute",
                                        fontSize: 13,
                                        left: "5%",
                                        color: "rgb(165,165,165)"
                                    }}>{item.trackSubTitle}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>)
                    }}
                    keyExtractor={(item, index) => index + ""}
                    style={{ width: "100%",height:"auto"}}
                    ItemSeparatorComponent={Line}
                >
                </FlatList>
            </View>
            </View>
        ) : null;
    }
}
class Line extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<View style={{
            position: "absolute",
            borderBottomWidth: 0.2,
            borderBottomColor: "rgba(155,155,155,0.3)",
            height: 0,
            right: 0,
            top: "100%",
            width: "85%"
        }}></View>)
    }
}
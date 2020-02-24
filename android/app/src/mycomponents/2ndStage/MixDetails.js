import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import Record from '../3rdStage/Record'
import MixItem from '../3rdStage/MixItem'


export default class MixDetails extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={MyStyle.MixDetails}>
                <FlatList
                    data={this.props.activemix.tracks}
                    renderItem={({ item, index }) => {
                        return <MixItem
                            screenheight={this.props.screenheight}
                            tracktitle={item.trackTitle}
                            tracksubtitle={item.trackSubTitle}
                            artist={item.artist}
                            id={item.trackId}
                            url={item.url}
                            globalnavigator={this.props.handlers.globalnavigator}
                            changenewmenustate={this.props.handlers.changenewmenustate}
                            changeplaystate={this.props.handlers.changeplaystate}
                            
                        ></MixItem>
                    }}
                    keyExtractor={(item, index) => item.trackId + ""}
                    style={{ width: "100%", height: "100%" }}
                    ListHeaderComponent={PlayAll}
                >

                </FlatList>
            </View>)
    }
}
class PlayAll extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<TouchableOpacity style={{ position: "relative", height: 50, width: "100%", display: "flex", justifyContent: "center" }}>
            <View style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "13.88%",
                height: "100%",
                left: 0,
            }}><Icon name="play-circle-outline" size={30} color="white"></Icon></View>
            <Text style={{ fontSize: 16, color: "white", position: "absolute", left: "13.88%", }}>Play all</Text>
            <Text style={{ fontSize: 12, color: "rgba(155,155,155,0.8)", position: "absolute", left: "30%" }}>(233 Tracks)</Text>
        </TouchableOpacity>)
    }
}
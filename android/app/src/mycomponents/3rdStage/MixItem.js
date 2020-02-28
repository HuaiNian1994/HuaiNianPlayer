import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class Mixitem extends React.Component {
    constructor(props) {
        super(props)
    }
    // tracktitle = { item.trackTitle }
    // tracksubtitle = { item.trackSubTitle }
    // artist = { item.artist }
    // id = { item.trackId }
    // url = { item.url }

    render() {
        return (
            <TouchableOpacity onPress={async () => {
                await this.props.updateplaylist(this.props.activemix_tracklist, "Mix")
                this.props.changeplaystate(this.props.thistrack);
                
            }}>
                <View style={[MyStyle.MixItem, { height: this.props.screenheight * 0.0694 }]}>
                    <View style={MyStyle.MixItemIndex}><Text style={{ color: "white" }}>{this.props.index + 1}</Text></View>
                    <Text style={MyStyle.MixItemTitle}>{this.props.thistrack.trackTitle}</Text>
                    <View style={MyStyle.MixItemSubTitle}>
                        <Icon name="cloud" size={9} color="#FE672E"> </Icon>
                        <Text style={{
                            position: "absolute",
                            fontSize: 13,
                            left: "5%",
                            color: "rgb(165,165,165)"
                        }}>{this.props.thistrack.trackSubTitle}</Text>
                    </View>

                    {/* menu */}
                    <TouchableWithoutFeedback onPress={() => { this.props.changenewmenustate(this.props.thistrack.trackTitle, "Edit MixItem") }}>
                        <Icon name="more-vertical" style={MyStyle.MixItemMenu} size={20} color="rgba(155,155,155,0.8)" />
                    </TouchableWithoutFeedback>

                </View>
            </TouchableOpacity>
        )
    }
}

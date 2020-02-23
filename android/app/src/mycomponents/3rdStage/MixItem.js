import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class Mixitem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { }}>
                <View style={[MyStyle.MixItem, { height: this.props.screenheight * 0.0694 }]}>
                    <View style={MyStyle.MixItemIndex}><Text style={{ color: "white" }}>{this.props.id + 1}</Text></View>
                    <Text style={MyStyle.MixItemTitle}>{this.props.tracktitle}</Text>
                    <View style={MyStyle.MixItemSubTitle}>
                        <Icon name="download-cloud" size={9} color="#FE672E"> </Icon>
                        <Text style={{
                            position: "absolute",
                            fontSize: 13,
                            left: "5%",
                            color: "rgb(165,165,165)"
                        }}>{this.props.tracksubtitle}</Text>
                    </View>

                    {/* menu */}
                    <TouchableWithoutFeedback onPress={() => { this.props.changenewmenustate(this.props.tracktitle,"Edit MixItem") }}>
                        <Icon name="more-vertical" style={MyStyle.MixItemMenu} size={20} color="rgba(155,155,155,0.8)" />
                    </TouchableWithoutFeedback>

                </View>
            </TouchableOpacity>
        )
    }
}

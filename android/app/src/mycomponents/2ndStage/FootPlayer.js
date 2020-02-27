import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableOpacity, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class FootPlayer extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TouchableOpacity style={MyStyle.FootPlayer} onPress={()=>{this.props.handlers.backgroundfadeout();this.props.handlers.globalnavigator("Track Details")}}>
				<View style={MyStyle.FootPlayerCover}><Image style={{ width: "100%", height: "100%", borderRadius: 999 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image></View>
				<Text style={MyStyle.FootPlayerTitle}>{this.props.playingtracktitle}</Text>
				<Text style={MyStyle.FootPlayerSubTitle}>Swipe left/right to play last/next</Text>
				<TouchableOpacity style={MyStyle.FootPlayerController} onPress={()=>{this.props.handlers.changeplaystate()}}><Icon color="rgba(230,230,230,0.9)" name={this.props.playstate?"pause-circle" :"play-circle"} size={27}></Icon></TouchableOpacity>
				<TouchableOpacity style={MyStyle.FootPlayerPlaylist} onPress={()=>{this.props.handlers.changeplayliststate()}}><Icon color="rgba(230,230,230,0.9)"  name="list" size={23}></Icon></TouchableOpacity>

			</TouchableOpacity>)
	}
}
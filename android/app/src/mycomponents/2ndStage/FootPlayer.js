import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class FootPlayer extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.FootPlayer}>
				<View style={MyStyle.FootPlayerCover}><Image style={{ width: "100%", height: "100%", borderRadius: 999 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image></View>
				<Text style={MyStyle.FootPlayerTitle}>The Moon</Text>
				<Text style={MyStyle.FootPlayerSubTitle}>Swipe left/right to play last/next</Text>
				<Icon style={MyStyle.FootPlayerController} name="play-circle-outline" size={30}></Icon>
				<Icon style={MyStyle.FootPlayerPlaylist} name="playlist-play" size={22}></Icon>

			</View>)
	}
}
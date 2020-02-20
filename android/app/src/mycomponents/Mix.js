import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../style'
import { View, Text, TextInput, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class Mix extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TouchableWithoutFeedback id={12} onPress={(e)=>{console.log(e.id)}} style={{backgroundColor:"red",width:"100%",height:"100%"}}>
				<View id={12} style={MyStyle.Mix}>
					<View style={MyStyle.MixCover}><Image style={{ width: "100%", height: "100%", position: "absolute", borderRadius: 10, opacity: 0.3 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image><Icon style={{ fontWeight: "100" }} name="favorite-border" size={33} color="#fff" /></View>
					<Text style={MyStyle.MixTitle}>槐念喜爱的音乐</Text>
					<Text style={MyStyle.MixSubTitle}>57songs</Text>
					<Icon name="more-vert" style={MyStyle.MixMenu} size={20} color="#fff" />
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
export default class Mix extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TouchableOpacity onPress={()=>{this.props.globalnavigator("Mix Details")}}>
				<View style={[MyStyle.Mix,{height:this.props.screenheight*0.0694}]}>
					<View style={MyStyle.MixCover}><Image style={{ width: "100%", height: "100%", position: "absolute", borderRadius: 10, opacity: 0.3 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image><Icon style={{ fontWeight: "100" }} name="favorite-border" size={33} color="#fff" /></View>
					<Text style={MyStyle.MixTitle}>{this.props.mixtitle}</Text>
					<Text style={MyStyle.MixSubTitle}>{this.props.mixsubtitle}</Text>
					
					{/* menu */}
					<TouchableWithoutFeedback onPress={()=>{this.props.changenewmenustate(this.props.mixtitle)}}>
						<Icon name="more-vert" style={MyStyle.MixMenu} size={20} color="#fff" />
					</TouchableWithoutFeedback>

				</View>
			</TouchableOpacity>
		)
	}
}

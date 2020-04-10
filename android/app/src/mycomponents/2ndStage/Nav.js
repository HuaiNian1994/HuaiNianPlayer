import React from 'react';
import {BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
let timer=null;
function debounce(fn,delay){
	
	return function () {
		clearTimeout(timer)
		let that=this;
		let args=arguments;
		timer=setTimeout(() => {
			fn.apply(that,args)
		}, delay);
	}
}
export default class Nav extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={MyStyle.Nav}>
				<TouchableOpacity style={MyStyle.NavMenu} onPress={() => {
					if (this.props.menu == "arrow-back") {
						this.props.handlers.globalnavigator("Back")
					}
				}}>
					<Icon name={this.props.menu} size={25} color="#fff" />
				</TouchableOpacity>
				<Text style={[MyStyle.NavTitle, { borderBottomWidth: this.props.title == "Mine" ? 2 : 0, left: this.props.title == "Mine" ? "22%" : "15.74%", }]}>{this.props.title}</Text>
				<TextInput 
				style={MyStyle.NavContent} 
				placeholder="What do you want...?" 
				placeholderTextColor="rgba(55,55,55,0.4)"
				onChangeText={(e) => { this.props.handlers.searchquerymonitor(e); debounce(this.props.handlers.search,500)();}}
				>
				</TextInput>
				<View style={MyStyle.NavIcon}><Icon name="search" size={25} color="#fff" /></View>
			</View>)
	}
}

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, TextInput} from 'react-native';

export default class Nav extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.Nav}>
				<Icon name={this.props.menu} style={MyStyle.NavMenu} size={25} color="#fff" />
				<Text style={[MyStyle.NavTitle, { borderBottomWidth: this.props.title == "Mine" ? 2 : 0 }]}>{this.props.title}</Text>
				<TextInput style={MyStyle.NavContent} placeholder="What do you want...?" placeholderTextColor="rgba(55,55,55,0.4)">
				</TextInput>
				<View style={MyStyle.NavIcon}><Icon name="search" size={25} color="#fff" /></View>
			</View>)
	}
}
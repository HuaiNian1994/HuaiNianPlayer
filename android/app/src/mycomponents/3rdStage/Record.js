import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
export default class Record extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TouchableOpacity onPress={() => {
				const recordName = this.props.content;			
				this.props.globalnavigator("Record Details",
					(that) => {
						that.setState({ recordOn: true, activeRecord: recordName })
					})
			}} style={MyStyle.Record}>
				<Icon style={MyStyle.RecordIcon} name={this.props.name} size={24} color="#fff" />
				<View style={[MyStyle.RecordTitle, this.props.specialStyle]}><Text style={{ color: "white", fontSize: 17 }}>{this.props.content}<Text style={MyStyle.description}> {this.props.trackssum}</Text></Text></View>
			</TouchableOpacity>)
	}
}
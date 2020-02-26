import React from 'react';
import { View, Text, StyleSheet, findNodeHandle, Animated, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import Record from '../3rdStage/Record'
import Mix from '../3rdStage/Mix'
import { BlurView } from "@react-native-community/blur";


export default class TrackDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewRef: null,
			backgroundOpacity: 0,
			blurAmount:100,
			top: new Animated.Value(500)
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
		}, 250)//this is f**ing stupid
		Animated.timing(
			this.state.top, {
			toValue: 0,
			duration: 100,
			// useNativeDriver: true
		}
		).start();

	}

	render() {

		return (
			<Animated.View style={[styles.container, { top: this.state.top  }]}>
			
				<Animated.Image
					ref={img => {
						this.backgroundImage = img;
					}}
					source={require("../../images/Covers/default.jpg")}
					style={[styles.absolute, { opacity: this.state.backgroundOpacity }]}

				/>
				<BlurView
					style={[styles.absolute]}
					viewRef={this.state.viewRef}
					blurType="light"
					blurAmount={this.state.blurAmount}
				/>
				<View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)",position:"absolute"}}></View>
				<Text>Hi, I am some unblurred text.....</Text>
			</Animated.View>)
	}
}
const styles = StyleSheet.create({
	container: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%"
	},
	absolute: {
		position: "absolute",
		// top: 0,
		// left: 0,
		// bottom: 0,
		// right: 0,
		height: "100%",
		width: "100%"
	}
});
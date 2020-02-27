import React from 'react';
import { View, Text, StyleSheet, Image, findNodeHandle, Animated, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
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
			blurAmount: 100,
			top: new Animated.Value(100),
			opacity: new Animated.Value(0),

		};
	}
	imageLoaded = () => {
		const duration = 250;
		setTimeout(() => {
			this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
		}, duration)//this is f**ing stupid
		Animated.timing(
			this.state.top, {
			toValue: 0,
			duration: duration,
			// useNativeDriver: true
		}).start();
		Animated.timing(
			this.state.opacity, {
			toValue: 1,
			duration: duration,
			// useNativeDriver: true
		}).start();
	}

	render() {
		return (

			<Animated.View style={[MyStyle.TrackDetails, { opacity: this.state.opacity }]}>
				{/* ***************************背景区开始 *************************/}
				<Animated.Image
					ref={img => {
						this.backgroundImage = img;
					}}
					source={require("../../images/Covers/default.jpg")}
					style={[MyStyle.TrackDetailsBlurArea, { opacity: 0 }]}//不需要显示
					onLoadEnd={this.imageLoaded}
				/>
				<BlurView
					style={[MyStyle.TrackDetailsBlurArea]}
					viewRef={this.state.viewRef}
					blurType="light"
					blurAmount={35}
				/>
				<View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute" }}></View>

				{/* ***************************背景区结束，内容区开始 *************************/}
				<Animated.View style={[MyStyle.TrackDetails, { top: this.state.top }]}>
					<View style={MyStyle.TrackDetailsHead}>
						<Icon style={{ position: "absolute", bottom: "20%", left: "4.8%" }} size={26} name="arrow-back" color="white"></Icon>
						<Text style={{ position: "absolute", bottom: "33%", left: "15.6%", color: "white", fontSize: 17 }}>回家</Text>
						<Text style={{ position: "absolute", bottom: "16%", left: "15.6%", color: "rgba(155,155,155,0.8)", fontSize: 13 }}>Shunza</Text>
						<Image style={{ position: "absolute",width:"10%", height: "24%", bottom: "30%", right: "3.7%" }} source={require("../../images/btn/other/share.png")} ></Image>
					</View>
					<View style={MyStyle.TrackDetailsCover}>
						<Image source={require("../../images/toolImage/bs7.png")} style={{ position: "absolute", left: "44.79%", top: 0, height: "29.5%", width: "25.55%", zIndex: 999 }}></Image>

						<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", top: "14.78%", width: "72.6%", height: "54%" }}>
							<Image style={{ width: "100%", height: "100%" }} source={require("../../images/toolImage/disc_official.png")}></Image>
							<Image style={{ width: "61.8%", height: "61.8%", position: "absolute", borderRadius: 1000 }} source={require("../../images/Covers/default.jpg")}></Image>
						</View>
					</View>
					<View style={MyStyle.TrackDetailsMenu}>

						<Image style={{ position: "absolute",width:"12%", height: "100%", right: "25%" }} source={require("../../images/btn/other/love.png")} ></Image>
						<Image style={{ position: "absolute",width:"12%", height: "100%", right: "7%" }} source={require("../../images/btn/other/more.png")}></Image>
					</View>
					<View style={MyStyle.TrackDetailsProcess}>
						<Text style={{ position: "absolute", left: "5.5%", fontSize: 12, color: "rgba(155,155,155,0.5)" }}>0:00</Text>
						<View style={{ height: 1, width: "70.37%", backgroundColor: "rgba(155,155,155,0.5)" }}></View>
						<Text style={{ position: "absolute", right: "5.5%", fontSize: 12, color: "rgba(155,155,155,0.5)" }}>3:00</Text>
					</View>
					<View style={MyStyle.TrackDetailsButtonGroup}>
						<Image style={{ position: "absolute", width: "12%", height: "28%", left: "7%" }} source={require("../../images/btn/other/loop1.png")}></Image>
						<Image style={{ position: "absolute", width: "12%", height: "28%", left: "25%" }} source={require("../../images/btn/previous.png")}></Image>
						<Image style={{ position: "absolute", width: "17%", height: "67%" }} source={require("../../images/btn/play.png")}></Image>
						<Image style={{ position: "absolute", width: "12%", height: "28%", right: "25%" }} source={require("../../images/btn/next.png")}></Image>
						<Image style={{ position: "absolute", width: "12%", height: "28%", right: "7%" }} source={require("../../images/btn/other/list.png")}></Image>
					</View>
				</Animated.View>
			</Animated.View>

		)
	}
}

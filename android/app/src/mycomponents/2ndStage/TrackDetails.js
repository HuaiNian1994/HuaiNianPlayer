import React from 'react';
import { View, Text, Easing, PanResponder, Dimensions, StyleSheet, Image, findNodeHandle, Animated, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import Record from '../3rdStage/Record'
import Mix from '../3rdStage/Mix'
import { BlurView } from "@react-native-community/blur";
import TrackPlayer, { ProgressComponent } from 'react-native-track-player'

export default class TrackDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewRef: null,
			blurAmount: 100,
			top: new Animated.Value(100),
			opacity: new Animated.Value(0),
			coverDegree: new Animated.Value(0),
			playing: this.props.playstate
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
	componentDidMount() {
		this.props.playstate ? this.spin() : this.stopSpin();

	}
	spin = () => {
		Animated.timing(
			this.state.coverDegree, {//默认一首歌可以播十万分钟
			toValue: 60 * 100000,
			duration: 30000 * 100000,
			easing: Easing.bezier(0, 0, 1, 1)
		}
		).start()
	}
	stopSpin = () => {
		Animated.timing(
			this.state.coverDegree
		).stop()
	}
	render() {
		var degree = this.state.coverDegree.interpolate({
			inputRange: [0, 60],
			outputRange: ["0deg", "360deg"]
		})
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
						<Text style={{ position: "absolute", bottom: "33%", left: "15.6%", color: "white", fontSize: 17 }}>{this.props.playingtrack ? this.props.playingtrack.trackTitle : "Welcome to the world ,HuaiNian!"}</Text>
						<Text style={{ position: "absolute", bottom: "16%", left: "15.6%", color: "rgba(155,155,155,0.8)", fontSize: 12 }}>{this.props.playingtrack ? this.props.playingtrack.artist : "HuaiNian1994"}</Text>
						<Image style={{ position: "absolute", width: "10%", height: "24%", bottom: "30%", right: "3.7%" }} source={require("../../images/btn/other/share.png")} ></Image>
					</View>
					<View style={MyStyle.TrackDetailsCover}>
						<Image source={require("../../images/toolImage/bs7.png")} style={{ position: "absolute", left: "44.79%", top: 0, height: "29.5%", width: "25.55%", zIndex: 999 }}></Image>

						<Animated.View style={{ transform: [{ rotate: degree }], justifyContent: "center", alignItems: "center", position: "absolute", top: "14.78%", width: "72.6%", height: "54%" }}>
							<Image style={{ width: "100%", height: "100%" }} source={require("../../images/toolImage/disc_official.png")}></Image>
							<Image style={{ width: "61.8%", height: "61.8%", position: "absolute", borderRadius: 1000 }} source={require("../../images/Covers/default.jpg")}></Image>
						</Animated.View>
					</View>
					<View style={MyStyle.TrackDetailsMenu}>

						<Image style={{ position: "absolute", width: "12%", height: "100%", right: "25%" }} source={require("../../images/btn/other/love.png")} ></Image>
						<Image style={{ position: "absolute", width: "12%", height: "100%", right: "7%" }} source={require("../../images/btn/other/more.png")}></Image>
					</View>

					<Progress></Progress>

					<View style={MyStyle.TrackDetailsButtonGroup}>
						<Image style={{ position: "absolute", width: "12%", height: "28%", left: "7%" }} source={require("../../images/btn/other/loop1.png")}></Image>

						<TouchableOpacity style={{ position: "absolute", width: "12%", height: "28%", left: "25%" }} onPress={() => { this.props.handlers.changeplaystate("previous") }}>
							<Image style={{ width: "100%", height: "100%" }} source={require("../../images/btn/previous.png")}></Image>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { this.props.playstate ? this.stopSpin() : this.spin(); this.props.handlers.changeplaystate() }} style={{ position: "absolute", width: "17%", height: "67%" }}>
							{this.props.playstate ? <Image style={{ width: "100%", height: "100%" }} source={require("../../images/btn/pause.png")}></Image> : <Image style={{ width: "100%", height: "100%" }} source={require("../../images/btn/play.png")}></Image>}
						</TouchableOpacity>
						<TouchableOpacity style={{ position: "absolute", width: "12%", height: "28%", right: "25%" }} onPress={() => { this.props.handlers.changeplaystate("next") }}>
							<Image style={{ width: "100%", height: "100%" }} source={require("../../images/btn/next.png")}></Image>
						</TouchableOpacity>

						<TouchableOpacity style={{ position: "absolute", width: "12%", height: "28%", right: "7%" }} onPress={() => { this.props.handlers.changeplayliststate() }}>
							<Image style={{ width: "100%", height: "100%" }} source={require("../../images/btn/other/list.png")}></Image>
						</TouchableOpacity>

					</View>
				</Animated.View>
			</Animated.View>

		)
	}

}
secToMin = (sec) => {
	var second = Math.floor(sec % 60);
	second = second < 10 ? "0" + second : second;
	var minute = Math.floor(sec / 60);
	minute = minute < 10 ? "0" + minute : minute;
	return minute + ":" + second;
}
const screenWidth = Math.round(Dimensions.get('window').width);
class Progress extends ProgressComponent {
	constructor(props) {
		super(props)
		this.state = {
			position: 0,
			bufferedPosition: 0,
			duration: 1,
		}
	}
	setProgress = PanResponder.create({
		onStartShouldSetPanResponder: (evt, gestureState) => true,
		// onPanResponderGrant: (evt, gestureState) => {
		// },
		onPanResponderRelease: (e, gestureState) => {
			const Beginning = Math.round(screenWidth * 0.3 / 2);
			const Ending = screenWidth - Beginning;
			const X=Math.round(gestureState.x0)
			var relativeX=null;
			if(X<Beginning ){//x是一个按钮相对于进度条的坐标。意指手放开后，按钮应被挪到的位置
				relativeX=0;
			}else if(X>Ending ){
				relativeX=Ending-Beginning;
			}else{
				relativeX=X-Beginning;
			}
			const playPrecent=relativeX/(screenWidth*0.7);
			TrackPlayer.seekTo(this.state.duration*playPrecent);
		},
	})
	render() {

		const bufferedPercent = this.getBufferedProgress() * 100 + "%";
		const playedPercent = this.state.position / this.state.duration * 100 + "%";
		return (
			<View {...this.setProgress.panHandlers} style={MyStyle.TrackDetailsProgress}>
				<Text style={{ position: "absolute", left: "5.5%", fontSize: 12, color: "rgba(180,180,180,0.8)" }}>{secToMin(this.state.position)}</Text>
				<View style={{ position: "relative", justifyContent: "center", height: 1, width: "70%", backgroundColor: "rgba(155,155,155,0.5)" }} >
					<View style={{ height: "100%", width: bufferedPercent, backgroundColor: "rgba(180,180,180,0.8)" }}></View>
					<View style={{ position: "absolute", left: playedPercent, height: 5, width: 5, borderRadius: 999, backgroundColor: "rgba(220,220,220,0.8)" }}></View>
				</View>
				<Text style={{ position: "absolute", right: "5.5%", fontSize: 12, color: "rgba(180,180,180,0.8)" }}>{secToMin(this.state.duration)}</Text>
			</View>
		);
	}
}

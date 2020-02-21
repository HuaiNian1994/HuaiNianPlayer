import React, { Component } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json'; //唯一的入口名称
import MyStyle from './android/app/src/mycomponents/1stStage/style'
import Nav from './android/app/src/mycomponents/2ndStage/Nav'
import Content from './android/app/src/mycomponents/2ndStage/Content'
import FootPlayer from './android/app/src/mycomponents/2ndStage/FootPlayer'
import NewMix from './android/app/src/mycomponents/popup/NewMix'
import NewMenu from './android/app/src/mycomponents/popup/NewMenu.js'
//from 后跟的字符串不要有空格！！！坑得一B！！
// import { BlurView } from "@react-native-community/blur";

initApp();
//规定：规定必须写在根组件页面
//规定：二级组件必须以对象的形式传递根组件的处理函数，对象名为handlers
//规定：buttonName的值与该button文本的实际值一致
//规定：根组件是数据中心，子组件只能享用而不能自建动态数据
export default class AlignItemsBasics extends React.Component {
	render() {//立规则：自定义的属性全小写,以免与同名的变量混淆
		const containerWidth = Dimensions.get('window').width;
		const containerHeight = Dimensions.get('window').height * 1.064;
		return (
			<View style={{ width: "100%", height: "100%", zIndex: -999 }}>
				{/*高度固定区*/}
				<ImageBackground source={require("./bg.jpg")} style={MyStyle.Container, { width: containerWidth, height: containerHeight }}>
					<StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
					<Nav menu="sort" title="Mine" ></Nav>
					{/* <Nav menu="arrow-back" title="Mix" ></Nav> */}
					<Content
						handlers={{
							changenewmenuState: this.changeNewMenuState,
							changenewmixstate: this.changeNewMixState,
						}}
						screenheight={containerHeight}
						screenwidth={containerWidth}
						mixlist={this.state.mixList}
					></Content>
					<FootPlayer></FootPlayer>
				</ImageBackground>
				{/*内容弹出区*/}
				<NewMix 
				screenwidth={containerWidth} 
				screenheight={containerHeight} 
				shownewmix={this.state.showNewMix} 
				changenewmixstate={this.changeNewMixState}></NewMix>
				<NewMenu 
				screenwidth={containerWidth} 
				screenheight={containerHeight} 
				shownewmenu={this.state.showNewMenu} 
				newmenutitle={this.state.newMenuTitle} 
				changenewmenuState={this.changeNewMenuState}></NewMenu>
			</View>
		);
	}
	constructor(props) {
		super(props)
		this.state = {
			fullscreenTarget: null,
			showNewMix: false,
			showNewMenu: false,
			lastPageIndex: null,//导航专用
			newMenuTitle: null,
			mixList:[{mixtitle:"槐念喜欢的音乐",mixsubtitle:"57songs"}]
		}
	}
	componentDidMount() {
	}
	//触发者：ContentMixesBar.add
	//返回者：NewMix->cancel NewMix->submit
	//传递路径1：APP->Content->ContentMixesBar.add
	//传递路径2：APP->NewMix
	changeNewMixState = (newMixTitle, buttonName) => {
		if (newMixTitle != "" && buttonName == "SUBMIT") {
			const info={mixtitle:newMixTitle,mixsubtitle:"57 Songs"}
			this.state.mixList.push(info)
			
		}
		this.setState({ showNewMix: !this.state.showNewMix })
	}
	//触发者：Mix.add
	//返回者：NewMenu
	//传递路径1：APP->Content->ContentMixes->Mix.more-vert
	//传递路径2：APP->NewMenu
	changeNewMenuState = (title) => {
		console.log("xixi");
		this.setState({ showNewMenu: !this.state.showNewMenu, newMenuTitle: title })
	}
	
};



function initApp() {
	//不允许随系统设置缩放
	Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false })
	async function requestStorageAccessPermission() {
		try {
			const answer = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				{
					title: '嘻嘻，我要读取你的文件',
					message:
						'你给不给？',
					buttonNeutral: '等会再问我',
					buttonNegative: 'NMSL',
					buttonPositive: '哦',
				},
			);
			if (answer === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('现在你获得权限了');
				return true;
			} else {
				console.log('用户并不屌你');
				return false;
			}
		} catch (err) {
			console.log(err);
		}
	}
	requestStorageAccessPermission();

	// AppRegistry.registerComponent(appName, () => App);
	// TrackPlayer.registerPlaybackService(() => require('./trackserver.js'));
	// TrackPlayer.setupPlayer().then(async () => { });
	// http://192.168.43.202:3000/
	// file:///storage/emulated/0/LaProvence.mp3
	// var mytrack = {
	//   id: 'myId',
	//   url: " http://192.168.43.202:3000/",
	//   title: 'myTitle',
	//   artist: 'Huainian',
	//   artwork: "file:///storage/emulated/0/1寸 小.png"
	// }
	// TrackPlayer.add(mytrack).then(() => {
	//   TrackPlayer.play();
	// })

	// var ImageBackgroundId = null;
	// ImageBackground.prototype.componentDidMount = function () {
	// 	console.log("mounted"+findNodeHandle(this));
	// 	// console.log(findNodeHandle(this).bind(this));
	// 	// console.log(this);
	// 	ImageBackgroundId = findNodeHandle(this)


	// }
	// var asking = () => {
	// 	var timer=setInterval(() => {
	// 		console.log("ask");
	// 		if (ImageBackgroundId) {


	// 			return (new Promise((resolve)=>{
	// 				console.log("asked"+ImageBackgroundId);
	// 				resolve(ImageBackgroundId)
	// 			}))
	// 		}
	// 	}, 100);
	// }

	// console.log("got"+(async ()=>await asking())());
};



import React, { Component } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
import TrackPlayer, { STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';
import { name as appName } from './app.json'; //唯一的入口名称
import MyStyle from './android/app/src/mycomponents/1stStage/style'
import Nav from './android/app/src/mycomponents/2ndStage/Nav'
import Content from './android/app/src/mycomponents/2ndStage/Content'
import MixDetails from './android/app/src/mycomponents/2ndStage/MixDetails'
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
				{/*高度固定区，未来的pageNavigation区域*/}
				<ImageBackground source={require("./bg.jpg")} style={MyStyle.Container, { width: containerWidth, height: containerHeight }}>
					<StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
					{this.state.nowPage == "Main" && (
						<View style={{ width: "100%", height: "100%" }}>
							<Nav menu="sort" title="Mine" ></Nav>
							<Content
								handlers={{
									changenewmenustate: this.changeNewMenuState,
									changenewmixstate: this.changeNewMixState,
									globalnavigator: this.globalNavigator
								}}
								screenheight={containerHeight}
								screenwidth={containerWidth}
								mixlist={this.state.mixList}
								newmixcomponent_title={this.state.NewMixComponent_title}
							></Content>
						</View>
					)}
					{this.state.nowPage == "Mix Details" && (
						<View style={{ width: "100%", height: "100%" }}>
							<Nav menu="arrow-back" title="Mix"
								handlers={{
									globalnavigator: this.globalNavigator
								}}></Nav>
							<MixDetails
								handlers={{
									changenewmenustate: this.changeNewMenuState,
									changenewmixstate: this.changeNewMixState,
									globalnavigator: this.globalNavigator,
									changeplaystate: this.changePlayState
								}}
								screenheight={containerHeight}
								screenwidth={containerWidth}
								activemix={this.state.mixList[this.state.activeMixId]}
								newmixcomponent_title={this.state.NewMixComponent_title}
							></MixDetails>
						</View>
					)}
					<FootPlayer
						playstate={this.state.playState}
						handlers={{
							changeplaystate: this.changePlayState,
						}}></FootPlayer>
				</ImageBackground>


				{/*内容弹出区*/}
				<NewMix
					screenwidth={containerWidth}
					screenheight={containerHeight}
					shownewmix={this.state.showNewMix}
					newmixcomponent_input={this.state.NewMixComponent_input}
					newmixcomponent_title={this.state.NewMixComponent_title}
					mixlist={this.state.mixList}
					handlers={{
						changenewmixstate: this.changeNewMixState,
						newmixmonitor: this.newMixMonitor,
						editmix: this.editMix,
					}}
				></NewMix>
				<NewMenu
					screenwidth={containerWidth}
					screenheight={containerHeight}
					shownewmenu={this.state.showNewMenu}
					newmenutitle={this.state.newMenuTitle}
					newmenuitemscontent={this.state.newMenuItemsContent}
					activemixid={this.state.activeMixId}
					handlers={{
						changenewmenustate: this.changeNewMenuState,
						deletemix: this.deleteMix,
						editmix: this.editMix,
						sharemix: this.shareMix
					}}
				></NewMenu>
			</View>
		);
	}
	constructor(props) {
		super(props)


		this.state = {
			// for navigation
			nowPage: "Main",
			historyStack: ["Main"],
			//openning a NewNenu
			showNewMenu: false,
			newMenuTitle: null,
			newMenuItemsContent: null,
			//create a Mix && render mixlist 
			showNewMix: { show: false, purpose: "addMix" },//propose取值：addMix，editMix
			mixList: [{
				mixtitle: "槐念喜欢的音乐",
				mixsubtitle: "57songs",
				id: 0,
				cover: "",
				tracks: [{
					url: "",
					trackTitle: "传奇",
					trackTitleDisc: "",
					trackSubTitle: "王菲-传奇",
					artist: "王菲",
					trackId: 0
				}]
			}],
			NewMixComponent_input: null,
			//edit a Mix
			NewMixComponent_title: null,
			editingMixIndex: null,


			//opening a Mix
			activeMixId: null,


			//play music
			playList: [],
			playState: false,
			lastTrack: null

		}
		var sum = 0;
		console.log("Root constructor 运行了" + sum++);

	}
	async componentDidMount() {
		const data = await this.getMixList();
		this.setState({ mixList: data })
	}
	getMixList = () => {
		return new Promise((resolve, reject) => {
			fetch("http://192.168.43.202:3000/getMixes")
				.then(data => data.json())
				.then(res => {
					resolve(res)
				})
		})
	}


	//启示：拿root的方法作壳，在事件触发点编写回调
	globalNavigator = (pageName, callback) => {
		callback instanceof Function ? callback(this) : null;//骚操作QVQ
		if (pageName == "Back") {
			if (this.state.historyStack.length != 1) {
				this.state.historyStack.pop()
			}
			this.setState({ nowPage: this.state.historyStack[this.state.historyStack.length - 1] })
		} else {
			this.setState({ nowPage: pageName })
			this.state.historyStack.push(pageName);
		}
	}
	//业务触发者：ContentMixesBar.add
	//业务返回者：NewMix.cancel && NewMix.submit
	//传递路径1：APP->Content->ContentMixesBar.add
	//传递路径2：APP->NewMix
	changeNewMixState = (params) => {
		if (params && params.newTitle != "" && params.action == "SUBMIT") {
			const info = { mixtitle: params.newTitle, mixsubtitle: "57 Songs", id: this.state.mixList.length }
			this.state.mixList.push(info)
			this.setState({ NewMixComponent_input: null, mixList: this.state.mixList })
		}
		if (params && params.purpose) {
			this.setState({ NewMixComponent_title: params.purpose })
		}
		this.setState({
			showNewMix: {
				show: !this.state.showNewMix.show,
				purpose: this.state.showNewMix.purpose
			}
		})
	}
	newMixMonitor = (e) => {
		this.setState({ NewMixComponent_input: e })
	}

	//业务触发者：Mix.more-vert
	//业务返回者：NewMenu
	//传递路径1：APP->Content->ContentMixes->Mix.more-vert
	//传递路径2：APP->NewMenu
	changeNewMenuState = (title, purpose) => {
		if (this.state.showNewMenu == false) {
			if (purpose == "Edit Mix") {
				this.setState({
					newMenuItemsContent: {
						titles: ["Share", "Edit Mix", "Delete"],
						names: ["launch", "brush", "delete"]
					}
				})
			} else if (purpose == "Edit MixItem") {
				this.setState({
					newMenuItemsContent: {
						titles: ["Play Next", "Fav to Mix", "Share This Song", "Delete This Song"],
						names: ["redo", "create-new-folder", "launch", "delete"]
					}
				})
			}
		}
		this.setState({ showNewMenu: !this.state.showNewMenu, newMenuTitle: title })
	}
	//业务触发者：NewMenu.delete
	//业务返回者：NewMenu
	//传递路径1：APP->NewMenu.delete
	deleteMix = (title) => {
		for (let i = 0; i < this.state.mixList.length; i++) {
			if (this.state.mixList[i].mixtitle == title) {
				if (this.state.mixList[i].mixtitle != "槐念喜欢的音乐") {
					this.state.mixList.splice(i, 1)
					for (let j = i; j < this.state.mixList.length; j++) {//修正下方mix的id
						this.state.mixList[j].id = j;
					}
				}
				this.changeNewMenuState()
				break;
			}
		}
	}
	//业务触发者：NewMenu.edit
	//业务返回者：NewMix.submit && NewMix.cancel
	//传递路径1：APP->NewMenu.edit
	//传递路径2：APP->NewMix
	editMix = (params) => {//arr.purpose arr.whichMix
		//1、总是执行：改变newmix窗口状态
		this.setState({
			showNewMix: {
				show: !this.state.showNewMix.show,
				purpose: this.state.showNewMix.purpose
			}
		})
		//2.触发时：
		if (params.purpose == "Edit") {
			this.changeNewMenuState()
			this.setState({
				NewMixComponent_input: params.whichMix,
				NewMixComponent_title: params.purpose
			})
			for (let i = 0; i < this.state.mixList.length; i++) {//把正在edit的mix的index找出来
				if (this.state.mixList[i].mixtitle == params.whichMix) {
					this.setState({ editingMixIndex: i });
					break;
				}
			}
		}
		//3.返回时：
		if (params.action == "SUBMIT") {//为指定index的mix赋值
			this.state.mixList[this.state.editingMixIndex].mixtitle = params.submitContent
		}

	}
	shareMix = () => {
		//待续
	}

	changePlayState = (Track) => {
		if (Track === undefined) {
			this.state.playState?TrackPlayer.pause():TrackPlayer.play();
			this.setState({ playState: !this.state.playState })
			
		}
		else {
			if (this.state.playState && this.state.lastTrack === Track) {
				TrackPlayer.pause();
				this.setState({ playState: false})
			} else {
				if (this.state.lastTrack != Track) {
					this.setState({ lastTrack: Track })
					this.state.playList.push(Track)
					TrackPlayer.add(Track);
					if (this.state.lastTrack === null) {
						TrackPlayer.play();
					} else {
						TrackPlayer.skipToNext()
					}
					this.setState({ playState: true })
					// TrackPlayer.next
				} else {
					TrackPlayer.play();
				}
			}
		}
	}
	getQueue = async () => {
		console.log(await TrackPlayer.getQueue());
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

	AppRegistry.registerComponent(appName, () => App);
	TrackPlayer.registerPlaybackService(() => require('./trackserver.js'));
	TrackPlayer.setupPlayer().then(async () => {

	});


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



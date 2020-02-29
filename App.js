import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, BackHandler, TextInput, TouchableWithoutFeedback, findNodeHandle, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
import TrackPlayer, { CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_JUMP_FORWARD, CAPABILITY_JUMP_BACKWARD, STATE_NONE, STATE_PLAYING, STATE_PAUSED, STATE_STOPPED, STATE_BUFFERING } from 'react-native-track-player';
import { name as appName } from './app.json'; //唯一的入口名称
import MyStyle from './android/app/src/mycomponents/1stStage/style'
import Nav from './android/app/src/mycomponents/2ndStage/Nav'
import Content from './android/app/src/mycomponents/2ndStage/Content'
import MixDetails from './android/app/src/mycomponents/2ndStage/MixDetails'
import FootPlayer from './android/app/src/mycomponents/2ndStage/FootPlayer'
import NewMix from './android/app/src/mycomponents/popup/NewMix'
import NewMenu from './android/app/src/mycomponents/popup/NewMenu.js'
import PlayList from './android/app/src/mycomponents/popup/PlayList.js'
import TrackDetails from './android/app/src/mycomponents/2ndStage/TrackDetails'
import { exists } from 'react-native-fs';
//from 后跟的字符串末尾不要有空格！！！坑得一B！！
// import { BlurView } from "@react-native-community/blur";

initApp();
//规定：规定必须写在根组件页面
//规定：二级组件必须以对象的形式传递根组件的处理函数，对象名为handlers
//规定：buttonName的值与该button文本的实际值一致
//规定：根组件是数据中心，子组件只能享用而不能自建动态数据
//立规则：自定义的属性全小写,以免与同名的变量混淆
export default class AlignItemsBasics extends React.Component {
	render() {
		return (
			<View style={{ width: "100%", height: "100%", zIndex: -999 }}>
				{/*高度固定区，未来的pageNavigation区域*/}
				<View style={MyStyle.Container, { width: this.state.containerWidth, height: this.state.containerHeight }}>
					<Image source={require("./bg.jpg")}
						style={{ opacity: this.state.backgroundOpacity, width: "100%", height: "100%", zIndex: -999, position: "absolute" }}
					></Image>
					<StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
					{this.state.nowPage == "Main" && (
						<View style={{ width: "100%", height: "100%" }}>
							<Nav menu="sort" title="Mine" ></Nav>
							<Content
								handlers={{
									changenewmenustate: this.changeNewMenuState,
									changenewmixstate: this.changeNewMixState,
									globalnavigator: this.globalNavigator,
									updatedatafromserver: this.updateDataFromServer
								}}
								screenheight={this.state.containerHeight}
								screenwidth={this.state.containerWidth}
								mixlist={this.state.mixList}
								alltrackslist={this.state.allTracksList}
								historylist={this.state.historyList}
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
									changeplaystate: this.changePlayState,
									updateplaylist: this.updatePlayList
								}}
								screenheight={this.state.containerHeight}
								screenwidth={this.state.containerWidth}

								activemix_tracklist={this.state.mixList[this.state.activeMixId].tracks}
								newmixcomponent_title={this.state.NewMixComponent_title}
							></MixDetails>
						</View>
					)}
					{this.state.nowPage == "Record Details" && (
						<View style={{ width: "100%", height: "100%" }}>
							<Nav menu="arrow-back" title={this.state.activeRecord}
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
								screenheight={this.state.containerHeight}
								screenwidth={this.state.containerWidth}
								activemix_tracklist={(() => {
									if (this.state.activeRecord == "Live music") {
										return this.state.allTracksList;
									} else if (this.state.activeRecord == "Recent play") {
										return this.state.historyList;
									}
								})()}
								newmixcomponent_title={this.state.NewMixComponent_title}
							></MixDetails>
						</View>
					)}


					{this.state.nowPage == "Track Details" ?
						<TrackDetails
							screenwidth={this.state.containerWidth}
							screenheight={this.state.containerHeight}
							playstate={this.state.playState}
							playingtrack={this.state.lastTrack}
							handlers={{
								changeplaystate: this.changePlayState,
								changeplayliststate: this.changePlayListState,

							}}
						>
						</TrackDetails>
						: <FootPlayer
							playstate={this.state.playState}
							playingtracktitle={this.state.lastTrack ? this.state.lastTrack.trackTitle : "Welcome to the world ,HuaiNian!"}
							handlers={{
								changeplaystate: this.changePlayState,
								globalnavigator: this.globalNavigator,
								backgroundfadeout: this.backgroundFadeOut,
								changeplayliststate: this.changePlayListState
							}}></FootPlayer>}
				</View>


				{/*内容弹出区*/}
				<NewMix
					screenwidth={this.state.containerWidth}
					screenheight={this.state.containerHeight}
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
					screenwidth={this.state.containerWidth}
					screenheight={this.state.containerHeight}
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
				<PlayList
					screenwidth={this.state.containerWidth}
					screenheight={this.state.containerHeight}
					showplaylist={this.state.showPlayList}
					playlisttitle={this.state.playOrder}
					playlist={this.state.playList}
					handlers={{
						changeplayliststate: this.changePlayListState,
						deleteplaylisttrack: this.deletePlayListTrack,
					}}
				></PlayList>

			</View>
		);
	}
	constructor(props) {
		super(props)
		this.state = {
			containerWidth: Dimensions.get('window').width,
			containerHeight: Dimensions.get('window').height * 1.064,
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
			historyList: [],
			playList: [],
			allTracksList: [],
			playState: false,
			lastTrack: null,
			playOrder: "Loop All",
			controlledAuto: false,
			coverList: [],

			//opening a Record
			resordsOn: false,
			activeRecord: null,


			//fade out
			backgroundOpacity: 1,


			//using playList
			showPlayList: false,




		}

	}
	backgroundFadeOut = () => {
		var opacity = 1;
		var timer = setInterval(() => {
			const duration = 350;//与TrackDetails的开始淡入时间关联
			opacity = this.state.backgroundOpacity - (1 / duration * 30)
			if (this.state.backgroundOpacity <= 0) {
				this.setState({ backgroundOpacity: 0 })
				clearInterval(timer)
			}
			this.setState({ backgroundOpacity: opacity })
		}, 30)
	}
	storeDataLocally = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
			console.log("本地存储失败");
		}
	}
	getDataLocally = async (key) => {
		try {
			const value = await AsyncStorage.getItem(key)
			return value;
		} catch (e) {
			// error reading value
			console.log("本地获取失败");
		}
	}
	async componentDidMount() {
		this.updateDataFromServer();
		
		TrackPlayer.addEventListener('playback-track-changed', async (dataAutoProvided) => {
			const track = await TrackPlayer.getTrack(dataAutoProvided.nextTrack);
			if (track) {
				this.setState({ lastTrack: this.state.allTracksList[track.id] });
				// await TrackPlayer.updateOptions({})
			}
		});
		TrackPlayer.addEventListener('remote-play', () => {
			TrackPlayer.play()
			this.setState({playState:true})
		});
		TrackPlayer.addEventListener('remote-pause', () =>{
			TrackPlayer.pause()
			this.setState({playState:false})
		});
		TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
		TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());

		BackHandler.addEventListener("hardwareBackPress", () => {
			this.globalNavigator("Back")
			return true;
		})


	}
	updateDataFromServer = async (force) => {
		var localMixList = await this.getDataLocally("mixList");
		localMixList = JSON.parse(localMixList)
		// console.log(localMixList[0].tacks[0].trackTitle);

		if (!localMixList || !localMixList[0] || !localMixList[0].mixtitle || force) {
			localMixList = await this.getMixList();
			console.log("Getting mixList from server");
			this.storeDataLocally("mixList", JSON.stringify(localMixList))
		}
		var localAllTracksList = []
		for (let i = 0; i < localMixList.length; i++) {//风险
			localAllTracksList = [...localAllTracksList, ...localMixList[i].tracks]
		}

		var arr = []
		for (let i = 0; i < localMixList.length; i++) {
			arr.push(localMixList.cover)
		}
		this.setState({ mixList: localMixList, allTracksList: localAllTracksList, coverList: arr })
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
		// if (pageName != "Back") { this.setState({ activeMixId: null, resordsOn: false, activeRecord: null }); }//reset
		callback instanceof Function ? callback(this) : null;//骚操作QVQ
		if (pageName == "Back") {
			this.setState({ backgroundOpacity: 1 })
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
	changePlayListState = () => {
		this.setState({ showPlayList: !this.state.showPlayList })
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
	updatePlayList = (obj, TrackOrMix) => {
		return new Promise(async (resolve) => {
			if (TrackOrMix == "Mix") {
				if (obj != this.state.playList) {//若playList与新的播放列表不一致才更新
					await TrackPlayer.reset()
					var list = []
					for (let i = 0; i < obj.length; i++) {
						list.push(this.TrackTransform(obj[i]))
					}
					await TrackPlayer.add(list)
					this.setState({ playList: obj })
				} else {
					console.log("播放列表未变化，不更新");
				}
			} else {
				await TrackPlayer.add(this.TrackTransform(obj))
				this.setState({ playList: this.state.playList.concat(obj) })
			}
			resolve(true)
		})
	}
	deletePlayListTrack = (index) => {
		this.state.playList.splice(index, 1);
	}

	//为了性能，TrackPlayer的queue要对应playList！！
	changePlayState = async (requestingTrack) => {
		this.setState({ controlledAuto: false })
		if (requestingTrack === undefined) {//如果只是单纯地切换播放状态
			this.state.playState ? await TrackPlayer.pause() : await TrackPlayer.play();
			this.setState({ playState: !this.state.playState });
			return;
		} else if (typeof requestingTrack == "string") {
			var index = this.trackIndexInPlayList(this.state.lastTrack)
			switch (requestingTrack) {
				case "next":
					let next = index == this.state.playList.length - 1 ? 0 : index + 1;
					requestingTrack = this.state.playList[next];
					break;
				case "previous":
					let previous = index == 0 ? this.state.playList.length - 1 : index - 1;
					requestingTrack = this.state.playList[previous];
					break;
			}
			await TrackPlayer.skip(requestingTrack.trackId.toString());// Must be a string, required
		} else {//请求的是一首具体的歌时
			if (this.state.playState && this.state.lastTrack.trackId === requestingTrack.trackId) {//在播且请求与上次相同
				await TrackPlayer.pause();
				this.setState({ playState: false });
				return;
			} else {//没在播
				if (!this.state.lastTrack || this.state.lastTrack.trackId != requestingTrack.trackId) {//本请求播放的歌曲和上一次的不同
					console.log("即将跳转到：" + requestingTrack.trackTitle + ", ID是：" + requestingTrack.trackId.toString());
					await TrackPlayer.skip(requestingTrack.trackId.toString());// Must be a string, required
				}

			}
		}
		await TrackPlayer.play()//跳转完后要play(this is f**king stupid)
		this.setState({ playState: true })//放权给eventlistener指出lastTrack是谁
		//this.setState({ lastTrack: requestingTrack, playState: true })
		if (!this.existsInHistoryList(requestingTrack)) {//如果历史记录没有此歌就记录
			this.state.historyList.push(requestingTrack)
		} else {

		}
	}
	existsInHistoryList = (Track_MyStructure) => {
		for (let i = 0; i < this.state.historyList.length; i++) {
			if (this.state.historyList[i].trackId == Track_MyStructure.trackId) {
				return true;
			}
		}
		return false;
	}
	TrackTransform = (Track_MyStructure) => {
		return Track_PlayerStructure = {
			id: Track_MyStructure.trackId.toString(),
			url: " http://192.168.43.202:3000/" + Track_MyStructure.url,
			title: Track_MyStructure.trackTitle,
			artist: Track_MyStructure.artist,
			artwork: ""
		}
	}
	trackIndexInPlayList = (track) => {
		// console.log("正在查找：");
		// console.log(track);
		// console.log("此时的playlist为 ");
		// console.log(this.state.playList);

		for (let i = 0; i < this.state.playList.length; i++) {
			if (track.trackId == this.state.playList[i].trackId) return i;
		}
		console.log("找不到trackIndexInPlayList");
		return -1;
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
		TrackPlayer.updateOptions({
			capabilities: [CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS],
			notificationCapabilities: [CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS],
			compactCapabilities: [CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS],
			
		})
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



import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, PermissionsAndroid, Dimensions, PixelRatio, Image, ImageBackground, ScrollView, StyleSheet, StatusBar, AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json'; //唯一的入口名称
import Icon from 'react-native-vector-icons/MaterialIcons';

//不允许随系统设置缩放
Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false })
const descriptionColor = "rgba(115,115,115,0.6)";
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

const containerWidth = Dimensions.get('window').width;
const containerHeight = Dimensions.get('window').height * 1.064;
export default class AlignItemsBasics extends Component {
	render() {
		return (
			<ImageBackground source={require("./bg.jpg")} style={MyStyle.Container, { width: containerWidth, height: containerHeight }}>
				<StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
				<Nav title="Mine"></Nav>
				<Content></Content>
				
				<FootPlayer></FootPlayer>
				
			</ImageBackground>
		);
	}
};















class Nav extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.Nav}>
				<Icon name="sort" style={MyStyle.NavMenu} size={25} color="#fff"/>
				<Text style={[MyStyle.NavTitle,{borderBottomWidth:this.props.title=="Mine"?2:0}]}>{this.props.title}</Text>
				<TextInput style={MyStyle.NavContent} placeholder="What do you want...?" placeholderTextColor="rgba(55,55,55,0.4)">
				</TextInput>
				<View style={MyStyle.NavIcon}><Icon name="search" size={25} color="#fff" /></View>
			</View>)
	}
}

class Content extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.Content}>
				<View style={MyStyle.ContentRecords}>
					<Record name="library-music" content="Local music" sum="(0)" specialStyle={{ borderBottomColor: "rgba(155,155,155,0.3)", borderBottomWidth: 1 }}></Record>
					<Record name="history" content="Recent play" ></Record>
				</View>
				<View style={MyStyle.ContentMixes}>
					<View style={MyStyle.ContentMixesBar}>
						<Icon name="add" size={20} color="#fff" style={MyStyle.ContentMixesBarAdd} />
						<Icon name="more-vert" size={20} color="#fff" style={MyStyle.ContentMixesBarMore} />
						<Icon style={MyStyle.ContentMixesBarDropDown} name="expand-more" size={20} color="#fff" />
						<Text style={MyStyle.ContentMixesBarTitle}>  Mix created<Text style={{ color: descriptionColor, fontSize: 12 }}> (5)</Text></Text>
					</View>
					{/* <FlatList style={{width:"100%",height:"100%",backgroundColor:"red"}} data={[0,1,2,3,4,5,6,7,8]} renderItem={(data)=><Mix dt={data}></Mix>} keyExtractor={(item, index) => index+""}>
						
					</FlatList> */}
					
					<Mix></Mix>
					<Mix></Mix>
					<Mix></Mix>
					<Mix></Mix>
					<Mix></Mix>
					<Mix></Mix>

				</View>
			</View>)
	}
}
class Record extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.Record}>
				<Icon style={MyStyle.RecordIcon} name={this.props.name} size={24} color="#fff" />
				<View style={[MyStyle.RecordTitle, this.props.specialStyle]}><Text style={{ color: "white", fontSize: 17 }}>{this.props.content}<Text style={{ color: descriptionColor, fontSize: 12 }}> {this.props.sum}</Text></Text></View>
			</View>)
	}
}
class Mix extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.Mix}>
				<View style={MyStyle.MixCover}><Image style={{ width: "100%", height: "100%", position: "absolute", borderRadius: 10, opacity: 0.3 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image><Icon style={{ fontWeight: "100" }} name="favorite-border" size={33} color="#fff" /></View>
				<Text style={MyStyle.MixTitle}>槐念喜爱的音乐</Text>
				<Text style={MyStyle.MixSubTitle}>57songs</Text>
				<Icon name="more-vert" style={MyStyle.MixMenu} size={20} color="#fff" />
			</View>)
	}
}

class FootPlayer extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={MyStyle.FootPlayer}>
				<View style={MyStyle.FootPlayerCover}><Image style={{ width: "100%", height: "100%", borderRadius: 999 }} source={{ uri: "file:///storage/emulated/0/shunza.jpg" }}></Image></View>
				<Text style={MyStyle.FootPlayerTitle}>The Moon</Text>
				<Text style={MyStyle.FootPlayerSubTitle}>Swipe left/right to play last/next</Text>
				<Icon style={MyStyle.FootPlayerController} name="play-circle-outline" size={30}></Icon>
				<Icon style={MyStyle.FootPlayerPlaylist} name="playlist-play" size={22}></Icon>

			</View>)
	}
}



var MyStyle = StyleSheet.create({
	Container: {
		position: "absolute",
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		justifyContent: "flex-start",
		alignItems: "stretch",
		backgroundColor: "blue",
		top: 0

	},
	Nav: {
		height: "11%",//不要把数值写成字符串，否则应用崩溃
		width: "100%",
		backgroundColor: "rgba(155,155,155,0.4)",
		display: "flex",
		position: "absolute"


	},
	NavContent: {
		position: "absolute",
		padding:0,
		width: "38.2%",
		height: "21.8%",
		bottom: "15.8%",
		left: "38.2%",//50-61.8/2
		// borderBottomColor: "rgba(155,155,155,0.1)",
		// borderBottomWidth: 0.2,
		textAlign:"center"
		// backgroundColor:"red"
	},
	NavMenu: {
		position: "absolute",
		// width: "4.8%",
		// height: "21.8%",
		left: "4.2%",
		bottom: "14.8%",//50-21.8/2
		// borderRadius: 999
	},
	NavTitle: {
		position: "absolute",
		// width: "4.8%",
		height: "42%",
		color:"white",
		fontSize:18,
		left: "22%",
		bottom: 0,//50-21.8/2
		borderBottomColor:"rgba(155,155,155,0.9)",
		// borderRadius: 999
		// backgroundColor:"red"
	},
	NavIcon: {
		position: "absolute",
		// width: "4.8%",
		// height: "21.8%",
		right: "4.8%",
		bottom: "14.8%",//50-21.8/2
		// borderRadius: 999
	},
	Content: {
		position: "absolute",
		top: "11%",
		height: "81%",
		width: "100%",
		// backgroundColor: "yellow"
	},
	ContentRecords: {
		width: "100%",
		height: "18.9%",
		backgroundColor: "rgba(100,100,100,0.1)",
		marginBottom: 5
	},
	Record: {
		position: "relative",
		width: "100%",
		height: "50%",
		// backgroundColor: "rgba(225,225,225,0.8)"

	},
	RecordIcon: {
		position: "absolute",
		width: "6.3%",
		height: "45%",
		// backgroundColor: "rgba(105,105,105,0.8)",
		left: "7.4%",
		top: "27.5%"//50-45/2
	},
	RecordTitle: {
		position: "absolute",
		width: "78%",
		height: "100%",
		// backgroundColor: "rgba(105,105,105,0.8)",
		right: 0,
		top: 0,//50-45/2
		display: "flex",
		justifyContent: "center"
	},

	ContentMixes: {
		width: "100%",
		height: "84%",
		backgroundColor: "rgba(100,100,100,0.1)",
	},
	ContentMixesBar: {
		display: "flex",
		position: "relative",
		width: "100%",
		height: "8.5%",
		// backgroundColor: "rgba(88,88,88,0.8)",
		justifyContent: "center"
	},
	ContentMixesBarTitle: {
		position: "absolute",
		left: "8%",
		width: "61.8%",
		color: "white",
		fontSize: 18
		// backgroundColor: "rgba(88,88,188,0.8)"
	},
	ContentMixesBarDropDown: {
		position: "absolute",
		left: "4.2%",
		color: "white",
		// backgroundColor: "rgba(88,88,188,0.8)"
	},
	ContentMixesBarAdd: {
		position: "absolute",
		right: "14%"
		// backgroundColor: "rgba(188,88,88,0.8)"
	},
	ContentMixesBarMore: {
		position: "absolute",
		right: "4.4%"
		// backgroundColor: "rgba(188,88,88,0.8)"
	},
	Mix: {
		position: "relative",
		width: "100%",
		height: "10.2%",
		marginBottom: 5,
		// backgroundColor: "rgba(88,8,88,0.8)"
	},
	MixCover: {
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		width: "13.9%",
		height: "100%",
		left: "4.2%",
		backgroundColor: "#000",
		borderRadius: 10
	},
	MixTitle: {
		position: "absolute",
		fontSize: 14,
		width: "78%",
		// height: "28%",
		right: 0,
		top: "14.7%",
		color: "white"
		// backgroundColor: "rgba(188,8,88,0.8)"
	},
	MixSubTitle: {
		position: "absolute",
		fontSize: 8,
		width: "78%",
		// height: "16%",
		right: 0,
		top: "66.7%",
		color: "rgb(165,165,165)"
		// backgroundColor: "rgba(188,8,88,0.8)"
	},
	MixMenu: {
		position: "absolute",
		right: "4.4%",
		top: "30%",
		// backgroundColor: "rgba(188,8,188,0.8)"
	},
	MixSum: {
		position: "absolute",
		width: "78%",
		height: "21%",
		right: 0,
		top: "65%",
		backgroundColor: "rgba(188,8,88,0.8)"
	},
	FootPlayer: {
		position: "absolute",
		top: "93.24%",
		height: "6.75%",
		width: "100%",
		backgroundColor: "rgba(155,155,155,0.4)",
	},
	FootPlayerCover: {
		position: "absolute",
		left: "1.7%",
		top: "12.5%",//50-75/2
		width: "10%",
		height: "75%",
		borderRadius: 9999,
		// backgroundColor: "rgba(188,8,88,0.8)"
	},
	FootPlayerTitle: {
		position: "absolute",
		fontSize: 13,
		color: "white",
		left: "13.7%",
		top: "19.2%",
		width: "61.8%",
		height: "27.3%",
		// backgroundColor: "rgba(18,8,88,0.8)"
	},
	FootPlayerSubTitle: {
		position: "absolute",
		fontSize: 11,
		color: "rgba(195,195,195,0.9)",
		left: "13.7%",
		top: "64.4%",
		width: "61.8%",
		height: "24.7%",
		// backgroundColor: "rgba(188,8,8,0.8)"
	},
	FootPlayerController: {
		position: "absolute",
		left: "77.9%",
		top: "22.6%",//50-54.8/2
		color: "white"
		// width: "7.4%",
		// height: "54.8%",
		// backgroundColor: "rgba(88,88,8,0.8)"
	},
	FootPlayerPlaylist: {
		position: "absolute",
		left: "91.2%",
		top: "35%",//50-41.1/2
		color: "white"
		// width: "5.6%",
		// height: "41.1%",
		// backgroundColor: "rgba(88,88,118,0.8)"
	}


})
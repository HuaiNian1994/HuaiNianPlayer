import React, { Component } from 'react';
import { View, Text, TextInput,StyleSheet,StatusBar, AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json'; //唯一的入口名称


// AppRegistry.registerComponent(appName, () => App);
// TrackPlayer.registerPlaybackService(() => require('./trackserver.js'));
// TrackPlayer.setupPlayer().then(async () => { });
var mytrack = {
  id: 'myId',
  url: " http://192.168.43.202:3000/",
  title: 'myTitle',
  artist: 'myArtist',
  artwork: "file:///storage/emulated/0/1寸 小.png"
}
// TrackPlayer.add(mytrack).then(() => {
//   TrackPlayer.play();
// })
export default class AlignItemsBasics extends Component {
  render() {
    return (
      <View style={MyStyle.Container}>
        <StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
        <Nav></Nav>
        <Content></Content>
        <FootPlayer></FootPlayer>
      </View>
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
      <TextInput style={MyStyle.NavContent}>
      </TextInput>
      <View  style={MyStyle.NavIcon}></View>
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
     
    </View>)
  }
}



var MyStyle = StyleSheet.create({
  Container: {
    position:"absolute",
    display: "flex",
    flexDirection: "column",
    flexWrap:"nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "blue",
    top:0,
    width:"100%",
    height:"100%"
  },
  Nav: {
    height: "11%",//不要把数值写成字符串，否则应用崩溃
    width:"100%",
    backgroundColor: "red",
    display:"flex",
    position:"absolute"

    
  },
  NavContent:{
    position:"absolute",
    width:"61.8%",
    height:"21.8%",
    bottom:"21.8%",
    left:"19.1%",//50-61.8/2
    backgroundColor:"green"
  },
  NavIcon:{
    position:"absolute",
    width:"4.8%",
    height:"21.8%",
    right:"4.8%",
    bottom:"21.8%",//50-21.8/2
    borderRadius:999,
    backgroundColor:"blue"
  },
  Content:{
    position:"absolute",
    top:"12%",
    height:"81%",
    width:"100%",
    backgroundColor:"yellow"

  },
  FootPlayer:{
    position:"absolute",
    top:"93.24%",
    height:"6.75%",
    width:"100%",
    backgroundColor:"orange"
  }

})
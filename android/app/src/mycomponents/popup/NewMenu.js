import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import Mystyle from '../1stStage/style'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class NewMenu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return this.props.shownewmenu ? (
            <TouchableWithoutFeedback onPress={() => { this.props.handlers.changenewmenustate() }}>
                <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: " rgba(5,5,5,0.6)" }}>
                    <View style={[{
                        position: "absolute",
                        width: this.props.screenwidth,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        bottom: 0,
                    }, Mystyle.optionsBackground]}>
                        <View style={{
                            width: "100%",
                            height: this.props.screenheight * 0.067,
                            display: "flex",
                            justifyContent: "center",
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(155,155,155,0.3)"
                        }}>
                            <Text style={{
                                left: "5.8%",
                                height: "44%",
                                color: "white",
                                fontSize: 17
                            }}>{this.props.activemixid===null?"Mix :":"Track :"} {this.props.newmenutitle}</Text>

                        </View>
                        <FlatList
                            data={this.props.newmenuitemscontent.titles}
                            renderItem={({ item, index }) => {//注意：此处接收的是对象，坑得一B！！！！故item和index不得改名，坑得一B！！！！
                                let NewMenuItemHander = () => { };
                                let param = this.props.newmenutitle;//哪个专辑
                                //"Share", "Edit Mix", "Delete"
                                switch (item) {
                                    case "Share":
                                        NewMenuItemHander = this.props.handlers.sharemix;
                                        break;
                                    case "Edit Mix":
                                        NewMenuItemHander = this.props.handlers.editmix;
                                        param={purpose:"Edit",whichMix:this.props.newmenutitle}
                                        break;
                                    case "Delete":
                                        NewMenuItemHander = this.props.handlers.deletemix;
                                        break;
                                }
                                return (<TouchableOpacity onPress={() => { NewMenuItemHander(param) }}>
                                    <MenuItem screenheight={this.props.screenheight} name={this.props.newmenuitemscontent.names[index]} title={item} ></MenuItem>
                                </TouchableOpacity>)
                            }}
                            keyExtractor={(item, index) => item}
                            style={{ width: this.props.screenwidth, }}
                            //ListHeaderComponent无法传值故弃用
                            ListFooterComponent={MenuFooter}
                            ItemSeparatorComponent={Line}
                        >
                        </FlatList>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        ) : null;
    }
}

// class MyTouchableWithoutFeedback extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() { 
//         return  <TouchableWithoutFeedback onpress={this.props.}></TouchableWithoutFeedback>
//     }
// }
class MenuFooter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <View style={{
            position: "relative",
            right: 0,
            width: "100%",
            height: 20,
        }}><View style={{
            position: "absolute",
            right: 0,
            width: "85%", borderTopWidth: 0.2,
            borderTopColor: "rgba(155,155,155,0.3)",
        }}></View></View>
    }
}
class Line extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<View style={{
            position: "absolute",
            borderBottomWidth: 0.2,
            borderBottomColor: "rgba(155,155,155,0.3)",
            height: 0,
            right: 0,
            top: "100%",
            width: "85%"
        }}></View>)
    }
}
class MenuItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                width: "100%",
                height: this.props.screenheight * 0.0638
            }}>
                <Icon style={{
                    position: "absolute",
                    left: "5.8%",
                    //height: "44%",
                }} name={this.props.name} size={22} color="white"></Icon>
                <View style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    right: 0,
                    width: "85%",
                    //fontSize:12,
                }}>
                    <Text style={{
                        width: "100%",
                        fontSize: 14,
                        color: "white"
                    }}> {this.props.title}</Text>
                </View>

            </View>
        );
    }
}

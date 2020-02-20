import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native'
import Mystyle from '../1stStage/style'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class NewMenu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return this.props.showmix ? (
            <TouchableWithoutFeedback onPress={()=>{this.props.changemixstate()}}>
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
                                fontSize:17
                            }}>Mix : {this.props.mixtitle}</Text>

                        </View>
                        <FlatList
                            data={titles}
                            renderItem={({ item, index }) => //注意：此处接收的是对象，坑得一B！！！！故item和index不得改名，坑得一B！！！！
                                <MenuItem screenheight={this.props.screenheight} name={names[index]} title={item}></MenuItem>
                            }
                            keyExtractor={(item, index) => item}
                            style={{ width: this.props.screenwidth, }}
                            //ListHeaderComponent无法传值故弃用
                            ListFooterComponent={MenuFooter}
                        >
                        </FlatList>

                    </View>

                </View>
            </TouchableWithoutFeedback>

        ) : null;
    }
}
const titles = ["Share", "Edit Mix", "Delete"];
const names = ["launch", "brush", "delete"]

class MenuFooter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <View style={{ width: "100%", height: 20 }}></View>
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
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(155,155,155,0.3)"
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

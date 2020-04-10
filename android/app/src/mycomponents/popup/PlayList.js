import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import Mystyle from '../1stStage/style'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class PlayList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return this.props.showplaylist ? (
            <TouchableWithoutFeedback onPress={() => { this.props.handlers.changeplayliststate() }}>
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
                            }}> {this.props.playlisttitle+"  ("+this.props.playlist.length+")"}</Text>

                        </View>
                        <FlatList
                            data={this.props.playlist}
                            renderItem={({ item, index }) => {//注意：此处接收的是对象，坑得一B！！！！故item和index不得改名，坑得一B！！！！
                                let playlistItemHander = () => {
                                    //待续
                                };
                                let param = item;
                                return (<TouchableOpacity onPress={() => { playlistItemHander(param) }}>
                                    <PlayListItem screenheight={this.props.screenheight} title={item.trackTitle} subtitle={item.trackSubTitle} ></PlayListItem>
                                </TouchableOpacity>)
                            }}
                            keyExtractor={(item, index) => index + ""}
                            style={{ width: this.props.screenwidth, height: this.props.screenheight * 0.618}}
                            ListFooterComponent={ListFooter}
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
class ListFooter extends React.Component {
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

class PlayListItem extends React.Component {
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

                <View style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection:"row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "100%",
                    left: 0,
                    width: "85%",
                    overflow: "hidden"
                    //fontSize:12,
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: "white"
                    }}> {this.props.title}</Text>
                    <Text style={{
                        fontSize: 11,
                        color: "rgba(155,155,155,0.8)"
                    }}> {" - " + this.props.subtitle}</Text>
                </View>

            </View>
        );
    }
}

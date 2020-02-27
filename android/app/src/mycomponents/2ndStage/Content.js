import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import Record from '../3rdStage/Record'
import Mix from '../3rdStage/Mix'


export default class Content extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={MyStyle.Content}>
                <View style={MyStyle.ContentRecords}>
                    <Record
                        name="library-music"
                        content="Live music"
                        tracklist={this.props.alltrackslist}
                        trackssum={"(" + this.props.alltrackslist.length + ")"}
                        specialStyle={{ borderBottomColor: "rgba(155,155,155,0.3)", borderBottomWidth: 1 }}
                        globalnavigator={this.props.handlers.globalnavigator}
                    ></Record>
                    <Record name="history" tracklist={this.props.historylist} trackssum={"(" + this.props.historylist.length + ")"} content="Recent play" globalnavigator={this.props.handlers.globalnavigator} ></Record>
                </View>
                <View style={MyStyle.ContentMixes}>
                    <View style={MyStyle.ContentMixesBar}>
                        <TouchableWithoutFeedback onPress={() => { this.props.handlers.changenewmixstate({ purpose: "New Mix" }) }}>
                            <Icon name="add" size={20} color="#fff" style={MyStyle.ContentMixesBarAdd} />
                        </TouchableWithoutFeedback>
                        <Icon name="more-vert" size={20} color="#fff" style={MyStyle.ContentMixesBarMore} />
                        <Icon style={MyStyle.ContentMixesBarDropDown} name="expand-more" size={20} color="#fff" />
                        <Text style={MyStyle.ContentMixesBarTitle}>  Mix created<Text style={MyStyle.description}> {"("+this.props.mixlist.length+")"}</Text></Text>
                    </View>
                    <FlatList
                        data={this.props.mixlist}
                        renderItem={({ item, index }) => {
                            return <Mix
                                screenheight={this.props.screenheight}
                                mixtitle={item.mixtitle}
                                mixsubtitle={item.mixsubtitle}
                                globalnavigator={this.props.handlers.globalnavigator}
                                changenewmenustate={this.props.handlers.changenewmenustate}
                                
                                id={item.id}
                            ></Mix>
                        }}
                        keyExtractor={(item, index) => item.id + ""}
                        style={{ width: "100%", height: "100%" }}
                    >

                    </FlatList>
                    {/* <Mix></Mix> */}

                    {/* <Mix mixtitle="槐念喜欢的音乐" mixsubtitle="57songs" changenewmenuState={this.state. changeNewMenuState}></Mix> */}

                </View>
            </View>)
    }
}
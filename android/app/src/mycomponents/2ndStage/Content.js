import React from 'react';
import { View, Text, FlatList,TouchableWithoutFeedback, TextInput } from 'react-native';
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
                    <Record name="library-music" content="Local music" sum="(0)" specialStyle={{ borderBottomColor: "rgba(155,155,155,0.3)", borderBottomWidth: 1 }}></Record>
                    <Record name="history" content="Recent play" ></Record>
                </View>
                <View style={MyStyle.ContentMixes}>
                    <View style={MyStyle.ContentMixesBar}>
                        <TouchableWithoutFeedback onPress={()=>{this.props.handlers.changenewmixstate()}}>
                            <Icon name="add" size={20} color="#fff" style={MyStyle.ContentMixesBarAdd} />
                        </TouchableWithoutFeedback>
                        <Icon name="more-vert" size={20} color="#fff" style={MyStyle.ContentMixesBarMore} />
                        <Icon style={MyStyle.ContentMixesBarDropDown} name="expand-more" size={20} color="#fff" />
                        <Text style={MyStyle.ContentMixesBarTitle}>  Mix created<Text style={MyStyle.description}> (5)</Text></Text>
                    </View>
                    <FlatList
                       data={this.props.mixlist} 
                       renderItem={({item,index})=>{
                           return <Mix screenheight={this.props.screenheight} mixtitle={item.mixtitle} mixsubtitle={item.mixsubtitle} changenewmenustate={this.props.handlers.changenewmenustate}></Mix>}}
                         keyExtractor={(item, index) => index+""}
                          style={{ width: "100%",height:"100%"}}
                    >

                    </FlatList>
                    {/* <Mix></Mix> */}
                    
                    {/* <Mix mixtitle="槐念喜欢的音乐" mixsubtitle="57songs" changenewmenuState={this.state. changeNewMenuState}></Mix> */}
                    
                </View>
            </View>)
    }
}
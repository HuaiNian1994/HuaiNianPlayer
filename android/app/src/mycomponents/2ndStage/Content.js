import React from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
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
                        <TouchableWithoutFeedback onPress={()=>{this.props.changenewmixstate()}}>
                            <Icon name="add" size={20} color="#fff" style={MyStyle.ContentMixesBarAdd} />
                        </TouchableWithoutFeedback>
                        <Icon name="more-vert" size={20} color="#fff" style={MyStyle.ContentMixesBarMore} />
                        <Icon style={MyStyle.ContentMixesBarDropDown} name="expand-more" size={20} color="#fff" />
                        <Text style={MyStyle.ContentMixesBarTitle}>  Mix created<Text style={MyStyle.description}> (5)</Text></Text>
                    </View>
                    <Mix id={12}></Mix>
                    <Mix></Mix>
                    <Mix></Mix>
                    <Mix></Mix>
                    <Mix></Mix>
                    <Mix></Mix>
                </View>
            </View>)
    }
}
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../style'
import Record from './Record'
import Mix from './Mix'


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
                        <Icon name="add" size={20} color="#fff" style={MyStyle.ContentMixesBarAdd} />
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
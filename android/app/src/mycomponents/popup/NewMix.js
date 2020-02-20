import React, { Component } from 'react';
import { View, Text,TouchableWithoutFeedback,TextInput } from 'react-native'
export default class NewMix extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return this.props.shownewmix ? (
            <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: " rgba(5,5,5,0.6)" }}>
                <View style={{
                    position: "absolute",
                    justifyContent:"center",
                    alignItems:"center",
                    width: this.props.width * 0.87,
                    height: this.props.height * 0.2865,
                    backgroundColor: " rgb(40,64,80)",
                    borderRadius: 15,
                    top: "35.7%",//50-28.6/2
                    left: "6.5%"//50-87/2
                }}>
                    <Text style={{
                        position: "absolute",
                        left:"6.9%",
                        top:"11.3%",
                        height: "17.6%",
                        color: "white",
                        fontSize:20
                    }}>New Mix</Text>
                    <TextInput style={{
                        width: "87.4%",
                        height: "17.6%",
                        padding: 0,
                        color: "white",
                        borderBottomColor:"rgba(155,155,155,0.8)",
                        borderBottomWidth:1
                    }}></TextInput>
                    <TouchableWithoutFeedback onPress={()=>{this.props.changenewmixstate()}}>
                        <Text  style={{
                        position: "absolute",
                        width:"17%",                    
                        left:"51.8%",
                        top:"81.42%",
                        color: "white",
                    }}>CANCEL</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback  >
                        <Text style={{
                        position: "absolute",
                        width:"17%",
                        right:"8%",
                        top:"81.42%",
                        color: "white"
                    }}>SUBMIT</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        ) : null;
    }
}
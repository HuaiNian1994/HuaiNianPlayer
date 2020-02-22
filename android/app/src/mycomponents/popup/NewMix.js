import React, { Component } from 'react';
import Mystyle from '../1stStage/style'
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native'
export default class NewMix extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        var inputValue = this.props.newmixcomponent_input;
        var cancelHandler = this.props.handlers.changenewmixstate;
        var submitHandler = cancelHandler;
        switch (this.props.newmixcomponent_title) {
            case ("Edit"):
                submitHandler = this.props.handlers.editmix;
                var submitHandlerParams = { submitContent: this.props.newmixcomponent_input, action: "SUBMIT" }
                break;
            default:
                var submitHandlerParams = { newTitle: this.props.newmixcomponent_input, action: "SUBMIT" }
                break;
        }
        return this.props.shownewmix.show ? (
            <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: " rgba(5,5,5,0.6)" }}>
                <View style={[{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    width: this.props.screenwidth * 0.87,
                    height: this.props.screenheight * 0.2865,
                    borderRadius: 15,
                    top: "35.7%",//50-28.6/2
                    left: "6.5%"//50-87/2
                }, Mystyle.optionsBackground]}>
                    <Text style={{
                        position: "absolute",
                        left: "6.9%",
                        top: "11.3%",
                        height: "17.6%",
                        color: "white",
                        fontSize: 20
                    }}>{this.props.newmixcomponent_title}</Text>
                    <TextInput style={{
                        width: "87.4%",
                        height: "17.6%",
                        padding: 0,
                        color: "white",
                        borderBottomColor: "rgba(155,155,155,0.8)",
                        borderBottomWidth: 1
                    }}
                        autoFocus={true}
                        placeholder="Type in mix title"
                        placeholderTextColor="rgba(155,155,155,0.8)"
                        value={inputValue}
                        onChangeText={(e) => { this.props.handlers.newmixmonitor(e) }}
                    ></TextInput>
                    <TouchableWithoutFeedback onPress={() => { cancelHandler() }}>
                        <Text style={{
                            position: "absolute",
                            width: "17%",
                            left: "51.8%",
                            top: "81.42%",
                            color: "white",
                        }}>CANCEL</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { submitHandler(submitHandlerParams) }} >
                        <Text style={{
                            position: "absolute",
                            width: "17%",
                            right: "8%",
                            top: "81.42%",
                            color: "white"
                        }}>SUBMIT</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        ) : null;
    }
}
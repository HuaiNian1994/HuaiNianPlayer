import React from 'react';
import { View, Text, StyleSheet, findNodeHandle, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStyle from '../1stStage/style'
import Record from '../3rdStage/Record'
import Mix from '../3rdStage/Mix'
import { BlurView } from "@react-native-community/blur";


export default class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      backgroundOpacity: 0,
      blurAmount: 0
    };
  }

  imageLoaded() {

      this.setState({
        viewRef: findNodeHandle(this.backgroundImage),
      });


  }
  componentDidMount() {
 
      var timer = setInterval(() => {
        if (this.state.backgroundOpacity >= 1) {
          clearInterval(timer)
        }
        this.setState({ backgroundOpacity: this.state.backgroundOpacity + (0.001 * 30) })
      }, 30)

  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={img => {
            this.backgroundImage = img;
          }}
          source={require("../../../../../bg.jpg")}
          style={[styles.absolute, { opacity: this.state.backgroundOpacity }]}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <BlurView
          style={[styles.absolute, { opacity: this.state.backgroundOpacity }]}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={25}
        />

        <Text>Hi, I am some unblurred text.....</Text>
      </View>)
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  absolute: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: "100%",
    width: "100%"
  }
});
/**
 * Created by bikash on 11/7/17.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageEditor, Image, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'
import {purple} from "../utils/colors";

class Extra extends Component {
  state = {
    image: null
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2,1]
    }).then((result) => {
      if(result.cancelled) {
        return
      }

      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        displaySize: { width: 200, height: 100 },
        resizeMode: 'contain',
      },
        (uri) => this.setState(() => ({ image: uri })),
        (error) => console.warn('Error', error)
      )
    })
  }

  render() {
    const {image} = this.state

    return(
      <View style={styles.container}>
        <TouchableOpacity style={{backgroundColor: purple, padding: 10}} onPress={this.pickImage}>
          <Text style={{color: 'white'}}>Open Camera Roll</Text>
        </TouchableOpacity>

        {
          image && (
            <Image style={styles.img} source={{uri: image}} />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'black'
  }
})
export default Extra;
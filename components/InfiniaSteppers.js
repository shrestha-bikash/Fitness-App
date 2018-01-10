/**
 * Created by bikash on 10/31/17.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { white, grey, purple } from "../utils/colors";

export default function InfiniaSteppers ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      {
        Platform.os === 'ios' ?
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.iosBtn]}
              onPress={onDecrement}
            >
              <Entypo name="minus" size={30} color={purple} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iosBtn]}
              onPress={onIncrement}
            >
              <Entypo name="plus" size={30} color={purple} />
            </TouchableOpacity>
          </View>
          :
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.androidBtn]}
              onPress={onDecrement}
            >
              <FontAwesome name="minus" size={30} color={white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.androidBtn]}
              onPress={onIncrement}
            >
              <FontAwesome name="plus" size={30} color={white} />
            </TouchableOpacity>
          </View>
      }
      <View style={styles.metriCounter}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 16, color: grey}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 5
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  },
  metriCounter: {
    width: 85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center'
  }
})
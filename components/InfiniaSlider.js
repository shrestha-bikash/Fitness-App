/**
 * Created by bikash on 10/31/17.
 */
import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import {gray} from "../utils/colors";

export default function InfiniaSlider ({max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
        style={{flex: 1}}
      />
      <View style={[styles.metriCounter]}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 16, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center'
  }
})
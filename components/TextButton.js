/**
 * Created by bikash on 10/31/17.
 */
import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {white} from "../utils/colors";

export default function TextButton({ children, onPress, style = {}}) {
  return (
    <TouchableOpacity style={{marginTop: 10}} onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: white,
    fontSize: 16
  }
})
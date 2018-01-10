/**
 * Created by bikash on 10/31/17.
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import InfiniaSlider from './InfiniaSlider'
import InfiniaSteppers from './InfiniaSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { addEntry, receiveEntries } from '../actions'
import { white, purple } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.os === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Submit</Text>

    </TouchableOpacity>
  )
}
class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    //Update Redux
    this.props.addEntry({
      [key]: entry
    })

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    this.toHome()

    submitEntry({ key, entry })

    clearLocalNotification()
      .then(setLocalNotification)
  }

  reset = () => {
    const key = timeToString()

    //update Redux
    this.props.addEntry({
      [key]: getDailyReminderValue()
    })

    this.toHome()

    removeEntry(key)

  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    // const date = (new Date()).toLocaleDateString()
    if(this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.os === 'ios' ? "ios-happy-outline" : "md-happy"}
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton style={styles.resetBtn} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {/*<ScrollView>*/}
          <DateHeader date={timeToString()}/>
          {Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return (
              <View key={key} style={styles.row}>
                {getIcon()}
                {type === 'slider'
                  ? <InfiniaSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
                  : <InfiniaSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />}
              </View>
            )
          })}
          <SubmitBtn onPress={this.submit}/>
        {/*</ScrollView>*/}
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  resetBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  }
})

function mapStateToProps(state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps, { addEntry })(AddEntry)
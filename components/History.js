/**
 * Created by bikash on 11/2/17.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { AppLoading } from 'expo'

import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import {white} from "../utils/colors"
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'

class History extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    fetchCalendarResults()
      .then((entries) => this.props.receiveEntries(entries))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          this.props.addEntry({
            [timeToString()]: getDailyReminderValue()
          })
        }
      }).then(() => this.setState(() => ({
        ready: true,
    })))
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View style={styles.item}>
      {
        today ?
          <View>
            <DateHeader date={formattedDate} />
            <Text style={{}}>
              {today}
            </Text>
          </View>
          :
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EntryDetail', {entryId: key})}>
            <MetricCard metrics={metrics} date={formattedDate}/>
          </TouchableOpacity>
      }
    </View>
  )

  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={{}}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const {entries} = this.props;
    const { ready } = this.state;

    if(!ready) {
      return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

  const styles = StyleSheet.create({
    item: {
      backgroundColor: white,
      borderRadius: Platform.os === 'ios' ? 16 : 2,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      }
    },
    noDataText: {
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20,
    }
  })

function mapStateToProps(entries) {
  return {
    entries
  }
}
export default connect(mapStateToProps, { fetchCalendarResults, receiveEntries, addEntry })(History)
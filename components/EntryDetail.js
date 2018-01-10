/**
 * Created by bikash on 11/5/17.
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import MetricCard from './MetricCard'
import TextButton from './TextButton'
import { white, purple } from '../utils/colors'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'

class EntryDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    const year = entryId.slice(0,4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  reset = () => {
    const { navigation } = this.props
    const { entryId } = navigation.state.params

    this.props.addEntry({
      [entryId]: timeToString() === entryId
      ? getDailyReminderValue()
        : null
    })

    navigation.goBack()

    removeEntry(entryId)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const {metrics} = this.props

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics}/>
        <TextButton onPress={this.reset} style={{backgroundColor: purple, padding: 10, margin: 20}}>
          Reset
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
})

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

export default connect(mapStateToProps, { addEntry })(EntryDetail)
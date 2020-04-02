/* Copyright (C) mroads, LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, PanResponder, AppState} from 'react-native';
import moment from 'moment';

export interface Props {
  // function to call after timeout
  onAction: Function;
  //In Minutes
  timeToInactivity: number;
  children: Array<any> | React.Component;
  // Seconds
  interval: number;
  handleAppState: boolean;
}

export interface State {
  logoutTime: moment.Moment;
}

export default class UserInactiveCheck extends Component<Props, State> {
  panResponder = {};

  timeInterval = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      logoutTime: null,
    };

    //It Listens to the child content/ component actions mentioned in the object
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        this.updateInactiveTime();
        return true;
      },
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        this.updateInactiveTime();
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    });

    // Timer and countdown starts only if app is active
    if (props.handleAppState) {
      AppState.addEventListener('change', appState => {
        if (appState === 'active') {
          this.resetTimer();
        } else {
          this.clearTimer();
        }
      });
    }

    this.timeInterval = null;
  }

  componentWillUnmount() {
    // clearing the timer at unmount
    this.clearTimer();
    const {handleAppState} = this.props;
    if (handleAppState) {
      AppState.removeEventListener('change');
    }
  }

  resetTimer = () => {
    const {interval = 5} = this.props;
    // setting logout time and count down time
    this.updateInactiveTime();
    this.timeInterval = setInterval(this.checkTimeForAction, interval * 1000);
  };

  clearTimer = () => {
    this.timeInterval && clearInterval(this.timeInterval);
  };

  // It checks if logout time has come for every given interval
  checkTimeForAction = () => {
    const {logoutTime} = this.state;
    const {onAction, interval = 5} = this.props;
    const duration = logoutTime.diff(moment(), 'seconds');
    // console.info('check duration ==> ', duration, 'Sec left');
    if (duration > -1 && duration <= interval) {
      // console.info('calling action');
      onAction && onAction();
      this.clearTimer()
    }
  };

  // Setting the logout time for the given inactive period.
  updateInactiveTime = () => {
    let {logoutTime} = this.state;
    const {timeToInactivity = 5} = this.props;
    logoutTime = moment().add(timeToInactivity, 'minutes');
    // console.info(
    //   'time got reset ==>',
    //   logoutTime.diff(moment(), 'seconds'),
    //   '==> seconds left',
    // );
    this.setState({logoutTime});
  };

  render() {
    const {children} = this.props;
    return (
      <View style={{flex: 1}} {...this.panResponder.panHandlers}>
        {children}
      </View>
    );
  }
}

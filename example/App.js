/* Copyright (C) mroads, LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @format
 * @flow
 */

import React from 'react';
import { Alert } from 'react-native';
import UserInactiveCheck from './user-inactivity-check';
import TestComponent from './test-component';

const USER_INACTIVE_INTERVAL = 10; // Seconds
const USER_INACTIVE_TIME = 5; // Minutes

const App = () => {
  let userInactiveCheckRef = React.createRef();
  const alert = () =>  Alert.alert(
    'User is not active',
    `User is not active for ${USER_INACTIVE_TIME} minute(s).`,
    [,
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Reset', onPress: () => userInactiveCheckRef.resetTimer()},
    ],
  )
  return (
    <UserInactiveCheck
      timeToInactivity={USER_INACTIVE_TIME}
      interval={USER_INACTIVE_INTERVAL}
      onAction={alert}
      ref={ref => (userInactiveCheckRef = ref)}
      handleAppState>
        <TestComponent />
    </UserInactiveCheck>
  );
};

export default App;

# React Native User Inactivity check

**react-native-user-inactivity-check** library helps in monitoring child components actions like Move, Drag, Press. If the user didnt perfrom any of the actions in child screens or components, It triggers an action which is passed to it.

# Setup
### Installation

`$ npm install react-native-user-inactivity-check --save`

or

`$ yarn add react-native-user-inactivity-check`


## Usage

* When the component is renderd it will start listening to the actions happening in the child Screens and Components. Main difference here is with the given **timeToInactivity**. This library calculates the logtime (i.e Time to trigger the action if user is inactive). It checks for every **interval** with logtime if the current time near logtime it triggers the action and clears the timer.

* If it register's any action it will again calculate the logtime from that insatnt and reset the timer. 

* **handleAppState** prop is a boolean value which will tell the librabry to consider the appState. If this value is set to "true", And if the app is moved to background then the timer is cleared and no logtime is considered. When the app comes to foreground then app again calculates the logtime and starts the timer. By default it runs the timer in background.

* Main objectives of this package is to handle the ideal state of the app. So that we can perform an action if the app is Ideal for a particular given time.

* The suggested approach is if you want to monitor ideal state of complete app. Then load the **App** as a child in **UserInactivityCheck**. If it's only for a particular flow then make a "Navigator" and load it as a child.

### Props
##### Function you need to call. This function by default returns the viewport values for screen size 1280 X 800.

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| timeToInactivity     |  5  |  `number`  | Minutes to wait until user respond  |
| interval     |  5  |  `number`  | Seconds for accuracy to check inactive time  |
| onAction     |  undefined  |  `function`  | Action to perform if user is inactive for given time  |
| handleAppState     |  false  |  `boolean`  | Disable timer if app is in background  |

### Basic
```javascript
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import UserInactiveCheck from 'react-native-user-inactivity-check';

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const action = () => {
    setShowContent(true);
    Alert.alert('User is not active');
  };
  let userInactiveCheckRef = React.createRef();
  const onButtonPress = () => {
    setShowContent(false);
    userInactiveCheckRef && userInactiveCheckRef.resetTimer();
  };
  return (
    <UserInactiveCheck
      timeToInactivity={5}
      interval={10}
      onAction={action}
      ref={ref => {userInactiveCheckRef = ref;}}
      handleAppState={true}>
      <View style={styles.container}>
        <View style={styles.headView}>
          <Text style={styles.heading}>User Inactivity Demo</Text>
        </View>
        <View style={styles.buttonView}>
          {showContent ? (
            <TouchableOpacity
              style={{backgroundColor: '#DDDDDD', padding: 10}}
              onPress={onButtonPress}>
              <Text style={styles.buttonText}>Reset Timer</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </UserInactiveCheck>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    marginBottom: 30,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#9d9d9d',
  },
  headView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  buttonView: {flex: 4, alignItems: 'center', justifyContent: 'center'},
  buttonText: {fontSize: 30},
});

export default App;
```

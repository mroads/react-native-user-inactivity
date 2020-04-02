import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';


export default function TestComponent(props) {
  const onEvent = () => {
      console.log('Event triggered will reset userInactivity timer');
  };
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Text style={styles.heading}>User Inactivity Demo</Text>
      </View>
      <ScrollView style={styles.buttonView} onScrollEndDrag={onEvent}>
          <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.label}>
              Test inactivity while typing.
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setText(text)}
            value={text}
            multiline
            placeholder="Enter some text"
            numberOfLines={6}
            editable
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onEvent}>
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#DDDDDD',
        padding: 8,
        marginTop: 10,
        width: 120,
        alignSelf: 'center',
    },
    textInput: {
        height: 150,
        borderColor: '#bfbdbd',
        borderWidth: 0.5,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginTop: 10,
        fontSize: 26,
    },
    heading: {
      fontSize: 40,
      marginBottom: 30,
      alignSelf: 'center',
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
    },
    container: {
      flex: 1,
      padding: 15,
      justifyContent: 'center',
      backgroundColor: '#9d9d9d',
    },
    headView: { justifyContent: 'center', alignItems: 'center' },
    buttonView: { flex: 1 },
    buttonText: { fontSize: 30, textAlign: 'center' },
    label: { fontSize: 30 },
  });
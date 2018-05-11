import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TextInput, Text, Alert } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';

class MemoCreateScreen extends React.Component {
  state = {
    body: '',
    title: '',
  }
  handlePress() {
    if (this.state.body === '' || this.state.title === '') {
      Alert.alert('記入してください');
      return;
    }
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    db.collection(`users/${currentUser.uid}/memos`).add({
      body: this.state.body,
      title: this.state.title,
      created_on: new Date(),
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={40}>
        <View style={styles.titleInput}>
          <Text style={styles.label}>
            Title
          </Text>
          <TextInput
            style={styles.titleEditInput}
            multiline
            onChangeText={(text) => { this.setState({ title: text }); }}
            placeholder="タイトルを入力してください"
          />
        </View>
        <View style={styles.contentInput}>
          <Text style={styles.label}>
            Contents
          </Text>
          <TextInput
            style={styles.memoEditInput}
            multiline
            onChangeText={(text) => { this.setState({ body: text }); }}
            placeholder="文章を入力してください"
          />
        </View>
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'\uf00c'}
        </CircleButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
  label: {
    fontSize: 24,
    paddingLeft: 30,
    paddingBottom: 5,
  },
  titleInput: {
    top: 20,
  },
  contentInput: {
    paddingTop: 50,
  },
  titleEditInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
    width: '85%',
    height: 48,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  memoEditInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
    width: '85%',
    height: '60%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default MemoCreateScreen;

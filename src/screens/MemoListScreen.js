import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import MemoList from '../../src/components/MemoList';
import CircleButton from '../../src/elements/CircleButton';

class MemoListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <Button
        title="logout"
        onPress={() => {
          firebase.auth().signOut()
            .then(() => {
              console.log('logout success');
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'MemoLogin' }),
                ],
              });
              navigation.dispatch(resetAction);
            })
            .catch((error) => {
              console.log('logout error', error);
            });
        }}
      />,
    };
  }
  state = {
    memoList: [],
  }
  componentWillMount() {
    const { currentUser } = firebase.auth();

    firebase.firestore().collection(`users/${currentUser.uid}/memos`)
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList: list });
      });
  }
  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList
          memoList={this.state.memoList}
          navigation={this.props.navigation}
        />
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'\uf067'}
        </CircleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
});

export default MemoListScreen;

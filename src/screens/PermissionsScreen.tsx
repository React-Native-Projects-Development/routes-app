import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BlackButton} from '../components/BlackButton';
import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPS usage is necessary to use this app</Text>
      <BlackButton title="Permissions" onPress={askLocationPermission} />

      <Text style={styles.json}>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  json: {
    marginTop: 20,
  },
});

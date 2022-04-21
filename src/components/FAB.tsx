import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({iconName, onPress, style = {}}: Props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{...styles.blackBtn, ...(style as any)}}>
        <Icon name={iconName} color="#fff" size={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackBtn: {
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  icon: {
    left: 1,
  },
});

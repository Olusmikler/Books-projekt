import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container_header}>
      <Text style={styles.header}>Books</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container_header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0fddd', 
    padding: 20
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  }
})
export default Header;

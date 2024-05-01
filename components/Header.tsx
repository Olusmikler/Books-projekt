import React from 'react';
import { View, Text } from 'react-native';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#f0fddd', padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
};

export default Header;

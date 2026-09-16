import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const InfoRow = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || 'No especificado'}</Text>
    </View>
  );
};
 
export default InfoRow;
 
const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },
  label: { fontSize: 15, fontWeight: 'bold', color: '#555' },
  value: { fontSize: 15, color: '#333' },
});
 
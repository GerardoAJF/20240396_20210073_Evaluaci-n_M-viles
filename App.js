import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useAuth } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import Dashboard from './src/screens/Dashboard'
const RootNavigator = () => {
  const {user, loading} = useAuth()

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
  }

  return user ? <Dashboard></Dashboard> : <AuthStack></AuthStack>
}

export default App = () => { 
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

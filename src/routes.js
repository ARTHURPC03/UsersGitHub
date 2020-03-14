import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Main from './pages/Main'
import User from './pages/User'
import Repository from './pages/Repository'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111116',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
      <Stack.Screen name="Repository" component={Repository} />
    </Stack.Navigator>
  )
}

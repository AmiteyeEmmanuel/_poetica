import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import AuthUser from '@/hooks/auth/auth.user';

export default function TabsLayout() {
  const { user } = AuthUser();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName:any;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'search/index') {
            iconName = 'search';
          } else if (route.name === 'poems/index') {
            iconName = 'book';
          } else if (route.name === 'profile/index') {
            iconName = 'person';
          } 
          return <Ionicons name={iconName}  size={25}
          color={'#5A72A0'} />;
        },
        headerShown: false,
        tabBarShowLabel: false
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="poems/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

function TabIcon({ name, color, focused }: { name: string; color: any; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '⌂',
    Eligibility: '✓',
    Apply: '+',
    Track: '◎',
    Help: '?',
  };
  
  if (name === 'Apply') {
    return (
      <View style={styles.applyButton}>
        <Text style={styles.applyIcon}>+</Text>
      </View>
    );
  }

  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={[styles.iconText, { color }]}>{icons[name] || '•'}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.clay,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="eligibility"
        options={{
          title: 'Eligibility',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Eligibility" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="apply-tab"
        options={{
          title: 'Apply',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Apply" color={color} focused={focused} />,
          tabBarLabel: () => null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('apply');
          },
        })}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Track',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Track" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Help" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    height: Platform.OS === 'android' ? 64 : 84,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'android' ? 8 : 28,
    elevation: 12,
    shadowColor: '#171f1a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 2,
  },
  iconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    // subtle background for active state
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  applyButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.clay,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    shadowColor: Colors.clay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  applyIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
});

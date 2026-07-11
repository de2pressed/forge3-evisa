// Placeholder for the Apply tab button — actual apply flow is in /apply.tsx (stack screen)
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ApplyTabPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.appBg, alignItems: 'center', justifyContent: 'center' },
  text: { color: Colors.muted, fontSize: 12 },
});

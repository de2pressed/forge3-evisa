import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Text, Dimensions, Platform, NativeModules } from 'react-native';
import 'react-native-reanimated';

let Video: any = null;
let ResizeMode: any = { COVER: 'cover', CONTAIN: 'contain' };
const hasNativeVideo = !!(NativeModules.ExponentAV || NativeModules.ExponentVideoManager);

if (hasNativeVideo) {
  try {
    const expoAV = require('expo-av');
    Video = expoAV.Video;
    ResizeMode = expoAV.ResizeMode;
  } catch (e) {
    console.warn('Video playback support check failed', e);
  }
}

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent auto-hiding the system splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [showStartScreen, setShowStartScreen] = useState(true);

  // Animation values
  const emblemOpacity = useRef(new Animated.Value(0)).current;
  const emblemScale = useRef(new Animated.Value(0.85)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(15)).current;
  const screenFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Hide the default static splash screen, showing our animated one
      SplashScreen.hideAsync();
      
      // Start start-screen animations
      Animated.sequence([
        // 1. Fade in and scale emblem
        Animated.parallel([
          Animated.timing(emblemOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(emblemScale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
        // 2. Fade in official text and slide up slightly
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        // 3. Keep displayed for 2.2 seconds, then fade out entire screen
        Animated.delay(2200),
        Animated.timing(screenFade, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowStartScreen(false);
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      
      {/* Main app navigation */}
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="apply" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
        <Stack.Screen name="eta" options={{ animation: 'slide_from_bottom' }} />
      </Stack>

      {/* Animated Start Screen Overlay */}
      {showStartScreen && (
        <Animated.View style={[styles.splashContainer, { opacity: screenFade }]}>
          {/* Looping Monument Video (Seedance 2.0 Standard) */}
          {Video && hasNativeVideo ? (
            <Video
              source={require('../assets/videos/monument-loop.mp4')}
              rate={1.0}
              volume={0.0}
              isMuted={true}
              resizeMode={ResizeMode.COVER}
              shouldPlay={true}
              isLooping={true}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#173f35' }]} />
          )}
          {/* Dark Overlay for branding contrast */}
          <View style={styles.darkOverlay} />

          {/* Branding Content */}
          <View style={styles.brandingContainer}>
            <Animated.View 
              style={[
                styles.emblemContainer, 
                { opacity: emblemOpacity, transform: [{ scale: emblemScale }] }
              ]}
            >
              <Image 
                source={require('../assets/images/emblem.png')} 
                style={styles.emblemImage}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View 
              style={[
                styles.textContainer, 
                { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }
              ]}
            >
              <Text style={styles.ministryText}>GOVERNMENT OF INDIA</Text>
              <Text style={styles.ministrySubText}>MINISTRY OF HOME AFFAIRS</Text>
              <View style={styles.divider} />
              <Text style={styles.titleText}>eVisa India</Text>
              <Text style={styles.subtitleText}>Official Mobile Portal</Text>
            </Animated.View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#173f35',
  },
  splashContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#173f35',
    zIndex: 9999,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 28, 23, 0.72)',
  },
  brandingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emblemContainer: {
    width: 100,
    height: 140,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  ministryText: {
    color: '#e9b772', // gold accent
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  ministrySubText: {
    color: '#ccd7d1',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 2,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(233, 183, 114, 0.4)',
    marginVertical: 15,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textAlign: 'center',
  },
  subtitleText: {
    color: '#8ca280', // sage green
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 4,
    textAlign: 'center',
  },
});

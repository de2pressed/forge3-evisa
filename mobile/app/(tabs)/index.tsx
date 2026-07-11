import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Platform,
  Linking,
  NativeModules,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadows } from '@/constants/Colors';

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

// ─── Helpers ───────────────────────────────────────────────
const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

// ─── TouchableScale Component for premium tactile feel ──────
function TouchableScale({ onPress, children, style, containerStyle, id, ...props }: any) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.9, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Pressable
      id={id}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style]}
      {...props}
    >
      <Animated.View style={[{ transform: [{ scale }], opacity, width: '100%' }, containerStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// ─── Quick-action data ─────────────────────────────────────
const QUICK_ACTIONS = [
  {
    id: 'qa-new-application',
    icon: '📄',
    title: 'New Application',
    subtitle: 'Start your visa',
    route: '/apply' as const,
    bg: Colors.clay,
    fg: '#fff',
    iconFg: '#fff',
  },
  {
    id: 'qa-track-status',
    icon: '◎',
    title: 'Track Status',
    subtitle: 'View progress',
    route: '/track' as const,
    bg: Colors.white,
    fg: Colors.forest,
    iconFg: Colors.forest,
  },
  {
    id: 'qa-check-eligibility',
    icon: '✓',
    title: 'Check Eligibility',
    subtitle: 'Am I eligible?',
    route: '/eligibility' as const,
    bg: Colors.white,
    fg: Colors.sage,
    iconFg: Colors.sage,
  },
  {
    id: 'qa-view-eta',
    icon: '🏛',
    title: 'View ETA',
    subtitle: 'Your approval',
    route: '/eta' as const,
    bg: Colors.white,
    fg: Colors.gold,
    iconFg: Colors.gold,
  },
];

// ─── Visa facts ────────────────────────────────────────────
const VISA_FACTS = [
  { label: 'Validity', value: '365 days' },
  { label: 'Entries', value: 'Multiple' },
  { label: 'Stay per visit', value: 'Up to 180 days' },
  { label: 'Apply window', value: '4–120 days ahead' },
];

// ─── Document checklist items ──────────────────────────────
const DOCUMENTS = [
  'Passport bio page',
  'Recent white-background photo',
  'Business card or invitation',
];

// ─── Official links ────────────────────────────────────────
const OFFICIAL_LINKS = [
  { id: 'link-ivo', label: 'Indian Visa Online', url: 'https://indianvisaonline.gov.in' },
  { id: 'link-boi', label: 'Bureau of Immigration', url: 'https://boi.gov.in' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* ── Official GOI Header ────────────────────────── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>  
        <View style={styles.headerInner}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/images/emblem.png')} 
              style={styles.logoEmblem}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerBrand} id="home-header-brand">eVisa India</Text>
            <Text style={styles.headerSub}>Ministry of Home Affairs</Text>
          </View>
          <View style={styles.headerRight}>
            <Image 
              source={require('../../assets/images/digital-india.png')} 
              style={styles.logoDigitalIndia}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Welcome Banner with PixVerse Video Background ── */}
        <View style={styles.welcomeCard} id="home-welcome-banner">
          {/* Looping People Video (Seedance 2.0 Standard) */}
          {Video && hasNativeVideo ? (
            <Video
              source={require('../../assets/videos/people-loop.mp4')}
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
          <View style={styles.welcomeOverlay} />
          
          <View style={styles.welcomeContent}>
            <Image 
              source={require('../../assets/images/e-visa-logo.png')} 
              style={styles.eVisaLogoImage}
              resizeMode="contain"
            />
            <Text style={styles.welcomeEyebrow}>Government of India</Text>
            <Text style={styles.welcomeTitle}>Official Visa Services</Text>
            <Text style={styles.welcomeSubtitle}>Secure portal for Indian e‑Business Visas</Text>
          </View>
        </View>

        {/* ── Quick Actions Grid (Restructured) ───────────────── */}
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableScale
              key={action.id}
              id={action.id}
              style={[styles.quickCardWrapper]}
              containerStyle={[
                styles.quickCard,
                { backgroundColor: action.bg },
                action.bg === Colors.white && styles.quickCardBordered,
              ]}
              onPress={() => router.push(action.route)}
            >
              <Text style={[styles.quickIcon, { color: action.iconFg }]}>{action.icon}</Text>
              <Text
                style={[
                  styles.quickTitle,
                  { color: action.bg === Colors.clay ? '#fff' : Colors.ink },
                ]}
              >
                {action.title}
              </Text>
              <Text
                style={[
                  styles.quickSubtitle,
                  { color: action.bg === Colors.clay ? 'rgba(255,255,255,0.7)' : Colors.muted },
                ]}
              >
                {action.subtitle}
              </Text>
            </TouchableScale>
          ))}
        </View>

        {/* ── Unified Information Container (Solves Floating cards) ── */}
        <View style={styles.unifiedContainer}>
          {/* Section 1: Visa Facts */}
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>e‑Business Visa Details</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>Available</Text>
            </View>
          </View>
          
          <View style={styles.factsWrapper}>
            {VISA_FACTS.map((fact, idx) => (
              <View
                key={fact.label}
                style={[
                  styles.factRow,
                  idx < VISA_FACTS.length - 1 && styles.rowBorder,
                ]}
              >
                <Text style={styles.factLabel}>{fact.label}</Text>
                <Text style={styles.factValue}>{fact.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionDivider} />

          {/* Section 2: Document Checklist */}
          <Text style={styles.cardSubTitle}>Document Requirements</Text>
          <View style={styles.checklistWrapper}>
            {DOCUMENTS.map((doc) => (
              <View key={doc} style={styles.checkRow}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                <Text style={styles.checkText}>{doc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Advisory Banner ───────────────────────────── */}
        <View style={styles.advisory} id="home-advisory-banner">
          <View style={styles.advisoryGlow} />
          <View style={styles.advisoryContent}>
            <Text style={styles.advisoryTitle}>Official Advisory: No Emergency Charge</Text>
            <Text style={styles.advisoryText}>
              The Government of India does not charge any additional fee for express or emergency processing. 
              Be aware of third-party websites claiming to offer fast-tracked official visas.
            </Text>
          </View>
        </View>

        {/* ── Unified External Resource Links ──────────────── */}
        <View style={styles.unifiedContainer}>
          <Text style={styles.cardTitle}>Official Government Resources</Text>
          {OFFICIAL_LINKS.map((link, idx) => (
            <TouchableScale
              key={link.id}
              id={link.id}
              style={styles.linkRowWrapper}
              containerStyle={[
                styles.linkRow,
                idx < OFFICIAL_LINKS.length - 1 && styles.rowBorder,
              ]}
              onPress={() => Linking.openURL(link.url)}
            >
              <Text style={styles.linkText}>{link.label} ↗</Text>
              <Text style={styles.linkArrow}>›</Text>
            </TouchableScale>
          ))}
        </View>
        
        {/* Footer Logos representing official affiliation */}
        <View style={styles.footerBranding}>
          <Image 
            source={require('../../assets/images/swacch-bharat.png')} 
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Image 
            source={require('../../assets/images/my-gov.png')} 
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },

  // Official GOI Header
  header: {
    backgroundColor: Colors.forest,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 183, 114, 0.2)',
  },
  headerInner: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
  },
  headerLeft: {
    width: 35,
    height: 48,
    justifyContent: 'center',
  },
  logoEmblem: {
    width: '100%',
    height: '100%',
  },
  headerTitleWrap: {
    flex: 1,
    paddingLeft: 12,
  },
  headerBrand: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: serif,
  },
  headerSub: {
    color: '#8ca280',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  headerRight: {
    width: 45,
    height: 35,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoDigitalIndia: {
    width: '100%',
    height: '100%',
  },

  // Scroll Content
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // Welcome banner with background video
  welcomeCard: {
    height: 180,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  welcomeOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 28, 23, 0.72)',
  },
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  eVisaLogoImage: {
    width: 140,
    height: 38,
    marginBottom: 8,
  },
  welcomeEyebrow: {
    color: Colors.gold,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: serif,
    fontWeight: '700',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Quick actions grid
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  quickCardWrapper: {
    width: '48.2%',
    marginBottom: 12,
  },
  quickCard: {
    borderRadius: Radius.md,
    padding: 16,
    ...Shadows.card,
    height: 110,
    justifyContent: 'space-between',
  },
  quickCardBordered: {
    borderWidth: 1,
    borderColor: Colors.line,
  },
  quickIcon: {
    fontSize: 24,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  quickSubtitle: {
    fontSize: 10,
    marginTop: 1,
  },

  // Unified Container (Groups panels edge-to-edge of the container)
  unifiedContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 18,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: serif,
  },
  cardSubTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.ink,
    marginTop: 6,
    marginBottom: 12,
    fontFamily: serif,
  },
  statusPill: {
    backgroundColor: Colors.forestLight,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusPillText: {
    color: Colors.forest,
    fontSize: 9,
    fontWeight: '700',
  },
  factsWrapper: {
    marginBottom: 4,
  },
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  factLabel: {
    fontSize: 13,
    color: Colors.muted,
  },
  factValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.line,
    marginVertical: 14,
  },
  checklistWrapper: {
    paddingBottom: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkMark: {
    color: Colors.successText,
    fontSize: 10,
    fontWeight: '700',
  },
  checkText: {
    fontSize: 13,
    color: Colors.ink,
    fontWeight: '500',
    flex: 1,
  },

  // Advisory banner (restructured to look more official and containerized)
  advisory: {
    backgroundColor: Colors.noticeBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.noticeBorder,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  advisoryGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.noticeBorder,
  },
  advisoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  advisoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.noticeText,
    marginBottom: 4,
  },
  advisoryText: {
    fontSize: 11,
    color: Colors.noticeText,
    lineHeight: 16,
    opacity: 0.9,
  },

  // Official resource links inside unified container
  linkRowWrapper: {
    width: '100%',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  linkText: {
    fontSize: 13,
    color: Colors.forest,
    fontWeight: '600',
  },
  linkArrow: {
    fontSize: 18,
    color: Colors.muted,
    fontWeight: '300',
  },

  // Footer branding
  footerBranding: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: 10,
    opacity: 0.6,
  },
  footerLogo: {
    height: 32,
    width: 80,
  },
});

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
  Linking,
  Platform,
  NativeModules,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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

// ─── Accordion Item (Grouped row format) ───────────────────────────
interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  isLast: boolean;
}

function AccordionItem({ id, question, answer, isOpen, onToggle, isLast }: AccordionItemProps) {
  const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const handleToggle = useCallback(() => {
    Animated.spring(rotation, {
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
      tension: 120,
      friction: 14,
    }).start();
    onToggle(id);
  }, [isOpen, id, onToggle, rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.accordionRow, !isLast && styles.rowBorder]}>
      <Pressable
        id={`help-accordion-${id}`}
        style={styles.accordionHeader}
        onPress={handleToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityLabel={question}
      >
        <Text style={styles.accordionQuestion}>{question}</Text>
        <Animated.Text
          style={[styles.chevron, { transform: [{ rotate }] }]}
        >
          ›
        </Animated.Text>
      </Pressable>
      {isOpen && (
        <View style={styles.accordionBody}>
          <Text style={styles.accordionAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <Text style={styles.sectionHeading}>{title}</Text>
  );
}

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const openExternal = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  return (
    <View style={styles.root}>
      {/* ── Official Header ───────────────────────────── */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerEyebrow}>Official FAQ Support Centre</Text>
        <Text style={styles.headerTitle}>Help Centre</Text>
        <Text style={styles.headerSubtitle}>Rules, document clarifications and processes</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Looping Culture Video Banner (Seedance 2.0 Standard) */}
        <View style={styles.cultureBanner}>
          {Video && hasNativeVideo ? (
            <Video
              source={require('../../assets/videos/culture-loop.mp4')}
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
          <View style={styles.cultureBannerOverlay} />
          <View style={styles.cultureBannerContent}>
            <Text style={styles.cultureTitle}>Discover India's Heritage</Text>
            <Text style={styles.cultureSub}>Experience classical art and historical monuments during your business visit.</Text>
          </View>
        </View>

        {/* ── Getting Started ──────────────────────────── */}
        <SectionHeading title="Getting Started" />
        <View style={styles.unifiedContainer}>
          <AccordionItem
            id="gs-when"
            question="When should I apply?"
            answer="Normal e‑Business applicants should apply at least four days before arrival and can generally apply up to 120 days ahead."
            isOpen={!!openItems['gs-when']}
            onToggle={toggleItem}
            isLast={false}
          />
          <AccordionItem
            id="gs-validity"
            question="How long is the visa valid?"
            answer="365 days from the date ETA is granted, with multiple entries. Continuous stay on each visit should not exceed 180 days."
            isOpen={!!openItems['gs-validity']}
            onToggle={toggleItem}
            isLast={false}
          />
          <AccordionItem
            id="gs-conference"
            question="Can I use this for a conference?"
            answer="Conference travel has specific documentary requirements and may use a different business sub-category. Check the activity before starting a normal business application."
            isOpen={!!openItems['gs-conference']}
            onToggle={toggleItem}
            isLast={true}
          />
        </View>

        {/* ── Documents ─────────────────────────────────── */}
        <SectionHeading title="Documents" />
        <View style={styles.unifiedContainer}>
          <AccordionItem
            id="doc-evidence"
            question="What business evidence is required?"
            answer="Upload your business card. An invitation letter from the Indian company including company information, address and phone number can also support the application."
            isOpen={!!openItems['doc-evidence']}
            onToggle={toggleItem}
            isLast={false}
          />
          <AccordionItem
            id="doc-rejected"
            question="What happens if an image is rejected?"
            answer="You may be advised by email to upload a clearer or corrected file. The tracking page identifies the document and provides the recovery action."
            isOpen={!!openItems['doc-rejected']}
            onToggle={toggleItem}
            isLast={false}
          />
          <AccordionItem
            id="doc-photo"
            question="What should the photograph look like?"
            answer="Use a recent front-facing photograph showing the full face against a plain white background, without blur, borders or distracting shadows."
            isOpen={!!openItems['doc-photo']}
            onToggle={toggleItem}
            isLast={true}
          />
        </View>

        {/* ── Fees and Payment ──────────────────────────── */}
        <SectionHeading title="Fees and Payment" />
        
        <View style={styles.noticeCard}>
          <View style={styles.noticeCardGlow} />
          <View style={styles.noticeCardContent}>
            <Text style={styles.noticeTitle}>Official Fee Warning</Text>
            <Text style={styles.noticeText}>
              There is no emergency or express eVisa fee. The application fee is territory-specific and non-refundable. Transaction fees are up to 3%.
            </Text>
          </View>
        </View>

        <View style={styles.unifiedContainer}>
          <AccordionItem
            id="fee-failed"
            question="If payment failed"
            answer="Do not immediately repeat the transaction. Check payment status after a short interval."
            isOpen={!!openItems['fee-failed']}
            onToggle={toggleItem}
            isLast={true}
          />
        </View>

        {/* ── Tracking ──────────────────────────────────── */}
        <SectionHeading title="Tracking" />
        <View style={styles.unifiedContainer}>
          <View style={styles.innerPadding}>
            <Text style={styles.bodyText}>
              Use the reference number from your confirmation email (IND-BIZ-YY-XXXX) to check application status in real-time.
            </Text>
            <TouchableScale
              id="help-track-button"
              style={styles.trackButtonWrapper}
              containerStyle={styles.trackButton}
              onPress={() => router.push('/track')}
            >
              <Text style={styles.trackButtonText}>Launch Application Tracker →</Text>
            </TouchableScale>
          </View>
        </View>

        {/* ── Arrival ───────────────────────────────────── */}
        <SectionHeading title="Arrival" />
        <View style={styles.unifiedContainer}>
          <View style={styles.innerPadding}>
            <Text style={styles.bodyText}>
              Bring the passport used during the application and a copy of the ETA. Immigration will collect biometrics on arrival. Passport details must match the ETA.
            </Text>
          </View>
        </View>

        {/* ── Official Support ──────────────────────────── */}
        <SectionHeading title="Official Support" />
        
        <TouchableScale
          id="help-link-visa-online"
          style={styles.linkCardWrapper}
          containerStyle={styles.linkCard}
          onPress={() => openExternal('https://indianvisaonline.gov.in')}
        >
          <View style={styles.linkCardContent}>
            <View>
              <Text style={styles.linkCardTitle}>Indian Visa Online</Text>
              <Text style={styles.linkCardSub}>Official Government portal</Text>
            </View>
            <Text style={styles.linkArrow}>↗</Text>
          </View>
        </TouchableScale>

        <TouchableScale
          id="help-link-boi"
          style={styles.linkCardWrapper}
          containerStyle={styles.linkCard}
          onPress={() => openExternal('https://boi.gov.in')}
        >
          <View style={styles.linkCardContent}>
            <View>
              <Text style={styles.linkCardTitle}>Bureau of Immigration</Text>
              <Text style={styles.linkCardSub}>Immigration authority</Text>
            </View>
            <Text style={styles.linkArrow}>↗</Text>
          </View>
        </TouchableScale>
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },

  // Header
  header: {
    backgroundColor: Colors.forest,
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 183, 114, 0.2)',
  },
  headerEyebrow: {
    color: Colors.gold,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: serif,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,254,250,0.7)',
    fontSize: 12,
    fontWeight: '400',
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // Culture loop video card
  cultureBanner: {
    height: 140,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  cultureBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 28, 23, 0.68)',
  },
  cultureBannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cultureTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: serif,
    fontWeight: '700',
    marginBottom: 4,
  },
  cultureSub: {
    color: '#ccd7d1',
    fontSize: 10,
    lineHeight: 14,
  },

  // Section heading
  sectionHeading: {
    color: Colors.clayDark,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  // Unified Container (Groups accordions)
  unifiedContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  innerPadding: {
    padding: Spacing.lg,
  },

  // Accordion row
  accordionRow: {
    backgroundColor: Colors.white,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  accordionQuestion: {
    flex: 1,
    color: Colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    marginRight: 10,
  },
  chevron: {
    color: Colors.muted,
    fontSize: 20,
    fontWeight: '300',
    width: 20,
    textAlign: 'center',
  },
  accordionBody: {
    paddingHorizontal: 18,
    paddingBottom: 15,
    backgroundColor: '#FAF9F5',
  },
  accordionAnswer: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },

  // Body text for static cards
  bodyText: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },

  // Notice card (gold border with glow stripe)
  noticeCard: {
    backgroundColor: Colors.noticeBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.noticeBorder,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  noticeCardGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.noticeBorder,
  },
  noticeCardContent: {
    padding: Spacing.lg,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.noticeText,
    marginBottom: 4,
  },
  noticeText: {
    color: Colors.noticeText,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },

  // Track button
  trackButtonWrapper: {
    width: '100%',
    marginTop: 14,
  },
  trackButton: {
    backgroundColor: Colors.forest2,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: Colors.forest2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  trackButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  // Link cards
  linkCardWrapper: {
    width: '100%',
    marginBottom: Spacing.sm,
  },
  linkCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadows.card,
  },
  linkCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkCardTitle: {
    color: Colors.forest,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    fontFamily: serif,
  },
  linkCardSub: {
    color: Colors.muted,
    fontSize: 11,
  },
  linkArrow: {
    color: Colors.forest,
    fontSize: 18,
  },
});

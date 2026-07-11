import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadows } from '@/constants/Colors';

// ─── Android layout-animation support ──────────────────────
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
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
import { Pressable } from 'react-native';

interface AccordionSection {
  id: string;
  title: string;
  defaultOpen?: boolean;
  content: () => React.ReactNode;
}

// ─── Individual accordion item styled as a row in a container ──
function AccordionItem({
  section,
  isOpen,
  onToggle,
  isLast,
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const handleToggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    onToggle();
  }, [isOpen, onToggle, rotateAnim]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.accordionRow, !isLast && styles.rowBorder]} id={`accordion-${section.id}`}>
      <TouchableOpacity
        id={`accordion-toggle-${section.id}`}
        style={styles.accordionHeader}
        activeOpacity={0.7}
        onPress={handleToggle}
      >
        <Text style={styles.accordionTitle}>{section.title}</Text>
        <Animated.Text style={[styles.chevron, { transform: [{ rotate: chevronRotate }] }]}>
          ▾
        </Animated.Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionBody}>{section.content()}</View>}
    </View>
  );
}

// ─── Section content builders ──────────────────────────────
function RouteContent() {
  const rows = [
    { label: 'Validity', value: '365 days from grant of ETA' },
    { label: 'Entries', value: 'Multiple' },
    { label: 'Continuous stay', value: 'Up to 180 days per visit' },
    { label: 'Application timing', value: '4–120 days before arrival' },
  ];
  return (
    <View>
      {rows.map((row, idx) => (
        <View key={row.label} style={[styles.detailRow, idx < rows.length - 1 && styles.detailRowBorder]}>
          <Text style={styles.detailLabel}>{row.label}</Text>
          <Text style={styles.detailValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

function PassportContent() {
  return (
    <View>
      <Text style={styles.bodyText}>
        Your passport should normally have at least six months' validity remaining at the time of
        application. You will also need a minimum of two blank pages for stamps.
      </Text>
      <View style={styles.notice}>
        <View style={styles.noticeGlow} />
        <Text style={styles.noticeText}>
          Holders of Pakistani passports or Pakistani-origin travel documents are not eligible for
          eVisa. A regular visa must be obtained at a mission or post.
        </Text>
      </View>
    </View>
  );
}

function BusinessActivityContent() {
  const activities = [
    'Attending business meetings or conferences',
    'Visiting a supplier or manufacturing facility',
    'Sales or purchase negotiations',
    'Recruitment drives or HR meetings',
    'Technical or professional consultations',
  ];
  return (
    <View>
      <Text style={styles.bodyText}>
        The normal e‑Business visa covers a range of short-term commercial activities in India,
        including:
      </Text>
      {activities.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function DocumentsContent() {
  const docs = [
    { icon: '📄', title: 'Passport bio page', desc: 'Clear colour scan or photo' },
    { icon: '📷', title: 'Recent photograph', desc: 'Front-facing, white background' },
    { icon: '💼', title: 'Business card', desc: 'Or company letter with your details' },
    { icon: '✉️', title: 'Indian invitation', desc: 'From the host company in India' },
  ];
  return (
    <View style={styles.docGrid}>
      {docs.map((doc) => (
        <View key={doc.title} style={styles.docMiniCard}>
          <Text style={styles.docMiniIcon}>{doc.icon}</Text>
          <Text style={styles.docMiniTitle}>{doc.title}</Text>
          <Text style={styles.docMiniDesc}>{doc.desc}</Text>
        </View>
      ))}
    </View>
  );
}

function TimingContent() {
  return (
    <View>
      <Text style={styles.bodyText}>
        Apply at least four days before your intended arrival date. Applications can generally be
        submitted up to 120 days in advance.
      </Text>
      <View style={styles.notice}>
        <View style={styles.noticeGlow} />
        <Text style={styles.noticeText}>
          Do not book non-refundable travel before your ETA is granted. Processing times can vary,
          and there is no emergency or express government charge.
        </Text>
      </View>
    </View>
  );
}

function ImportantLimitsContent() {
  const limits = [
    'The e‑Business visa is non-extendable and non-convertible once issued.',
    'Certain protected or restricted areas require additional permits.',
    'Biometric enrolment may be required on arrival at the port of entry.',
    'You may be asked to show a return or onward ticket.',
    'The application fee is not refunded if the visa is refused.',
  ];
  return (
    <View>
      {limits.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const SECTIONS: AccordionSection[] = [
  { id: 'route', title: 'Your Route', defaultOpen: true, content: RouteContent },
  { id: 'passport', title: 'Passport', content: PassportContent },
  { id: 'business-activity', title: 'Business Activity', content: BusinessActivityContent },
  { id: 'documents', title: 'Documents', content: DocumentsContent },
  { id: 'timing', title: 'Timing', content: TimingContent },
  { id: 'important-limits', title: 'Important Limits', content: ImportantLimitsContent },
];

export default function EligibilityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SECTIONS.forEach((s) => {
      initial[s.id] = !!s.defaultOpen;
    });
    return initial;
  });

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <View style={styles.root}>
      {/* ── Screen header ────────────────────────────── */}
      <View style={[styles.screenHeader, { paddingTop: insets.top + 16 }]} id="eligibility-header">
        <Text style={styles.headerEyebrow}>Official eVisa Guidelines</Text>
        <Text style={styles.headerTitle}>Eligibility Criteria</Text>
        <Text style={styles.headerSubtitle}>Official requirements and documentary rules</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Accordion sections grouped inside a single container to fix floating look ── */}
        <View style={styles.unifiedContainer}>
          {SECTIONS.map((section, idx) => (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={!!openSections[section.id]}
              onToggle={() => toggleSection(section.id)}
              isLast={idx === SECTIONS.length - 1}
            />
          ))}
        </View>

        {/* ── CTA Button ─────────────────────────────── */}
        <TouchableScale
          id="eligibility-cta-apply"
          style={styles.ctaButtonWrapper}
          containerStyle={styles.ctaButton}
          onPress={() => router.push('/apply')}
        >
          <Text style={styles.ctaButtonText}>Start Official Application →</Text>
        </TouchableScale>
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

  // Screen header
  screenHeader: {
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
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontFamily: serif,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '400',
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // Unified Container for Accordion group
  unifiedContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },

  // Accordion row inside container
  accordionRow: {
    backgroundColor: Colors.white,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  accordionHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.ink,
  },
  chevron: {
    fontSize: 18,
    color: Colors.muted,
  },
  accordionBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#FAF9F5', // subtle body contrast
  },

  // Detail table (RouteContent)
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.muted,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
    textAlign: 'right',
  },

  // Bullet items
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  bulletDot: {
    color: Colors.clay,
    fontSize: 14,
    marginRight: 8,
    lineHeight: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 18,
  },

  // Document grid
  docGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  docMiniCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 12,
  },
  docMiniIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  docMiniTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 2,
  },
  docMiniDesc: {
    fontSize: 9,
    color: Colors.muted,
    lineHeight: 12,
  },

  // Common styles
  bodyText: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 18,
  },
  notice: {
    backgroundColor: Colors.noticeBg,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.noticeBorder,
    marginTop: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  noticeGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.noticeBorder,
  },
  noticeText: {
    fontSize: 11,
    color: Colors.noticeText,
    lineHeight: 15,
    padding: 12,
  },

  // CTA Button
  ctaButtonWrapper: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  ctaButton: {
    backgroundColor: Colors.clay,
    borderRadius: Radius.pill,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.clay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

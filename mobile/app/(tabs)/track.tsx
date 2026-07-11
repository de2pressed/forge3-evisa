// eVisa India — Track Screen (Tab)
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadows } from '@/constants/Colors';

const REFERENCE = 'IND-BIZ-26-7K92';
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

// ─── Timeline Event ──────────────────────────────────────────────────
interface TimelineEvent {
  label: string;
  time: string;
  status: 'done' | 'current' | 'pending';
}

const TIMELINE: TimelineEvent[] = [
  { label: 'Application submitted', time: '11 Jul · 12:42', status: 'done' },
  { label: 'Payment confirmed', time: '11 Jul · 12:43', status: 'done' },
  { label: 'Documents under review', time: 'In progress', status: 'current' },
  { label: 'Decision', time: '—', status: 'pending' },
];

export default function TrackScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refInput, setRefInput] = useState(REFERENCE);
  const [searched, setSearched] = useState(true);

  const handleSearch = () => {
    if (refInput.trim().length > 0) {
      setSearched(true);
    }
  };

  const getDotStyle = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'done':
        return styles.dotDone;
      case 'current':
        return styles.dotCurrent;
      case 'pending':
        return styles.dotPending;
    }
  };

  const getDotContent = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'done':
        return <Text style={styles.dotCheckmark}>✓</Text>;
      case 'current':
        return <View style={styles.dotCurrentInner} />;
      case 'pending':
        return null;
    }
  };

  return (
    <View style={styles.screen}>
      {/* Official Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerEyebrow}>Official Verification</Text>
        <Text style={styles.headerTitle}>Track Application</Text>
        <Text style={styles.headerSubtitle}>Check status and timeline in real-time</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Lookup Card Container */}
        <View style={styles.unifiedContainer}>
          <Text style={styles.cardLabel}>Enter Application Reference Number</Text>
          <TextInput
            id="track-ref-input"
            style={styles.refInput}
            value={refInput}
            onChangeText={setRefInput}
            placeholder={REFERENCE}
            placeholderTextColor={Colors.sandDark}
            autoCapitalize="characters"
          />
          <TouchableScale
            id="track-search-btn"
            style={styles.btnClayWrapper}
            containerStyle={styles.btnClay}
            onPress={handleSearch}
          >
            <Text style={styles.btnClayText}>Query Status →</Text>
          </TouchableScale>
          <Text style={styles.helperText}>Example: {REFERENCE}</Text>
        </View>

        {/* Status Card Container (Unified) */}
        {searched && (
          <View style={styles.unifiedContainer}>
            {/* Status header */}
            <View style={styles.statusHeader}>
              <View style={styles.statusHeaderLeft}>
                <Text style={styles.statusRef}>{refInput || REFERENCE}</Text>
                <Text style={styles.statusTitle}>Under Official Review</Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>In Progress</Text>
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.timeline}>
              {TIMELINE.map((event, index) => {
                const isLast = index === TIMELINE.length - 1;
                return (
                  <View key={event.label} style={styles.timelineRow}>
                    {/* Dot + line column */}
                    <View style={styles.timelineDotCol}>
                      <View style={[styles.dot, getDotStyle(event.status)]}>
                        {getDotContent(event.status)}
                      </View>
                      {!isLast && (
                        <View
                          style={[
                            styles.timelineLine,
                            event.status === 'done' && styles.timelineLineDone,
                            event.status === 'current' && styles.timelineLineCurrent,
                          ]}
                        />
                      )}
                    </View>

                    {/* Content column */}
                    <View style={styles.timelineContent}>
                      <Text
                        style={[
                          styles.timelineLabel,
                          event.status === 'current' && styles.timelineLabelCurrent,
                          event.status === 'pending' && styles.timelineLabelPending,
                        ]}
                      >
                        {event.label}
                      </Text>
                      <Text
                        style={[
                          styles.timelineTime,
                          event.status === 'current' && styles.timelineTimeCurrent,
                        ]}
                      >
                        {event.time}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Action needed Warning Block */}
            <View style={styles.actionCard}>
              <View style={styles.actionCardGlow} />
              <View style={styles.actionCardContent}>
                <Text style={styles.actionTitle}>Official Re-upload Notice</Text>
                <Text style={styles.actionSub}>
                  If we require a clearer scan of your documents (e.g. passport page blur), you will receive a notification here to re-upload.
                </Text>
                <TouchableScale
                  id="track-manage-docs"
                  style={styles.btnGhostSmallWrapper}
                  containerStyle={styles.btnGhostSmall}
                  onPress={() => router.push('/apply')}
                >
                  <Text style={styles.btnGhostSmallText}>Upload Center</Text>
                </TouchableScale>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Navigation Links */}
        <View style={styles.bottomLinks}>
          <TouchableScale
            id="track-get-help"
            style={styles.btnGhostWrapper}
            containerStyle={styles.btnGhost}
            onPress={() => router.push('/help')}
          >
            <Text style={styles.btnGhostText}>Visit FAQ Support Centre →</Text>
          </TouchableScale>

          <TouchableScale
            id="track-preview-eta"
            style={styles.btnDarkWrapper}
            containerStyle={styles.btnDark}
            onPress={() => router.push('/eta')}
          >
            <Text style={styles.btnDarkText}>View Sample Approved ETA</Text>
          </TouchableScale>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
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
    fontSize: 9,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    fontFamily: serif,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '400',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // Unified Container (Solves floating cards)
  unifiedContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },

  // Lookup
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.muted,
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  refInput: {
    backgroundColor: Colors.paper,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'monospace',
    color: Colors.ink,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  helperText: {
    fontSize: 11,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  // Status header
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  statusHeaderLeft: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  statusRef: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: Colors.muted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: serif,
  },
  statusPill: {
    backgroundColor: Colors.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.advisoryText,
  },

  // Timeline
  timeline: {
    marginBottom: Spacing.md,
    paddingLeft: 6,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 56,
  },
  timelineDotCol: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: Colors.sage,
  },
  dotCurrent: {
    backgroundColor: Colors.goldLight,
    borderWidth: 2.5,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  dotCurrentInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gold,
  },
  dotPending: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.sandDark,
  },
  dotCheckmark: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.line,
    marginVertical: 4,
  },
  timelineLineDone: {
    backgroundColor: Colors.sage,
  },
  timelineLineCurrent: {
    backgroundColor: Colors.line,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: 2,
  },
  timelineLabelCurrent: {
    color: Colors.advisoryText,
    fontWeight: '700',
  },
  timelineLabelPending: {
    color: Colors.muted,
    fontWeight: '500',
  },
  timelineTime: {
    fontSize: 11,
    color: Colors.muted,
  },
  timelineTimeCurrent: {
    color: Colors.gold,
    fontWeight: '600',
  },

  // Action card warning style
  actionCard: {
    backgroundColor: Colors.noticeBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.noticeBorder,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
  },
  actionCardGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.noticeBorder,
  },
  actionCardContent: {
    padding: 14,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.noticeText,
    marginBottom: 4,
  },
  actionSub: {
    fontSize: 11,
    color: Colors.noticeText,
    lineHeight: 16,
    marginBottom: Spacing.md,
    opacity: 0.9,
  },
  btnGhostSmallWrapper: {
    alignSelf: 'flex-start',
  },
  btnGhostSmall: {
    paddingVertical: 8,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.noticeBorder,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  btnGhostSmallText: {
    color: Colors.noticeText,
    fontSize: 11,
    fontWeight: '700',
  },

  // Bottom links
  bottomLinks: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },

  // Button wrappers
  btnClayWrapper: {
    width: '100%',
  },
  btnClay: {
    backgroundColor: Colors.clay,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
    shadowColor: Colors.clay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnClayText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  btnGhostWrapper: {
    width: '100%',
  },
  btnGhost: {
    paddingVertical: 14,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  btnGhostText: {
    color: Colors.ink,
    fontSize: 14,
    fontWeight: '600',
  },
  btnDarkWrapper: {
    width: '100%',
  },
  btnDark: {
    backgroundColor: Colors.forest,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
    shadowColor: Colors.forest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  btnDarkText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

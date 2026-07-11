import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Shadows } from '@/constants/Colors';

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

// ─── QR Grid (decorative 7×7 pattern) ─────────────────────────────
function QRGrid() {
  const pattern = [
    [1,1,1,0,1,1,1],
    [1,0,1,1,1,0,1],
    [1,1,1,0,0,1,1],
    [0,1,0,1,0,1,0],
    [1,0,1,0,1,1,1],
    [1,0,1,1,1,0,1],
    [1,1,1,0,1,1,1],
  ];

  return (
    <View style={qrStyles.grid}>
      {pattern.map((row, ri) => (
        <View key={`qr-row-${ri}`} style={qrStyles.row}>
          {row.map((cell, ci) => (
            <View
              key={`qr-${ri}-${ci}`}
              style={[
                qrStyles.cell,
                { backgroundColor: cell ? 'rgba(255,254,250,0.85)' : 'rgba(255,254,250,0.12)' },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const qrStyles = StyleSheet.create({
  grid: {
    width: 49,
    height: 49,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 5,
    height: 5,
    margin: 1,
    borderRadius: 1,
  },
});

// ─── Pulsing Approved Dot ──────────────────────────────────────────
function PulsingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.8, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale, opacity]);

  return (
    <View style={dotStyles.container}>
      <Animated.View
        style={[
          dotStyles.pulseRing,
          { transform: [{ scale }], opacity },
        ]}
      />
      <View style={dotStyles.solidDot} />
    </View>
  );
}

const dotStyles = StyleSheet.create({
  container: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  pulseRing: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ade80',
  },
  solidDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
});

// ─── Checklist Item ────────────────────────────────────────────────
function CheckItem({ text }: { text: string }) {
  return (
    <View style={styles.checkRow}>
      <View style={styles.checkCircle}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

// ─── Detail Cell ───────────────────────────────────────────────────
function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailCell}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function ETAScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* ── Official Slim Header Bar ──────────────────────────── */}
      <View style={[styles.headerBar, { paddingTop: insets.top + Spacing.xs }]}>
        <TouchableOpacity
          id="eta-back-button"
          onPress={() => router.back()}
          style={styles.backTouch}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerBarTitle} numberOfLines={1}>
          Electronic Travel Authorisation (ETA)
        </Text>
        <View style={styles.backTouch} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── ETA Card ────────────────────────────────── */}
        <View style={styles.etaCard}>
          {/* Decorative circles */}
          <View style={styles.decoCircle1} />
          <View style={styles.decoCircle2} />

          {/* Top row: brand emblem + status */}
          <View style={styles.etaTopRow}>
            <View style={styles.cardHeaderLeft}>
              <Image 
                source={require('../assets/images/emblem.png')} 
                style={styles.cardEmblemImage}
                resizeMode="contain"
              />
              <View style={styles.cardTitleWrap}>
                <Text style={styles.brandMark}>GOVERNMENT OF INDIA</Text>
                <Text style={styles.brandSub}>e‑Business Visa Portal</Text>
              </View>
            </View>
            <View style={styles.approvedPill}>
              <PulsingDot />
              <Text style={styles.approvedText}>Approved</Text>
            </View>
          </View>

          {/* Main traveler name block */}
          <View style={styles.nameBlock}>
            <Text style={styles.travelerName}>Aarav Sharma</Text>
            <Text style={styles.visaType}>Normal e‑Business Visa (365 Days, Multiple Entry)</Text>
          </View>

          {/* Details grid (3×2) */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailsRow}>
              <DetailCell label="VALIDITY" value="365 days" />
              <DetailCell label="ENTRIES" value="Multiple" />
              <DetailCell label="STAY PER VISIT" value="Up to 180 days" />
            </View>
            <View style={styles.detailsRow}>
              <DetailCell label="VALID FROM" value="18 July 2026" />
              <DetailCell label="VALID UNTIL" value="17 July 2027" />
              <DetailCell label="PASSPORT" value="•••• 2847" />
            </View>
          </View>

          {/* Bottom: reference + QR */}
          <View style={styles.etaBottom}>
            <View>
              <Text style={styles.refLabel}>OFFICIAL REFERENCE</Text>
              <Text style={styles.refValue}>IND-BIZ-26-7K92</Text>
            </View>
            <View style={styles.qrContainer}>
              <QRGrid />
              <Text style={styles.qrLabel}>SECURE VERIFIED</Text>
            </View>
          </View>
        </View>

        {/* ── Before You Fly (Travel Requirements checklist) ── */}
        <View style={styles.whiteCard}>
          <Text style={styles.cardTitle}>Before you fly</Text>
          <Text style={styles.cardSubtitle}>Travel preparation checklist</Text>

          <View style={styles.checklistGroup}>
            <CheckItem text="Valid passport matching ETA details exactly" />
            <CheckItem text="Printed copy of this Electronic Travel Authorisation" />
            <CheckItem text="Confirmed return or onward travel journey ticket" />
            <CheckItem text="Indian business contact details or qualifying invitation" />
          </View>

          <TouchableScale
            id="eta-save-button"
            style={styles.saveButtonWrapper}
            containerStyle={styles.saveButton}
            onPress={() => {}}
          >
            <Text style={styles.saveButtonText}>Save ETA to Device ↓</Text>
          </TouchableScale>
        </View>

        {/* ── Immigration Notice ── */}
        <View style={styles.whiteCard}>
          <Text style={styles.cardTitle}>Immigration completions on arrival</Text>
          <Text style={styles.arrivalText}>
            Please present this ETA printout alongside your passport to the Immigration Officer. 
            Biometric verification (fingerprints and facial photograph) will be captured at the port of entry in India. 
            Ensure your passport has at least two blank pages and remains valid for at least six months from arrival.
          </Text>

          <TouchableScale
            id="eta-arrival-button"
            style={styles.ghostButtonWrapper}
            containerStyle={styles.ghostButton}
            onPress={() => router.push('/help')}
          >
            <Text style={styles.ghostButtonText}>Arrival Help Center →</Text>
          </TouchableScale>
        </View>
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

  // Header bar
  headerBar: {
    backgroundColor: Colors.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 183, 114, 0.2)',
  },
  backTouch: {
    width: 60,
  },
  backText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  headerBarTitle: {
    flex: 1,
    color: 'rgba(255,254,250,0.85)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // ── ETA Card ──
  etaCard: {
    backgroundColor: Colors.forest,
    borderRadius: 25,
    padding: Spacing.lg,
    minHeight: 400,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.heavy,
  },

  // Decorative circles
  decoCircle1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,254,250,0.04)',
  },
  decoCircle2: {
    position: 'absolute',
    top: 20,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,254,250,0.03)',
  },

  // Top row
  etaTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardEmblemImage: {
    width: 25,
    height: 38,
    marginRight: 10,
  },
  cardTitleWrap: {
    justifyContent: 'center',
  },
  brandMark: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandSub: {
    color: 'rgba(255,254,250,0.55)',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 2,
  },
  approvedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
  },
  approvedText: {
    color: '#4ade80',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // Name block
  nameBlock: {
    marginBottom: Spacing.xl,
  },
  travelerName: {
    color: Colors.white,
    fontSize: 34,
    fontFamily: serif,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: Spacing.xs,
  },
  visaType: {
    color: 'rgba(255,254,250,0.6)',
    fontSize: 12,
    fontWeight: '500',
  },

  // Details grid
  detailsGrid: {
    marginBottom: Spacing.xl,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  detailCell: {
    flex: 1,
  },
  detailLabel: {
    color: 'rgba(140,162,128,0.8)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  detailValue: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  // Bottom
  etaBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,254,250,0.1)',
    paddingTop: Spacing.md,
  },
  refLabel: {
    color: 'rgba(140,162,128,0.8)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  refValue: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrLabel: {
    color: 'rgba(255,254,250,0.4)',
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
  },

  // ── White cards ──
  whiteCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadows.card,
  },
  cardTitle: {
    color: Colors.ink,
    fontSize: 16,
    fontFamily: serif,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    color: Colors.muted,
    fontSize: 12,
    marginBottom: Spacing.lg,
  },

  // Checklist
  checklistGroup: {
    marginBottom: Spacing.lg,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  checkMark: {
    color: Colors.successText,
    fontSize: 10,
    fontWeight: '800',
  },
  checkText: {
    color: Colors.ink,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  // Save button
  saveButtonWrapper: {
    width: '100%',
  },
  saveButton: {
    backgroundColor: Colors.clay,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: Colors.clay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Arrival
  arrivalText: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: Spacing.lg,
  },

  // Ghost button
  ghostButtonWrapper: {
    width: '100%',
  },
  ghostButton: {
    borderWidth: 1.5,
    borderColor: Colors.line,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  ghostButtonText: {
    color: Colors.forest,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadows } from '@/constants/Colors';

let ClipboardModule: { setStringAsync?: (s: string) => Promise<void> } | null = null;
try { ClipboardModule = require('expo-clipboard'); } catch {}

// ─── Constants ───────────────────────────────────────────────────────
const STEP_LABELS = ['Applicant', 'Business', 'Documents', 'Payment', 'Review'];
const NATIONALITIES = ['United Kingdom', 'United States', 'Australia', 'Canada', 'Japan', 'Singapore'];
const PORTS = ['Delhi (DEL)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Chennai (MAA)', 'Hyderabad (HYD)'];
const ACTIVITIES = [
  'Attend meetings or conferences',
  'Establish business contacts',
  'Trade or purchase goods',
  'Recruit personnel',
  'Participate in exhibitions or trade fairs',
  'Technical or business consultations',
];
const STAY_OPTIONS = ['Up to 30 days', 'Up to 60 days', 'Up to 90 days', 'Up to 180 days'];
const REFERENCE = 'IND-BIZ-26-7K92';
const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

// ─── TouchableScale Component for premium tactile feel ──────
function TouchableScale({ onPress, children, style, containerStyle, id, disabled, ...props }: any) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.9, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Pressable
      id={id}
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style]}
      disabled={disabled}
      {...props}
    >
      <Animated.View style={[{ transform: [{ scale }], opacity: disabled ? 0.5 : opacity, width: '100%' }, containerStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// ─── Picker Component ────────────────────────────────────────────────
function InlinePicker({
  id,
  label,
  options,
  value,
  onSelect,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={formStyles.fieldGroup}>
      <Text style={formStyles.label}>{label}</Text>
      <Pressable
        id={id}
        style={[formStyles.input, formStyles.pickerTrigger]}
        onPress={() => setOpen(!open)}
      >
        <Text style={value ? formStyles.pickerValue : formStyles.pickerPlaceholder}>
          {value || `Select ${label.toLowerCase()}`}
        </Text>
        <Text style={formStyles.pickerCaret}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View style={formStyles.pickerDropdown}>
          {options.map((opt) => (
            <Pressable
              key={opt}
              style={[formStyles.pickerOption, value === opt && formStyles.pickerOptionActive]}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[formStyles.pickerOptionText, value === opt && formStyles.pickerOptionTextActive]}>
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Checkbox Component ──────────────────────────────────────────────
function Checkbox({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      id={id}
      style={formStyles.checkboxRow}
      onPress={onToggle}
    >
      <View style={[formStyles.checkboxBox, checked && formStyles.checkboxChecked]}>
        {checked && <Text style={formStyles.checkboxMark}>✓</Text>}
      </View>
      <Text style={formStyles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

// ─── Field Component ─────────────────────────────────────────────────
function Field({
  id,
  label,
  placeholder,
  value,
  onChangeText,
  multiline,
  keyboardType,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
}) {
  return (
    <View style={formStyles.fieldGroup}>
      <Text style={formStyles.label}>{label}</Text>
      <TextInput
        id={id}
        style={[formStyles.input, multiline && formStyles.multiline]}
        placeholder={placeholder || label}
        placeholderTextColor={Colors.sandDark}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

export default function ApplyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [feeConsented, setFeeConsented] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Upload states
  const [uploadStates, setUploadStates] = useState<Record<string, 'missing' | 'ready'>>({
    passport: 'missing',
    photo: 'missing',
    business: 'missing',
  });

  // Form data — Step 1
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalPort, setArrivalPort] = useState('');
  const [email, setEmail] = useState('');
  const [passportValidity, setPassportValidity] = useState(false);
  const [passportBlank, setPassportBlank] = useState(false);

  // Form data — Step 2
  const [activity, setActivity] = useState('');
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [indianCompany, setIndianCompany] = useState('');
  const [indianContact, setIndianContact] = useState('');
  const [indianAddress, setIndianAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [expectedStay, setExpectedStay] = useState('');
  const [travelConfirm1, setTravelConfirm1] = useState(false);
  const [travelConfirm2, setTravelConfirm2] = useState(false);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const handleUpload = (docKey: string) => {
    setUploadStates((prev) => ({ ...prev, [docKey]: 'ready' }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleCopyRef = async () => {
    if (ClipboardModule?.setStringAsync) {
      await ClipboardModule.setStringAsync(REFERENCE);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allDocsReady = Object.values(uploadStates).every((s) => s === 'ready');

  // ─── Progress Stepper ──────────────────────────────────────────
  const renderStepper = () => (
    <View style={styles.stepperWrap}>
      <View style={styles.stepperRow}>
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;
          const future = step > currentStep;
          return (
            <React.Fragment key={label}>
              {i > 0 && (
                <View style={[styles.stepperLine, done && styles.stepperLineDone]} />
              )}
              <View style={styles.stepperItem}>
                <View
                  style={[
                    styles.stepperDot,
                    done && styles.stepperDotDone,
                    active && styles.stepperDotActive,
                    future && styles.stepperDotFuture,
                  ]}
                >
                  {done ? (
                    <Text style={styles.stepperCheck}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.stepperNum,
                        active && styles.stepperNumActive,
                        future && styles.stepperNumFuture,
                      ]}
                    >
                      {step}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepperLabel,
                    active && styles.stepperLabelActive,
                    done && styles.stepperLabelDone,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );

  // ─── Visa Facts (collapsible) ──────────────────────────────────
  const renderVisaFacts = () => (
    <View style={styles.factsCard}>
      <Pressable
        id="apply-visa-facts-toggle"
        style={styles.factsHeader}
        onPress={() => setSummaryOpen(!summaryOpen)}
      >
        <Text style={styles.factsTitle}>🛂  e-Business visa at a glance</Text>
        <Text style={styles.factsToggle}>{summaryOpen ? '▲' : '▼'}</Text>
      </Pressable>
      {summaryOpen && (
        <View style={styles.factsBody}>
          {[
            ['Validity', '365 days from grant'],
            ['Entries', 'Multiple'],
            ['Max stay', '180 days per visit'],
            ['Processing', 'Minimum 4 days before arrival'],
          ].map(([k, v]) => (
            <View key={k} style={styles.factsRow}>
              <Text style={styles.factsKey}>{k}</Text>
              <Text style={styles.factsValue}>{v}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  // ─── Step 1: Applicant ─────────────────────────────────────────
  const renderStep1 = () => (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>About you and your trip</Text>
      <Text style={styles.stepSub}>
        Enter your details exactly as they appear on your passport.
      </Text>

      <Field id="apply-given-name" label="Given name" value={givenName} onChangeText={setGivenName} />
      <Field id="apply-surname" label="Surname" value={surname} onChangeText={setSurname} />
      <InlinePicker id="apply-nationality" label="Passport nationality" options={NATIONALITIES} value={nationality} onSelect={setNationality} />
      <Field id="apply-dob" label="Date of birth" placeholder="DD / MM / YYYY" value={dob} onChangeText={setDob} />
      <Field id="apply-passport-number" label="Passport number" value={passportNumber} onChangeText={setPassportNumber} />
      <Field id="apply-passport-expiry" label="Passport expiry" placeholder="DD / MM / YYYY" value={passportExpiry} onChangeText={setPassportExpiry} />
      <Field id="apply-arrival-date" label="Planned arrival" placeholder="DD / MM / YYYY" value={arrivalDate} onChangeText={setArrivalDate} />
      <InlinePicker id="apply-arrival-port" label="Expected arrival port" options={PORTS} value={arrivalPort} onSelect={setArrivalPort} />
      <Field id="apply-email" label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      {/* Passport checks */}
      <View style={styles.checkSection}>
        <Text style={styles.checkSectionTitle}>Passport confirmation</Text>
        <Checkbox
          id="apply-passport-validity"
          label="My passport has at least 6 months validity remaining"
          checked={passportValidity}
          onToggle={() => setPassportValidity(!passportValidity)}
        />
        <Checkbox
          id="apply-passport-blank"
          label="My passport has at least 2 blank pages"
          checked={passportBlank}
          onToggle={() => setPassportBlank(!passportBlank)}
        />
      </View>
    </View>
  );

  // ─── Step 2: Business ──────────────────────────────────────────
  const renderStep2 = () => (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>Your business visit</Text>
      <Text style={styles.stepSub}>
        Tell us about your business activity and the organisation you will visit in India.
      </Text>

      <InlinePicker id="apply-activity" label="Business activity" options={ACTIVITIES} value={activity} onSelect={setActivity} />
      <Field id="apply-employer" label="Employer" value={employer} onChangeText={setEmployer} />
      <Field id="apply-job-title" label="Job title" value={jobTitle} onChangeText={setJobTitle} />
      <Field id="apply-indian-company" label="Indian company" value={indianCompany} onChangeText={setIndianCompany} />
      <Field id="apply-indian-contact" label="Indian contact name" value={indianContact} onChangeText={setIndianContact} />
      <Field id="apply-indian-address" label="Indian address" value={indianAddress} onChangeText={setIndianAddress} multiline />
      <Field id="apply-phone" label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InlinePicker id="apply-expected-stay" label="Expected stay" options={STAY_OPTIONS} value={expectedStay} onSelect={setExpectedStay} />

      <View style={styles.checkSection}>
        <Text style={styles.checkSectionTitle}>Travel confirmation</Text>
        <Checkbox
          id="apply-travel-confirm-1"
          label="I confirm the information above is true and complete"
          checked={travelConfirm1}
          onToggle={() => setTravelConfirm1(!travelConfirm1)}
        />
        <Checkbox
          id="apply-travel-confirm-2"
          label="I understand my visa may be refused if information is inaccurate"
          checked={travelConfirm2}
          onToggle={() => setTravelConfirm2(!travelConfirm2)}
        />
      </View>
    </View>
  );

  // ─── Step 3: Documents ─────────────────────────────────────────
  const renderDocCard = (docKey: string, title: string, icon: string, criteria: string[]) => {
    const ready = uploadStates[docKey] === 'ready';
    return (
      <View key={docKey} style={styles.docCard}>
        <View style={styles.docCardHeader}>
          <Text style={styles.docIcon}>{icon}</Text>
          <View style={styles.docInfo}>
            <Text style={styles.docTitle}>{title}</Text>
            <View style={[styles.docStatusPill, ready ? styles.docReady : styles.docMissing]}>
              <Text style={[styles.docStatusText, ready ? styles.docReadyText : styles.docMissingText]}>
                {ready ? '✓ Ready' : '○ Missing'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.criteriaBadges}>
          {criteria.map((c) => (
            <View key={c} style={styles.criteriaBadge}>
              <Text style={styles.criteriaBadgeText}>{c}</Text>
            </View>
          ))}
        </View>
        <TouchableScale
          id={`apply-upload-${docKey}`}
          style={styles.uploadButtonWrapper}
          containerStyle={ready ? styles.btnGhostSmall : styles.btnClaySmall}
          onPress={() => handleUpload(docKey)}
        >
          <Text style={ready ? styles.btnGhostSmallText : styles.btnClaySmallText}>
            {ready ? 'Replace file' : 'Choose file'}
          </Text>
        </TouchableScale>
      </View>
    );
  };

  const renderStep3 = () => (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>Your documents</Text>
      <Text style={styles.stepSub}>
        Upload clear, unedited copies. We will tell you if anything needs to be re-uploaded.
      </Text>

      {renderDocCard('passport', 'Passport bio page', '📄', ['Readable', 'Complete', 'Current'])}
      {renderDocCard('photo', 'Recent photograph', '📷', ['Front-facing', 'White background', 'Recent'])}
      {renderDocCard('business', 'Business card or invitation', '💼', ['Readable', 'Complete'])}

      <View style={styles.noticeBox}>
        <View style={styles.noticeBoxGlow} />
        <View style={styles.noticeBoxContent}>
          <Text style={styles.noticeTitle}>Official Re-upload System</Text>
          <Text style={styles.noticeText}>
            If a document does not meet requirements, you will be able to re-upload it from your application tracker without restarting your application.
          </Text>
        </View>
      </View>
    </View>
  );

  // ─── Step 4: Payment ───────────────────────────────────────────
  const renderStep4 = () => (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>Review the fee</Text>
      <Text style={styles.stepSub}>
        The application fee is determined by your passport nationality. No emergency or express charge applies.
      </Text>

      <View style={styles.feeBox}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Application fee</Text>
          <Text style={styles.feeValue}>Calculated for {nationality || 'your nationality'}</Text>
        </View>
        <View style={styles.feeDivider} />
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Bank / card charge</Text>
          <Text style={styles.feeValue}>Up to 3%</Text>
        </View>
        <View style={styles.feeDivider} />
        <View style={[styles.feeRow, styles.feeTotalRow]}>
          <Text style={styles.feeTotalLabel}>Total</Text>
          <Text style={styles.feeTotalValue}>Shown at checkout</Text>
        </View>
      </View>

      <View style={styles.advisoryBox}>
        <View style={styles.advisoryBoxGlow} />
        <View style={styles.advisoryBoxContent}>
          <Text style={styles.advisoryTitle}>Fee Policy Notice</Text>
          <Text style={styles.advisoryText}>
            There is no emergency or express government eVisa charge. The application fee is not refunded if the visa is refused.
          </Text>
        </View>
      </View>

      <Checkbox
        id="apply-fee-consent"
        label="I understand the fee structure and consent to proceed to payment"
        checked={feeConsented}
        onToggle={() => setFeeConsented(!feeConsented)}
      />
    </View>
  );

  // ─── Step 5: Review ────────────────────────────────────────────
  const renderReviewRow = (section: string, summary: string, editStep: number) => (
    <View style={styles.reviewRow} key={section}>
      <View style={styles.reviewRowLeft}>
        <Text style={styles.reviewSection}>{section}</Text>
        <Text style={styles.reviewSummary}>{summary}</Text>
      </View>
      <TouchableScale
        id={`apply-edit-${section.toLowerCase()}`}
        style={styles.reviewEditBtnWrapper}
        containerStyle={styles.reviewEditBtn}
        onPress={() => goToStep(editStep)}
      >
        <Text style={styles.reviewEditText}>Edit</Text>
      </TouchableScale>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepCard}>
      {submitted ? (
        // Success state
        <View style={styles.successWrap}>
          <View style={styles.successIconWrap}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Application received</Text>
          <Text style={styles.successSub}>
            Your e-Business visa application has been submitted for review. You will receive updates at {email || 'your email'}.
          </Text>

          <View style={styles.refBox}>
            <Text style={styles.refLabel}>Official Reference</Text>
            <View style={styles.refRow}>
              <Text style={styles.refCode}>{REFERENCE}</Text>
              <TouchableScale
                id="apply-copy-ref"
                style={styles.refCopyWrapper}
                containerStyle={styles.refCopyButton}
                onPress={handleCopyRef}
              >
                <Text style={styles.refCopy}>{copied ? 'Copied ✓' : 'Copy Code'}</Text>
              </TouchableScale>
            </View>
          </View>

          <TouchableScale
            id="apply-track-link"
            style={styles.fullButtonWrapper}
            containerStyle={styles.btnClay}
            onPress={() => router.replace('/(tabs)/track')}
          >
            <Text style={styles.btnClayText}>Track application →</Text>
          </TouchableScale>

          <TouchableScale
            id="apply-close-success"
            style={styles.fullButtonWrapper}
            containerStyle={[styles.btnGhost, { marginTop: Spacing.md }]}
            onPress={() => router.back()}
          >
            <Text style={styles.btnGhostText}>Return home</Text>
          </TouchableScale>
        </View>
      ) : (
        // Review state
        <>
          <Text style={styles.stepTitle}>Check everything once</Text>
          <Text style={styles.stepSub}>
            Review your application before submitting. You can edit any section by tapping Edit.
          </Text>

          {renderReviewRow(
            'Applicant',
            `${givenName || '—'} ${surname || '—'} · ${nationality || '—'}\n${passportNumber || '—'} · ${email || '—'}`,
            1
          )}
          {renderReviewRow(
            'Trip',
            `Arriving ${arrivalDate || '—'} at ${arrivalPort || '—'}\nStay: ${expectedStay || '—'}`,
            1
          )}
          {renderReviewRow(
            'Business',
            `${activity || '—'}\n${indianCompany || '—'} · ${indianContact || '—'}`,
            2
          )}
          {renderReviewRow(
            'Documents',
            `Passport: ${uploadStates.passport === 'ready' ? '✓' : '○'}  Photo: ${uploadStates.photo === 'ready' ? '✓' : '○'}  Business: ${uploadStates.business === 'ready' ? '✓' : '○'}`,
            3
          )}
          {renderReviewRow(
            'Payment',
            `Fee for ${nationality || 'your nationality'} + up to 3% card charge\nConsent: ${feeConsented ? '✓ Given' : '○ Pending'}`,
            4
          )}
        </>
      )}
    </View>
  );

  // ─── Sticky Bottom Action Bar Renderer ─────────────────────────────
  const renderStickyActions = () => {
    if (submitted) return null; // Success view has its own CTA buttons

    return (
      <View style={[styles.stickyFooter, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.stickyFooterInner}>
          {currentStep === 1 ? (
            // Step 1 only has Continue
            <View style={styles.footerRowSingle}>
              <View style={styles.savedIndicator}>
                <Text style={styles.savedDot}>●</Text>
                <Text style={styles.savedText}>Saved locally</Text>
              </View>
              <TouchableScale
                id="apply-step1-continue"
                style={styles.stickyBtnWrapper}
                containerStyle={styles.btnClay}
                onPress={() => goToStep(2)}
              >
                <Text style={styles.btnClayText}>Continue →</Text>
              </TouchableScale>
            </View>
          ) : (
            // Steps 2, 3, 4, 5 have Back + Continue/Submit
            <View style={styles.footerRowSplit}>
              <TouchableScale
                id={`apply-step${currentStep}-back`}
                style={styles.backBtnWrapper}
                containerStyle={styles.btnGhost}
                onPress={() => goToStep(currentStep - 1)}
              >
                <Text style={styles.btnGhostText}>← Back</Text>
              </TouchableScale>

              {currentStep === 3 && (
                <TouchableScale
                  id="apply-step3-continue"
                  style={styles.nextBtnWrapper}
                  containerStyle={styles.btnClay}
                  disabled={!allDocsReady}
                  onPress={() => goToStep(4)}
                >
                  <Text style={styles.btnClayText}>Continue →</Text>
                </TouchableScale>
              )}

              {currentStep === 4 && (
                <TouchableScale
                  id="apply-step4-continue"
                  style={styles.nextBtnWrapper}
                  containerStyle={styles.btnClay}
                  disabled={!feeConsented}
                  onPress={() => goToStep(5)}
                >
                  <Text style={styles.btnClayText}>Continue →</Text>
                </TouchableScale>
              )}

              {currentStep === 5 && (
                <TouchableScale
                  id="apply-submit"
                  style={styles.nextBtnWrapper}
                  containerStyle={styles.btnForest}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnForestText}>Submit application</Text>
                </TouchableScale>
              )}

              {currentStep === 2 && (
                <TouchableScale
                  id="apply-step2-continue"
                  style={styles.nextBtnWrapper}
                  containerStyle={styles.btnClay}
                  onPress={() => goToStep(3)}
                >
                  <Text style={styles.btnClayText}>Continue →</Text>
                </TouchableScale>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {/* App Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerBrand}>eVisa India</Text>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLock}>🔒</Text>
          <Text style={styles.headerLabel}>Official Secure Application</Text>
        </View>
        <Pressable
          id="apply-close"
          style={styles.headerClose}
          onPress={() => router.back()}
        >
          <Text style={styles.headerCloseText}>✕</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: submitted ? insets.bottom + 60 : 120 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress Stepper */}
        {!submitted && renderStepper()}

        {/* Visa facts */}
        {!submitted && renderVisaFacts()}

        {/* Step content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </ScrollView>

      {/* Sticky Bottom Actions Bar */}
      {renderStickyActions()}
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
    height: 80,
    backgroundColor: Colors.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 183, 114, 0.2)',
  },
  headerBrand: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    fontFamily: serif,
    width: 80,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerLock: {
    fontSize: 12,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerClose: {
    width: 48,
    alignItems: 'flex-end',
  },
  headerCloseText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
  },

  // Stepper
  stepperWrap: {
    marginBottom: Spacing.md,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepperItem: {
    alignItems: 'center',
    width: 52,
  },
  stepperDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepperDotDone: {
    backgroundColor: Colors.forest,
  },
  stepperDotActive: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.clay,
    ...Shadows.card,
  },
  stepperDotFuture: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.sandDark,
  },
  stepperCheck: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  stepperNum: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.ink,
  },
  stepperNumActive: {
    color: Colors.clay,
  },
  stepperNumFuture: {
    color: Colors.sandDark,
  },
  stepperLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.muted,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  stepperLabelActive: {
    color: Colors.clay,
    fontWeight: '700',
  },
  stepperLabelDone: {
    color: Colors.forest,
  },
  stepperLine: {
    height: 1.5,
    flex: 1,
    backgroundColor: Colors.sandDark,
    marginTop: 13,
    marginHorizontal: -2,
  },
  stepperLineDone: {
    backgroundColor: Colors.forest,
  },

  // Visa facts (look less floating, sit flat inside view)
  factsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
  },
  factsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },
  factsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: serif,
  },
  factsToggle: {
    fontSize: 10,
    color: Colors.muted,
  },
  factsBody: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    backgroundColor: '#FAF9F5',
  },
  factsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  factsKey: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '500',
  },
  factsValue: {
    fontSize: 11,
    color: Colors.ink,
    fontWeight: '600',
  },

  // Step card (sits nicely edge to edge with screen borders)
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadows.card,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: serif,
    marginBottom: 4,
  },
  stepSub: {
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },

  // Check section
  checkSection: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  checkSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },

  // Buttons in sticky footer
  stickyBtnWrapper: {
    flex: 1,
  },
  btnClay: {
    backgroundColor: Colors.clay,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
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
  backBtnWrapper: {
    width: '30%',
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
  nextBtnWrapper: {
    flex: 1,
  },
  btnForest: {
    backgroundColor: Colors.forest,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.forest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  btnForestText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Document upload items
  docCard: {
    backgroundColor: Colors.paper,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  docCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  docIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  docInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  docTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
    flexShrink: 1,
  },
  docStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  docReady: {
    backgroundColor: Colors.successBg,
  },
  docMissing: {
    backgroundColor: Colors.sand,
  },
  docStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  docReadyText: {
    color: Colors.successText,
  },
  docMissingText: {
    color: Colors.muted,
  },
  criteriaBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.md,
  },
  criteriaBadge: {
    backgroundColor: Colors.sand,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  criteriaBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.muted,
    letterSpacing: 0.3,
  },
  uploadButtonWrapper: {
    alignSelf: 'flex-start',
  },
  btnClaySmall: {
    backgroundColor: Colors.clay,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  btnClaySmallText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  btnGhostSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  btnGhostSmallText: {
    color: Colors.ink,
    fontSize: 11,
    fontWeight: '600',
  },

  // Notice box (glow stripe style)
  noticeBox: {
    backgroundColor: Colors.noticeBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.noticeBorder,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 64,
  },
  noticeBoxGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.noticeBorder,
  },
  noticeBoxContent: {
    padding: Spacing.md,
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.noticeText,
    marginBottom: 2,
  },
  noticeText: {
    fontSize: 11,
    color: Colors.noticeText,
    lineHeight: 16,
    opacity: 0.9,
  },

  // Fee box
  feeBox: {
    backgroundColor: Colors.paper,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    marginBottom: Spacing.lg,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  feeLabel: {
    fontSize: 12,
    color: Colors.muted,
  },
  feeValue: {
    fontSize: 12,
    color: Colors.ink,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: '55%',
  },
  feeDivider: {
    height: 1,
    backgroundColor: Colors.line,
  },
  feeTotalRow: {
    paddingTop: 12,
  },
  feeTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.ink,
  },
  feeTotalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.clay,
  },

  // Advisory (glow stripe style)
  advisoryBox: {
    backgroundColor: Colors.advisoryBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#dfd2b9', // subtle brown border
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  advisoryBoxGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.gold,
  },
  advisoryBoxContent: {
    padding: Spacing.md,
  },
  advisoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.advisoryText,
    marginBottom: 2,
  },
  advisoryText: {
    fontSize: 11,
    color: Colors.advisoryText,
    lineHeight: 16,
  },

  // Review rows
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    gap: Spacing.sm,
  },
  reviewRowLeft: {
    flex: 1,
  },
  reviewSection: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  reviewSummary: {
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 18,
  },
  reviewEditBtnWrapper: {
    justifyContent: 'center',
  },
  reviewEditBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.white,
  },
  reviewEditText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.clay,
  },

  // Success state styling
  successWrap: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  successIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  successIcon: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.successText,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: serif,
    marginBottom: Spacing.sm,
  },
  successSub: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  refBox: {
    backgroundColor: Colors.paper,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.line,
    marginBottom: Spacing.xl,
  },
  refLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refCode: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.ink,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  refCopyWrapper: {
    justifyContent: 'center',
  },
  refCopyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    backgroundColor: Colors.white,
  },
  refCopy: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.clay,
  },
  fullButtonWrapper: {
    width: '100%',
  },

  // Sticky Bottom Footer Bar
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  stickyFooterInner: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 12,
  },
  footerRowSingle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerRowSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  savedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  savedDot: {
    fontSize: 8,
    color: Colors.sage,
  },
  savedText: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '500',
  },
});

const formStyles = StyleSheet.create({
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.muted,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: Colors.paper,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.ink,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerValue: {
    fontSize: 14,
    color: Colors.ink,
  },
  pickerPlaceholder: {
    fontSize: 14,
    color: Colors.sandDark,
  },
  pickerCaret: {
    fontSize: 10,
    color: Colors.muted,
  },
  pickerDropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: Radius.sm,
    marginTop: 4,
    overflow: 'hidden',
    ...Shadows.card,
  },
  pickerOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  pickerOptionActive: {
    backgroundColor: Colors.forestLight,
  },
  pickerOptionText: {
    fontSize: 14,
    color: Colors.ink,
  },
  pickerOptionTextActive: {
    color: Colors.forest,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    gap: 10,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.paper,
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: Colors.forest,
    borderColor: Colors.forest,
  },
  checkboxMark: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 19,
  },
});

// Forge eVisa — Design System Tokens
// Ported from the website's globals.css :root variables

export const Colors = {
  ink: '#151713',
  muted: '#676b63',
  paper: '#fbfaf5',
  white: '#fffefa',
  sand: '#eee9dc',
  line: '#dedbcf',
  clay: '#c75f3d',
  clayDark: '#97442d',
  forest: '#173f35',
  forest2: '#235547',
  sage: '#8ca280',
  gold: '#d59c48',
  sky: '#dce9ee',
  appBg: '#f2f0e8',
  // Derived
  clayLight: '#fff5ef',
  forestLight: '#eaf1ed',
  goldLight: '#fff7e9',
  sandDark: '#d4d1c6',
  successBg: '#e7eee5',
  successText: '#54704f',
  advisoryBg: '#fff5e6',
  advisoryText: '#7e5722',
  noticeBorder: '#d59c48',
  noticeBg: '#fff6e8',
  noticeText: '#795c32',
};

export const Fonts = {
  body: undefined, // System default (Inter-like on most devices)
  serif: 'serif',  // Georgia-like for display headings
  mono: 'monospace',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 40,
  screenPadding: 20,
};

export const Radius = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
  pill: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#171f1a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#171f1a',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.12,
    shadowRadius: 70,
    elevation: 8,
  },
};

export default Colors;

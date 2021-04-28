const tokens = require('style-dictionary-dark-mode/web/dist/tokens.json');

// Hard-coding which tokens to show in the doc site
// just so that the line up (appear in the same order) and are grouped nicely
const colors = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'warning',
  'success',
  'info',
  'interactive',
  'hover',
  'active',
  'disabled'
];

module.exports = {
  background: colors.map(s => `color-background-${s}`),
  border: colors.map(s => `color-border-${s}`),
  font: colors.map(s => `color-font-${s}`),
  brandPrimary: Object.keys(tokens)
    .filter(key => key.startsWith('color-brand-primary')),
  brandSecondary: Object.keys(tokens)
    .filter(key => key.startsWith('color-brand-secondary'))
}
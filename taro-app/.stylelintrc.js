module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard',
    '@justwe7/stylelint-order-standard'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-empty-source': null,
    'selector-type-no-unknown': null,
    'scss/no-duplicate-mixins': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'media-feature-name-no-unknown': null,
  }
}

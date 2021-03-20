const plugin = require('tailwindcss/plugin')

module.exports = {
  // prefix: 't
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.3xl'), fontWeight: config('theme.fontWeight.bold'), lineHeight: config('theme.lineHeight.leading-none') },
        'h2': { fontSize: config('theme.fontSize.2xl'), fontWeight: config('theme.fontWeight.bold')  },
        'h3': { fontSize: config('theme.fontSize.xl'), fontWeight: config('theme.fontWeight.bold') }
      })
    }),
    require('@tailwindcss/custom-forms')
  
  ],
  
  theme: {
    borderRadius: {
        'none': '0',
        'default': '4px',
        'large': '12px',
        'full': '99999px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    colors: {
      transparent: 'var(--color-transparent)',
      current: 'var(--color-current)',

      black: 'var(--color-black)',
      darker: 'var(--color-darker)',
      white: 'var(--color-white)',
     
      primary: 'var(--color-primary)',
      'primary-light': '#d0e4f4',
      'primary-darker': '#0a3e69',
      secondary: '#262f36',
      'secondary-light': '#d4d5d7',
      'secondary-darker': '#14181c',
      success: '#17b15c',
      'success-light': '#d1efde',
      'success-darker': '#0c5c30',
      warning: '#FFB905',
      'warning-light': '#fcf4db',
      'warning-darker': '#7d6928',
      danger: '#bb3434',
      'danger-light': '#f1d6d6',
      'danger-darker': '#611b1b',
      info: '#13c0c9',
      'info-light': '#d0f2f4',
      'info-darker': '#0a6469',
      muted: '#ccc',
      gray: {
        darker: "#262626",
        dark: "#888888",
        light: "#f9f9f9",
      }
      // ...
    },
    customForms: theme => ({
      default: {
        label: {
          fontSize: 'bold'
        },
        input: {
        '&:focus': {
          boxShadow: undefined,
          borderRadius:  theme('borderRadius.default'),
          borderColor: theme('colors.primary'),
        }
        },
        select: {
          borderRadius:  theme('borderRadius.default'),
          boxShadow: undefined,
          '&:focus': {
            borderColor: theme('colors.primary'),
            boxShadow: undefined
          },
          iconColor: theme('colors.primary'),
        },
        radio: {
          '&:checked': {
            backgroundColor: theme('colors.primary'),
          }
        },
        checkbox: {
          width: theme('spacing.6'),
          height: theme('spacing.6'),
          '&:checked': {
            backgroundColor: theme('colors.primary'),
          }
        },
      },
    })
  },
  variants: {},
}



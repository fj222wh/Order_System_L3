/**
 * The CSP configuration
 */
import helmet from 'helmet'

export const helmetCSP = helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'script-src': [
      "'self'"
    ],
    'style-src': [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'connect-src': [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]
  }
})

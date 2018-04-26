import defaultImageLogo from '../images/default-logo.png'
import defaultQrImage from '../images/default-qrcode.png'
export const DEFAULT_IMAGE_LOGO = defaultImageLogo
export const DEFAULT_QR_IMAGE = defaultQrImage
export const DOMAIN = 'http://localhost:5000/business-portal'
// export const DOMAIN = 'https://kyoala-api-test-44bd3.firebaseapp.com/business-portal'
export const SUBSCRIPTION_PLAN = [
  {
    value: 1,
    label: 'Beta Plan'
  },
  {
    value: 2,
    label: 'Alpla Plan'
  },
  {
    value: 3,
    label: 'Omega Plan'
  }
]
export const SUBSCRIPTION_PLAN_LABEL = [
  '',
  'Beta Plan',
  'Alpha Plan',
  'Omega Plan'
]
export const DEFAULT_OPERATION_HOURS = [
  {
    subLabel: 'MON',
    label: 'Monday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'TUE',
    label: 'Tuesday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'Wed',
    label: 'Wednesday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'THU',
    label: 'Thursday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'FRI',
    label: 'Friday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'SAT',
    label: 'Saturday',
    startValue: null,
    endValue: null,
    enabled: false
  },
  {
    subLabel: 'SUN',
    label: 'Sunday',
    startValue: null,
    endValue: null,
    enabled: false
  },
]
export const OPERATION_TIME_VALUE = {
  'MON': 1,
  'TUE': 2,
  'WED': 3,
  'THU': 4,
  'FRI': 5,
  'SAT': 6,
  'SUN': 0,
}
import { UserRole } from '../utils/auth.roles'

export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const adminRoot = '/app'
export const searchPath = `${adminRoot}/#`
export const buyUrl = 'https://1.envato.market/nEyZa'
export const apiUrl = 'https://api.coloredstrategies.com'

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'en'
export const defaultDirection = 'ltr'
export const localeOptions = [
  { id: 'en', name: 'English LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English RTL', direction: 'rtl' }
]

export const firebaseConfig = {
  apiKey: 'AIzaSyDPWDGgnUCR68fwItdv5oPpZdh4Hbn4Xio',
  authDomain: 'learby-ac951.firebaseapp.com',
  databaseURL: 'https://learby-ac951.firebaseio.com',
  projectId: 'learby-ac951',
  storageBucket: 'learby-ac951.appspot.com',
  messagingSenderId: '250821348575',
  appId: '1:250821348575:web:5a1b288de5ffe211582d6a',
  measurementId: 'G-T8N4PKG8QN'
}

export const currentUser = {}

export const isAuthGuardActive = false
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.blueolympic'
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel'
]

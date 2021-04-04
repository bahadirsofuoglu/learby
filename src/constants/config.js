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
  apiKey: 'AIzaSyAqj5wPg5NsNCAfOZOHZE4gK3DXwW6K1K8',
  authDomain: 'learby-test.firebaseapp.com',
  projectId: 'learby-test',
  storageBucket: 'learby-test.appspot.com',
  messagingSenderId: '889234911241',
  appId: '1:889234911241:web:db4a7d0c5c5d5c164b88d8'
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

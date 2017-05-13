import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Helsinki')

export default {
  MAX_DAYS: 180,
  MAPS_API_KEY: 'AIzaSyD_Gn3F65LLayx2q80A2xgdoxZYLZ8fBqk',
  API_URL: process.env.API_URL || 'https://elamysteeri-admin.herokuapp.com/api',
  // API_URL: process.env.API_URL || 'http://localhost:9000/api',
  DATA_URL: 'https://elamysteeri.prismic.io/api'
}

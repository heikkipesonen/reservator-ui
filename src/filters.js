import Vue from 'vue'
import translations from './translations'
import moment from 'moment'
const lang = 'en-gb'

Vue.filter('translate', function (value) {
  return value ? translations[lang][value.toLowerCase()] || value : ''
})

Vue.filter('localizedMonth', function (value) {
  return value ? translations[lang].months[value] || value : ''
})

Vue.filter('localizedWeekday', function (value) {
  return value ? translations[lang].days[value] || value : ''
})

Vue.filter('localizedDate', function (value) {
  if (!translations[lang].date) {
    console.error('missing .date translation for ', lang)
  }
  let date = translations[lang].date ? moment(value) : ''

  if (date.isValid && date.isValid()) {
    return date.format(translations[lang].date)
  }

  return ''
})

Vue.filter('localizedTime', function (value) {
  let date = moment(value)
  if (date.isValid && date.isValid()) {
    return date.format('HH:mm')
  }

  return ''
})

import axios from 'axios'
import moment from 'moment'
import config from './config'

const apiUrl = config.API_URL

const clientApi = {
  getReservations (start) {
    let startDay = moment(start).startOf('month')
    let endDay = moment(start).endOf('month')

    return axios.get(`${apiUrl}/reserved/${startDay.toISOString()}/${endDay.toISOString()}`).then((response) => response.data)
  },

  getSlots (room, day) {
    let date = moment(day).startOf('day')
    return axios.get(`${apiUrl}/slots/${date.toISOString()}`).then((response) => response.data)
  },

  creaetReservation (room, slot, data) {
    return axios.post(`${apiUrl}/reserve/${room}/${moment(slot.start).toISOString()}/${moment(slot.end).toISOString()}`, data).then((response) => response.data)
  }
}

export default clientApi

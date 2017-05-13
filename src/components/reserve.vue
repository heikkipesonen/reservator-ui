<template lang="html">
  <div class="reserve-wrapper">
    <h1>{{'time_reservation' | translate}}</h1>

    <div class="section-1 input-section">
      <h2>{{'select_date' | translate}}</h2>

      <div class="month-wrapper">
        <h3>{{date.month() | localizedMonth}} {{date.year()}}</h3>
        <div class="month-calendar">
          <div class="control-wrapper">
            <div class="control" @click="prevMonth()">&laquo;</div>
          </div>
          <month v-model="date" :month="date.month()"></month>
          <div class="control-wrapper">
            <div class="control" @click="nextMonth()">&raquo;</div>
          </div>
        </div>
      </div>
    </div>


    <div class="section-2 input-section">
      <h2>{{ 'select_room' | translate }}</h2>
      <div class="rooms">
        <div class="room" v-for="room in rooms">
          <h3>{{room}}</h3>
          <day class="slot" v-model="slots" :room="room" @select="selectSlot"></day>
        </div>
      </div>
    </div>

    <div class="section-3 input-section">
      <h2>{{'enter_contact_info' | translate}}</h2>
      <contact-form></contact-form>
    </div>

    <div class="section-4 input-section">
      <h2>{{'confirm_reservation' | translate}}</h2>

      <div class="summary" v-if="selected">
        <h3><span>{{'selected_room' | translate}}</span>{{ selected.room }}</h3>
        <h3><span>{{'selected_date' | translate}}</span>{{ selected.start | localizedDate }}</h3>
        <h3><span>{{'selected_time' | translate}}</span>{{ selected.start | localizedTime }}&nbsp;-&nbsp;{{ selected.end | localizedTime }}</h3>
        <div class="p-2"></div>
        <button>
          {{'confirm_reservation' | translate}}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../api'
import moment from 'moment'

import month from './month'
import day from './day'
import contactForm from './contact-form'

export default {
  components: {
    month,
    day,
    contactForm
  },

  props: {

  },

  data () {
    return {
      selected: null,
      slots: {},
      date: moment(),
      reservation: {
        lang: 'fi',
        desc: '',
        name: '',
        email: '',
        city: '',
        street: '',
        postal: '',
        tel: ''
      }
    }
  },

  computed: {
    rooms () {
      return Object.keys(this.slots)
    }
  },

  methods: {
    nextMonth () {
      this.date = moment(this.date.add(1, 'month'))
    },

    prevMonth () {
      this.date = moment(this.date.subtract(1, 'month'))
    },

    nextYear () {
      this.date = moment(this.date.add(1, 'year'))
    },

    prevYear () {
      this.date = moment(this.date.subtract(1, 'year'))
    },

    selectSlot (data) {
      this.selected = data

      Object.keys(this.slots).forEach((key) => {
        let room = this.slots[key]
        room.forEach((time) => {
          time.selected = false
        })
      })

      data.slot.selected = true

      setTimeout(() => {
        window.parent.postMessage(
          document.body.scrollHeight
        , 'http://localhost:3000')
      }, 1)
    },

    makeReserve () {
      if (this.selected) {
        api.creaetReservation(this.selected.room, this.selected.slot, this.reservation).then((response) => {
          this.selected = false
          this.reservation = {
            lang: 'fi',
            desc: '',
            name: '',
            email: '',
            city: '',
            street: '',
            postal: '',
            tel: ''
          }

          this.openModal('success')
          return this.updateSlots()
        })
      }
    },

    updateSlots () {
      return api.getSlots(this.room, this.date.toISOString()).then((response) => {
        this.slots = response
        if (window.parent) {
          setTimeout(() => {
            window.parent.postMessage(
              document.body.scrollHeight
            , 'http://localhost:3000')
          }, 1)
          setTimeout(() => {
            window.parent.postMessage(
              document.body.scrollHeight
            , 'http://localhost:3000')
          }, 500)
        }
      })
    }
  },

  watch: {
    date () {
      this.updateSlots()
    }
  },

  created () {
    this.updateSlots()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.reserve-wrapper {
  counter-reset: inputSection;
}

h1 {
  font-size: 30pt;
  text-align: center;
  margin: 1em;
  text-transform: uppercase;
}

h2 {
  font-size: 20pt;
  margin: 1em 0;
  text-align: center;
}

h3 {
  font-size: 16pt;
  margin: 1em;
}

.p-2 {
  padding: 1em;
}

.month-wrapper {
  text-align: center;

  h3 {
    color: $brand-primary;
  }

  .month-calendar {
    display: flex;
    justify-content: center;
  }

  .control-wrapper {
    display: flex;
    align-items: center;
    padding: 1em;
  }

  .control {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    transition: 0.3s ease-out;
    font-size: 20pt;

    border: 2px solid darken($brand-primary, 20);
    line-height: 60px;

    &:hover {
      color: white;
      cursor: pointer;
      background-color: fade_out($brand-primary, 0.2);
      background-color: $brand-primary;
      box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
    }
  }
}

button {
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1em;
  padding: 1em;
  border: 1px solid;
  display: inline-block;
}

.summary {
  text-align: center;
  padding: 2em;
  background-color: fade_out($brand-primary, 0.7);

  button {
    color: darken($brand-primary, 20);
  }

  h3 {
    position: relative;
    width: 50%;
    margin: auto;
    display: inline-block;
    padding-top: 0.5em;
    padding-bottom: 1em;
  }

  span {
    font-size: 0.6em;
    padding-right: 8px;
    opacity: 0.8;
  }
}

.input-section {
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
  padding-top: 80px;
  width: 80%;
  padding-left: 5em;
  padding-right: 5em;
  position: relative;
  counter-increment: inputSection;

  &:before {
    content: "";
    position: absolute;
    top: 32px;
    left: 0; right: 0;
    background-color: $brand-primary;
    height: 1px;
  }

  &:after {
    content: counter(inputSection);
    position: absolute;
    left: 50%;
    top: 0;
    background-color: $brand-primary;
    font-size: 20pt;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
    border: 2px solid darken($brand-primary, 20);
    line-height: 64px;
    color: white;
    margin:0; padding: 0;
    margin-left: -32px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    text-align: center;
  }

  h2 {

  }
}

.rooms {
  display: flex;
  flex-direction: row;

  .room {
    flex: 1;
    text-align: center;

    h3 {
      color: darken($brand-primary, 20);
      text-transform: capitalize;
      padding-bottom: 0.5em;
      border-bottom: 1px solid $brand-primary;
    }

    &:nth-child(even) {
      background-color: fade_out($brand-primary, 0.5);
    }
  }
}

</style>

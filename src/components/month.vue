<template>
<table class="month">
  <tbody>
    <tr class="days">
      <td v-for="day in weekDays">{{day}}</td>
    </tr>
    <tr class="week" v-for="week in calendar">
      <td
        class="day"
        v-for="day in week"
        :class="{
          'active': date === (day ? day.model.valueOf() : false),
          'disabled': !day.enabled,
          'enabled': day.enabled,
          'today': day ? day.model.valueOf() === today : false
          }"
        v-on:click="setDate(day)">

        <div class="day-content">
          {{day ? day.model.date() : ' '}}
        </div>
      </td>
    </tr>
  </tbody>
</table>
</template>
<script>

const dates = {
  months: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ],
  days: [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
  ]
}

import moment from 'moment'

export default {
  props: {
    value: {
      type: Object,
      default: () => moment()
    },

    month: {
      type: Number,
      default: 0
    },

    min: {
      type: Object
    },

    max: {
      type: Object
    }
  },

  computed: {
    weekDays () {
      return dates.days
    },

    date () {
      return moment(this.value).startOf('day').valueOf()
    },

    today () {
      return moment().startOf('day').valueOf()
    },

    calendar () {
      let model = moment(this.value).month(this.month).startOf('month')
      let month = []
      let week = Array(7).fill(false)

      // shift days so that week starts from monday
      let dayMap = [1, 2, 3, 4, 5, 6, 0]

      while (model.month() === this.month) {
        let day = model.day()
        let dayModel = moment(model)
        let afterMin = this.min ? dayModel.isSameOrAfter(moment(this.min)) : true
        let beforeMax = this.max ? dayModel.isSameOrBefore(moment(this.max)) : true
        let enabled = afterMin && beforeMax

        week[dayMap.indexOf(day)] = {
          model: dayModel,
          enabled
        }

        if (dayMap.indexOf(day) === 6) {
          month.push(week)
          week = Array(7).fill(false)
        }

        model.add(1, 'day')
      }

      if (month.indexOf(week) === -1 && week.some((item) => item)) {
        month.push(week)
      }

      return month
    }
  },

  methods: {
    setDate (item) {
      if (item && item.enabled) {
        this.$emit('input', item.model)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
td {
  text-align: center;
}

.day {
  position: relative;
  width: 42px;
  height: 42px;

  &.enabled:hover .day-content {
    cursor: pointer;
    background-color: fade_out($brand-primary, 0.6);
  }

  .day-content {
    line-height: 38px;
    width: 42px;
    height: 42px;
    border-radius: 50%;

    border: 2px solid;
    border-color: transparent;
    transition: 0.2s ease-out;
    transition-property: border-color, background-color;
  }

  &.today .day-content {
    border: 2px solid;
    border-color: $brand-secondary;
  }

  &.active .day-content {
    border: 2px solid;
    background-color: fade_out($brand-primary, 0.5);
    border-color: $brand-primary;
  }

  &.disabled .day-content {
    opacity: 0.3;
  }
}
</style>

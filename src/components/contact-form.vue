<template lang="html">
  <div class="row">
    <div class="col-sm-12">
      <radio-input v-model="value.lang" :options="languages" label="Language"></radio-input>
    </div>
    <div class="col-sm-12">
      <radio-input v-model="value.persons" :options="persons" label="Persons"></radio-input>
    </div>
    <div class="col-sm-12">
      <input-container :disabled="!enabled" required="true" label="name" v-model="value.name"></input-container>
      <input-container :disabled="!enabled" required="true" label="email" v-model="value.email"></input-container>
    </div>

    <div class="col-sm-12">
      <input-container :disabled="!enabled" required="true" label="street" v-model="value.street"></input-container>
    </div>

    <div class="col-sm-12 col-md-6">
      <input-container :disabled="!enabled" required="true" label="city" v-model="value.city"></input-container>
    </div>
    <div class="col-sm-12 col-md-6">
      <input-container :disabled="!enabled" required="true" label="postal" v-model="value.postal"></input-container>
    </div>

    <div class="col-sm-12">
      <input-container :disabled="!enabled" required="true" label="tel" v-model="value.tel"></input-container>
    </div>

    <div class="col-sm-12">
      <input-container :disabled="!enabled" label="description" v-model="value.desc"></input-container>
    </div>
  </div>
</template>

<script>
import inputContainer from './input-container'
import radioInput from './radio-input'

export default {
  components: {
    inputContainer,
    radioInput
  },

  props: {
    enabled: {
      type: Boolean,
      default: true
    },

    value: {
      type: Object,
      default () {
        return {
          persons: '',
          lang: 'fi',
          desc: '',
          name: '',
          email: '',
          street: '',
          city: '',
          address: '',
          postal: '',
          tel: ''
        }
      }
    }
  },

  data () {
    return {
      languages: [
        {
          label: 'Suomi',
          value: 'fi'
        },
        {
          label: 'English',
          value: 'en'
        }
      ],
      persons: [
        {
          label: '1-2',
          value: '1'
        },
        {
          label: '3-4',
          value: '2'
        },
        {
          label: '5-6',
          value: '3'
        }
      ]
    }
  },

  computed: {
    model () {
      return Object.assign({}, this.value)
    }
  }
}
</script>

<style lang="css">
</style>

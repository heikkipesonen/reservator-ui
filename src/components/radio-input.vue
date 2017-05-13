<template lang="html">
  <div class="input-container">
    <label>{{ label | translate }}</label>
    <div class="input-content">
      <div class="input-wrapper" v-for="(item, index) in options">
        <label class="input-label">
          <input type="radio" :value="item.value" v-model="input">
          <div class="input-tick"></div>
          <span class="input-label-text">{{item.label | translate}}</span>
        </label>
      </div>
    </div>
    <div class="error-label" v-show="touched">
      {{ error | translate }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    options: {
      type: Array
    },
    required: {
      type: [String, Boolean, Function]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      touched: false,
      input: this.value || ''
    }
  },

  computed: {
    hasValue () {
      return this.input !== undefined && this.input !== null && this.input !== ''
    },

    error () {
      if (this.required && !this.hasValue) {
        return 'input_required'
      }
    }
  },

  methods: {
    blur () {
      this.touched = true
    }
  },

  watch: {
    input () {
      this.$emit('input', this.input)
    },

    value () {
      this.input = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.input-container {
  position: relative;
  padding-bottom: 16px;

  .input-wrapper, label {
    display: inline-block;
    height: 32px;
    line-height: 30px;
  }

  .input-wrapper {
    &:not(:first-child) {
      margin-left: 1em;
    }

    &:not(:last-child) {
      margin-right: 1em;
    }
  }

  input[type="radio"] {
    margin-right: 8px;
    position: absolute;
    visibility: hidden;
  }

  .input-label {
    position: relative;
    padding-left: 36px;

    &:before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border: 2px solid $brand-primary;
      border-radius: 50%;
    }
  }

  input:checked + .input-tick {
    position: absolute;
    content: "";
    left: 14px;
    top: 14px;
    width: 14px;
    height: 14px;
    margin-left: -7px;
    margin-top: -7px;
    background-color: $brand-primary;
    border-radius: 50%;
  }

  input:checked + .input-tick + .input-label-text {
    color: $brand-primary;
  }
}
</style>

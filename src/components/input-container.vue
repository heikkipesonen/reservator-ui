<template lang="html">
  <div class="input-container" :class="{'has-value': hasValue}">
    <div class="input-wrapper">
      <input type="text" v-model="input" @blur="blur" :disabled="disabled">
      <label for="" class="input-label">
        {{label | translate}}
      </label>
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
    required: {
      type: [String, Boolean, Function]
    },
    validators: {
      type: Array
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
  },

  created () {
    this.$on('input-pristine', () => {
      this.touched = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.input-container {
  position: relative;

  .input-wrapper {
    position: relative;
    padding: 16px 0 32px 0;
  }

  input {
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 8px 0;
    transition: 0.15s ease-out;
    border-bottom: 1px solid;
    border-color: fade_out($brand-dark, 0.5);
    color: $brand-dark;
    font-size: 1em;
  }

  input:focus {
    border-color: $brand-dark;
  }

  .input-label {
    pointer-events: none;
    position: absolute;
    top: 50%;
    margin-top: -1em;
    left: 0;
    font-size: 1em;
    transition: 0.2s ease-out;
    text-transform: capitalize;
  }

  &.has-value .input-label, input:focus + .input-label {
    top: 1em;
    font-size: 0.8em;
    color: fade_out($brand-dark, 0.6);
  }

  .error-label {
    position: absolute;
    bottom: 8px;
    font-size: 8pt;
    color: $brand-error;
  }

  input[disabled="disabled"] {
    border-color: #999;
  }

  input[disabled="disabled"] + label {
    color: #999;
  }
}
</style>

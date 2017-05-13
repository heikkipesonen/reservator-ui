<template>
<div>
  <div class="day-slot"
    v-for="slot in value[room]"
    v-on:click="selectSlot(slot)"
    :class="{enabled: !slot.reserved && !slot.disabled && !disabled, disabled: slot.disabled, selected: slot.selected}">
    <div v-if="slot.start && slot.end">
      <span class="start">{{slot.start | localizedTime}}</span>
      -
      <span class="end">{{slot.end | localizedTime}}</span>
      <span class="status">
        {{slot.reserved ? 'time_slot_reserved' : slot.selected ? 'time_slot_selected' : '' | translate }}
      </span>
    </div>
    <div v-else>
      &nbsp;
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    room: {
      type: String,
      required: true
    },

    value: {
      type: Object,
      required: true
    },

    label: {
      type: Object
    },

    disabled: {
      type: Boolean
    }
  },

  methods: {
    selectSlot (slot) {
      if (!this.disabled && !slot.reserved) {
        this.$emit('select', {
          room: this.room,
          slot
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/variables';

.day {
  display: flex;
  flex-direction: column;
}

.day-slot {
  padding: 8px;
  &:not(:first-child) {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  &:nth-child(even) {
    background-color: fade_out($brand-secondary, 0.8);
  }

  &.enabled {
    transition: 0.3s ease-out;
    transition-property: color, background-color;

    &:hover {
      background-color: $brand-primary;
      color: #999;
      cursor: pointer;
      .end {
        color: white;
      }
    }
  }

  &.disabled {
    opacity: 0.3;
  }

  &.selected {
    background-color: $brand-primary;
    color: $brand-dark;
    .end {
      color: $brand-dark;
    }

    &:hover {
      background-color: lighten($brand-primary, 10);
      color: $brand-dark;
      .end {
        color: $brand-dark;
      }
    }
  }
}

.active {
  .day-slot {
    background-color: fade_out($brand-secondary, 0.7);
  }
}

.start {
  font-weight: bold;
}

.end {
  font-size: 0.8em;
  color: #7e7e7e;
}

.status {
  padding-left: 8px;
}
</style>

<template>
  <Reserve></Reserve>
</template>

<script>
import './filters'
import Reserve from './components/reserve'

export default {
  name: 'app',
  components: {
    Reserve
  }
}
</script>

<style lang="scss">
@import 'styles/reset';
</style>

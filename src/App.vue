<template lang="pug">
.wrapper
  HNHeader
  HNMain
  .divider
  HNFooter
</template>

<script>
import HNHeader from './components/HNHeader'
import HNFooter from './components/HNFooter'
import HNMain from './components/HNMain'

export default {
  name: "App",
  components: {
    HNHeader,
    HNMain,
    HNFooter
  }
}
</script>

<style lang="scss">
</style>

<template lang="pug">
ul.list-unstyled.d-flex.flex-column 
  li(v-for="item in items" :key="uuid()")
    HNStoryItem(:items="item")
</template>

<script>
import uuid from '../mixins/uuid'

import HNStoryItem from './HNStoryItem'

export default {
  name: 'HNItems',
  components: {
    HNStoryItem
  },
  mixins: [uuid],
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
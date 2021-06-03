<template lang="pug">
ul.list-unstyled.d-flex.flex-column.mb-3
  li.mb-3(v-for="item in hnItems" :key="uuid()")
    HNCommentItem(:item="item")
router-link.more(:to="`?page=${pgn + 2}`" @click="handleMoreClick" v-if="numItems && pgn < totalPages - 1") More
</template>

<script>
import HNCommentItem from "../components/HNCommentItem"

import { makeAlgoliaApiUrl } from '../util/index'

import uuid from '../mixins/uuid'

import cancelToken from '../cancelToken'

export default {
  name: 'HNComments',
  components: {
    HNCommentItem,
  },
  mixins: [uuid],
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPreviousRoute', { ...from });

    next();
  },
  props: {
    page: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      pgn: 0,
      source: cancelToken.source()
    }
  },
  computed: {
    hnItems() {
      return this.$store.state.hnItems;
    },
    numItems() {
      return this.hnItems ? this.hnItems.length : 0;
    },
    totalPages() {
      return this.$store.state.nbPages;
    },
  },
  created() {
    this.pgn = this.page || 0;

    this.fetchHNItems();
  },
  unmounted() {
    this.source.cancel();
  },
  methods: {
    handleMoreClick() {
      this.pgn++;

      this.source.cancel();
      this.source = cancelToken.source();

      this.fetchHNItems();
    },
    fetchHNItems() {
      this.$store.commit('clearHNItems');

      const url = makeAlgoliaApiUrl({
        searchOption: "search_by_date",
        tags: "comment",
        page: this.pgn || 0,
      });

      const cancelToken = this.source.token;
      const options = { cancelToken };

      this.$store.dispatch('fetchHNItems', { url, options });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
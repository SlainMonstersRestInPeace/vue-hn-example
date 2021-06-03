<template lang="pug">
.d-flex.flex-column.job-item.item
  .job-header
    h5.d-inline.mr-1.d-inline.job-title 
      a(href="#") {{title}}
    .d-inline.block.job-url(v-if="url")
      | (
      a(:href="url") {{domain}}
      | )
  .job-info
    .job-date
      a(href="#") {{date}}
</template>

<script>
import { extractDomain } from '../util/index'
import { calculateDateFromMs } from '../util/index'

export default {
  name: 'HNJobItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.item.title;
    },
    url() {
      return this.item.url;
    },
    domain() {
      return this.item.url ? extractDomain(this.item.url) : null; 
    },
    date() {
      return calculateDateFromMs(this.item.created_at_i)
    }
  }
}
</script>

<style lang="scss" scoped>
$hn-dark-orange: #FF6600;
$hn-text-dark: black;
$hn-text-light: white;
$hn-text-gray: #828282;
$hn-beige: #F6F6EF;

* {
  font-family: "Verdana", sans-serif
}

.job-header {
  line-height: 1em;
}

.job-title, .job-title a {
  font-size: 14px;
  font-weight: normal;
  color: $hn-text-dark;
}

.job-title a {
  text-decoration: none;
}

.job-url, .job-url a {
  font-size: 12px;
  color: $hn-text-gray;
}

.job-url a {
  text-decoration: none;
}

.job-url a:hover {
  text-decoration: underline;
}

.job-date, .job-date a {
  font-size: 10px;
  color: $hn-text-gray;
}

.job-date a {
  text-decoration: none;
}

.job-date a:hover {
  text-decoration: underline;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  .job-title, .job-title a {
    font-size: 16px;
  }

  .job-date, .job-date a {
    font-size: 12px;
  }
}
</style>
<template lang="pug">
.d-flex.flex-column.story-item.item
  .story-header
    h5.d-inline-block.mb-0.story-title.mr-1
      a(:href="url") {{title}}
    .d-inline-block.story-url(v-if="url")
      | (
      a(:href="url") {{domain}}
      | )
  .story-info
    span.story-points.mr-1 {{points}} points
    span.story-author.mr-1
      | by 
      a(href="#") {{author}}
    span.story-date.mr-1
      a(href="#") {{date}}
    span.mr-1 |
    span.story-action-hide.mr-1
      a(href="#") hide
    span.mr-1 |
    span.story-num-comments.mr-1
      a(href="#") {{comments}}
</template>

<script>
import { extractDomain } from '../util/index'
import { calculateDateFromMs } from '../util/index'

export default {
  name: 'HNStoryItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    url() {
      return this.item.url;
    },
    title() {
      return this.item.title;
    },
    author() {
      return this.item.author;
    },
    comments() {
      return this.item.num_comments === 0 ? 'discuss' : `${this.item.num_comments} comments`;
    },
    points() {
      return this.item.points;
    },
    date() {
      return calculateDateFromMs(this.item.created_at_i);
    },
    domain() {
      return this.url ? extractDomain(this.url) : null;
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

.story-title {
  font-size: 14px;
  font-weight: normal;
  color: $hn-text-dark;
}

.story-title a {
  color: $hn-text-dark;
  text-decoration: none;
}

.story-url {
  font-size: 12px;
  color: $hn-text-gray;
}

.story-url a {
  color: $hn-text-gray;
  text-decoration: none;
}

.story-url a:hover {
  text-decoration: underline;
}

.story-info {
  color: $hn-text-gray;
  font-size: 10px;
}

.story-info a {
  color: $hn-text-gray;
  text-decoration: none;
}

.story-info a:hover {
  text-decoration: underline;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  .story-title {
    font-size: 16px;
  }

  .story-info {
    font-size: 12px;
  }
}

</style>
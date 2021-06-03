<template lang="pug">
.d-flex.flex-column.comment-item.item
  .comment-header.mb-1
    span.comment-author
      a(href="#") {{author}}
    | 
    span.comment-date
      a(href="#") {{date}}
    | 
    | |
    | 
    span.comment-parent
      a(href="#") parent
      | 
      | [
      a(href="#") -
      | ]
      | 
    | |
    | 
    span.comment-on
      span on: 
      a(:href="storyUrl") {{storyTitle}}
  .comment-text(v-html="commentText")
</template>

<script>
import { calculateDateFromMs } from '../util/index'

export default {
  name: 'HNCommentItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    storyUrl() {
      return this.item.story_url;
    },
    storyTitle() {
      return this.item.story_title;
    },
    author() {
      return this.item.author;
    },
    commentText() {
      return this.item.comment_text;
    },
    date() {
      return calculateDateFromMs(this.item.created_at_i);
    },
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

.comment-header, .comment-header a {
  font-size: 12px;
  color: $hn-text-gray;
}

.comment-header a {
  text-decoration: none;
}

.comment-header a:hover {
  text-decoration: underline;
}

.comment-text {
  font-size: 13px;
  line-height: 1.25em;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  .comment-text, .comment-text a {
    font-size: 15px;
  }
}

</style>
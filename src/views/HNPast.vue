<template lang="pug">
.hn-notice.my-2
  p.mb-2 Stories from {{dateCursor}}
  div.d-inline-block(v-if="backwardLinks.length > 0")
    span Go back 
    span(v-for="link in backwardLinks")
      a(href="#" :class="link.class" @click="link.handler") {{link.label}}
      | {{link.colon}}
    | .&nbsp;
  div.d-inline-block(v-if="forwardLinks.length > 0")
    span Go forward 
    span(v-for="link in forwardLinks")
      a(href="#" :class="link.class" @click="link.handler") {{link.label}}
      | {{link.colon}}
    | .
ul.list-unstyled.d-flex.flex-column.mb-3
  li.mb-1(v-for="item in hnItems" :key="uuid()")
    HNStoryItem(:item="item")
router-link.more(:to="`?page=${pgn + 2}`" @click="handleMoreClick" v-if="numItems && pgn < totalPages - 1") More
</template>

<script>
import HNStoryItem from "../components/HNStoryItem"
import moment from 'moment'

import { makeAlgoliaApiUrl, withinTimeFrame } from '../util/index'

import uuid from '../mixins/uuid'

import cancelToken from '../cancelToken'

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
]

export default {
  name: 'HNPast',
  components: {
    HNStoryItem,
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
    const yesterday = moment().subtract(1, "days");

    return {
      yesterday: yesterday,
      conception: moment([2007, 1, 19]),
      date: yesterday,
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
    dateCursor() {
      return `${monthNames[this.date.month()]} ${this.date.date()}, ${this.date.year()} (UTC)`;
    },
    totalPages() {
      return this.$store.state.nbPages;
    },
    backwardLinks() {
      const labels = ["day", "month", "year"];
      const classes = ["go-backward-day", "go-backward-month", "go-backward-year"];
      const handlers = [this.handleGoBackwardDay, this.handleGoBackwardMonth, this.handleGoBackwardYear];
      const measure = ["days", "months", "years"];

      const links = [];

      labels.forEach((label, i) => {
        const newDate = moment(this.date).add(-1, measure[i]);

        if (withinTimeFrame(newDate, this.conception, this.yesterday)) {
          links.push({
            class: `navigation-link go-back ${classes[i]}`,
            handler: handlers[i],
            label,
          })
        }
      })

      links.forEach((link, i) => {
        link.colon = i === links.length - 1 ? '' : ', ';
      });

      return links;
    },
    forwardLinks() {
      const labels = ["day", "month", "year"];
      const classes = ["go-forward-day", "go-forward-month", "go-forward-year"];
      const handlers = [this.handleGoForwardDay, this.handleGoForwardMonth, this.handleGoForwardYear];
      const measure = ["days", "months", "years"];

      const links = [];

      labels.forEach((label, i) => {
        const newDate = moment(this.date).add(1, measure[i]);

        if (withinTimeFrame(newDate, this.conception, this.yesterday)) {
          links.push({
            class: `navigation-link go-forward ${classes[i]}`,
            handler: handlers[i],
            label
          })
        }
      });

      links.forEach((link, i) => {
        link.colon = i === links.length - 1 ? '' : ', ';
      })

      return links;
    },
    dateFilter() {
      const thisDay = moment.unix(this.date.unix()).startOf("day").subtract(1, "days");
      const tomorrow = moment.unix(thisDay.unix()).add(1, "days");

      const lower = thisDay.unix();
      const upper = tomorrow.unix();

      return `created_at_i>${lower},created_at_i<${upper}`;
    }
  },
  watch: {
    date() {
      this.pgn = 0;

      this.source.cancel();
      this.source = cancelToken.source();

      this.fetchItems();
    }
  },
  created() {
    this.pgn = this.page || 0;

    this.fetchItems();
  },
  unmounted() {
    this.source.cancel();
  },
  methods: {
    handleGoBackwardDay() {
      this.moveAPeriod(-1, "days");
    },
    handleGoBackwardMonth() {
      this.moveAPeriod(-1, "months");
    },
    handleGoBackwardYear() {
      this.moveAPeriod(-1, "years");
    },
    handleGoForwardDay() {
      this.moveAPeriod(1, "days");
    },
    handleGoForwardMonth() {
      this.moveAPeriod(1, "months");
    },
    handleGoForwardYear() {
      this.moveAPeriod(1, "years");
    },
    moveAPeriod(count, measure) {
      const newDate = moment(this.date).add(count, measure);

      if (withinTimeFrame(newDate, this.conception, this.yesterday)) {
        this.date = newDate;
      }
    },
    handleMoreClick() {
      this.pgn++;
         
      this.source.cancel();
      this.source = cancelToken.source();

      this.fetchHNItems();
    },
    fetchItems() {
      this.$store.commit('clearHNItems');

      const url = makeAlgoliaApiUrl({
        searchOption: "search_by_date",
        tags: "story",
        page: this.page || 0,
        numericFilters: this.dateFilter
      });
      
      const cancelToken = this.source.token;
      const options = { cancelToken };

      this.$store.dispatch('fetchHNItems', { url, options });
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

.hn-notice, .hn-notice a {
  color: $hn-text-gray;
  font-size: 15px;
}
</style>
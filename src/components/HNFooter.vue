<template lang="pug">
footer.d-flex.flex-column.align-items-center.py-2
  ul.list-unstyled.footer-links.my-2
    li
      a(href="https://news.ycombinator.com/newsguidelines.html") Guidelines
    li  | 
    li
      a(href="https://news.ycombinator.com/newsfaq.html") FAQ
    li  | 
    li
      a(href="https://news.ycombinator.com/lists") Lists
    li  | 
    li
      a(href="https://github.com/HackerNews/API") API
    li  | 
    li
      a(href="https://news.ycombinator.com/security.html") Security
    li  | 
    li
      a(href="https://www.ycombinator.com/legal/") Legal
    li  | 
    li
      a(href="https://www.ycombinator.com/apply/") Apply to YC
    li  | 
    li
      a(href="mailto:hn@ycombinator.com") Contact
  form#search.d-flex.flex-row.align-items-center.my-2(method="get" action="//hn.algolia.com/")
    label.m-0(for="algolia") Search:
    span &nbsp;
    input#algolia(type="text" name="algolia")
</template>

<script>
export default {
  name: 'HNFooter'
}
</script>

<style lang="scss" scoped>
$hn-dark-orange: #FF6600;
$hn-text-dark: black;
$hn-text-light: white;
$hn-text-gray: #828282;
$hn-beige: #F6F6EF;

footer {
  font-family: 'Verdana', sans-serif;
  font-size: 12px;
}

.footer-links {
  li {
    display: inline;
  }
}

.footer-links a {
  text-decoration: none;
  color: $hn-text-dark;
}

.footer-links a:visited {
  color: $hn-text-gray;
}

.footer-links a:hover {
  text-decoration: underline;
}

#search label {
  font-size: 14px;
  color: $hn-text-gray;
}
</style>
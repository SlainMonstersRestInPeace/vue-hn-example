<template lang="pug">
header.d-flex.flex-row.align-items-center
  .d-flex.flex-row.align-items-center.mr-auto.hn-menu-left
    .hn-logo
      router-link(to="/news")
        img.d-block(src="/hn-logo.gif")
    .d-flex.flex-column.flex-md-row.align-items-start.align-items-md-center.hn-menu
      router-link.mr-2(to="/news")
        .m-0.hacker-news Hacker News
      nav
        ul.m-0.list-unstyled.d-flex.flex-row.flex-wrap
          li
            router-link.nav-link(to="/newest") new
          li.mx-1 |
          li
            router-link.nav-link(to="/past") past
          li.mx-1 |
          li
            router-link.nav-link(to="/comments") comments
          li.mx-1 |
          li
            router-link.nav-link(to="/ask") ask
          li.mx-1 |
          li
            router-link.nav-link(to="/show") show
          li.mx-1 |
          li
            router-link.nav-link(to="/jobs") jobs
  div.hn-menu-right.login.mr-2 login
</template>

<script>
export default {
  name: 'HNHeader'
}
</script>

<style lang="scss" scoped>

$hn-dark-orange: #FF6600;
$hn-text-dark: black;
$hn-text-light: white;

.hn-logo img {
  border: 1px solid white;
}

header {
  background: $hn-dark-orange;
}

.hacker-news {
  font-family: "Verdana", sans-serif;
}

a {
  text-decoration: none;
  display: block;
}

a:hover {
  color: $hn-text-dark;
  text-decoration: none;
}

a:visited {
  color: $hn-text-dark;
}

.nav-link {
  animation: none !important;
  transition: none !important;
  padding: 0;
}

.nav-link.router-link-active {
  color: $hn-text-light;
}

.login {
  float: right;
}

</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('./assets/styles/input.css');

@font-face {
  font-family: 'Icons';
  src:
    url('./assets/fonts/Icons.woff2') format('woff2'),
    url('./assets/fonts/Icons.woff') format('woff'),
    url('./assets/fonts/Icons.ttf') format('truetype');
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 25px;
  max-width: 800px;
  margin: auto;
}
</style>

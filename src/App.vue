<template>
  <div id="app">
      <videoHls videoType="hls" viewPoster="//www.baidu.com/img/bd_logo1.png?qua=high"></videoHls>
  </div>
</template>

<script>
import videoHls from './lib/video-hls-multiple'
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        videoHls
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

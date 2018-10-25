<template  lang="html">
  <div id="app">
    <div>
     
    </div>
    <HelloWorld msg="Üdvözöllek újra az intézeti ping-pong bajonokságban!"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás'
  }),
  components: {
    HelloWorld
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Niramit:400,400i,700,700i&subset=latin-ext');
body {
  background:black;
  color:rgb(207, 198, 186);
  text-align: center;
  font-family: 'Niramit', sans-serif;
}
h1 {
  text-shadow: 0px 0px 3px white;
}
#app {
  margin:20px;
}
</style>

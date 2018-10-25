<template  lang="html">
  <div id="app">
      <h1 id="h1_1">Üdvözöllek újra az intézeti ping-pong bajonokságban!</h1>
      <vs-button @click="graph=!graph"><span v-html="graph?'Diagram ki':'Diagram be'" /></vs-button>
      <br><br>
      <graph v-if="graph"/>
  </div>
</template>

<script>
import graph from './components/graph.vue'
export default {
  name: 'app',
  components: {
    graph
  },
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás',
      graph: false
  })
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
#h1_1 {
  text-shadow: 0px 0px 3px white;
  margin:30px;
}
#app {
  margin:20px;
  text-align: center;
}
</style>

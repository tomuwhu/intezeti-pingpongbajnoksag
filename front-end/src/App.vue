<template  lang="html">
  <div id="app">
      <h1 id="h1_1">Üdvözöllek újra az intézeti ping-pong bajonokságban!</h1>
      <hr>
      <div class="left">
      <vs-button 
        @click="view='erlist'" 
        :disabled="view==='erlist'"
        color="rgb(11, 189, 135)" 
        vs-type="flat" >Eddigi eredményeim</vs-button> -
      <vs-button 
        @click="view='graph'" 
        :disabled="view==='graph'"
        color="rgb(11, 189, 135)" 
        vs-type="flat" >Lejejátszott meccsek gráfja</vs-button> -
      <vs-button 
        @click="view='ujeredm'" 
        :disabled="view==='ujeredm'"
        color="rgb(11, 189, 135)" 
        vs-type="flat" >Új eredmény felvitele</vs-button>
      </div>
      <hr><br>
      <ujeredm v-if="view==='ujeredm'"/>
      <graph v-if="view==='graph'"/>

  </div>
</template>

<script>
import graph from './components/graph.vue'
import ujeredm from './components/ujeredm.vue'
export default {
  name: 'app',
  components: { graph, ujeredm },
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás',
      view: 'erlist'
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
  margin:10px;
}
#h1_1 {
  text-shadow: 0px 0px 3px white;
  margin:30px;
}
#app {
  margin:20px;
  text-align: center;
}
div.left {
  text-align: left;
  color:white;
}
</style>

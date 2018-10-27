<template  lang="html">
  <div id="app">
      <h1 id="h1_1">Üdvözöllek újra az intézeti ping-pong bajonokságban!</h1>
      <hr>
      <div class="left">
      <vs-button 
        @click="setview('erlist')" 
        :disabled="view==='erlist'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Eddigi eredményeim</vs-button> -
      <vs-button 
        @click="setview('graph')" 
        :disabled="view==='graph'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Lejejátszott meccsek gráfja</vs-button> -
      <vs-button 
        @click="setview('ujeredm')" 
        :disabled="view==='ujeredm'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Új eredmény rögzítése</vs-button>
      </div>
      <hr><br>
      <erlist  :username="un" v-if="view==='erlist'" />
      <ujeredm :username="un" v-if="view==='ujeredm'"/>
      <graph                  v-if="view==='graph'"/>
  </div>
</template>

<script>
import erlist from './components/erlist.vue'
import graph from './components/graph.vue'
import ujeredm from './components/ujeredm.vue'
export default {
  name: 'app',
  components: { erlist, graph, ujeredm },
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás',
      un:   'tnemeth'
  }),
  methods: {
    setview(x) {
      this.$store.state.view = x
    }
  },
  computed: {
    view() {
      return this.$store.state.view
    }
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

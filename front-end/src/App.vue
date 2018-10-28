<template  lang="html">
  <div id="app">
      <h3 id="h3">Üdvözöllek újra az intézeti pingpong-bajonokságban!</h3>
      <hr>
      <div class="left">
      <vs-button 
        @click="setview('erlist')" 
        :disabled="view==='erlist'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Eredmények</vs-button> -
      <vs-button 
        @click="setview('rank')" 
        :disabled="view==='rank'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Ranglista</vs-button> -  
      <vs-button 
        @click="setview('graph')" 
        :disabled="view==='graph'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Eredménygráf</vs-button> -
      <vs-button 
        @click="setview('ujeredm')" 
        :disabled="view==='ujeredm'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Új eredmény rögzítése</vs-button>
      </div>
      <hr><br>
      <erlist  :username="un" v-if="view==='erlist'" />
      <rank    :username="un" v-if="view==='rank'" />
      <ujeredm :username="un" v-if="view==='ujeredm'"/>
      <graph                  v-if="view==='graph'"/>
  </div>
</template>

<script>
import erlist from './components/erlist.vue'
import rank from './components/rank.vue'
import graph from './components/graph.vue'
import ujeredm from './components/ujeredm.vue'
export default {
  name: 'app',
  components: { erlist, rank, graph, ujeredm },
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
#h3 {
  text-shadow: 0px 0px 3px white;
  margin-bottom:10px;
}
#app {
  margin:10px;
  text-align: center;
}
div.left {
  text-align: left;
  color:white;
}
</style>

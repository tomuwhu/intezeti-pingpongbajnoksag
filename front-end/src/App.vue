<template  lang="html">
  <div id="app">
      <h3 id="h3">Kedves <b>{{knev}}</b>, üdvözöllek az intézeti pingpong-bajonokságban!</h3>
      <hr>
      <div class="left">
      <vs-button 
        @click="setview('erlist')" 
        :disabled="view==='erlist'"
        color="rgb(21, 189, 135)" 
        vs-type="flat" >Eredményeim</vs-button> -
      <vs-button 
        @click="setview('rank')" 
        :disabled="view==='rank'"
        color="rgb(121, 189, 135)" 
        vs-type="flat" >Ranglista (PageRank)</vs-button> -  
      <vs-button 
        @click="setview('rankh')" 
        :disabled="view==='rankh'"
        color="rgb(71, 119, 185)" 
        vs-type="flat" >Ranglista (HITS)</vs-button> - 
      <vs-button 
        @click="setview('matrix')" 
        :disabled="view==='matrix'"
        color="rgb(251, 119, 185)" 
        vs-type="flat" >Becsült végkifejlet</vs-button> - 
      <vs-button 
        @click="setview('graph')" 
        :disabled="view==='graph'"
        color="rgb(21, 189, 185)" 
        vs-type="flat" >Eredménygráf</vs-button> -
      <vs-button 
        @click="setview('ujeredm')" 
        :disabled="view==='ujeredm'"
        color="rgb(221, 189, 135)" 
        vs-type="flat" >Új eredmény rögzítése</vs-button>
      </div>
      <hr><br>
      <erlist  :username="un" v-if="view==='erlist'" />
      <rank    :username="un" v-if="view==='rank'" />
      <rankh   :username="un" v-if="view==='rankh'" />
      <matrix  :username="un" v-if="view==='matrix'" />      
      <ujeredm :username="un" v-if="view==='ujeredm'"/>
      <graph                  v-if="view==='graph'"/>
  </div>
</template>

<script>
import erlist from './components/erlist.vue'
import rank from './components/rank.vue'
import rankh from './components/rankh.vue'
import matrix from './components/matrix.vue'
import graph from './components/graph.vue'
import ujeredm from './components/ujeredm.vue'
export default {
  name: 'app',
  components: { erlist, rank, rankh, matrix, graph, ujeredm },
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
b {
  color:rgb(142, 233, 202);
}
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

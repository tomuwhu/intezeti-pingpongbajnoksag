<template  lang="html">
  <div id="app">
      <div v-if='!knev'>
        <br>
        <br>
        <br>
        <vs-button id="signin-button" v-on:click="signIn">
          <i class="fa fa-google-plus-official fa-3x"></i>
          Bejelentkezés Google-lal
        </vs-button>
      </div>
      <div v-if="knev && utype">
        <h3 id="h3">Kedves <b>{{knev}}</b>, üdvözöllek az intézeti pingpong-bajonokságban!</h3>
        <hr>
        <div class="left">
          <vs-button 
            v-if="knev"
            @click="setview('erlist')" 
            :disabled="view==='erlist'"
            color="rgb(21, 189, 135)" 
            vs-type="line">Eredményeid</vs-button>
          <!--vs-button 
            @click="setview('matrix')" 
            :disabled="view==='matrix'"
            color="rgb(251, 119, 185)" 
            vs-type="line" >Eredménymátrix</vs-button-->
          <vs-button 
            @click="setview('rank')" 
            :disabled="view==='rank'"
            color="rgb(121, 189, 135)" 
            vs-type="line" >PageRank</vs-button>   
          <!--vs-button 
            @click="setview('rankh')" 
            :disabled="view==='rankh'"
            color="rgb(71, 129, 255)" 
            vs-type="line" >HITS</vs-button--> 
          <vs-button 
            @click="setview('graph')" 
            :disabled="view==='graph'"
            color="rgb(21, 189, 185)" 
            vs-type="line" >Eredménygráf</vs-button>
          <vs-button 
            v-if="knev && utype==='player'"
            @click="setview('ujeredm')" 
            :disabled="view==='ujeredm'"
            color="rgb(221, 189, 135)" 
            vs-type="line" >Új eredmény rögzítése</vs-button>
          <vs-button 
            v-if="knev"
            @click="logout()" 
            color="rgb(255, 110, 110)" 
            vs-type="line" >Kijelentkezés</vs-button>
        </div>

        <hr><br>
        <div v-if="knev && view==='erlist' && utype==='sp'">
          Igen intézeti dolgozó vegyok és szeretnék indulni az intézeti pingp-pong bajnokságon.<br>
          Vállalom, hogy átlagosan havonta egy-két meccset lejátszom!<br><br>
          <vs-button @click="reg()">Regisztálok</vs-button>
          <br><br>
        </div>  
        <erlist  :username="un" v-if="view==='erlist' && utype==='player'" />
        <rank    :username="un" v-if="view==='rank'" />
        <rankh   :username="un" v-if="view==='rankh'" />
        <matrix  :username="un" v-if="view==='matrix'" />      
        <ujeredm :username="un" v-if="view==='ujeredm' && utype==='player'"/>
        <graph   type="graph"   v-if="view==='graph'"/>
      </div>
  </div>
</template>

<script>
import erlist from './components/erlist.vue'
import rank from './components/rank.vue'
import rankh from './components/rankh.vue'
import matrix from './components/matrix.vue'
import graph from './components/graph.vue'
import ujeredm from './components/ujeredm.vue'
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'app',
  components: { erlist, rank, rankh, matrix, graph, ujeredm },
  data: ()=>({
      knev: '',
      name: '',
      un:   '',
      utype:''
  }),
  methods: {
    setview(x) {
      this.$store.state.view = x
    },
    signIn() {
      Vue.googleAuth().directAccess()
      Vue.googleAuth().signIn( 
        user => {
          this.un = user.w3.U3.split('@')[0]
          this.name = user.w3.wea + " " + user.w3.ofa
          this.knev = user.w3.ofa
          axios
            .get('http://www.inf.u-szeged.hu/u/tnemeth_2/getalldata')
            .then( resp => {
              let ru = resp .data
                            .users
                            .find( v => v.un===this.un)
              if (ru) this.utype='player'
              else this.utype='sp'
              localStorage.setItem('un',this.un)
              localStorage.setItem('name',this.name)
              localStorage.setItem('knev',this.knev)
              localStorage.setItem('utype',this.utype)
            } )
          //console.log( 'Kép:', user.w3.Paa )
        },
        reject => console.log( reject )
      )
    },
    logout() {
      localStorage.removeItem('un')
      localStorage.removeItem('name')
      localStorage.removeItem('knev')
      localStorage.removeItem('utype')
      this.un=''
      this.utype=''
      this.knev=''
    },
    reg() {
        axios
        .post('http://www.inf.u-szeged.hu/u/tnemeth_2/newreg',{un: this.un, knev:this.knev, name: this.name})
        .then( resp => {
          console.log(resp.data);
          this.utype='player'
        } )
    }
  },
  computed: {
    view() {
      return this.$store.state.view
    }
  },
  mounted() {
    let un
    if (un = localStorage.getItem('un')) {
      this.un=un
      this.name=localStorage.getItem('name')
      this.knev=localStorage.getItem('knev')
      this.utype=localStorage.getItem('utype')
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
#signin-button {

}
</style>

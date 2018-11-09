<template>
  <div class="center">
    <h2>A <a href="https://hu.wikipedia.org/wiki/PageRank" target="_blank">PageRank</a> algoritmus eredménye</h2>
    <div class="center">
        <table>
            <tr>
                <th>Helyezés</th>
                <th>Név</th>
                <th>PageRank</th>
            </tr> 
            <tr v-for="(row,key) in rank">
                <td class="bal">{{key+1}}.</td>
                <td class="bal">{{row.jn}}</td>
                <td class="jobb">{{(1000*row.rank).toFixed(0)}}<span class="grayspan"> * 10<sup>-3</sup></span></td>
            </tr>
        </table>
    </div>    
  </div>
</template>

<script>
var graph = require('ngraph.graph')()
var pagerank = require('ngraph.pagerank')
import axios from 'axios'
export default {
  name: 'rank',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: {},
      meccsek: [],
      rank: []
  }),
  methods: {
      adatleker() {
        axios
            .get('http://www.inf.u-szeged.hu/u/tnemeth_2/getalldata')
            .then( resp => {
                this.meccsek = resp .data
                                    .meccsek
                this.meccsek.forEach( v=> {
                    graph.addLink(v.vesztett,v.nyert)
                })
                resp.data
                    .users
                    .forEach( v => this.userlist[v.un] = v.nev  )
                this.rank = Object
                                .entries(pagerank(graph))
                                .map( v => ({un:v[0], jn: this.userlist[v[0]], rank: v[1]}) )
                                .sort( (a, b) => b.rank - a.rank )                  
            })
            .catch( err => console.error(err)) 
      }
  },
  mounted() {
      this.adatleker()
  },
  computed: {
  }
}
</script>

<style scoped>
h2 {
    text-align: center;
    border-radius: 10px;
    padding:10px;
    color:rgb(47, 41, 41);
    background: rgb(204, 204, 199);
    box-shadow: 1px 1px 7px rgb(255, 255, 255);
    text-shadow: 1px 1px 5px rgb(109, 107, 107);
}
td.bal {
    text-align: left;
    background-color: rgba(20,20,20,1);
    color:rgb(142, 233, 202);
    border-radius: 11px;
    padding-left: 20px;
    padding-bottom: 5px;
    box-shadow:0px 0px 3px white;
}
td.jobb {
    text-align: right;
    background-color: rgba(20,20,20,1);
    color:rgb(142, 233, 202);
    border-radius: 11px;
    padding-right: 20px;
    padding-bottom: 5px;
    box-shadow:0px 0px 3px white;
}
div.center {
    text-align: center;
}
table {
    padding: 0 auto;
    width:100%;
    border-spacing: 6px;
    border-collapse: separate;
}
.grayspan {
    color: gray;
}
</style>
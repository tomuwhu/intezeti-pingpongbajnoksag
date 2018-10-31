<template>
  <div class="center">
    <h2>Becsült végkifejlet</h2>
    <table>
        <tr v-for="(row,key) in rankarray">   
            <td>{{row}}</td>
        </tr>
    </table>        
  </div>
</template>

<script>
var graph = require('ngraph.graph')()
var pagerank = require('ngraph.pagerank')
var hits = require('ngraph.hits')
import axios from 'axios'
export default {
  name: 'matrix',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: {},
      meccsek: [],
      rank: new Map,
      rankarray: [],
      matrix: new Map
  }),
  methods: {
      adatleker() {
        axios
            .get('http://localhost:3000/getgraphdata')
            .then( resp => {
                this.meccsek = resp .data
                                    .meccsek
                resp.data
                    .users
                    .forEach( v => {
                        this.userlist[v.un] = v.nev  
                        this.matrix.set(v.un,new Map)
                        this.rank.set(v.un,0)
                    })
                this.meccsek.forEach( v=> {
                    graph.addLink(v.vesztett,v.nyert)
                })
                let prank = Object
                                .entries(pagerank(graph))
                                .map( v => ({un:v[0], jn: this.userlist[v[0]], rank: v[1]}) )
                let hrank = Object
                                .entries(hits(graph))
                                .map( v => ({un:v[0], jn: this.userlist[v[0]], rank: v[1].hub}) )
                let prankmap = new Map
                prank.forEach( v=> {
                    prankmap.set(v.un,v.rank)
                })
                let hrankmap = new Map
                hrank.forEach( v=> {
                    hrankmap.set(v.un,v.rank)
                })                       
                this.meccsek.forEach( v=> {
                    this.matrix.get(v.nyert).set(v.vesztett,-1)
                    this.matrix.get(v.vesztett).set(v.nyert,1)
                } )
                resp.data
                    .users.forEach( p => {
                        resp.data
                        .users.forEach( q => {
                            if (!this.matrix.get(p.un).has(q.un)) {
                                if (p.un!==q.un)
                                    this.matrix.get(p.un).set(q.un,prankmap.get(p.un)-prankmap.get(q.un)>0?-1:1)
                                else     
                                    this.matrix.get(p.un).set(q.un,0)
                            }
                        } )
                    })
                let ossz
                console.log(hrankmap)
                
                this.matrix.forEach( (v,k) => {
                    ossz = 0
                    this.matrix.get(k).forEach( v => ossz += v)
                    this.rank.set(k,ossz+hrankmap.get(k))
                })
                let rv = []
                this.rank.forEach( (v,k) => {
                    rv.push({un:k, rank:v})                      
                })
                this.rankarray = rv .filter( v=> v.rank)
                                    .sort( (a,b) => b.rank-a.rank )         
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
    border-spacing: 20px;
    border-collapse: separate;
}
.grayspan {
    color: gray;
}
.rotate {
-webkit-transform: rotate(-90deg);
-moz-transform: rotate(-90deg);
-ms-transform: rotate(-90deg);
-o-transform: rotate(-90deg);
filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}
.narrow {
    width:10px;
}
.wide {
    width:70px;
}
</style>
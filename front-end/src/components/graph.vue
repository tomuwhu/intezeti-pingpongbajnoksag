<template>
  <div>
    <h2>Eredménygráf ({{type}})</h2> 
    <br>
    <div id="mynetwork"></div>  
  </div>
</template>

<script>
import vis from 'vis'
import axios from 'axios'
var nodes, edges, container, data, options, network
function drawgraph(p1, p2) {
  nodes = new vis.DataSet(p1)
  edges = new vis.DataSet(p2)
  container = document.getElementById('mynetwork')
  data = { nodes: nodes, edges: edges }
  options = {
    nodes: {
      shape: 'box',
      fixed: false,
      font: {
        color: '#343434',
        size: 11, // px
        face: 'Niramit',
        background: 'none',
        strokeWidth: 0, // px
        strokeColor: '#ffffff',
        align: 'center',
        multi: false,
        vadjust: 0
      },
      color: {
        border: '#C01C59',
        background: '#17B27C',
        highlight: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        },
        hover: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        }
      }
    },
    edges: {
      arrows: {
        to: {enabled: true, scaleFactor:  .7, type:'arrow'}
      },
      arrowStrikethrough: true,
      chosen: true,
      color: {
        color:'#bd4576',
        highlight:'#ed4576',
        hover: '#848484',
        inherit: 'from',
        opacity:0.7
      },
      dashes: true
    }
  }
  network = new vis.Network(container, data, options)
}
let ul = new Map
export default {
  name: 'graph',
  props: ['type'],
  mounted() {
    axios
      .get('http://localhost:3000/get'+this.type+'data')
      .then( resp => {
          edges = []
          resp.data.meccsek.forEach( v=> {
              ul.set(v.vesztett,true)
              ul.set(v.nyert,true)
              edges.push({ from: v.nyert, to: v.vesztett })
          })
          nodes = []
          resp.data.users.forEach( v=> {
              if (ul.has(v.un)) {
                  nodes.push( {  id: v.un, label: v.nev } )
              }  
          })
          drawgraph(nodes, edges)
      })
      .catch( err => console.log(err))  
  }
}
</script>

<style scoped>
#mynetwork {
  width: 100%;
  height: 600px;
  background: rgba(30,40,60,0.2);
  border-radius: 20px;
  box-shadow: 1px 1px 6px #effeed;
  margin: 0 auto;
}
h2 {
    text-align: center;
    border-radius: 10px;
    padding:10px;
    color:rgb(47, 41, 41);
    background: rgb(204, 204, 199);
    box-shadow: 1px 1px 7px rgb(255, 255, 255);
    text-shadow: 1px 1px 5px rgb(109, 107, 107);
}
</style>
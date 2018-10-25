<template>
  <div>
    <div id="mynetwork"></div>
  </div>
</template>

<script>

import vis from 'vis'

var nodes = {}
var edges = {}
var container = {}
var data = {}
var options = {}
var network = {}

function drawgraph() {
  nodes = new vis.DataSet([
    { id: 1, label: 'Pallágyi Kálmán' },
    { id: 2, label: 'Németh Tamás' },
    { id: 3, label: 'Kövesi-Nagy Dániel' },
    { id: 4, label: 'Varga László Gábor' }
  ])

  edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 1, to: 4 },
    { from: 3, to: 4 },
  ])

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
        border: '#2B7CE9',
        background: '#97C2FC',
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

export default {
  name: 'graph',
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás',
      graph: false
  }),
  mounted: () => {
      drawgraph()
  }
}
</script>

<style scoped>
#mynetwork {
  width: 90%;
  height: 600px;
  background: rgba(30,40,60,0.2);
  border-radius: 20px;
  box-shadow: 1px 1px 6px #effeed;
  margin: 0 auto;
}
</style>
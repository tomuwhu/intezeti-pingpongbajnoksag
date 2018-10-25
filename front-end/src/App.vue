<template  lang="html">
  <div id="app">
    <div>
     
    </div>
    <HelloWorld msg="Üdvözöllek újra az intézeti ping-pong bajonokságban!"/>
    <div id="mynetwork"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import vis from 'vis'

var nodes = {}
var edges = {}
var container = {}
var data = {}
var options = {}
var network = {}

export default {
  name: 'app',
  data: ()=>({
      knev: 'Tamás',
      name: 'Németh Tamás'
  }),
  components: {
    HelloWorld
  },
  mounted: function () {

      nodes = new vis.DataSet([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' }
      ])

      edges = new vis.DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 1, to: 4 },
        { from: 3, to: 4 },
      ])

      container = document.getElementById('mynetwork');
      data = {
        nodes: nodes,
        edges: edges
      }

      options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor:  .7, type:'arrow'}
          }
        }
      }

      network = new vis.Network(container, data, options);
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
}
h1 {
  text-shadow: 0px 0px 3px white;
}
#app {
  margin:20px;
}
#mynetwork {
  width: 90%;
  height: 600px;
}
</style>

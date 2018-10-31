<template>
  <div class="center">
    <h2>Teljes mátrix</h2>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'matrix',
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
            .get('http://localhost:3000/getalldata')
            .then( resp => {
                this.meccsek = resp .data
                                    .meccsek
                resp.data
                    .users
                    .forEach( v => this.userlist[v.un] = v.nev  )    
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
</style>
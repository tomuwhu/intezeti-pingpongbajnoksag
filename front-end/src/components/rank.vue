<template>
  <div class="center">
    <h2>Ranglista</h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'rank',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: {},
      meccsek: []
  }),
  methods: {
      adatleker() {
        axios
            .get('http://localhost:3000/getalldata')
            .then( resp => {
                this.meccsek =
                        resp.data
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
</style>
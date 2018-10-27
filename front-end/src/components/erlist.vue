<template>
  <div class="center">
    <br>
    <h2>Eredményeid listája</h2>
    {{meccsek}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'erlist',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: [],
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
                        .filter( v => 
                            v.nyert === this.username
                            ||
                            v.vesztett === this.username
                        )
            })
            .catch( err => console.error(err)) 
      }
  },
  mounted() {
      this.adatleker()
  }
}
</script>

<style scoped>

</style>
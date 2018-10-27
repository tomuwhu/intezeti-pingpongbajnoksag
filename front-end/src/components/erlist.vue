<template>
  <div class="center">
    <br>
    <h2>Eredményeid listája</h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'erlist',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: []
  }),
  methods: {
      adatleker() {
        axios
            .get('http://localhost:3000/getdata')
            .then( resp => {
                console.log(this.username)
                
                //console.log(resp.data.meccsek.filter(v => v.nyert === this.username))
                
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
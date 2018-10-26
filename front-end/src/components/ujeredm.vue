<template>
  <div>
    <h1>Új eredmény bevitele</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ujeredm',
  data: ()=>({
      
  }),
  mounted: () => {
     axios
        .get('http://localhost:3000/getdata')
        .then( resp => {
            console.log(resp.data)
        })
        .catch( err => console.log(err))  
  }
}
</script>

<style scoped>

</style>
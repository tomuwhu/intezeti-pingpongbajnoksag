<template>
  <div class="center">
    <h1>Új eredmény bevitele</h1>
    <br>
    <hr>
    <br>
    <vs-button v-if="!adatmegvan" @click="adatleker()">Nos</vs-button>
    <br>
    <div 
        v-if="adatmegvan"
        id="seldiv">
        <span>
            <vs-select 
                class="sel"
                v-if="adatmegvan"
                vs-autocomplete 
                v-model='selecteduser'>
                <vs-select-item 
                    :key="index" 
                    :vs-value="item.un"
                    :vs-text="item.nev" 
                    v-for="item,index in userlist" />
            </vs-select>
        </span>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ujeredm',
  data: ()=>({
      userlist: [],
      selecteduser: '',
      adatmegvan: false
  }),
  methods: {
      adatleker() {
        axios
            .get('http://localhost:3000/getdata')
            .then( resp => {
                this.userlist = resp.data.users
                this.adatmegvan = true
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
.center {
    text-align: center;
    margin:20px;
    padding:20px;
}
#seldiv {   
    background-color: rgb(41, 40, 22);
    border-radius: 20px;
    box-shadow: 0px 0px 6px white;
    margin:20px;
    padding: 20px;
}
.sel {
    margin: 0 auto;
}
</style>
<template>
  <div class="center">
    <br>
    <h2>Eredmények</h2>
    <br><br>
    <table class="kulso">
        <tr>
            <th class="nyert">
                <h3>Nyert meccsek listája</h3>
            </th>
            <th class="vesztett">
                <h3>Vesztett meccsek listája</h3>
            </th>
        </tr>
        <tr>
            <td class="kulso nyert">       
                <table class="belso">     
                <tr v-for="meccs in nyertmeccsek">
                    <td class="belso bal">{{meccs.ellenfel}}</td>
                    <td class="belso jobb">{{meccs.mikor}}</td>
                </tr>
                </table>
            </td>
            <td class="kulso vesztett">       
                <table class="belso">     
                <tr v-for="meccs in vesztettmeccsek">
                    <td class="belso bal">{{meccs.ellenfel}}</td>
                    <td class="belso jobb">{{meccs.mikor}}</td>
                </tr>
                </table>
            </td>
        </tr>
    </table>            
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
            })
            .catch( err => console.error(err)) 
      }
  },
  mounted() {
      this.adatleker()
  },
  computed: {
      nyertmeccsek() {
        return this .meccsek
                    .filter( v => 
                        v.nyert === this.username
                    )
                    .map (v => ({ellenfel: v. vesztett, mikor: (new Date(v.mikor)).toLocaleDateString()}) ) 
      },
      vesztettmeccsek() {
        return this .meccsek
                    .filter( v =>           
                        v.vesztett === this.username
                    )
                    .map (v => ({ellenfel: v. nyert, mikor: (new Date(v.mikor)).toLocaleDateString()}) )
      }
  }
}
</script>

<style scoped>
table.kulso {
    width:100%;
    border-spacing: 20px;
    border-collapse: separate;
}
td.kulso {
    text-align: center;
    vertical-align: top;
    margin: 10px;
    padding: 10px;
    border-radius: 11px;
    box-shadow: 0px 0px 2px white; 
}
table.belso {
    margin: 0 auto;
    border-spacing: 4px;
    border-collapse: separate;
}
td.belso {
    vertical-align: top;
    margin: 4px;
    padding: 4px;
}
td.bal {
    text-align: left;
}
td.jobb {
    text-align: right;
}
td.nyert, th.nyert {
    color:rgb(142, 233, 202);
}
td.vesztett, th.vesztett {
    color:rgb(233, 156, 142);
}
</style>
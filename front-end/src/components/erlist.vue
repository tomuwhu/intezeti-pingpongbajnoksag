<template>
  <div class="center">
    <br>
    <h2>Eredményeid listája</h2>
    <br><br>
    <table class="kulso">
        <tr>
            <th>
                Nyert meccsek listája
            </th>
            <th>
                Vesztett meccsek listája
            </th>
        </tr>
        <tr>
            <td class="kulso">       
                <table class="belso">     
                <tr v-for="meccs in nyertmeccsek">
                    <td class="belso bal">{{meccs.ellenfel}}</td>
                    <td class="belso jobb">{{meccs.mikor}}</td>
                </tr>
                </table>
            </td>
            <td class="kulso">       
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
</style>
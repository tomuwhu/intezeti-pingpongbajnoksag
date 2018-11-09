<template>
  <div class="center">
    <h2>Eredményeim</h2>
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
                    <td class="belso bal">{{meccs.mikor}}</td>
                    <td> - </td>
                    <td class="belso jobb"> &nbsp; {{meccs.ellenfel}}</td>
                </tr>
                </table>
            </td>
            <td class="kulso vesztett">       
                <table class="belso">     
                <tr v-for="meccs in vesztettmeccsek">
                    <td class="belso bal">{{meccs.mikor}}</td>
                    <td> - </td>
                    <td class="belso jobb"> &nbsp; {{meccs.ellenfel}}</td>
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
      userlist: {},
      meccsek: []
  }),
  methods: {
      adatleker() {
        axios
            .get('http://www.inf.u-szeged.hu/u/tnemeth_2/getalldata')
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
      nyertmeccsek() {
        return this .meccsek
                    .filter( v => 
                        v.nyert === this.username
                    )
                    .map (v => ( { 
                        ellenfel: this.userlist[v.vesztett], 
                        mikor: (new Date(v.mikor)).toLocaleDateString()
                    } ) ) 
      },
      vesztettmeccsek() {
        return this .meccsek
                    .filter( v =>           
                        v.vesztett === this.username
                    )
                    .map ( v => ({
                        ellenfel: this.userlist[v.nyert], 
                        mikor: (new Date(v.mikor)).toLocaleDateString()
                    }) )
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
    font-size: 13px;
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
    background-color: rgba(20,20,20,1);
    border-radius: 11px;
    padding-left: 10px;
    box-shadow:0px 0px 3px white;
}
td.jobb {
    text-align: right;
    background-color: rgba(20,20,20,1);
    border-radius: 11px;
    padding-right:10px;    
    box-shadow:0px 0px 3px white;
}
td.nyert, th.nyert {
    color:rgb(142, 233, 202);
}
td.vesztett, th.vesztett {
    color:rgb(233, 156, 142);
}
h2 {
    text-align: center;
    border-radius: 10px;
    padding:10px;
    color:rgb(47, 41, 41);
    background: rgb(204, 204, 199);
    box-shadow: 1px 1px 7px rgb(255, 255, 255);
    text-shadow: 1px 1px 5px rgb(109, 107, 107);
}
h3 {
    text-shadow: 0px 0px 4px rgb(85, 85, 85);
    box-shadow: 0px 0px 4px white;
    padding: 7px;
    border-radius: 5px;
}
</style>
<template>
  <div class="center">
    <br>
    <h2>Új eredmény rögzítése - {{ma}}</h2>
    <div 
        v-if="adatmegvan"
        id="seldiv">
        <table>
            <td class="seltdl">   
                <div class="center">
                    <vs-select 
                        class="sel"
                        v-if="adatmegvan"
                        vs-autocomplete 
                        v-model='selecteduser'
                        :vs-success="selecteduser.length>3"
                        :vs-label="kivi + ' felvitele'"
                        :vs-success-text="kivi + ' kiválasztva'">
                        <vs-select-item 
                            :key="index" 
                            :vs-value="item.un"
                            :vs-text="item.nev" 
                            v-for="item,index in userlist" />
                    </vs-select>
                    <br>
                    <vs-button 
                        :disabled="!(selecteduser.length>3)"
                        @click="ment()">Mentés</vs-button>
                </div>
            </td>
            <td class="seltdc">
                
            </td>
            <td class="seltdr">
                <div v-if="kivi==='Győztes'">
                    <div class="justify">
                        Én ({{user.nev}}) győztem, és tudom, hogy a vesztesnek kell felvinnie az eredményt, 
                        de már többször írtam neki és még mindig nem vitte fel,
                        pedig tudomásul vette, hogy vesztett, ide a rozsdás bököt!
                    </div>
                    <br><br>
                    <div class="center">
                        <vs-button 
                            color="danger"
                            @click="chg()">Tuti!</vs-button>
                    </div>
                </div>
                <div v-if="kivi==='Vesztes'">
                    <div class="justify">
                        Csak próbából nyomtam meg a gombot, kívácsi voltam mit csinál!
                        Sajna én vesztettem, most visszamennék a <b>győztes</b> megadásához.
                    </div>
                    <br><br>
                    <div class="center">
                        <vs-button 
                            color="success"
                            @click="chgv()">Bocsi</vs-button>
                    </div>
                </div>
            </td>
        </table>        
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ujeredm',
  props: ['username'],
  data: ()=>({
      user: {},
      userlist: [],
      selecteduser: '',
      adatmegvan: false,
      kivi: 'Győztes',
      ma: (new Date).toLocaleDateString()
  }),
  methods: {
      chg() {
        this.kivi = 'Vesztes'
      },
      chgv() {
        this.kivi = 'Győztes'
      },
      ment() {
        let tosend 
        if (this.kivi === 'Győztes') {
            tosend = { nyert: this.selecteduser ,vesztett: this.username, mikor: this.ma }
        } else {
            tosend = { nyert: this.username, vesztett: this.selecteduser, mikor: this.ma}
        }    
        axios
            .post('http://localhost:3000/postdata',tosend)
            .then( resp => {
                if (resp.data.affectedRows) {
                    this.$store.state.view = 'erlist'
                }
            })
            .catch( err => console.error(err)) 
      },
      adatleker() {
        axios
            .get('http://localhost:3000/getdata')
            .then( resp => {
                this.user=resp.data.users.filter( v => v.un===this.username )[0]
                this.userlist = resp.data.users.filter( v => v.un!==this.username )              
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
table {
    width:100%
}
td.seltdc {
    width: 40px;
}
td.seltdr {
    width: 60%;
    text-align: justify;
    border-radius: 10px;
    background: black;
    box-shadow: 1px 1px 4px black;
}
h2 {
    text-align: center;
    border-radius: 10px;
    margin:20px;
    padding:10px;
    color:rgb(47, 41, 41);
    background: rgb(204, 204, 199);
    box-shadow: 1px 1px 7px rgb(255, 255, 255);
    text-shadow: 1px 1px 5px rgb(109, 107, 107);
}
td.seltdl {
    width:33%;
    padding:20px;
}
div.justify {
    text-align: justify;
    font-size: 12px;
    color: white;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 0px;
}
.center {
    text-align: center;
}
#seldiv {   
    text-align:left;
    background-color: rgb(248, 248, 248);
    border-radius: 20px;
    box-shadow: 0px 0px 6px white;
    margin:20px;
    padding: 20px;
}
.sel {
    margin: 0 auto;
    color: black;
}
.con-select {
    text-align: left;
    height:110px;
    margin:0 auto;
    padding: 20px;
    background:white;
    color:black;
    box-shadow: 1px 1px 5px black;
    border-radius: 10px;
}
</style>
<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button v-on:click="search()" variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      <!-- <p>Your search Query: {{ searchQuery }}</p> -->
      <p>I want to search for :</p>
      <b-form-select @change="filterChoose()" id="team-player-select" v-model="teamplayerselected">
        <b-form-select-option value="1">Player</b-form-select-option>
        <b-form-select-option value="2">Team</b-form-select-option>
      </b-form-select>

        <!-- <b-button id="filter-button" v-on:click="filterChoose()">No Filter</b-button> -->

      <div id="player-filter" v-if="filterChoice">
        <p>filter by position :</p>
        <b-form-select id="position-select" v-model="positionselected">
          <b-form-select-option v-bind:value="0"></b-form-select-option>
          <b-form-select-option v-for="(pos, index) in positions" :key="index" v-bind:value="pos">{{pos}}</b-form-select-option>
        </b-form-select>
        <p>filter by team :</p>
        <b-form-select id="team-select" v-model="teamselected">
          <b-form-select-option v-bind:value="0"></b-form-select-option>
          <b-form-select-option v-for="(tn, index) in possible_teams" :key="index" v-bind:value="tn">{{tn}}</b-form-select-option>
        </b-form-select>      
      </div>

      <PlayerPreview v-for="p in players"
      :id="p.id"
      :full_name="p.name"
      :team="p.team_name"
      :image="p.image"
      :position="p.position"
      :key="p.id">
      </PlayerPreview>

      <TeamPreview v-for="t in teams"
      :id="t.id"
      :team_name="t.name"
      :image="t.logo"
      :key="t.id">

      </TeamPreview>

  </div>
</template>

<script>
import team_names from "../assets/leagueTeams"
import PlayerPreview from "../components/PlayerPreview.vue"
import TeamPreview from "../components/TeamPreview.vue"
export default {
 data() {
    return {
      searchQuery:"",
      players:[],
      teams:[],

      positions:[1,2,3,4,5,6,7,8,9,10],
      possible_teams:[],

      teamplayerselected: '1',
      positionselected: "0",
      teamselected:"0",

      filterChoice: true
    };
  },
  components:{
    PlayerPreview,
    TeamPreview,
  },
  methods:{
    filterChoose(){
      let e = document.getElementById("filter-button");
      if(this.teamplayerselected == '1'){
        this.filterChoice = true;
      }else{
        this.filterChoice = false;
      }
    },

    async search(){
      try{
        this.players = [];
        this.teams = [];
        console.log(this.searchQuery);
        let e = document.getElementById("team-player-select");
        console.log(e.value)
        if(e.value == "1"){
          await this.searchPlayers();
        }
        else if(e.value == "2"){
          await this.searchTeams();
        }
        else{
          return;
        }
      } catch (error){
        console.log("error in update games")
        console.log(error);
      }
    },
    async searchPlayers(){
      let query = "http://localhost:3000/players/search/" + this.searchQuery;
      let teamparam = undefined;
      let posparam = undefined;
      // let params = {params:{ team:undefined, position:undefined }};
      if(this.teamselected != "0"){
        teamparam = this.teamselected;
      }
      if(this.positionselected != "0"){
        posparam = parseInt(this.positionselected);
      }
      // if(this.filterChoice){
      //   params = {params: {team:teamparam, position:parseInt(posparam)}}
      // }
      const response = await this.axios.get(query, {params:{team:teamparam, position: posparam}});
      let p = response.data;
      this.players = [];
      this.players.push(...p);
    },
    async searchTeams(){
      let query = "http://localhost:3000/teams/search/" + this.searchQuery;
      const response = await this.axios.get(query);
      console.log(response.data);
      let t = response.data;
      this.teams = [];
      this.teams.push(...t);
    }
  },
  mounted(){
    this.possible_teams.push(...team_names);
  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>
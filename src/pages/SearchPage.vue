<template>
  <div>
    <h1 class="title">Search for Teams and Players</h1>
    <br>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery" id="search-input2"></b-form-input>
      <b-input-group-append>
        <b-button v-on:click="search()" variant="success" :disabled="searchQuery==''">Search</b-button>
        <b-button @click='sortByName()' variant="success" v-if="players.length > 0 || teams.length > 0">Sort By Name</b-button>
        <b-button @click='sortByTeamName()' variant="success" v-if="players.length > 0">Sort By Team name</b-button>
      </b-input-group-append>
    </b-input-group>
    <br/>
    <p>I want to search for :</p>
    <b-form-select @change="filterChoose()" id="team-player-select" v-model="teamplayerselected">
      <b-form-select-option value="1">Player</b-form-select-option>
      <b-form-select-option value="2">Team</b-form-select-option>
    </b-form-select>
    <br>

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
    <br>
    <div v-if='players.length > 0'>
      <PlayerPreview v-for="p in players"
      :id="p.id"
      :full_name="p.name"
      :team="p.team_name"
      :image="p.image"
      :position="p.position"
      :key="p.id">
      </PlayerPreview>
    </div>
    <div v-if='teams.length > 0'>
    <TeamPreview v-for="t in teams"
    :id="t.id"
    :team_name="t.name"
    :image="t.logo"
    :key="t.id">

    </TeamPreview>
    </div>

  </div>
</template>

<script>
import team_names from "../assets/leagueTeams"
import PlayerPreview from "../components/PlayerPreview.vue"
import TeamPreview from "../components/TeamPreview.vue"
export default {
 data() {
    return {
      searchQuery: "",
      players: [],
      teams:[],

      positions:[1,2,3,4],
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
        let e = document.getElementById("team-player-select");
        if(e.value == "1"){
          await this.searchPlayers();
        }
        else if(e.value == "2"){
          await this.searchTeams();
        }
        else{
          return;
        }
        this.updateLocal(e.value);
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
      if(p.length == 0){
        this.$root.toast("Info", "No players were found", "info");
      }
      this.players = [];
      this.players.push(...p);
    },
    async searchTeams(){
      let query = "http://localhost:3000/teams/search/" + this.searchQuery;
      const response = await this.axios.get(query);
      let t = response.data;
      if(t.length == 0){
        this.$root.toast("Info", "No teams were found", "info");
      }
      this.teams = [];
      this.teams.push(...t);
    },
    sortByTeamName(){
      try{
          this.players.sort((a,b) => (a.team_name > b.team_name) ? 1 : ((b.team_name > a.team_name) ? -1 : 0))
      } catch (error){
        console.log("error in update games")
        console.log(error);
      }
    },
    sortByName(){
      try{
        let e = document.getElementById("team-player-select");
        if(e.value == "1"){
          this.players.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }
        else if(e.value == "2"){
          this.teams.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }
        else{
          return;
        }
      } catch (error){
        console.log("error in update games")
        console.log(error);
      }
    },
    updateLocal(choise){
      localStorage.setItem("lastSearchQ", this.searchQuery);
      if(choise == "1"){
        localStorage.setItem("lastSearchResult", JSON.stringify(this.players));
      }
      else if(choise == "2"){
        localStorage.setItem("lastSearchResult", JSON.stringify(this.teams));
      }
      localStorage.setItem("choise", choise);
    }

  },
  mounted(){
    this.possible_teams.push(...team_names);

    this.searchQuery = localStorage.lastSearchQ || "";
    if(localStorage.choise && localStorage.choise == "1" && localStorage.lastSearchResult){
      this.players = JSON.parse(localStorage.lastSearchResult) || [];
      this.teamplayerselected = localStorage.choise;
    }
    else if(localStorage.choise && localStorage.choise == "2" && localStorage.lastSearchResult){
      this.teams = JSON.parse(localStorage.lastSearchResult) || [];
      this.teamplayerselected = localStorage.choise;
    }
  }
}
</script>

<style scoped>
.search-container{
  color: whitesmoke;
}
#search-input {
  margin-left: 20px; 
  max-width: 800px; 
}
#search-input2 {
  /* margin-left: 20px;  */
  max-width: 300px; 
}
.title{
  text-align: center;
  color: whitesmoke;
}
#team-player-select{
  max-width: 30%;
  margin-left: 20px; 
}
#position-select{
  max-width: 30%;
  margin-left: 20px; 
}
#team-select{
  max-width: 30%;
  margin-left: 20px; 
}
p{
  margin-left: 20px;
  color: whitesmoke; 
}
</style>
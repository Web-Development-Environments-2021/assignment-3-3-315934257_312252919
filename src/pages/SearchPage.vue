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
      <p>Your search Query: {{ searchQuery }}</p>
      <p>I want to search for :</p>

      <!-- <b-select id="select" class="form-select" aria-label="Default select example">
        <option value="1" selected>Players</option>
        <option value="2">Teams</option>
      </b-select>  -->
      <b-form-select id="select" v-model="selected" :options="options"></b-form-select>

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
import PlayerPreview from "../components/PlayerPreview.vue"
import TeamPreview from "../components/TeamPreview.vue"
export default {
 data() {
    return {
      searchQuery:"",
      players:[],
      teams:[],

      selected: '1',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: '1', text: 'Players' },
        { value: '2', text: 'Teams'}
      ]
    };
  },
  components:{
    PlayerPreview,
    TeamPreview
  },
  methods:{
    async search(){
      try{

        this.players = [];
        this.teams = [];
        console.log(this.searchQuery);
        let e = document.getElementById("select");
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
      const response = await this.axios.get(query);
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
  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>
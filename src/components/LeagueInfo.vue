<template>
    <div class="league-preview" v-if="alreadyMounted">
      <b-card
      v-bind:img-src="this.league_logo"
      img-alt="Image"
      img-height="200"
      tag="article"
      border-variant="info"
      class="mb-2"
      >
        <b-card-title>{{leagueName}}</b-card-title>
        <b-card-text>
          Season: {{ season }}
          <br/>
          Stage: {{ stage.name }}
        </b-card-text>
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card>
      <h2 class="nextTitle">Next Game</h2>
      <GamePreview v-if="nextGame" 
      :id="nextGame.game_id"
      :hostTeam="nextGame.home_team_name"
      :guestTeam="nextGame.away_team_name"
      :date="nextGame.game_date_time.split('T')[0]"
      :hour="nextGame.game_date_time.split('T')[1].split('.')[0]"
      :field="nextGame.field"
      :setBtn="false">
      </GamePreview>
    </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue"
export default {
 data() {
    return {
      leagueName: "superliga",
      league_logo: "", 
      season: "season", 
      stage: "stage",
      alreadyMounted: false,
      nextGame: undefined,      

    };
  },
  components:{
    GamePreview
  },
  async mounted(){
    try{
      let query = "http://localhost:3000/league/getDetails";
      const response = await this.axios.get(query);
      let data = response.data;
      this.leagueName = data.league_name;
      this.league_logo = data.league_logo;
      this.season = data.current_season_name;
      this.stage = data.current_stage;
      this.nextGame = data.next_game;
      this.alreadyMounted = true;

    }catch(error){
      console.log(error);
    }
    
  }
}
</script>

<style>
.nextTitle{
  text-align: center;
  color:whitesmoke;
}
.league-preview{
  width: 400px;
}
</style>
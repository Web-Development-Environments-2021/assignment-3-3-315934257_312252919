<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage.name }}
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
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
      season: "season", 
      stage: "stage",

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
      this.season = data.current_season_name;
      this.stage = data.current_stage;
      this.nextGame = data.next_game;

    }catch(error){
      console.log(error);
    }
    
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>
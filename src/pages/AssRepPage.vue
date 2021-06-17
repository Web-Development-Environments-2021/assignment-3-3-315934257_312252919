<template>
<div class="container">
    <h1 class="title">Association Representative Page</h1>
    <div>
        <b-tabs v-model="tabIndex" lazy content-class="mt-4">
            <b-tab title="Add Game" :title-link-class='linkClass(0)' >
              <h1 class="title">Add New Game</h1>
                <b-form @submit.prevent="onAddingGame">
                <b-form-group
                    id="input-group-home-team"
                    label-cols-sm="3"
                    label="Home Team ID:"
                    label-for="hometeamid"
                >
                    <b-form-input
                    id="hometeamid"
                    v-model="$v.addGameForm.homeTeamId.$model"
                    type="text"
                    :state="validateGameState('homeTeamId')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addGameForm.homeTeamId.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addGameForm.homeTeamId.required">
                     Home Team Id is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    id="input-group-away-team"
                    label-cols-sm="3"
                    label="Away Team ID:"
                    label-for="awayteamid"
                >
                    <b-form-input
                    id="awayteamid"
                    type="text"
                    v-model="$v.addGameForm.awayTeamId.$model"
                    :state="validateGameState('awayTeamId')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addGameForm.awayTeamId.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addGameForm.awayTeamId.required">
                     Away Team Id is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-game-date"
                    label-cols-sm="3"
                    label="Date:"
                    label-for="date"
                >
                    <b-form-datepicker
                    id="date"
                    type="text"
                    placeholder="Choose a date"
                    v-model="$v.addGameForm.date.$model"
                    :state="validateGameState('date')"
                    ></b-form-datepicker>
                    <b-form-invalid-feedback >
                      Date is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-game-time"
                    label-cols-sm="3"
                    label="Time:"
                    label-for="time"
                >
                    <b-form-timepicker
                    :hour12='false'
                    placeholder="Choose a time"
                    id="time"
                    type="text"
                    v-model="$v.addGameForm.time.$model"
                    :state="validateGameState('time')"
                    ></b-form-timepicker>
                    <b-form-invalid-feedback >
                      Game time is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-game-field"
                    label-cols-sm="3"
                    label="Stadium:"
                    label-for="field"
                >
                    <b-form-input
                    id="field"
                    type="text"
                    v-model="$v.addGameForm.field.$model"
                    :state="validateGameState('field')"
                    ></b-form-input>
                    <b-form-invalid-feedback >
                      Please choose a stadium
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-game-referee"
                    label-cols-sm="3"
                    label="Referee:"
                    label-for="referee"
                >
                    <b-form-input
                    id="referee"
                    type="text"
                    v-model="$v.addGameForm.referee.$model"
                    :state="validateGameState('referee')"
                    ></b-form-input>
                    <b-form-invalid-feedback >
                      Please choose a referee
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-button
                    type="submit"
                    variant="primary"
                    style="width:100px;display:block;"
                    class="mx-auto w-100"
                    >Add Game</b-button
                >
                </b-form>
                <b-alert
                class="mt-2"
                v-if="addGameForm.submitError"
                variant="warning"
                dismissible
                show
                >
                Adding result failed: {{ addGameForm.submitError }}
                </b-alert>  
            </b-tab>               
            <b-tab title="Add Game Event" :title-link-class='linkClass(1)'>
              <h1 class="title">Add Game Event</h1>
                <b-form @submit.prevent="onAddingEvent">
                <b-form-group
                    id="input-group-game-id"
                    label-cols-sm="3"
                    label="Game ID:"
                    label-for="gameid"
                >
                    <b-form-input
                    id="gameid"
                    v-model="$v.addEventForm.gameId.$model"
                    type="text"
                    :state="validateEventState('gameId')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addEventForm.gameId.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addEventForm.gameId.required">
                     Game Id is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    id="input-group-game-time"
                    label-cols-sm="3"
                    label="Game time:"
                    label-for="gametime"
                >
                    <b-form-timepicker
                    :hour12='false'
                    placeholder="Choose a time"
                    id="gametime"
                    type="text"
                    v-model="$v.addEventForm.gameTime.$model"
                    :state="validateEventState('gameTime')"
                    ></b-form-timepicker>
                    <b-form-invalid-feedback v-if="!$v.addEventForm.gameTime.required">
                     Game time is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-game-minute"
                    label-cols-sm="3"
                    label="Game minute:"
                    label-for="gameminute"
                >
                    <b-form-input
                    id="gameminute"
                    type="text"
                    v-model="$v.addEventForm.gameMinute.$model"
                    :state="validateEventState('gameMinute')"
                    ></b-form-input>
                    <b-form-invalid-feedback >
                      Game minute is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-title"
                    label-cols-sm="3"
                    label="Title:"
                    label-for="title"
                >
                    <b-form-input
                    id="title"
                    type="text"
                    v-model="$v.addEventForm.title.$model"
                    :state="validateEventState('title')"
                    ></b-form-input>
                    <b-form-invalid-feedback >
                      Title is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-description"
                    label-cols-sm="3"
                    label="Description:"
                    label-for="description"
                >
                    <b-form-input
                    id="description"
                    type="text"
                    v-model="$v.addEventForm.description.$model"
                    :state="validateEventState('description')"
                    ></b-form-input>
                    <b-form-invalid-feedback >
                      Please enter a description
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-button
                    type="submit"
                    variant="primary"
                    style="width:100px;display:block;"
                    class="mx-auto w-100"
                    >Add Event</b-button
                >
                </b-form>
                <b-alert
                class="mt-2"
                v-if="addEventForm.submitError"
                variant="warning"
                dismissible
                show
                >
                Adding event failed: {{ addEventForm.submitError }}
                </b-alert>  
            </b-tab>
            <b-tab title="Add Game Result" :title-link-class='linkClass(2)'>
                <h1 class="title">Add Game Result</h1>
                <b-form @submit.prevent="onAddingResult">
                <b-form-group
                    id="input-group-gameid"
                    label-cols-sm="3"
                    label="Game Id:"
                    label-for="gameid"
                >
                    <b-form-input
                    id="gameid"
                    v-model="$v.addResultForm.gameId.$model"
                    type="text"
                    :state="validateResultState('gameId')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addResultForm.gameId.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addResultForm.gameId.required">
                    Game Id is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    id="input-group-home-score"
                    label-cols-sm="3"
                    label="Home Team Score:"
                    label-for="homeScore"
                >
                    <b-form-input
                    id="homeScore"
                    type="text"
                    v-model="$v.addResultForm.homeScore.$model"
                    :state="validateResultState('homeScore')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addResultForm.homeScore.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addResultForm.homeScore.required">
                    Number of goals for Home Team is required
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    id="input-group-away-score"
                    label-cols-sm="3"
                    label="Away Team Score:"
                    label-for="awayScore"
                >
                    <b-form-input
                    id="awayScore"
                    type="text"
                    v-model="$v.addResultForm.awayScore.$model"
                    :state="validateResultState('awayScore')"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.addResultForm.awayScore.numeric">
                      Please enter a numeric value
                    </b-form-invalid-feedback> 
                    <b-form-invalid-feedback v-else-if="!$v.addResultForm.awayScore.required">
                      Number of goals for Away Team is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-button
                    type="submit"
                    variant="primary"
                    style="width:100px;display:block;"
                    class="mx-auto w-100"
                    >Add Result</b-button
                >
                </b-form>
                <b-alert
                class="mt-2"
                v-if="addResultForm.submitError"
                variant="warning"
                dismissible
                show
                >
                Adding result failed: {{ addResultForm.submitError }}
                </b-alert>

            </b-tab>
            <b-tab title="Games" :title-link-class='linkClass(3)'>
              <h1>Past Games:</h1>
              <GamePreview v-for="game in pastGames"
                class="text-dark"
                :key="game.id"
                :id ="game.id"
                :hostTeam="game.away_team_name+'['+game.away_team+']'"
                :guestTeam="game.away_team_name+'['+game.away_team+']'"
                :date="game.game_date_time.split('T')[0]"
                :hour="game.game_date_time.split('T')[1].split('.')[0]"
                :field="game.field"
                :gameScore="game.home_team_score + ':' + game.away_team_score"
                :setBtn="false"
                :showId="true"
                >
              </GamePreview>  
              <h1>Future Games:</h1>
              <GamePreview v-for="game in futureGames"
                class="text-dark"
                :key="game.id"
                :id ="game.id"
                :hostTeam="game.home_team_name+'['+game.home_team+']'"
                :guestTeam="game.away_team_name+'['+game.away_team+']'"
                :date="game.game_date_time.split('T')[0]"
                :hour="game.game_date_time.split('T')[1].split('.')[0]"
                :field="game.field"
                :setBtn="false"
                :showId="true"

                >
              </GamePreview>
              <!-- <GamesPage
              :favoriteBtn="false"
              ></GamesPage> -->
              </b-tab> 
              
            
        </b-tabs>
    </div>
</div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import GamePreview from "../components/GamePreview.vue";
// import GamesPage from "./GamesPages.vue";
export default {
  name: "AssRep",
  data() {
    return {
        tabIndex: 0,
        pastGames: [],
        futureGames: [],
        addResultForm: {
            gameId: "",
            homeScore: undefined,
            awayScore: undefined,
            submitError: undefined,
        },
        addGameForm: {
          homeTeamId: "",
          awayTeamId: "",
          date: "",
          time: "",
          field: "",
          referee: "",
        },
        addEventForm: {
          gameId: "",
          gameTime: "",
          gameMinute: "",
          title:"",
          description:"",
        }
    };
  },
  validations: {
    addResultForm: {
      gameId: {
        required,
        numeric 
      },
      homeScore: {
        required,
        numeric
      },
      awayScore: {
        required,
        numeric
      }
    },
    addGameForm: {
      homeTeamId: {
        required,
        numeric
      },
      awayTeamId: {
        required,
        numeric
      },
      date: "",
      time: "",
      field: "",
      referee: "",
    },
    addEventForm: {
      gameId: {
        required, 
        numeric
      },
      gameTime: "",
      gameMinute: {
        required,
        numeric
      },
      title:{
        required
      },
      description:{
        required
      },
    }

  },
  components: {
      GamePreview,
      // GamesPage
  },
  methods: {
    linkClass(idx) {

        if (this.tabIndex === idx) {
          return ['text-dark']
        } else {
          return ['text-light']
        }
      },
    async getGames(){
        try {
        const response = await this.axios.get(
        "http://localhost:3000/games/stageGames"
        );
        // console.log(response.data.past)
        this.pastGames = [...response.data.past];
        // console.log("PAST: " + this.pastGames)
        this.futureGames = [...response.data.future];
        // console.log("FUTURE: " + this.futureGames)
        }
        catch(error){
            console.log(err.response)
        }
    },
    onAddingResult(){
        this.addResultForm.submitError = undefined;
        this.$v.addResultForm.$touch();
        if (this.$v.addResultForm.$anyError) {
          return;
        }
        this.setResult();
    },
    onAddingEvent(){
        this.addEventForm.submitError = undefined;
        this.$v.addEventForm.$touch();
        if (this.$v.addEventForm.$anyError) {
          return;
        }
        this.addEvent();
    },
    checkConnection(){
      if(!this.$root.store.username || !this.$root.store.userPermissions.includes('representative')){
            this.$router.push('*').catch(() =>{
                this.$forceUpdate();
            });
            return false;
      }
      return true;

    },
    onAddingGame(){
        this.addGameForm.submitError = undefined;
        this.$v.addGameForm.$touch();
        if (this.$v.addGameForm.$anyError) {
          return;
        }
        this.addGame();
    },
    validateResultState(param) {
        const { $dirty, $error } = this.$v.addResultForm[param];
        return $dirty ? !$error : null;
    },
    validateGameState(param) {
        const { $dirty, $error } = this.$v.addGameForm[param];
        return $dirty ? !$error : null;
    },
    validateEventState(param){
        const { $dirty, $error } = this.$v.addEventForm[param];
        return $dirty ? !$error : null;
    },
    async setResult(){
      try{
        const response = await this.axios.post(
        "http://localhost:3000/associationRepresentative/addGameResult",
        {
          game_id : this.addResultForm.gameId,
          home_team_score : this.addResultForm.homeScore,
          away_team_score : this.addResultForm.awayScore
        }
        );
        this.addResultForm.gameId = undefined
        this.addResultForm.homeScore = undefined
        this.addResultForm.awayScore = undefined
        this.$root.toast("Result Added", "Game result added successfully", "success");
      }
      catch(err){
        console.log(err.response)
      }
    },
    async addGame(){
      try{
        const response = await this.axios.post(
        "http://localhost:3000/games/addGame",
        {
          home_team: this.addGameForm.homeTeamId,
          away_team: this.addGameForm.awayTeamId,
          game_date_time: this.addGameForm.date+" "+this.addGameForm.time,
          field: this.addGameForm.field,
          referee_name: this.addGameForm.referee
        }
        );
        // console.log(response)
        // this.addResultForm.gameId = undefined
        // this.addResultForm.homeScore = undefined
        // this.addResultForm.awayScore = undefined
        this.$root.toast("Game Added", "Game added successfully", "success");
      }
      catch(err){
        console.log(err.response)
      }
    },
    async addEvent(){
      try{
        const response = await this.axios.post(
        "http://localhost:3000/associationRepresentative/addEventSchedule",
        {
          game_id : this.addEventForm.gameId,
          game_time : this.addEventForm.gameTime,
          game_minute : this.addEventForm.gameMinute,
          title: this.addEventForm.title,
          description : this.addEventForm.description,
        }
        );
        // this.addResultForm.gameId = undefined
        // this.addResultForm.homeScore = undefined
        // this.addResultForm.awayScore = undefined
        this.$root.toast("Event Added", "Game event added successfully", "success");
      }
      catch(err){
        console.log(err.response)
      }
    },
  },
  mounted(){
    if(!this.checkConnection()){
      return;
    }
    this.getGames()
  }
  
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 650px;
  color: whitesmoke;
}

.tab-title{
  color: whitesmoke;
}

#search-input {
//   margin-left: 20px; 
  width: 500px; 
}
</style>
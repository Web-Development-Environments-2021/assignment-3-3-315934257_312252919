<template>
  <b-card bg-variant="light" id="card">
    <b-card-title>
      <span @click="goToPage('home')" style="cursor:pointer">{{hostTeam}}</span> VS. <span @click="goToPage('away')" style="cursor:pointer">{{guestTeam}}</span>
    </b-card-title>
    <b-card-text>
      <ul class="game-content">
        <li v-if="showId"> Game Id: {{id}} </li>
        <li> Date: {{ date }}</li>
        <li> Time: {{ hour }}</li>
        <li v-if="field">Stadium: {{field}} </li>
        <li v-if="gameScore">Score: {{gameScore}}</li>
      </ul>
      <b-button id="favbtn" v-if="setBtn & !isHidden" @click='addAsFavorite(id)' class="mt-auto btn btn-block btn-primary">Add as Favorite</b-button>
      <b-list-group v-if="events">
          <b-list-group-item variant="secondary" v-for="event in events" :key="event.id">
            <h5>{{event.title}}</h5>
            <p>Game Time: {{event.game_time}}, Game Minute: {{event.game_minute}}, Description: {{event.description}}</p>
          </b-list-group-item>
      </b-list-group>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      hostTeamId: {
        type: Number,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      guestTeamId: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      field: {
        type: String,
      },
      gameScore: {
        type: String,
      },
      setBtn: {
        type: Boolean,
        required: true
      },
      showId: {
        type: Boolean,
      },
      events:{
        type: Array,
      }
  },
  data() {
    return {
      isHidden: false,
    };
  },
  methods : {
    async addAsFavorite(gameId){
      try{
        const response = await this.axios.post(
        "http://localhost:3000/users/favoriteGames", {
          gameId: gameId,
        }
        );
        // console.log(response)
        this.isHidden = true;
      }
      catch(error){
        console.log(error.response)
      }
    },
    goToPage(team){
      console.log("Innnnn");
      if (team == "home"){
        console.log(team);
        this.$router.push("/team/" + this.hostTeamId).catch(() =>{
                this.$forceUpdate();
            });
      }
      else if (team == "away"){
        console.log(team);
        this.$router.push("/team/" + this.guestTeamId).catch(() =>{
                this.$forceUpdate();
            });
      }
    }
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 300px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
#card{
  position: relative;
}
#favbtn{
  position: absolute;
  bottom: 0;
  left: 0;
}



</style>

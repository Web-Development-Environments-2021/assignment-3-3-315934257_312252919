<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> Host Team: {{ hostTeam }}</li>
      <li> Guest Team: {{ guestTeam }}</li>
      <li> Date: {{ date }}</li>
      <li> Time: {{ hour }}</li>
      <li v-if="field">Stadium: {{field}} </li>
      <li v-if="gameScore">Score: {{gameScore}}</li>
    </ul>
    <b-button v-if="setBtn & !isHidden" @click='addAsFavorite(id)'>Add as Favorite</b-button>
  </div>
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
      guestTeam: {
        type: String,
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



</style>

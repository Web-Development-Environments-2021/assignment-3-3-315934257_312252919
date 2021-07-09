<template>
  <div class='favGame' v-if="alreadyMounted">
    <div v-if="games.length !=0">
      <GamePreview
        v-for="g in games"
        :id="g.game_id" 
        :hostTeam="g.home_team_name"
        :hostTeamId="g.home_team_id" 
        :guestTeam="g.away_team_name" 
        :guestTeamId="g.away_team_id" 
        :date="g.game_date_time.split('T')[0]"
        :hour="g.game_date_time.split('T')[1].split('.')[0]"
        :field="g.field"
        :setBtn='false'
        :key="g.game_id">
      </GamePreview>
    </div>
    <div v-else>
      <p>No Favourite Games!!</p>
    </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: [],
      alreadyMounted: false
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        this.alreadyMounted = true;
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    }
  },
  // beforeMount(){
  //   console.log("favorite games mounted");
  //   this.updateGames(); 
  // }, 
  mounted(){
    this.updateGames();
  }
};
</script>

<style>
.favGame{
  padding: 0;
}
</style>

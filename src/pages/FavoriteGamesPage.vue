<template>
  <div v-if="isAlreadyMounted">
    <div v-if="games.length !=0">
      <GamePreview
        v-for="g in games"
        :id="g.game_id" 
        :hostTeam="g.home_team_name+'['+g.home_team_id+']'" 
        :guestTeam="g.away_team_name+'['+g.away_team_id+']'" 
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
import GamePreview from '../components/GamePreview.vue'
export default {
    name: "FavoriteGamesPage",
    data () {
        return {
            games: [],
            isAlreadyMounted: false,
        };
    },
    components: {
        GamePreview
    },
    methods: {
        async updateGames(){
            console.log("response");
            try {
                const response = await this.axios.get(
                "http://localhost:3000/users/favoriteGames",
                );
                const games = response.data;
                this.games = [];
                this.games.push(...games);
                console.log(this.games);
                this.isAlreadyMounted = true;
            } catch (error) {
                console.log("error in update games");
                console.log(error);
            }
        },
        checkConnection(){
            if(!this.$root.store.username){
                    this.$router.push('*').catch(() =>{
                        this.$forceUpdate();
                    });
                    return false;
            }
            return true;

        },
    }, 
    mounted(){
        if(!this.checkConnection()){
            return;
        }
        this.updateGames();
    }
}
</script>

<style lang="scss" scoped>

</style>
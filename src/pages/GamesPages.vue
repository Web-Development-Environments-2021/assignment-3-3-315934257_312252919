<template>
    <div class='main' v-if="alreadyMounted">
        <h1 class="title">Past Games:</h1>
            <GamePreview v-for="game in pastGames" ref='past'
            :style="{width: '95%', marginTop: '5%'}"
            :key="game.id"
            :id ="game.id"
            :hostTeam="game.home_team_name"
            :hostTeamId="game.home_team"
            :guestTeam="game.away_team_name"
            :guestTeamId="game.away_team"
            :date="game.game_date_time.split('T')[0]"
            :hour="game.game_date_time.split('T')[1].split('.')[0]"
            :field="game.field"
            :gameScore="game.home_team_score + ':' + game.away_team_score"
            :setBtn="false"
            :events='game.events'
            >
            </GamePreview>  
        
        <h1 class="title">Future Games:</h1>
        <b-card-group deck>
            <GamePreview v-for="game in futureGames" ref='future'
            :style="{margin: '5px'}"
            :key="game.id"
            :id ="game.id"
            :hostTeam="game.home_team_name"
            :hostTeamId="game.home_team"
            :guestTeam="game.away_team_name"
            :guestTeamId="game.away_team"
            :date="game.game_date_time.split('T')[0]"
            :hour="game.game_date_time.split('T')[1].split('.')[0]"
            :field="game.field"
            :setBtn="!findGameInFavorites(game)"
            >
            </GamePreview>
        </b-card-group>
    </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue"
    export default {
        name: "Games",
        data() {
            return {
                pastGames: [],
                futureGames: [],
                userFavoriteGames: [],
                alreadyMounted: false,
            };
        },
        components: {
            GamePreview
        },
        methods: {
            async getGames(){
                try {
                const response = await this.axios.get(
                "http://localhost:3000/games/stageGames"
                );
                console.log(response.data.past)
                console.log("BREAK----")
                console.log(response.data.future)
                this.pastGames = [...response.data.past];
                // console.log("PAST: " + this.pastGames)
                this.futureGames = [...response.data.future];
                // console.log("FUTURE: " + this.futureGames)
                this.alreadyMounted = true;
                }
                catch(error){
                    console.log(err.response)
                }
            },
            async getFavoriteGames(){
                try {
                    const response = await this.axios.get(
                    "http://localhost:3000/users/favoriteGames",
                    );
                    const games = response.data;
                    this.userFavoriteGames = [];
                    this.userFavoriteGames.push(...games);
                    // console.log(this.userFavoriteGames)
                    // console.log(response);
                    // this.alreadyMounted = true;
                } catch (error) {
                    // console.log("error in update games");
                    console.log(error);
                }
            },
            findGameInFavorites(game){
                // console.log("IN FIND")
                if(!this.$root.store.username){
                    return true;
                }
                for(const userGame of this.userFavoriteGames){
                    if(game.id == userGame.game_id){
                        return true;
                    }
                }
                return false;
            }

        },
        mounted(){
            if(this.$root.store.username){
                    this.getFavoriteGames();
                }
            this.getGames();
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  color: whitesmoke;
}
.main{
    display: block;
    margin-left: 10%;
    margin-right: 10%;
}
</style>

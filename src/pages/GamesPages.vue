<template>
    <div v-if="alreadyMounted">
        <h1>Past Games:</h1>
        <GamePreview v-for="game in pastGames" ref='past'
        :key="game.id"
        :id ="game.id"
        :hostTeam="game.home_team_name+'['+game.home_team+']'"
        :guestTeam="game.away_team_name+'['+game.away_team+']'"
        :date="game.game_date_time.split('T')[0]"
        :hour="game.game_date_time.split('T')[1].split('.')[0]"
        :field="game.field"
        :gameScore="game.home_team_score + ':' + game.away_team_score"
        :setBtn="false"
        >
        </GamePreview>  
        <h1>Future Games:</h1>
        <GamePreview v-for="game in futureGames" ref='future'
        :key="game.id"
        :id ="game.id"
        :hostTeam="game.home_team_name+'['+game.home_team+']'"
        :guestTeam="game.away_team_name+'['+game.away_team+']'"
        :date="game.game_date_time.split('T')[0]"
        :hour="game.game_date_time.split('T')[1].split('.')[0]"
        :field="game.field"
        :setBtn="!findGameInFavorites(game)"
        >
        </GamePreview>
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
                // console.log(response.data.past)
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
                for(const userGame of this.userFavoriteGames){
                    if(game.id == userGame.game_id){
                        return true;
                    }
                }
                return false;
            }

        },
        mounted(){
            this.getFavoriteGames();
            this.getGames();
            
            
        }
    }
</script>

<style lang="sass" scoped>

</style>
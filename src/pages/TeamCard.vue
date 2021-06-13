<template>
    <div class="team-card">
        <!-- <div :title="full_name" class="team-title"> -->
        <div class="team-title">
            <b>Name:</b> {{ team_name }}
        </div>
        <div class="team-content">
            <PlayerPreview 
            v-for="p in players"
            :id="p.id"
            :full_name="p.name"
            :team="p.team_name"
            :image="p.image"
            :position="p.position"
            :key="p.id">
            </PlayerPreview>

            <GamePreview v-for="g in past_games"
            :id="g.game_id"
            :hostTeam="g.home_team"
            :guestTeam="g.away_team"
            :date="g.game_date_time.split('T')[0]"
            :hour="g.game_date_time.split('T')[1].split('.')[0]"
            :key="g.id">
            </GamePreview>

            <GamePreview v-for="g in future_games"
            :id="g.game_id"
            :hostTeam="g.home_team"
            :guestTeam="g.away_team"
            :date="g.game_date_time.split('T')[0]"
            :hour="g.game_date_time.split('T')[1].split('.')[0]"
            :key="g.id">
            </GamePreview>

        </div>
    </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue"
import GamePreview from "../components/GamePreview.vue"
export default {
    name: "TeamCard",
    components:{
        PlayerPreview,
        GamePreview
    },
    props:{
        
    },
    data(){
        return{
            
            players:[],
            past_games:[],
            future_games:[],
            team_name:"",


        };
    },
    methods:{
        async updateTeam(id){
            try{
                console.log("Innnnn!!!!!!");
                const response = await this.axios.get(
                    "http://localhost:3000/teams/teamFullDetails/" + id,
                );
                console.log(response.data);
                const players = response.data.players_info;
                const past = response.data.past_games;
                const future = response.data.future_games;
                this.players = [];
                this.past_games = [];
                this.future_games = [];
                this.players.push(...players);
                this.past_games.push(...past);
                this.future_games.push(...future);
            }
            catch (error){
                console.log("error in update TeamCard");
                console.log(error);
            }
        }
    },
    async mounted(){
        console.log(this.$route.params.id);
        await this.updateTeam(this.$route.params.id);
        console.log("Team mount done")
    }
}
</script>

<style lang="scss" scoped>

</style>
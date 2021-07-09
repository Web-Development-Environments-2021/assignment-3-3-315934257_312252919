<template>
    <div>
        <b-card img-left v-bind:img-src="logo">
            <b-card-text>
                <h3 class="title" id="team_name">{{team_name}}</h3>
            </b-card-text>
        </b-card>
        <h2 class="title" v-if="players.length>0">Team Players</h2>
        <b-card-group deck>
            <PlayerPreview class="pp"
            v-for="p in players"
            :id="p.id"
            :full_name="p.name"
            :team="p.team_name"
            :image="p.image"
            :position="p.position"
            :key="p.id">
            </PlayerPreview>
        </b-card-group>
        <h2 class="title" v-if="past_games.length>0">Past Games</h2>
        <GamePreview v-for="g in past_games"
        :id="g.game_id"
        :hostTeam="g.home_team_name"
        :hostTeamId="g.home_team_id"
        :guestTeam="g.away_team_name"
        :guestTeamId="g.away_team_id"
        :date="g.game_date_time.split('T')[0]"
        :hour="g.game_date_time.split('T')[1].split('.')[0]"
        :key="g.id"
        :setBtn="false">
        </GamePreview>
        <h2 class="title" v-if="future_games.length>0">Future Games</h2>
        <GamePreview v-for="g in future_games"
        :id="g.game_id"
        :hostTeam="g.home_team_name"
        :hostTeamId="g.home_team_id"
        :guestTeam="g.away_team_name"
        :guestTeamId="g.away_team_id"
        :date="g.game_date_time.split('T')[0]"
        :hour="g.game_date_time.split('T')[1].split('.')[0]"
        :key="g.id"
        :setBtn="false">
        </GamePreview>
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
    data(){
        return{
            players:[],
            past_games:[],
            future_games:[],
            team_name:"",
            logo:""
        };
    },
    methods:{
        async updateTeam(id){
            try{
                const response = await this.axios.get(
                    "http://localhost:3000/teams/teamFullDetails/" + id,
                );
                const players = response.data.players_info;
                const past = response.data.past_games;
                const future = response.data.future_games;
                this.team_name = response.data.team_info.team_name;
                this.logo = response.data.team_info.logo;
                this.players = [];
                this.past_games = [];
                this.future_games = [];
                this.players.push(...players);
                this.past_games.push(...past);
                this.future_games.push(...future);
                console.log(this.future_games);
            }
            catch (error){
                console.log("error in update TeamCard");
                console.log(error);
            }
        }
    },
    async mounted(){
        await this.updateTeam(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
.title{
  text-align: center;
  color:whitesmoke;
}
#team_name{
    padding-top: 35px;
    color:black;
}
.pp{
    max-width: 400px;
    max-height: 165px;
    margin: 30px;
}
</style>
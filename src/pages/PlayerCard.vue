<template>
    <div v-if="alreadyMounted" class="player-card">
        <div :title="full_name" class="player-title">
            <b>Name:</b> {{ full_name }}
        </div>
        <ul class="player-content">
            <li> common name: {{ common_name }}</li>
            <li> team: {{ team }}</li>
            <li> position: {{ position }}</li>
            <li> nationality: {{ nationality }}</li>
            <li> born: {{ date_of_birth }}</li>
            <li> height: {{ height }}</li>
            <li> weight: {{ weight }}</li>
        </ul>

    </div>
</template>

<script>
export default {
    name: "PlayerCard",
    data() {
        return {
            // Preview Details
            id:0,
            full_name:"",
            team: "",
            image: "",
            position:0,
            // other Details
            common_name: "",
            nationality: "",
            date_of_birth: "",
            height: 0,
            weight:0,

            alreadyMounted: false,
        }
        
    },
    methods: {
        async getPlayerData(idd){
            try{
                let query = "http://localhost:3000/players/getFullDetails/" + idd;
                const response = await this.axios.get(query);
                console.log(response);
                let data = response.data;
                this.id = idd;
                this.full_name = data.name;
                this.team = data.team_name;
                this.image = data.image;
                this.position = data.position;
                this.common_name = data.common_name;
                this.nationality = data.nationality;
                this.date_of_birth = data.birthdate;
                this.height = data.height;
                this.weight = data.weight;

                this.alreadyMounted = true;
            
            // birthcountry: birthcountry,
            
            } catch (error){
                console.log("error in Player Card");
                console.log(error);
            }
            
        }

    },
    mounted(){
        console.log(this.$route.params.id);
        this.getPlayerData(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
.player-card {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.player-card .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-card .player-content {
  width: 100%;
  overflow: hidden;
}

</style>
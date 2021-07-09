<template>
    <div v-if="alreadyMounted" class="player-card">
        <b-img v-bind:src="image" center thumbnail ></b-img>
        <b-card :title="full_name" bg-variant="light">
            <b-row>
                <b-col>
                    <p> Common Name: {{ common_name }}</p>
                    <p> Team: {{ team }}</p>
                    <p> Position: {{ position }}</p>
                </b-col>
                <b-col>
                    <p> Nationality: {{ nationality }}</p>
                    <p> Born on  {{ date_of_birth }}</p>
                    <p> Height: {{ height }}</p>
                    <p> Weight: {{ weight }}</p>
                </b-col>
            </b-row>
        </b-card>
        <!-- <div title="details" class="player-content">
            <p> common name: {{ common_name }}</p>
            <p> team: {{ team }}</p>
            <p> position: {{ position }}</p>
            <p> nationality: {{ nationality }}</p>
            <p> born on  {{ date_of_birth }}</p>
            <p> height: {{ height }}</p>
            <p> weight: {{ weight }}</p>
        </div> -->
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
        this.getPlayerData(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
#name{
    text-align: center;
    color: whitesmoke;
}
// .player-card {
// }

// .player-card .player-title {
//   text-align: center;
//   text-transform: uppercase;
//   color:  rgb(111, 197, 157);
// }

.player-content {
  width: 100%;
  overflow: hidden;
  text-align: center;
  color: whitesmoke;
}
// p{
//   text-align: center;
//   color: whitesmoke;
// }

</style>
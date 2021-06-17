<template>
  <div>
  <b-card no-body class="overflow-hidden">
    <b-row>
      <b-col>
        <b-card-img v-bind:src="image" img-height="200" img-width="200" alt="Image" class="rounded-0" v-on:click="goToPage()" style="cursor:pointer"></b-card-img>
      </b-col>
      <b-col>
        <b-card-body>
          <b-card-text>
              <b v-on:click="goToPage()" style="cursor:pointer">{{full_name}}</b>
            <ul class="player-content">
                <li> team: {{ team }}</li>
                <li> position: {{ position }}</li>
            </ul>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
//needed to add functionality to redirect to PlayerCard!!!
export default {
    name: "PlayerPreview",
    props:{
        id:{
            type: Number,
            required:true
        },
        full_name:{
            type: String,
            required: true
        },
        team:{
            type: String,
            required:true
        },
        image: {
            type: String,
            required: true
        },
        position:{
            type: Number,
            required: true
        },
    },
    methods:{
        goToPage(){
            this.$router.push("/player/" + this.id).catch(() =>{
                this.$forceUpdate();
            });
        }
    }
    
}
</script>

<style lang="scss" scoped>
// .player-preview {
//   display: inline-block;
//   width: 250px;
//   height: 200px;
//   position: relative;
//   margin: 10px 10px;
//   border-style: solid;
//   border-radius: 10px;
//   border-width: 5px;
//   border-color:cadetblue;
// }

// .player-preview .player-title {
//   text-align: center;
//   text-transform: uppercase;
//   color:  rgb(111, 197, 157);
// }

// .player-preview .player-content {
//   width: 100%;
//   overflow: hidden;
// }
</style>
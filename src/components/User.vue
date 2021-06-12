<template>
  <div>
  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="20">
        <b-card-body v-bind:title="id.toString()">
          <b-card-text>
            <p> <b>Username:</b> {{ username }}</p>
            <b-button variant="outline-primary" @click="chosen">Choose</b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
export default {
    name: "User",
    props:{
        id:{
            type: Number,
            required:true
        },
        username:{
            type: String,
            required: true
        }
    },
    methods: {
        chosen(){
            this.$parent.selectedUserId = this.id;
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

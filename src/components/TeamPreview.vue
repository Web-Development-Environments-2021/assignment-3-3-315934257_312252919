<template>
    <div>
        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img v-bind:src="image" alt="Image" class="rounded-0" v-on:click="goToPage()" style="cursor:pointer"></b-card-img>
            </b-col>
            <b-col md="6">
                <!-- <b-card-body v-bind:title="team_name"> -->
                <b-card-body>
                    <b v-on:click="goToPage()" style="cursor:pointer"> {{team_name}}</b>
                <!-- <b-card-text>
                </b-card-text> -->
                </b-card-body>
            </b-col>
            </b-row>
        </b-card>

    </div>
</template>

<script>
export default {
    name:"TeamPreview",
    props:{
        id:{
            type: Number,
            required:true
        },
        team_name:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
    },
    methods:{
        goToPage(){
            console.log("Page");
            this.$router.push("/team/" + this.id).catch(() =>{
                this.$forceUpdate();
            });
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>
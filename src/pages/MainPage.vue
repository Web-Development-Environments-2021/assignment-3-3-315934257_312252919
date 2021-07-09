<template>
  <div>
    <h1 class="title">YOUR GAMES IN ONE PLACE</h1>
    
      <b-container>
        <b-row>
          <b-col>
            <!-- <b-card-group> -->
            <LeagueInfo></LeagueInfo>
            <!-- </b-card-group> -->
          </b-col>
          <b-col>
            <!-- <b-card-group> -->
              <LoginPage v-if="!$root.store.username"></LoginPage>
              <FavoriteGames :isMainPage=true v-else></FavoriteGames>
            <!-- </b-card-group>   -->
          </b-col>
        </b-row>
      </b-container>  

  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.title{
  text-align: center;
  color:whitesmoke;
}
</style>

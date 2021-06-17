<template>
  <div>
    <h1 class="title">YOUR GAMES IN ONE PLACE</h1>
    <b-container>
      <b-row>
        <b-col>
          <LeagueInfo></LeagueInfo>
        </b-col>
        <b-col>
          <LoginPage v-if="!$root.store.username"></LoginPage>
          <FavoriteGames v-else></FavoriteGames>
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

<template>
  <div>
    <h1 class="title">Main Page</h1>
    <div class='container' v-if="!$root.store.username">
      <LoginPage v-if="!$root.store.username"></LoginPage>
    </div>
    <div class='container' v-else>
      <FavoriteGames ></FavoriteGames>
    </div>
    <div class='leagueInfo'>
    <LeagueInfo></LeagueInfo>
    </div>
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
.container{
  position: relative;
  right: 0;
  margin-right: 0;
}
.leagueInfo{
  float:left;
  position:fixed;
  
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>

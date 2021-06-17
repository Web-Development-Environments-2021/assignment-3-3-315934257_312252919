<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">
        <font-awesome-icon :icon="['fas', 'futbol']" />
        Managit</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'games'}">Games</b-nav-item>
        <b-nav-item :to="{ name: 'about'}">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item disabled>Hello, guest</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item :to="{name: 'assRep' }" v-if="$root.store.userPermissions.includes('representative')">
              Association Representative
          </b-nav-item>
          <b-nav-item :to="{name: 'admin'}" v-if="$root.store.userPermissions.includes('admin')">
            Admin
            <!-- <b-dropdown-item :to="{ name: 'addAdmin' }">Add Admin</b-dropdown-item>
            <b-dropdown-item href="#">Add Representative</b-dropdown-item>
          </b-nav-item-dropdown> -->
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <!-- <b-avatar variant="info" text='CV' size="1.8rem"></b-avatar> -->
              {{$root.store.username}}
            </template>
            <b-dropdown-item :to="{name: 'favoriteGames'}">Favorites</b-dropdown-item>
            <b-dropdown-item v-on:click="Logout()" href="#">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      try{
        this.$root.store.logout();
        let response = await this.axios.post("http://localhost:3000/Logout");
        console.log(response.data);
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {this.$forceUpdate();});
      }catch(error){
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: url("https://media.istockphoto.com/photos/football-on-the-lawn-closeup-detail-picture-id901231120?k=6&m=901231120&s=612x612&w=0&h=uNOJUVfdkFLrzf681duQPoOgOR9J8h3yIaXufRDpXz8=") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
<div class="container">
    <h1 class="title">Admin Page</h1>
    <div v-if="alreadyMounted">
        <b-input-group prepend="Permissions:" class="search-input">
        <b-form-select v-model="selectedPermission" @change="getUsers" :options="permissions" ></b-form-select>
        </b-input-group>
        <b-input-group prepend="Choose User:" class="search-input">
        <b-form-input v-model="searchInput"  placeholder="Search for a user" @change="onSearch"></b-form-input>
        </b-input-group>
        <User v-for="user in filteredUsers"
        :key="user.user_id"
        :id="user.user_id"
        :username="user.username"
        >
        </User>
        <!-- </b-input-group> -->
        <b-input-group-append>
            <b-button variant="success" @click="addUser">Add</b-button>
        </b-input-group-append>
    </div>
  </div>
</template>

<script>
import User from "../components/User.vue"
export default {
  name: "Admin",
  data() {
    return {
        users: [],
        filteredUsers: [],
        permissions: ["Admin", "Association Representative"],
        selectedPermission : "Admin",
        searchInput: '',
        selectedUserId: undefined,
        alreadyMounted: false,
    };
  },
  components:{
      User
  },
  methods: {
    async getNonAdminUsers() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/admins/getNonAdminUsers"
        );
        // console.log(response.data[0]);
        // JSON.parse(JSON.stringify(obj))
        this.users = [...response.data];
        // this.usernames = [...response.data]
        // this.users = JSON.parse(JSON.stringify(this.users))
        for(let i=0;i<this.users.length;i++){
            this.users[i] = JSON.parse(JSON.stringify(this.users[i]))
            // this.usernames[i] = this.users[i].username
        }
        this.filteredUsers=[...this.users]

        // console.log(this.users)
        this.alreadyMounted = true;
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        // this.$root.store.login(this.form.username, response.data.permissionType);
        // this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
    },
    async getNonRepUsers() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/admins/getNonRepUsers"
        );
        // console.log(response);
        this.users = [...response.data];
        // this.usernames = [...response.data]
        // this.users = JSON.parse(JSON.stringify(this.users))
        for(let i=0;i<this.users.length;i++){
            this.users[i] = JSON.parse(JSON.stringify(this.users[i]))
            // this.usernames[i] = this.users[i].username
        }
        this.filteredUsers = [...this.users]
        this.alreadyMounted = true;
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        // this.$root.store.login(this.form.username, response.data.permissionType);
        // this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
    },
    async getUsers(){
        if(this.selectedPermission == "Admin"){
            await this.getNonAdminUsers();
            // console.log(this.users)
        }
        else{
            await this.getNonRepUsers();
            // console.log(this.users)
        }
    },
    onSearch(){
        const filtered = this.users.filter((item)=>{
            return this.searchInput.toLowerCase().split(' ').every(v => item.username.toLowerCase().includes(v))
        })
        this.filteredUsers = [...filtered];
    },
    async addUser(){
        try{
            if(confirm("Are you sure that you want to set these permissions?")){
                // console.log("asdas")
                const axiosPath = this.getPath()
                // console.log(axiosPath)
                // console.log(this.selectedUserId)
                const response = await this.axios.post(
                axiosPath,
                    {
                        userId: this.selectedUserId
                    }
                );
                // console.log(response)
            }
        }
        catch(error){
            console.log(error.response);
        // this.form.submitError = err.response.data.message;
        }

    },
    getPath(){
        // console.log("here")
        if(this.selectedPermission == "Admin"){
            return "http://localhost:3000/admins/addAdmin"
        }
        else{
            return "http://localhost:3000/admins/addRepresentative"
        }
    }

  },
  mounted(){
    this.getUsers();
      
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
}

#search-input {
//   margin-left: 20px; 
  width: 500px; 
}
</style>
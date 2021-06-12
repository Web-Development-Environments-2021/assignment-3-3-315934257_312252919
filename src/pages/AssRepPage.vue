<template>
<div class="container">
    <h1 class="title">Association Representative Page</h1>
    <div>
        <b-nav tabs>
            <b-nav-item active>Add Game</b-nav-item>
            <b-nav-item >Add Game Event</b-nav-item>
            <b-nav-item >Add Game Result</b-nav-item>
            
        </b-nav>
    </div>
</div>
</template>

<script>
export default {
  name: "Association Representative",
  data() {
    return {
        games: []
    };
  },
  
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 650px;
}

#search-input {
//   margin-left: 20px; 
  width: 500px; 
}
</style>
<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }}
  </div>
</template>

<script>
export default {
 data() {
    return {
      searchQuery:""
    };
  },
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>
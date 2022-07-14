<template>
    <div class="container">
        <Search class="search"/>
        <PokeFetch/>
    </div>
</template>

<script>
import Search from '../components/Search';
export default {
  name: 'PokeApi',
  components: {
    Search,
  }
}
</script>

<style>
.search {
  text-align: center;
}
</style>

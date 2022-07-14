<template>
    <div>
        <AppHeader :key="$route.fullPath"/>        
        <Search/>
        <h2>Welcome to my PokeApi project with Nuxt</h2>
        <PokeFetch/>
    </div>
</template>

<script>
import Search from '../components/Search';
import AppHeader from '../components/AppHeader';
export default {
  name: 'PokeApi',
  components: {
    Search,
    AppHeader
  }
}
</script>

<style>
    .body {
        min-height: 100vh;
        width: 100vw;
    }
</style>

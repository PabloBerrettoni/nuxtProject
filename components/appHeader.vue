<template>
  <header class="header">
    <div class="header-left">
      <ul>
        <li class="title">
          <nuxt-link :to="'/'" >PokeApi</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <template v-if="loggedIn" class="header-left">
        <li class="title">
          <nuxt-link :to="'/user/profile'" exact>Profile</nuxt-link>
          <p @click="logout">Sign Out</p>
        </li>
      </template>
      <template v-else class="header-left">
        <li class="title">
          <nuxt-link :to="'/user/register'" exact>Sign up</nuxt-link>
          <nuxt-link :to="'/user/login'" exact>Sign in</nuxt-link>
        </li>
      </template>
    </div>
  </header>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: "appHeader",
        data() {
          return {
            loggedIn: null
          }
        },
        mounted() {
          if (Cookies.get('jwt')) {
            this.loggedIn = true;
          }
        },
        methods: {
          logout() {
            Cookies.remove('jwt');
            localStorage.removeItem('userId');
            localStorage.removeItem('pokeFavsUser');
            this.$router.push('/user/login');
          }
        }
    }
</script>

<style scoped>

.header {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}
ul {
  display: flex;
  padding: 0;
}
li {
  list-style-type: none;
}
a, p {
  display: inline-block;
  cursor: pointer;
  background: #333;
  color: #fff;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}

.header-right {}

</style>

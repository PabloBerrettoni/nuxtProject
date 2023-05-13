<template>
  <header>
    <div class="header">
      <div class="firstColumn">
        <div class="header-left">
          <ul>
            <li class="title" >
              <nuxt-link :to="'/'" @click.prevent="updateOffset" >PokeApi</nuxt-link>
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
      </div>
      <div class="searchContainerHeader">
        <Search />
      </div>
    </div>
    <div class="desktopHeader">
      <div class="firstColumn">
        <div class="header-left">
          <ul>
            <li class="title">
              <nuxt-link :to="'/'" >PokeApi</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="searchContainerHeader">
          <Search />
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
      </div>
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
          },
          updateOffset(event) {
            console.log('asdasd')
            event.preventDefault(); // prevents the default behavior of the link click
            localStorage.setItem('lastKnownOffset', 0);
            console.log('asd')
          }
        }
    }
</script>

<style scoped>

.header, .desktopHeader {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 10vh;
  width: 100vw;
  z-index: 1;
  margin: 0;
  padding: 0;
  top: 0;
}
.desktopHeader {
  display: none;
}
.firstColumn, .searchContainerHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
}
.firstColumn {
  width: 100%;
}
.searchContainerHeader {
  justify-content: center;
  padding: 0.3rem 1rem;
  margin-top: -10px;
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
@media screen and (min-width: 720px) {
    .header {
        display: none;
    }
    .desktopHeader {
      display: flex;
      height: 5vh;
      flex-direction: row;
      width: 100vw;
    }
    .searchContainerHeader{
      margin: 0;
    }
}
</style>

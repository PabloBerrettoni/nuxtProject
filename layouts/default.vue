<template>
    <div>
        <AppHeader :key="$route.fullPath"/>  
        <Nuxt class="container"/>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader';
export default {
    components: {
        AppHeader
    }
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}
</style>
<template>
    <div class="container-footer">
        <h3>PokeFooter</h3>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.container-footer{
    height:10vh;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
@media screen and (min-width: 720px) {
    .container-footer {
        height: 5vh;
    }
}
</style>
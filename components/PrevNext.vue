<template>
    <div class="container">
        <p v-show="offsetNext[0] > 9" v-on:click="prev()">previous</p>
        <p></p>
        <p v-on:click="next()">next</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offsetNext: [],
            offsetPrev: []
        }
    },
    methods: {
        next() {
            this.offsetNext[0]=+ 10;
            this.offsetNext.push(this.offsetNext[0])
            this.$emit('clickNext', this.offsetNext[0]);
            this.offsetPrev[0] =+ 10;
        },
        prev() {
            this.offsetPrev[0] =- 10;
            this.$emit('clickNext', this.offsetPrev[0]);
            this.offsetNext[0] =- 10;
        }
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}
p {
    margin: 5px;
}
</style>
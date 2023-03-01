<template>
    <div class="container-pagination">
        <button v-show="offset > 9" v-on:click="prevNext()">previous</button>
        <p></p>
        <button v-on:click="prevNext(1)">next</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offset: 0
        }
    },
    methods: {
        prevNext(operation) {
            if (operation) {
                this.offset = this.offset + 10;
            } else {
                this.offset = this.offset - 10;
            }
            this.$emit('prevNext', this.offset);
        }
    },
}
</script>

<style scoped>
.container-pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}
p {
    margin: 5px;
}
button {
    width: 100px;
    margin-bottom: 10px;
}
</style>
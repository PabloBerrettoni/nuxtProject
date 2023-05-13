<template>
    <div class="container-pagination">
        <button :disabled="offset < 9" v-on:click="prevNext('prev')" class="prevNext"> < </button>
        <button v-show="offset > 19" @click="prevNext('last1')" class="secondButton">{{ (offset - 10) / 10 }}</button>
        <button v-show="offset > 9" @click="prevNext('prev')">{{ (offset - 10) / 10 + 1 }}</button>
        <button class="actual">{{ offset / 10 + 1 }}</button>
        <button @click="prevNext('next')">{{ offset / 10 + 2 }}</button>
        <button @click="prevNext('coming1')" class="secondButton">{{ offset / 10 + 3 }}</button>
        <button v-on:click="prevNext('next')" class="prevNext"> > </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offset: 0, 
        }
    },
    methods: {
        prevNext(operation) {
            if (operation == 'prev') {
                this.offset -= 10;
            } else if (operation == 'last1') {
                this.offset -= 20;
            } else if (operation == 'next') {
                this.offset += 10;
            } else if (operation == 'coming1') {
                this.offset += 20;
            }
            localStorage.setItem('lastKnownOffset', this.offset);
            this.$emit('prevNext', this.offset);
        }
    },
    mounted() {
        let lastOffset = localStorage.getItem('lastKnownOffset');
        if (lastOffset !== null && lastOffset !== 0 && lastOffset !== this.offset) {
            this.offset = Number(lastOffset);
        }
    }
}
</script>

<style scoped>
.container-pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    gap: 10px;
}
button {
    width: 40px;
    margin-bottom: 10px;
}
.secondButton {
    display: none;
}
.prevNext {
    width: 75px;
}
.actual {
    border-color: #dda15e;
    border-radius: 5px;
}
@media screen and (min-width: 892px) {
    .secondButton {
        display: block;
    }
}
</style>
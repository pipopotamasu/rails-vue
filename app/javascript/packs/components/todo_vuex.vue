<template>
    <li v-bind:class="{ 'is-do': item.is_do }" @click="DONE_TASK(item)">{{ item.title }}</li>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../actions/mutation-types';

export default {
    props: ['item'],
    methods: {
        ...mapActions([
            types.DONE_TASK
        ])
    }
}
</script>

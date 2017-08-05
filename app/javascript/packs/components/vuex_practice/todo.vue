<template>
    <li v-bind:class="{ 'done': item.is_do }" @click="DONE_TASK(item)">{{ item.title }}</li>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/mutation-types';

export default {
  props: ['item'],
  methods: {
    ...mapActions([
        types.DONE_TASK
    ])
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through
}
li {
  cursor: pointer;
}
</style>

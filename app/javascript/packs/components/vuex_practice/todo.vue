<template>
    <li v-bind:class="{ 'done': todo.is_do }" @click="DONE_TASK(todo)">{{ todo.title }}</li>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/todo-mutation-types';

export default {
  props: ['todo'],
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

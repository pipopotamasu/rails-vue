<template>
  <div class="panel-footer strong add-card" @click="ADD_CARD(list)">Add Card</div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/mutation_types/trello';

export default {
  props: ['list'],
  methods: {
    ...mapActions([
        types.ADD_CARD,
    ])
  }
}
</script>

<style scoped>
.add-card {
  cursor: pointer;
}
</style>

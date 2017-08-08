<template>
  <div class="panel-footer strong add-card" @click="ADD_CARD(list)">カードを追加</div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

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

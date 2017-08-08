<template>
  <div class="panel-heading strong add-card" @click="ADD_CARD">カードを追加</div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
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

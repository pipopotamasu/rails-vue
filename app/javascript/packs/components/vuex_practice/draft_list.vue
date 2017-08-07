<template>
    <div class="col-sm-2">
      <div class="panel panel-default">
        <div class="panel-heading strong"><button @click="ADD_LIST">リストを追加</button></div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
  methods: {
    ...mapActions([
        types.ADD_LIST,
    ])
  }
}
</script>

<style scoped>
</style>

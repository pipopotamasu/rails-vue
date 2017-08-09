<template>
    <div class="col-sm-2 buttons">
      <button type="button" class="btn btn-primary" @click="ADD_LIST">Add List</button>
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
.buttons {
  top: 3em;
}
</style>

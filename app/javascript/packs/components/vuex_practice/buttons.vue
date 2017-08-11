<template>
    <div class="col-sm-2 buttons">
      <button type="button" class="btn btn-primary btn-lg btn-block" @click="ADD_LIST">Add List</button><br>
      <button type="button" class="btn btn-success btn-lg btn-block" @click="SAVE">Save</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
  methods: {
    ...mapActions([
        types.ADD_LIST,
        types.SAVE
    ])
  }
}
</script>

<style scoped>
.buttons {
  top: 0.5em;
}
</style>

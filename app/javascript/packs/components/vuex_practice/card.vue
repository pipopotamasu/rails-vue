<template>
    <div class="card-body">
      <input v-show="editing" type="text" :value="card.name">
      <span v-show="!editing">{{ card.name }}</span>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
  props: ['card'],
  data () {
    return {
        editing: false
    }
  },
  methods: {
    // ...mapActions([
    //     types.UPDATE_LIST,
    // ])
  }
}
</script>

<style scoped>
.card-container {
  padding: 7px 5px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.card-body {
  padding: 2px 5px;
  background-color: white;

}
</style>

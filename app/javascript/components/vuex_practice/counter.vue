<template>
  <div id='counter'>
    <p class="counter__display">{{ counter.count }}</p>
    <div class="counter__buttons">
      <button class="button counter__increment" @click="INCREMENT()">+</button>
      <button class="button counter__decrement" @click="DECREMENT()">-</button>
      <button class="button counter__reset" @click="RESET()">reset</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../../store/mutation_types/counter';

export default {
  computed: {
    ...mapState(['counter']),
  },
  methods: {
    ...mapActions([
        types.INCREMENT,
        types.DECREMENT,
        types.RESET,
    ])
  }
}
</script>

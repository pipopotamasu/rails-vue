<template>
  <div id='counter'>
    <p class="counter__display">{{ count }}</p>
    <div class="counter__buttons">
      <button class="button counter__increment" @click="increment">+</button>
      <button class="button counter__decrement" @click="decrement">-</button>
      <button class="button counter__reset" @click="reset">reset</button>
    </div>
  </div>
</template>

<script>

export default {
  template: '#counter',
  computed: {
    count () {
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
    reset() {
      this.$store.commit('reset');
    }
  }
}
</script>

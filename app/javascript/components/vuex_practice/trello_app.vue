<template>
  <div id="trello">
    <draggable v-model="trello.lists" :element="'div'" @end="SORT_LIST_ORDER" :options="{ animation: 200 }">
      <list v-for="list in trello.lists" :list="list" :updating='trello.updating' :key="list.id"></list>
      <buttons></buttons>
    </draggable>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/mutation_types/trello';
import List from './list.vue'
import Buttons from './buttons.vue'
import Draggable from 'vuedraggable'


export default {
  components: {
    List,
    Buttons,
    Draggable
  },
  created: function() {
    this.FETCH_DATA();
  },
  computed: {
    // share store state
    ...mapState(['trello']),
    // ...mapGetters(['nextId'])
  },
  methods: {
    ...mapActions([
        types.SORT_LIST_ORDER,
        types.FETCH_DATA
    ]),
  }
}
</script>

<style scoped>
</style>

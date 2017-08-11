<template>
  <div id="trello">
    <draggable v-model="trello.lists" :element="'div'" @end="SORT_LIST_ORDER" :options="{ animation: 200 }">
      <list v-for="list in trello.lists" :list="list" :updating='trello.updating' :key="list.id"></list>
      <draft-list></draft-list>
    </draggable>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';
import List from './list.vue'
import DraftList from './draft_list.vue'
import Draggable from 'vuedraggable'


export default {
  components: {
    List,
    DraftList,
    Draggable
  },
  computed: {
    // share store state
    ...mapState(['trello']),
    // ...mapGetters(['nextId'])
  },
  methods: {
    ...mapActions([
        types.SORT_LIST_ORDER,
    ]),
  }
}
</script>

<style scoped>
</style>

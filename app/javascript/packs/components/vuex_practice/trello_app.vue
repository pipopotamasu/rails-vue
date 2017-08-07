<template>
  <div id="trello">
    <div class="row">
      <list v-for="list in trello.lists" :list="list" :key="list.id"></list>
      <draft-list></draft-list>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';
import List from './list.vue'
import DraftList from './draft_list.vue'


export default {
  components: {
    List,
    DraftList
  },
  computed: {
    // share store state
    ...mapState(['trello']),
    // ...mapGetters(['nextId'])
  },
  methods: {
    // share store action
    // ...mapActions([
    //     types.ADD_TASK,
    //     types.FETCH_TODOS
    // ]),
  }
}
</script>

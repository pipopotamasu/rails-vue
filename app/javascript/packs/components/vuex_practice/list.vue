<template>
    <div class="col-sm-2">
      <div class="panel panel-default">
        <div class="panel-heading strong">
          <!-- somehow focus and blur event does not work. -->
          <input v-show="editing" @blur="doneEdit" @keyup.enter="doneEdit" type="text" :value="list.title">
          <span v-show="!editing" @click="onEditing">{{ list.title }}</span>
          <i @click="DELETE_LIST(list)" class="glyphicon glyphicon-trash pull-right delete-list"></i>
        </div>
        <card v-for="card in list.cards" :card="card" :key="card.id"></card>
        <draft-card :list="list"></draft-card>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';
import DraftCard from './draft_card.vue'
import Card from './card.vue'

export default {
  props: ['list'],
  data () {
    return {
        editing: false
    }
  },
  components: {
    DraftCard,
    Card
  },
  methods: {
    ...mapActions([
        types.UPDATE_LIST,
        types.DELETE_LIST,
    ]),
    onEditing: function() {
      this.editing = true
    },
    doneEdit: function(e) {
      this.editing = false
      this.UPDATE_LIST({ id :this.list.id, order: this.list.order, title: e.target.value });
    },
  }
}
</script>

<style scoped>
.delete-list {
  top: 3px;
  cursor: pointer;
}
</style>

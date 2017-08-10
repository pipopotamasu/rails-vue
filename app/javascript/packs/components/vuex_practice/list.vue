<template>
    <div class="col-sm-2">
      <div class="panel panel-default">
        <div class="panel-heading strong">
          <!-- somehow focus and blur event does not work. -->
          <input v-show="editing" @blur="doneEdit" @keyup.enter="doneEdit" type="text" size="12" :value="list.title">
          <span v-show="!editing" @click="onEditing">{{ list.title }}</span>
          <i v-show="!editing" @click="DELETE_LIST(list)" class="glyphicon glyphicon-trash pull-right delete-list"></i>
        </div>
        <draggable v-model="list.cards" :element="'div'" @end="SORT_CARD(list)" :options="{ animation: 200, group: 'card', filter: '.ignore-elements' }">
          <template v-if="list.cards.length > 0">
            <div class="card-container" v-for="card in list.cards">
              <card :card="card" :key="card.id"></card>
            </div>
          </template>
          <template v-else>
            <div class="card-container empty ignore-elements"></div>
          </template>
        </draggable>
        <draft-card :list="list"></draft-card>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';
import DraftCard from './draft_card.vue'
import Card from './card.vue'
import Draggable from 'vuedraggable'


export default {
  props: ['list'],
  data () {
    return {
        editing: false
    }
  },
  components: {
    DraftCard,
    Card,
    Draggable
  },
  methods: {
    ...mapActions([
        types.UPDATE_LIST,
        types.DELETE_LIST,
        types.SORT_CARD,
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
.card-container {
  padding: 7px 5px;
  background-color: #f5f5f5;
  cursor: pointer;
}
.empty {
  padding: 20px 5px;
}
</style>

<template>
  <div class="card-body">
    <input v-show="editing" @blur="doneEdit" v-focus @keyup.enter="doneEdit" type="text" size="18" :value="card.name">
    <span v-show="!editing" @click="onEditing">{{ card.name }}</span>
    <i v-show="!editing" @click="DELETE_CARD(card)" class="glyphicon glyphicon-trash pull-right delete-card"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
  props: ['card', 'updating'],
  data () {
    return {
        editing: false
    }
  },
  directives: {
    focus: {
      update: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    ...mapActions([
        types.UPDATE_CARD,
        types.UPDATING,
        types.DONE_UPDATE,
        types.DELETE_CARD
    ]),
    onEditing: function() {
      this.editing = true
    },
    doneEdit: function(e) {
      if(!this.updating) {
        this.UPDATING();
        this.editing = false
        this.UPDATE_CARD({ id :this.card.id, list_id: this.card.list_id, order: this.card.order, name: e.target.value });
        if(e.type === 'blur') this.DONE_UPDATE();
      }else{
        this.DONE_UPDATE();
      }
    },
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

.delete-card {
  top: 3px;
  cursor: pointer;
}
</style>

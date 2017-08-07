<template>
    <div class="col-sm-2">
      <div class="panel panel-default">
        <div class="panel-heading strong">
          <!-- somehow focus and blur event does not work. -->
          <input v-if="editing" @keyup.enter="doneEdit" type="text" v-model="inputTitle">
          <span v-else @click="onEditing">{{ list.title }}</span>
        </div>
        <div class="panel-body text-right">コンテンツ</div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '../../store/actions/trello-mutation-types';

export default {
  props: ['list'],
  data () {
    return {
        inputTitle: this.list.title,
        editing: false
    }
  },
  methods: {
    ...mapActions([
        types.EDIT_LIST_TITLE,
    ]),
    onEditing: function() {
      console.log(this.list)
      this.editing = true
    },
    doneEdit: function() {
      this.editing = false
      this.EDIT_LIST_TITLE({ id :this.list.id, order: this.list.order, title: this.inputTitle });
    },
  }
}
</script>

<style scoped>
</style>

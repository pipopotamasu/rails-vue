<template>
    <div class="col-sm-2">
      <div class="panel panel-default">
        <div class="panel-heading strong">
          <!-- somehow focus and blur event does not work. -->
          <input v-show="editing" @blur="doneEdit" @keyup.enter="doneEdit" type="text" :value="list.title">
          <span v-show="!editing" @click="onEditing">{{ list.title }}</span>
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
        editing: false
    }
  },
  methods: {
    ...mapActions([
        types.UPDATE_LIST,
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
</style>

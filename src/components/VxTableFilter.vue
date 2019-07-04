<template>
  <v-layout align-center class="ma-0 pa-1 bb-1">
    <v-btn flat icon color="primary lighten-2" @click="add" :disabled="disabled">
      <v-icon>filter_list_alt</v-icon>
    </v-btn>
    <v-flex class="pa-0">
      <v-chip color="blue-grey lighten-5" :close="!disabled">Type is Text</v-chip>
      <v-btn flat small color="grey" class="ma-0" v-if="!disabled" @click="add">Add new filter</v-btn>
    </v-flex>
    <v-btn flat icon color="grey" v-if="values.length > 0" @click="reset">
      <v-icon>close</v-icon>
    </v-btn>
    <vx-table-filter-modal ref="modal" :columns="columns"/>
  </v-layout>
</template>

<script>
  import VxTableFilterModal from './VxTableFilterModal'

  export default {
    name: 'VxTableFilter',
    components: {
      VxTableFilterModal
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    data () {
      return {
        column: null,
        operator: null,
        value: null
      }
    },
    props: {
      columns: {
        type: Array,
        default: () => ([
          {
            type: 'text',
            slug: 'type',
            path: 'type',
            label: 'Type',
            options: [
              { value: 'label', label: 'Label' },
              { value: 'document', label: 'Document' },
            ]
          },
          {
            type: 'radio',
            slug: 'required',
            path: 'rules.required',
            label: 'Required',
            options: [
              { value: true, label: 'Required' },
              { value: false, label: 'Not Required' },
            ]
          }
        ])
      },
      disabled: {
        type: Boolean,
        default: false
      },
      values: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      reset () {
        this.$emit('change', [])
      },
      add () {
        this.$refs.modal.open()
      }
    }
  }
</script>

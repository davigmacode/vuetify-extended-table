<template>
  <div class="vx-table">
    <vx-table-toolbar
      :title="title"
      :creatable="creatable"
      :searchable="searchable"
      :filterable="filterable"
      :selected="selected.length"
      :columns="headers"
      :total="total"
      @create="actCreate"
      @remove="actRemove"
      @refresh="refreshing"
      @search="searching"
      @visibility="visibility"
      v-model="display">
      <template #actions="props">
        <slot name="actions" v-bind="props"></slot>
      </template>
    </vx-table-toolbar>
    <v-slide-y-transition>
      <vx-table-filter v-if="display.filter" @change="filtering"/>
    </v-slide-y-transition>
    <v-data-table
      v-model="selected"
      item-key="_id"
      :items="items"
      :headers="columns"
      :loading="loading"
      :total-items="total"
      :select-all="selectable"
      :rows-per-page-items="pagingOptions"
      :pagination="{ ...query, totalItems: total }"
      @update:pagination="querying">
      <template #progress>
        <v-progress-linear
          color="primary"
          height="3"
          indeterminate/>
      </template>
      <template #items="props">
        <td v-if="selectable">
          <v-checkbox
            v-model="props.selected"
            hide-details
            primary
          />
        </td>
        <slot name="item" :data="props.item" :visible="columnsVisibility">
          <template v-for="column in columns">
            <slot
              :name="`item:${column.value}`"
              :row="props.item"
              :data="props.item[column.value]"
              v-if="columnsVisibility[column.value]">
              <td
                :key="column.value"
                :class="`text-xs-${column.align || 'left'}`"
                v-text="props.item[column.value]"
              />
            </slot>
          </template>
        </slot>
        <td class="text-xs-center" v-if="editable || removable || hasSlot('actions:row')">
          <slot name="actions:row" :data="props.item"/>
          <v-tooltip bottom v-if="editable">
            <template #activator="{ on }">
              <v-btn
                flat icon
                color="accent lighten-1"
                class="ma-0"
                v-on="on"
                @click="actRowView(props.item[pk])">
                <v-icon>launch</v-icon>
              </v-btn>
            </template>
            <span>View this entry</span>
          </v-tooltip>
          <v-tooltip bottom v-if="removable">
            <template #activator="{ on }">
              <v-btn
                flat icon
                color="accent lighten-1"
                class="ma-0"
                v-on="on"
                @click="actRowRemove(props.item[pk])">
                <v-icon>delete</v-icon>
              </v-btn>
            </template>
            <span>Remove this entry</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import VxTableToolbar from './VxTableToolbar'
  import VxTableFilter from './VxTableFilter'

  export default {
    name: 'VxTable',
    components: {
      VxTableToolbar,
      VxTableFilter
    },
    data () {
      return {
        selected: [],
        processing: false,
        display: {
          search: false,
          filter: false
        },
        pagingOptions: [
          5, 10, 25, 50, 75, 100, { text: 'All', value: -1 }
        ]
      }
    },
    props: {
      title: {
        type: String,
        required: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      pk: {
        type: String,
        default: '_id'
      },
      headers: {
        type: Array,
        default: () => ([])
      },
      items: {
        type: Array,
        default: () => ([])
      },
      total: {
        type: Number,
        default: 0
      },
      creatable: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: false
      },
      removable: {
        type: Boolean,
        default: false
      },
      selectable: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      rowActions: {
        type: Boolean,
        default: false
      },
      query: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      columns () {
        let action = {
          text: 'Actions',
          value: 'actions',
          align: 'center',
          sortable: false
        }
        return [
          ...this.headers.filter((e) => e.visible === undefined || e.visible === true),
          ...(this.creatable || this.removable || this.hasSlot('actions:row') ? [action] : [])
        ]
      },
      columnsVisibility () {
        return this.headers.reduce((acc, o) => ({
          ...acc,
          [o.value]: o.visible === undefined || o.visible === true
        }), {})
      }
    },
    methods: {
      querying (data) {
        this.$emit('querying', data)
      },
      searching (data) {
        this.querying({ ...this.query, search: data })
      },
      filtering (data) {
        this.querying({ ...this.query, filters: data })
      },
      refreshing () {
        this.querying([])
      },
      visibility (val) {
        this.$emit('visibility', val)
      },
      actCreate () {
        this.$emit('act:create')
      },
      actRemove () {
        this.$emit('act:remove', this.selected)
      },
      actRowView (id) {
        this.$emit('act:row:view', id)
      },
      actRowRemove (id) {
        this.$emit('act:row:remove', id)
      },
      hasSlot (name = 'default') {
        return !!this.$slots[name] || !!this.$scopedSlots[name]
      }
    }
  }
</script>

<style scoped>
.vx-table >>> .v-input {
  padding-top: 0 !important;
}
.vx-table >>> .v-input__slot {
  margin-bottom: 0 !important;
}
</style>

<template>
  <v-layout align-center class="ma-0 px-3 py-2 bx-1">
    <div class="ml-1">
      <h3 class="headline">
        <span>{{ title }}</span>
        <transition name="fade" mode="out-in">
          <small v-if="title && selected > 0"> - </small>
        </transition>
        <transition name="fade" mode="out-in">
          <small v-if="selected > 0">{{ selected }} Selected</small>
        </transition>
      </h3>
    </div>
    <v-spacer/>
    <div class="pa-1">
      <v-tooltip bottom v-if="creatable">
        <template #activator="{ on }">
          <v-btn flat icon large color="primary lighten-1" class="ma-0" v-on="on" @click="create">
            <v-icon medium>add_circle</v-icon>
          </v-btn>
        </template>
        <span>Create a new entry</span>
      </v-tooltip>
      <slot name="actions" :selected="selected">
        <!-- <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn flat icon large color="red lighten-3" class="ma-0" v-on="on" @click="remove">
              <v-icon medium>delete</v-icon>
            </v-btn>
          </template>
          <span>Remove one or multiple entries</span>
        </v-tooltip> -->
      </slot>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn flat icon large color="grey" class="ma-0" v-on="on" @click="refresh">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>
      <v-tooltip bottom v-if="filterable">
        <template #activator="{ on }">
          <v-btn flat icon large :color="color('filter')" class="ma-0" v-on="on" @click="toggle('filter')">
            <v-icon medium>filter_list_alt</v-icon>
          </v-btn>
        </template>
        <span>Toggle Filters</span>
      </v-tooltip>
      <vx-table-columns :value="columns" @input="visibility"/>
      <v-tooltip bottom v-if="searchable">
        <template #activator="{ on }">
          <v-btn flat icon large :color="color('search')" class="ma-0" v-on="on" @click="toggle('search')">
            <v-icon medium>search</v-icon>
          </v-btn>
        </template>
        <span>Toggle Search</span>
      </v-tooltip>
    </div>
    <v-flex :class="searchClass" v-if="searchable">
      <v-text-field
        ref="searchField"
        v-model="keyword"
        @keyup.enter.native="search"
        @click:clear="search(true)"
        class="pa-0 ma-0"
        label="Search"
        hide-details
        single-line
        clearable
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import VxTableColumns from './VxTableColumns'

  export default {
    name: 'VxTableToolbar',
    components: {
      VxTableColumns
    },
    model: {
      prop: 'display',
      event: 'change'
    },
    data () {
      return {
        keyword: ''
      }
    },
    props: {
      title: {
        type: String,
        required: false
      },
      selected: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      },
      columns: {
        type: Array,
        default: () => ([])
      },
      creatable: {
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
      display: {
        type: Object,
        default: () => ({
          search: false,
          filter: false
        })
      }
    },
    computed: {
      searchClass () {
        return {
          'vx-datatable-search': true,
          'closed': !this.display.search
        }
      }
    },
    methods: {
      create () {
        this.$emit('create')
      },
      remove () {
        this.$emit('remove', this.selected)
      },
      refresh () {
        this.$emit('refresh')
      },
      search (cleared) {
        this.$emit('search', cleared === true ? null : this.keyword)
      },
      toggle (ui) {
        let newVal = !this.display[ui]
        this.$emit('change', { ...this.display, [ui]: newVal })
        if (newVal === true) {
          this.$refs.searchField.focus()
        }
      },
      visibility (columns) {
        this.$emit('visibility', columns)
      },
      color (ui) {
        return this.display[ui] ? 'primary' : 'grey'
      }
    }
  }
</script>

<style scoped>
  .vx-datatable-search {
    transition: all .7s;
    max-width: 300px;
  }
  .vx-datatable-search.closed {
    padding: 0 !important;
    max-width: 0 !important;
    transition: all .3s;
  }
</style>

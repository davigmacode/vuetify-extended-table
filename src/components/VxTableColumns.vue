<template>
  <div class="vx-datatable-columns">
    <v-menu
      :close-on-content-click="false"
      :nudge-bottom="10"
      :nudge-left="-45"
      bottom
      left
      offset-y
      offset-x
      min-width="190px"
      transition="scale-transition"
      origin="top center">
      <template #activator="{ on: menu }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn flat icon large color="grey" class="ma-0" v-on="{ ...tooltip, ...menu }">
              <v-icon medium>list_alt</v-icon>
            </v-btn>
          </template>
          <span>Columns</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-tile
          v-for="item in value"
          :key="item.value"
          @click.capture.stop="toggle(item.value)"
          avatar
          ripple>
          <v-list-tile-content class="pl-1">
            <v-list-tile-title v-text="item.text"/>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-checkbox v-model="selected" :value="item.value"></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'VxTableColumns',
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },
    computed: {
      selected: {
        get () {
          let result = this.value.filter((e) => e.visible === undefined || e.visible === true)
          return result.reduce((acc, o) => [...acc, o.value], [])
        },
        set (selected) {
          let result = this.value.map((e) => ({...e, visible: selected.includes(e.value)}))
          this.$log.debug(result)
          this.$emit('input', result)
        }
      }
    },
    methods: {
      toggle (val) {
        let index = this.selected.indexOf(val)
        if (index !== -1) {
          this.selected = this.selected.filter((e) => e !== val)
        } else {
          this.selected = [...this.selected, val]
        }
      }
    }
  }
</script>

<style scoped>
  .vx-datatable-columns {
    flex: 0 0 auto;
    display: inline-flex;
    padding: 0;
    align-items: center;
    vertical-align: middle;
  }
  ::v-deep .v-input {
    justify-content: flex-end !important;
  }
</style>

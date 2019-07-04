<template>
  <v-dialog @input="close" v-model="opened" width="400">
    <v-toolbar dark color="primary">
      <v-icon>filter_list_alt</v-icon>
      <v-toolbar-title class="headline">Add New Filter</v-toolbar-title>
    </v-toolbar>
    <v-card tile>
      <v-form ref="form" @submit.prevent.stop="submit" v-model="valid" lazy-validation>
        <v-container class="pa-4">
          <v-layout row wrap>
            <v-flex md6>
              <v-select
                label="Columns"
                placeholder="Choose one"
                item-value="slug"
                item-text="label"
                :items="columns"
                v-model="column"
                return-object
              ></v-select>
            </v-flex>
            <v-flex md6>
              <v-select
                label="Operand"
                placeholder="Choose one"
                item-value="value"
                item-text="label"
                :items="operands"
                v-model="operand"
              ></v-select>
            </v-flex>
            <v-flex md12 v-if="column">
              <v-text-field
                label="Value"
                placeholder="Type value here"
                v-if="column.type == 'text'"
                v-model="value"/>
              <v-radio-group
                v-if="column.type == 'radio'"
                v-model="value"
                label="Value"
                class="ma-0 pa-0"
                :mandatory="false">
                <v-radio
                  v-for="item in column.options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"/>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider/>
        <v-card-actions class="pa-2">
          <v-spacer/>
          <v-btn
            flat
            type="submit"
            color="primary"
            :disabled="!valid"
            >Apply</v-btn>
          <v-btn
            flat
            @click="close"
            >Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'VxTableFilterModal',
    props: {
      columns: {
        type: Array,
        default: () => ({})
      }
    },
    data () {
      return {
        opened: false,
        valid: false,
        column: null,
        operand: null,
        value: null
      }
    },
    computed: {
      operands () {
        let result = []
        let column = this.column
        let options = {
          text: [
            { value: 'contains', label: 'Contains' },
            { value: '!contains', label: 'Does Not contain' },
            { value: 'is', label: 'Is' },
            { value: '!is', label: 'Is Not' },
          ],
          radio: [
            { value: 'is', label: 'Is' },
            { value: '!is', label: 'Is Not' },
          ],
          checkbox: [
            { value: 'is', label: 'Is' },
            { value: '!is', label: 'Is Not' },
          ],
          date: [
            { value: 'before', label: 'Before' },
            { value: 'after', label: 'After' },
          ]
        }

        if (column && column.type) {
          if (options[column.type]) {
            result = options[column.type]
          }
        }

        return result
      }
    },
    watch: {
      column () {
        this.operand = null
        this.value = null
      }
    },
    methods: {
      submit () {
        // validate form
        if (this.$refs.form.validate()) {
          // execute user on submit
          if (this.onSubmit && typeof this.onSubmit === 'function') {
            // close the prompt then execute user on submit
            this.close().then(() => this.onSubmit(this))
          }
        }
      },
      open () {
        this.opened = true
      },
      close () {
        // close dialog
        if (this.opened) this.opened = false

        // wait for close animation
        return new Promise(resolve => {
          requestAnimationFrame(() => {
            resolve()
          })
        })
      }
    }
  }
</script>

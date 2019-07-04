<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex class="elevation-1">
          <vx-table
            title="Collections"
            :items="items"
            :headers="headers"
            :loading="processing"
            @create="create"
            filterable
            searchable
            selectable>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.slug }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.hint }}</td>
            </template>
          </vx-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        processing: false,
        search: {
          keyword: null,
          filters: []
        },
        display: {
          search: false,
          filter: false
        },
        headers: [
          { text: 'Type', value: 'type' },
          { text: 'Slug', value: 'slug', align: 'left' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Hint', value: 'hint', align: 'left' }
        ],
        items: [
          {
            _id: '1',
            type: 'text',
            slug: 'type',
            title: 'Type',
            hint: 'Should between 5-25 character',
          },
          {
            _id: '2',
            type: 'text',
            slug: 'slug',
            title: 'Slug',
            hint: 'Should between 5-25 character',
          },
          {
            _id: '3',
            type: 'text',
            slug: 'name',
            title: 'Name',
            hint: 'Should between 5-25 character',
          }
        ]
      }
    },
    methods: {
      create () {
        this.$events.$emit('templates.fields.input')
      }
    }
  }
</script>

<style>
html,
body {
  overflow: auto !important;
}
</style>

<template>
    <div id="todo_list">
        <input type="text" v-model="newItem" @keyup.enter="addNewItem">
        <ul>
            <li v-for="(item,index) in itemList">
                <item @itemClick="removeItem(index)">{{item.content}}</item>
            </li>
        </ul>
    </div>
</template>

<script>
import item from './item.vue'

export default {
    name: 'TodoList',
    components: { item },
    data() {
        return {
            newItem: 'hehe',
            itemList: []
        };
    },
    mounted() {
        this.getItems();
    },
    methods: {
        getItems() {
            this.itemList = [{
                content: 'todo',
                finished: false
            }];
        },
        addNewItem() {
            this.itemList.unshift({ content: this.newItem });
            this.newItem = '';
        },
        removeItem(index) {
            this.itemList.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
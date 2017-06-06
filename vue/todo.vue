<template>
    <div id="todo_list">
        <input type="text" v-model="newItem" @keyup.enter="addNewItem">
        <button @click="addNewItem">Add</button>
        <ul>
            <li v-for="(item,index) in itemList">
                <item @itemClick="removeItem(index,item.objectId)">{{item.todo}}</item>
            </li>
        </ul>
    </div>
</template>

<script>
import item from './item.vue'
import service from '../service.js'

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
            // LeanCloud API
            (async data => {
                data.itemList = (await service.readItems()).data.results;
            })(this.$data);
        },
        addNewItem() {
            if (this.newItem === '') return;
            this.itemList.unshift({ todo: this.newItem });
            service.addNewItem(this.newItem);
            this.newItem = '';
        },
        removeItem(index, objId) {
            this.itemList.splice(index, 1);
            service.deleteItem(objId);
        }
    }
}
</script>

<style>

</style>
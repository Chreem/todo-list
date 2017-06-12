<template>
    <div id="todo_list">
        <div class="input-field">
            <input id="new_item" type="text" v-model="newItem" @keyup.enter="addNewItem">
            <label for="new_item">add new todo</label>
        </div>
        <button class="waves-effect waves-light btn" @click="addNewItem">Add</button>
        <ul class="collection">
            <li class="collection-item" v-for="(item,index) in itemList">
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
            newItem: '',
            itemList: []
        };
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // debug mode use local data
            if (/debug/.test(window.location.href)) {
                console.log('debug mode is on, data from default');
                this.itemList = [{
                    todo: 'test1'
                }];
                return
            }

            // LeanCloud API
            (async data => {
                data.itemList = await service.readItems();
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
.input-field {
    display: inline-block;
}
</style>
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import 'babel-polyfill'

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Default
import MyButton from './MyButton.vue';
import Welcome from './Welcome.vue';

// Mine
import MineSweeper from './mine-sweeper'
import MyFooter from './footer'
import Typing from './typing-word'
import Todo from './todo-list';
import Sort from './sort';

storiesOf('Welcome', module).add('to Storybook', () => ({
    components: { Welcome },
    template: '<welcome :showApp="action" />',
    methods: { action: linkTo('Button') },
}));

storiesOf('Button', module)
    .add('with text', () => ({
        components: { MyButton },
        template: '<my-button @click="action">Hello Button</my-button>',
        methods: { action: action('clicked') },
    }))
    .add('with some emoji', () => ({
        components: { MyButton },
        template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
        methods: { action: action('clicked') },
    }));

storiesOf('页面元素', module)
    .add('页脚', () => ({
        components: { MyFooter },
        template: '<MyFooter></MyFooter>'
    }));

const TypingContent = [
    'Line1',
    'Long Line Two......................',
    'will loop'
]

import carousel from './carousel';
storiesOf('Components', module)
    .add('Todo', () => ({
        components: { Todo },
        template: '<Todo></Todo>'
    }))
    .add('Typing', () => ({
        components: { Typing },
        template: '<Typing :words="TypingContent"></Typing>',
        data() {
            return { TypingContent }
        }
    }))
    .add('排序', () => ({
        components: { Sort },
        template: '<Sort :loop="true"></Sort>'
    }))
    .add('扫雷', () => ({
        components: { MineSweeper },
        template: '<MineSweeper></MineSweeper>'
    }))
    .add('轮播', () => ({
        components: { carousel },
        template: '<carousel></carousel>'
    }))
    ;

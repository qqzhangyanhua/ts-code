
import APP from './App.vue';
import Vue from 'vue';

new Vue({
    el: '#app',
    components: {APP},
    template: '<APP/>',
})
// import JSONBig from 'json-bigint'
// const add = (a, b) =>a+b;
// const msg ='hello world'
// console.log(add(1,2),'fffffffffffffffffff');
// console.log(msg,add(4,2),'3333333333');

// var dupkeys = '{ "dupkey": "value 1", "dupkey": "value 2"}';
// var works = JSONBig.parse(dupkeys);

// console.log('JSON.parse(dupkeys).dupkey: %s', works.dupkey);


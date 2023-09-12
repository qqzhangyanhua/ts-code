<template>
    <el-button type="primary" :disabled="!disabled">{{ props.text }}</el-button>
</template>

<script lang="ts" setup>
import {PropType, ref} from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true,
        
    },
    text: {
        type: String,
        required: true,
    },
    userEntity: {
        type: Function as PropType<any>,
        required: true,
    },
});

const userEntity = new props.userEntity();
const disabled = ref(true);
console.log(userEntity);

if (props.type === 'Add') {
    disabled.value = userEntity.getAddPermission();
} else if (props.type === 'Edit') {
    disabled.value = userEntity.getEditPermission();
} else if (props.type === 'Delete') {
    disabled.value = userEntity.getDeletePermission();
}
</script>
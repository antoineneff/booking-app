<template>
    <el-row :gutter="24">
        <el-col :span="8" v-for="room of rooms" :key="room._id">
            <Room v-bind="{ room, allowBooking }"/>
        </el-col>
    </el-row>
</template>

<script>
import Room from '@/components/Room.vue'

export default {
    props: {
        rooms: Array,
        allowBooking: Boolean
    },
    components: {
        Room
    }
}
</script>

<template>
    <el-card :body-style="{ padding: '0px' }" style="margin-bottom:16px;position:relative;">
        <img src="https://zupimages.net/up/18/33/pdbo.jpg" style="min-width:100%;height:250px">
        <el-tag color="#FFF" style="position:absolute;top:8px;left:8px;">{{ room.capacity }} personnes</el-tag>
        <div style="display:flex;justify-content:space-between;align-items:center;padding: 16px;">
            <span>{{ room.name }}</span>
            <el-button v-show="allowBooking" @click="bookRoom" type="primary">Réserver</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        room: Object,
        allowBooking: Boolean
    },
    methods: {
        bookRoom() {
            return EventBus.$emit('bookRoom', this.room._id)
        }
    }
}
</script>

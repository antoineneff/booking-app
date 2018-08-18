<template>
    <el-row :gutter="48">
        <el-col :span="6">
            <h2>Filtrer les salles</h2>
            <el-form ref="form" :model="filter" label-width="120px">
                <el-form-item label="Equipements">
                    <el-select v-model="filter.equipments" @change="fetchRooms" multiple placeholder="Equipements" style="width: 100%;">
                        <el-option
                            v-for="option in options"
                            :key="option"
                            :label="option"
                            :value="option">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Personnes">
                    <el-input-number v-model="filter.attendees" @change="fetchRooms" :min="1" style="width: 100%;"></el-input-number>
                </el-form-item>
                <el-form-item label="Date">
                    <el-date-picker
                        v-model="filter.start"
                        type="datetime"
                        format="dd/MM/yyyy HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="Date de réservation"
                        :default-time="'12:00:00'"
                        :picker-options="pickerOptions" style="width: 100%;"
                        @change="updateDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="`Durée (${filter.duration} min)`">
                    <el-slider v-model="filter.duration" @change="fetchRooms" :step="30" :min="30" :max="240"></el-slider>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="18">
            <h2>Salles disponibles</h2>
            <RoomList v-bind="{ rooms, allowBooking }" @bookRoom="bookRoom" />
        </el-col>
    </el-row>
</template>

<script>
import isBefore from 'date-fns/is_before'
import startOfToday from 'date-fns/start_of_today'
import getMinutes from 'date-fns/get_minutes'
import RoomList from '@/components/RoomList.vue'

export default {
    components: {
        RoomList
    },
    data() {
        return {
            EventBus: window.EventBus,
            allowBooking: false,
            rooms: [],
            filter: {
                attendees: 1,
                equipments: [],
                duration: 60,
                start: ''
            },
            pickerOptions: {
                firstDayOfWeek: 1,
                disabledDate: date => isBefore(date, startOfToday())
            },
            options: ['TV', 'Retro Projecteur']
        }
    },
    created() {
        this.fetchRooms()
        EventBus.$on('bookRoom', this.bookRoom)
    },
    methods: {
        reset() {
            this.allowBooking = false
            this.filter = {
                attendees: 1,
                equipments: [],
                duration: 60,
                start: ''
            }
            this.fetchRooms()
        },
        async fetchRooms() {
            this.filter.start = this.filter.start || ''
            const url = new URL('http://localhost:3000/api/rooms')
            url.search = new URLSearchParams(this.filter)
            const res = await fetch(url)
            const data = await res.json()
            if (data.error) {
                this.$message({
                    message: data.error,
                    type: 'warning'
                })
            } else {
                if (this.filter.start) {
                    this.allowBooking = true
                }
                this.rooms = data.rooms
            }
        },
        updateDate(date) {
            this.allowBooking = false
            if (date && getMinutes(date) % 30 !== 0) {
                return this.$message({
                    message: 'Seuls des créneaux horaires de 30 minutes sont disponibles',
                    type: 'warning'
                })
            }
            return this.fetchRooms()
        },
        async bookRoom(room) {
            const res = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...this.filter, room })
            })
            if (res.status !== 200) {
                const { error } = await res.json()
                return this.$message({
                    message: error,
                    type: 'warning'
                })
            }
            this.reset()
            return this.$message({
                message: 'La salle a bien été réservée !',
                type: 'success'
            })
        }
    }
}
</script>

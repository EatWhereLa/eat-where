<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import { useForm, useToast } from "vuestic-ui";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

const props = defineProps({
    title: { type: String, required: true },
    placeId: { type: String, required: true },
    bookingDate: { type: String, required: true },
    bookingTime: {type: String, required: true },
});

const emit = defineEmits();

const form = ref({
    title: props.title,
    numPeople: "1",
    bookingDate: props.bookingDate,
    bookingTime: props.bookingTime,
});

const { errorMessagesNamed } = useForm("myForm");

const { init } = useToast();

const submitReservation = async() => {
    const URL = `https://ns6tzwwmuy.ap-southeast-1.awsapprunner.com/reservation`;
    
    const dateString = `${form.value.bookingDate.split('/').reverse().join('-')} ${form.value.bookingTime.slice(0, 2)}:${form.value.bookingTime.slice(2)}`;

    const unixDateTime = dayjs(dateString, "YYYY-MM-DD HH:mm").unix();

    try {
        await ky.post(
            `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
            {   
                json: {
                    user_id: "1",
                    place_id: props.placeId,
                    reservation_time: unixDateTime,
                    reservation_pax: parseInt(form.value.numPeople),
                },
            });

            init({
                message: 'Booking Success!',
                color: 'success',
                closeable: false,
            });

    } catch (err: any) {
        console.log(err.message);
        init({
          message: 'Booking failed!',
          color: 'danger',
          closeable: false,
        });
        
    }
    emit("closebookingmodal");
}
</script>

<template>
    <section class="mt-7">
        <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg">Enter Reservation Details</h3>

        <va-form immediate hide-error-messages ref="myForm" class="flex flex-col gap-2 mb-2">
            <va-input label="Restaurant Name" v-model="form.title" name="restaurantName" disabled />
            <va-input label="Booking Date" v-model="form.bookingDate" name="bookingDate" disabled />
            <va-input label="Booking Time" v-model="form.bookingTime" name="bookingTime" disabled />
            <va-input type="number" min="1" placeholder="Enter Number Of Pax" label="Number Of Pax" 
                v-model="form.numPeople" name="numPeople" 
                :rules="[(v) => Boolean(v) || 'Please Enter number Of pax',
                        (v) => !(parseInt(v) <= 0) || 'Value must be greater than 0',
                ]" />
                <div v-for="errors, fieldName in errorMessagesNamed" :key="fieldName">
                    <ul>
                        <li v-for="error in errors" :key="error">
                            {{ error }}
                        </li>
                    </ul>
                </div>
        </va-form>
    </section>
    <div class="self-end flex align-end">
        <generic-button titleColor="text-white" bgColor="bg-primary" @click="submitReservation()">
            Make Reservation
        </generic-button>
    </div>
</template>

<style></style>

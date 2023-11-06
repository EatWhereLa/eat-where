<script setup lang="ts">
import { loadScript } from '@paypal/paypal-js'
import { useRouter } from "vue-router";
import { onBeforeMount, ref } from 'vue'
import ky from "ky";
import { useForm, useToast } from "vuestic-ui";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const props = defineProps({
  title: { type: String, required: true },
  numPeople: { type: String, required: true },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  placeId: { type: String, required: true },
})

const { init } = useToast();

const API_URL = import.meta.env.VITE_API_URL;

const router = useRouter();

const submitReservation = async() => {
    const URL = `${API_URL}/reservation`;
    
    const dateString = `${props.bookingDate.split('/').reverse().join('-')} ${props.bookingTime.slice(0, 2)}:${props.bookingTime.slice(2)}`;

    const unixDateTime = dayjs(dateString, "YYYY-MM-DD HH:mm").unix();

    try {
        await ky.post(
            URL,
            {   
                json: {
                    user_id: authStore.username,
                    place_id: props.placeId,
                    reservation_time: unixDateTime,
                    reservation_pax: parseInt(props.numPeople),
                },
            });
            console.log('aaaaaaa')
            init({
                message: 'Booking Success!',
                color: 'success',
            });

    } catch (err: any) {
        console.log(err.message);
        init({
          message: 'Booking failed!',
          color: 'danger',
        });
        
    }
}

// Change to your CLIENT ID gotten from the developer dashboard
const CLIENT_ID = 'test'

const paid  = ref(false)

onBeforeMount(function() {
    loadScript({ clientId: CLIENT_ID })
    .then((paypal) => {
      if (!paypal) {
        console.error('Failed to load the PayPal SDK');
        return;
      }
      if (paypal.Buttons !== undefined) {
        paypal.Buttons({
          createOrder,
          onApprove: (data, actions) => onApprove(data, actions), // Pass the reference of onApprove
        }).render('#paypal-button-container')
          .catch((err) => {
            console.error('PayPal Buttons failed to render:', err);
        });
      }
    })
    .catch((error) => {
      console.error('Failed to load the PayPal SDK:', error);
    });
})

const createOrder = (data:any, actions:any) => {
      // Define how the order will be created
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: '1',
            },
          },
        ],
      });
};

const onApprove = async (data:any, actions:any) => {
  console.log('Order approved...');
  try {
    const order = await actions.order.capture();
    console.log('Order captured:', order);
    
    paid.value = true;
    await submitReservation();
    console.log('Order complete!');

    router.push("/activity");
  } catch (error) {
    console.error('Error during order capture or reservation submission:', error);
    init({
          message: 'Booking failed!',
          color: 'danger',
    });
  }
};

</script>

<template>
  <div v-if="!paid" id="paypal-button-container"></div>
</template>

<style>
#paypal-button-container {
  width: 100%;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
}
</style>

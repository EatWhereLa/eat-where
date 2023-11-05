<script setup lang="ts">
import { loadScript } from '@paypal/paypal-js'
import { onBeforeMount, ref } from 'vue'
import ky from "ky";
import { useForm, useToast } from "vuestic-ui";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

const props = defineProps({
  form: Object
})

const { init } = useToast();

const submitReservation = async() => {
    const URL = `https://ns6tzwwmuy.ap-southeast-1.awsapprunner.com/reservation`;
    
    const dateString = `${props.form.value.bookingDate.split('/').reverse().join('-')} ${props.form.value.bookingTime.slice(0, 2)}:${props.form.value.bookingTime.slice(2)}`;

    const unixDateTime = dayjs(dateString, "YYYY-MM-DD HH:mm").unix();

    try {
        await ky.post(
            `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
            {   
                json: {
                    user_id: "1",
                    place_id: props.placeId,
                    reservation_time: unixDateTime,
                    reservation_pax: parseInt(props.form.value.numPeople),
                },
            });

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
    loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
      paypal
        .Buttons({
          createOrder: createOrder,
          onApprove: onApprove,
        })
        .render('#paypal-button-container')
    })
  })

   function createOrder(data, actions) {
      console.log('Creating order...')
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 50,
            },
          },
        ],
      })
    }

function onApprove(data, actions) {
  console.log('Order approved...')
  return actions.order.capture().then(() => {
    paid.value = true
    submitReservation()
    window.location.href = "/"
    console.log('Order complete!')
  })
}
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

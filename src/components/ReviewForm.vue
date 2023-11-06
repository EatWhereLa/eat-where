<script setup lang="ts">
import ky from "ky";
import { ref, defineEmits } from "vue";
import { useToast } from "vuestic-ui";
import GenericButton from "./GenericButton.vue";

import { useAuthStore } from "@/stores/auth";

const { username } = useAuthStore();

const { init } = useToast();

const emit = defineEmits();

const props = defineProps({
  placeId: { type: String, required: true },
  title: { type: String, required: true}
});

const reviewVal = ref({
    rating: 0.0,
    description: ""
});;

const submitReview = async() => {
    const URL = `https://ns6tzwwmuy.ap-southeast-1.awsapprunner.com/review`;

    try {
        await ky.post(
            `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
            {   
                json: {
                    user_id: username,
                    place_id: props.placeId,
                    rating: reviewVal.value.rating,
                    description: reviewVal.value.description,
                },
            });

            init({
                message: 'Review Submitted',
                color: 'success',
            });

    } catch (err: any) {
        console.log(err.message);
        init({
          message: 'Failed to submit review',
          color: 'danger',
        });
        
    }
    emit("submittedForm");
    resetForm();
}

const resetForm = () => {
  reviewVal.value.rating = 5;
  reviewVal.value.description = "";
}
</script>

<template>

    <div class="w-full">
        <h5 class="va-h4 font-semibold">Review {{ title }}</h5>
        <va-rating
            v-model="reviewVal.rating"
            hover
            halves
            size="large"
            class="ease-in duration-500"
        />

        <va-textarea
            v-model="reviewVal.description"
            label="Your Review"
            class="w-full my-3"
        />
        <br>
        <generic-button
        bgColor="bg-primary"
        titleColor="text-white"
        class="w-1/2 mt-2"
        shadowColor="shadow-custom-primary"
        @click="submitReview"
      >
        Submit
      </generic-button>
      <generic-button
        titleColor="text-primary"
        bgColor="bg-white"
        class="border border-primary ml-2"
        @click="resetForm"
      >
        Reset
      </generic-button>
    </div>
</template>
 
<template>
  <section class="flex bg-[#f6e3e5] overflow-hidden rounded-xl">
    <div class="px-12 py-8 flex flex-col justify-center 2xl:px-20 2xl:py-16">
      <span class="uppercase text-sm tracking-widest text-primary font-medium">
        Choose EatWhere
      </span>
      <h1 class="capitalize text-6xl font-medium mt-3 mb-2">
        Your Ultimate Dining Decision-Maker
      </h1>
      <p class="max-w-xs">
        Say goodbye to the endless debates and countless food app searches. With
        EatWhere, choosing a restaurant is about to get a whole lot easier.
      </p>
      <ol class="[counter-reset:section] mt-8 mb-10">
        <li>Voting Sessions</li>
        <li>Book Your Table</li>
        <li>Crowd Level Insights</li>
        <li>Personalised recommendations</li>
      </ol>
      <a
        class="no-underline text-gray-400 text-sm flex items-center hover:text-primary transition-colors"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          />
        </svg>
        Scroll Down to <br />know more</a
      >
    </div>
    <div
      class="img-container w-full relative min-h-[380px] h-[30vh] bg-[#f6e3e5] 2xl:h-auto"
    >
      <img
        src="../assets/images/landing/banner.gif"
        alt=""
        class="w-full h-full object-contain"
      />
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=Poppins:wght@300;400;500;700&display=swap");

li {
  @apply flex items-center relative;
}

li + li {
  @apply mt-4;
}

li::before {
  @apply bg-primary text-white flex justify-center items-center w-6 h-6 rounded-[50%] text-sm font-extralight mr-4 relative z-40;
  counter-increment: section;
  content: counters(section, ".") " ";
}

li:not(:last-child):after {
  @apply bg-primary absolute top-1/2 left-3;
  content: "";
  width: 1px;
  height: 200%;
}
</style>

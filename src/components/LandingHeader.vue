<template>
  <section
    class="flex flex-col-reverse lg:flex-row bg-[#f6e3e5] overflow-hidden rounded-xl items-center"
  >
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
    </div>
    <div class="w-full relative min-h-[380px] h-[30vh] bg-[#f6e3e5] 2xl:h-auto">
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

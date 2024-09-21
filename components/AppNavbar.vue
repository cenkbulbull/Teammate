<template>
  <div class="flex justify-between items-center py-5 text-xs px-12">
    <div class="text-lg">teammate</div>
    <ul class="flex gap-10">
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a"
          >Jobs List</nuxt-link
        >
      </li>
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a"
          >What is teammate?</nuxt-link
        >
      </li>
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a"
          >Github</nuxt-link
        >
      </li>
    </ul>

    <div>
      <ul class="flex gap-2">
        <li>
          <nuxt-link to="">
            <Button class="text-xs" variant="outline">Log in</Button>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="a">
            <Button
              class="text-xs bg-sky-700 text-white hover:bg-slate-100 hover:text-inherit"
              >Sign up</Button
            >
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="a">
            <Button
              class="text-xs bg-sky-700 text-white hover:bg-slate-100 hover:text-inherit"
              >Post A Jobs</Button
            >
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<template>
  <div class="tracking-wide">
    <div class="magicpattern">
      <AppNavbar />
      <AppHeader />
    </div>
    <NuxtPage />
  </div>
</template>
<style lang="scss">
.magicpattern {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: repeat;
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 2000 1400%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cmask id=%22b%22 x=%220%22 y=%220%22 width=%222000%22 height=%221400%22%3E%3Cpath fill=%22url(%23a)%22 d=%22M0 0h2000v1400H0z%22%2F%3E%3C%2Fmask%3E%3Cpath fill=%22%23fff%22 d=%22M0 0h2000v1400H0z%22%2F%3E%3Cg style=%22transform-origin:center center%22 stroke=%22%230369a133%22 stroke-width=%221.4%22 fill=%22none%22 mask=%22url(%23b)%22%3E%3Cpath d=%22M0 0h200v200H0zM200 0h200v200H200zM400 0h200v200H400zM600 0h200v200H600zM800 0h200v200H800zM1000 0h200v200h-200zM1200 0h200v200h-200zM1400 0h200v200h-200zM1600 0h200v200h-200zM1800 0h200v200h-200zM0 200h200v200H0zM200 200h200v200H200zM400 200h200v200H400zM600 200h200v200H600zM800 200h200v200H800zM1000 200h200v200h-200zM1200 200h200v200h-200zM1400 200h200v200h-200zM1600 200h200v200h-200zM1800 200h200v200h-200zM0 400h200v200H0zM200 400h200v200H200zM400 400h200v200H400zM600 400h200v200H600zM800 400h200v200H800zM1000 400h200v200h-200zM1200 400h200v200h-200zM1400 400h200v200h-200zM1600 400h200v200h-200zM1800 400h200v200h-200zM0 600h200v200H0zM200 600h200v200H200zM400 600h200v200H400zM600 600h200v200H600zM800 600h200v200H800zM1000 600h200v200h-200zM1200 600h200v200h-200zM1400 600h200v200h-200zM1600 600h200v200h-200zM1800 600h200v200h-200zM0 800h200v200H0zM200 800h200v200H200zM400 800h200v200H400zM600 800h200v200H600zM800 800h200v200H800zM1000 800h200v200h-200zM1200 800h200v200h-200zM1400 800h200v200h-200zM1600 800h200v200h-200zM1800 800h200v200h-200zM0 1000h200v200H0zM200 1000h200v200H200zM400 1000h200v200H400zM600 1000h200v200H600zM800 1000h200v200H800zM1000 1000h200v200h-200zM1200 1000h200v200h-200zM1400 1000h200v200h-200zM1600 1000h200v200h-200zM1800 1000h200v200h-200zM0 1200h200v200H0zM200 1200h200v200H200zM400 1200h200v200H400zM600 1200h200v200H600zM800 1200h200v200H800zM1000 1200h200v200h-200zM1200 1200h200v200h-200zM1400 1200h200v200h-200zM1600 1200h200v200h-200zM1800 1200h200v200h-200z%22 transform=%22matrix(.98992 .57735 -.01746 1 0 0)%22%2F%3E%3C%2Fg%3E%3Cpath fill=%22%23f3f3f3%22 filter=%22url(%23c)%22 opacity=%22.8%22 d=%22M0 0h2000v1400H0z%22%2F%3E%3Cdefs%3E%3CradialGradient id=%22a%22%3E%3Cstop offset=%220%22 stop-color=%22%23fff%22%2F%3E%3Cstop offset=%221%22 stop-color=%22%23fff%22 stop-opacity=%220%22%2F%3E%3C%2FradialGradient%3E%3Cfilter id=%22c%22 x=%22-800%22 y=%22-560%22 width=%222800%22 height=%221960%22 filterUnits=%22userSpaceOnUse%22 primitiveUnits=%22userSpaceOnUse%22 color-interpolation-filters=%22linearRGB%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.145%22 numOctaves=%224%22 seed=%2215%22 stitchTiles=%22no-stitch%22 x=%220%22 y=%220%22 width=%222000%22 height=%221400%22 result=%22turbulence%22%2F%3E%3CfeSpecularLighting surfaceScale=%2210%22 specularConstant=%22.55%22 specularExponent=%2220%22 lighting-color=%22%23fff%22 x=%220%22 y=%220%22 width=%222000%22 height=%221400%22 in=%22turbulence%22 result=%22specularLighting%22%3E%3CfeDistantLight azimuth=%223%22 elevation=%22100%22%2F%3E%3C%2FfeSpecularLighting%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
</style>

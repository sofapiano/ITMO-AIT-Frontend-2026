<script setup>
import TheNavbar from './components/Navbar.vue'
import TheHero from './components/Hero.vue'
import TheFooter from './components/Footer.vue'
import { onMounted } from 'vue'

// Переносим логику темы из theme.js
onMounted(() => {
  const currentTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', currentTheme)
})
</script>

<template>
  <div class="app-wrapper">
    <TheNavbar />
    
    <main>
      <TheHero />
      </main>

    <TheFooter />
  </div>
</template>

<style>
/* Здесь можно импортировать ваш style.css */
@import "./assets/style.css";
</style>
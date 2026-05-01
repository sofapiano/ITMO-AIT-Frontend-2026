<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top border-bottom border-secondary">
        <div class="container">
            <a class="navbar-brand fw-bold" href="/">
            AI <span class="text-info">HUB</span>
            </a>

            <div class="d-flex align-items-center">
                <template v-if="!authStore.isLoggedIn">
                <button class="btn btn-outline-info me-2" data-bs-toggle="modal" data-bs-target="#loginModal">
                    Вход
                </button>
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#regModal">
                    Регистрация
                </button>
                </template>

                <template v-else>
                <span class="text-muted me-3">{{ authStore.userName }}</span>
                <a href="/profile.html" class="btn btn-outline-secondary me-2">Профиль</a>
                <button @click="authStore.logout" class="btn btn-sm btn-link text-danger">Выйти</button>
                </template>
            </div>
        
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/explore">Models</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Datasets</a>
                </li>
                </ul>
                
                <div class="d-flex align-items-center gap-3">
                <button class="btn btn-outline-light btn-sm" id="theme-toggle">
                    🌓
                </button>
                <button class="btn btn-info btn-sm">Sign In</button>
                </div>
            </div>
        </div>
    </nav>
    <LoginModal />
    <RegisterModal />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import LoginModal from './LoginModal.vue';
import RegisterModal from './RegisterModal.vue';

const authStore = useAuthStore();
</script>
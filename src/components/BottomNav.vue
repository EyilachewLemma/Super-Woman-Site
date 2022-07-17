<template>
    <div class="bottomNav d-flex p-3 justify-content-between">
        <router-link :to="{name:'HomePage'}" class="fs-4 text-decoration-none"><i class="fas fa-home"></i></router-link>
        <router-link :to="{name:'RoleModels'}" class="fs-4 text-decoration-none"><i class="fas fa-border-all"></i></router-link>
        <router-link to="#" class="fs-4 text-decoration-none"><i class="fas fa-comment"></i></router-link>
        <router-link to="#" class="fs-4 text-decoration-none"><i class="fas fa-user"></i></router-link>
    </div>
</template>
<style scoped>
.bottomNav{
background-color: #0d0d0d;
}
.active{
    color: #e7453a;
}
a{color: #fff;}
</style>
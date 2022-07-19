import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'HomePage',
        component: () =>
            import ( /* webpackChunkName: "HomePage" */ '../views/HomePage.vue')
    },
    {
        path: '/home',
        name: 'PageContainer',
        component: () =>
            import ( /* webpackChunkName: "PageContainer" */ '../views/PageContainer.vue'),
        children: [{
            path: '/role-models',
            name: 'RoleModels',
            component: () =>
                import ( /* webpackChunkName: "RoleModels" */ '../views/RoleModels.vue')
        }, {
            path: '/role-model-detail/:rolemodelId',
            name: 'RoleModelDetail',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "RoleModelDetail" */ '../views/RolemodelDetail.vue')
        }, {
            path: '/mentors',
            name: 'Mentors',
            component: () =>
                import ( /* webpackChunkName: "Mentors" */ '../views/MentorList.vue')
        }, ]

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'

})

export default router
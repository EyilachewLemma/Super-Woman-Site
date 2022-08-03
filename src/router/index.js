import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/home',
        name: 'PageContainer',
        component: () =>
            import ( /* webpackChunkName: "PageContainer" */ '../views/PageContainer.vue'),
        children: [{
                path: '/',
                name: 'HomePage',
                meta: { ishome: true },

                component: () =>
                    import ( /* webpackChunkName: "HomePage" */ '../views/HomePage.vue')
            },
            {
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
            },
            {
                path: '/mentor-application',
                name: 'MentorApplication',
                component: () =>
                    import ( /* webpackChunkName: "MentorApplication" */ '../views/MentorApplication.vue')
            },
            {
                path: '/account',
                name: 'Account',
                component: () =>
                    import ( /* webpackChunkName: "Account" */ '../views/AccountPage.vue'),
                children: [{
                        path: '/my-account',
                        name: 'MyAccount',
                        component: () =>
                            import ( /* webpackChunkName: "MyAccount" */ '../views/AccontDetail.vue')
                    },
                    {
                        path: '/phone-setting',
                        name: 'PhoneSetting',
                        component: () =>
                            import ( /* webpackChunkName: "PhoneSetting" */ '../views/PhoneSetting.vue')
                    },
                    {
                        path: '/my-mentor',
                        name: 'MyMentor',
                        component: () =>
                            import ( /* webpackChunkName: "MyMentor" */ '../views/MyMentor.vue')
                    },
                    {
                        path: '/my-interest',
                        name: 'MyInterest',
                        component: () =>
                            import ( /* webpackChunkName: "MyInterest" */ '../views/MyInterest.vue')
                    },
                    {
                        path: '/my-request',
                        name: 'MyRequest',
                        component: () =>
                            import ( /* webpackChunkName: "MyRequest" */ '../views/MyRequest.vue')
                    },
                ]
            },
            {
                path: '/account-setting',
                name: 'AccountSetting',
                component: () =>
                    import ( /* webpackChunkName: "AccountSetting" */ '../views/AccontDetail.vue')
            },
            {
                path: '/setting-phone',
                name: 'SettingPhone',
                component: () =>
                    import ( /* webpackChunkName: "SettingPhone" */ '../views/PhoneSetting.vue')
            },
            {
                path: '/setting-mentor',
                name: 'MentorSetting',
                component: () =>
                    import ( /* webpackChunkName: "MentorSetting" */ '../views/MyMentor.vue')
            },
            {
                path: '/interest-setting',
                name: 'InterestSetting',
                component: () =>
                    import ( /* webpackChunkName: "InterestSetting" */ '../views/MyInterest.vue')
            },
            {
                path: '/request-setting',
                name: 'RequestSetting',
                component: () =>
                    import ( /* webpackChunkName: "RequestSetting" */ '../views/MyRequest.vue')
            },
            {
                path: '/mentor-request/:mentorId',
                name: 'MentorRequest',
                props: true,
                component: () =>
                    import ( /* webpackChunkName: "MentorRequest" */ '../views/MentorRequest.vue')
            },



        ]

    },
    {
        path: '/chat',
        name: 'Chat',
        component: () =>
            import ( /* webpackChunkName: "Chat" */ '../views/MessagePage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'

})

export default router
import { createWebHistory, createRouter } from "vue-router";
// import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "signin",
        component: ()=>import('@/components/ui/signin.vue'),
    },
    {
        path: "/register",
        name: "register",
        component: ()=>import('@/components/ui/register.vue'),
    },
    {
        path: "/home",
        name: "home",
        component: ()=>import('@/components/ui/home.vue'),
    },
    {
        path: "/upload",
        name: "upload",
        component: ()=>import('@/components/ui/post.vue'),
    },
    {
        path: "/view/:id",
        name: "view",
        component: ()=>import('@/components/ui/view.vue'),
        props:true,
    },
];
const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
});
export default router;
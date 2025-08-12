import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";
import { me } from "@/lib/api/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { hideNavbar: true },
    },
  ],
});

// router.beforeEach(async (to, from) => {
//   const userStore = useUserStore();

//   try {
//     // ตรวจสอบ authentication
//     const res = await me();

//     // ถ้าได้ข้อมูลผู้ใช้ให้อัปเดต store
//     if (res?.data) {
//       userStore.setUser(res.data.user);
//     }

//     // Logic การ redirect
//     if (!userStore.isAuthenticated && to.name !== "login") {
//       // ใช้ path แทน name เพื่อความชัดเจน
//       return { path: `/login` };
//     }

//     if (to.name === "login" && userStore.isAuthenticated) {
//       return { path: `/dashboard` };
//     }
//   } catch (err) {
//     console.error("Authentication check failed:", err);

//     // ถ้า request ล้มเหลวและไม่ใช่หน้า login ให้ redirect
//     if (to.name !== "login") {
//       return { path: `/login` };
//     }
//   }

//   return true;
// });
export default router;

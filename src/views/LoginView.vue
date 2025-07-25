<template>
  <div class="h-screen">
    <div class="flex w-full h-full justify-center items-center">
      <div class="card rounded shadow-xl">
        <div class="text-center mb-3">
          <label class="font-bold text-3xl">LOGIN</label>
        </div>
        <div class="w-full p-3">
          <div
            class="flex flex-col justify-center items-center p-3 w-full h-60px mb-3"
            :class="isError ? 'bg-red-500/60' : 'bg-green-500'"
            v-if="isError"
          >
            <label class="font-bold text-xl">{{
              isError ? "Error" : "Success"
            }}</label>
            {{ errMsg }}
          </div>
          <form
            class="flex flex-col justify-center items-center gap-3"
            v-on:submit="onSubmit"
          >
            <div class="flex flex-col w-full gap-1">
              <label class="font-bold">USERNAME</label>
              <input
                class="input w-full"
                type="input"
                id="username"
                name="username"
                v-model="form.username"
                :class="
                  errors.username ? 'border-red-400' : 'border-neutral-100'
                "
                placeholder="USERNAME"
              />
              <span v-if="errors.username" class="text-red-500 text-sm">
                {{ errors.username }}
              </span>
            </div>
            <div class="flex flex-col w-full gap-1">
              <label class="font-bold">PASSWORD</label>
              <input
                class="input w-full"
                type="password"
                id="password"
                name="password"
                v-model="form.password"
                placeholder="PASSWORD"
                :class="
                  errors.password ? 'border-red-400' : 'border-neutral-100'
                "
              />
              <span v-if="errors.password" class="text-red-500 text-sm">
                {{ errors.password }}
              </span>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from "@/data/dto/request/auth";
import { login } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { z } from "zod";

const router = useRouter();
const isError = ref<boolean>(false);
const errMsg = ref<string>("");
const useUser = useUserStore();

const loginSchema = z.object({
  username: z.string().min(1, "Username is require"),
  password: z.string().min(1, "Password is require"),
});

const form: LoginRequest = reactive({
  username: "",
  password: "",
});

const errors = ref<{ username?: string; password?: string }>({});

const onSubmit = async (e: any) => {
  e.preventDefault(); // ← ใส่วงเล็บเพื่อเรียกใช้งาน
  console.log(form);
  const result = loginSchema.safeParse(form);

  if (!result.success) {
    // Clear previous errors
    errors.value = {};

    // Map Zod errors to UI
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof typeof errors.value;
      errors.value[field] = issue.message;
    }

    return;
  }

  const signin = async (req: LoginRequest) => {
    try {
      const res = await login(req);
      isError.value = false;
      errMsg.value = "";
      console.log(res);
      if (res.status === 200) {
        console.log(res);
        const data = res.data.user;
        useUser.setUser(data);
        router.replace("/dashboard");
      }
      if (res.status !== 200) {
        isError.value = true;
        if (res.status === 401) {
          console.log(isError.value);
          errMsg.value = "incorrect username and password";
        }
      }
    } catch (err: any) {
      isError.value = true;
      if (err.status != null && err.status === 401) {
        errMsg.value = "Invalid username and password";
      } else {
        errMsg.value = "Internal Server Error ";
      }
      console.log(err);
    }
  };
  signin(form);
};
</script>

<style scoped>
.card {
  padding: 50px;
  background-color: azure;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}
</style>

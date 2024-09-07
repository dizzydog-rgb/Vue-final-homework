<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html" @submit.prevent="signup">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signUpField.email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="signUpField.nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="signUpField.password"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            v-model="signUpField.passwordCheck"
            required
          />
          {{ signUpField }}
          <input class="formControls_btnSubmit" type="button" value="註冊帳號" @click="signup" />
          <a class="formControls_btnLink" href="#loginPage">登入</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const api = 'https://todolist-api.hexschool.io'

// 註冊
const signUpField = ref({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: ''
})

const signUpRes = ref('')

const signup = async function () {
  // console.log(`${api}/user/sign_up`)
  if (signUpField.value.password === signUpField.value.passwordCheck) {
    try {
      const res = await axios.post(`${api}/users/sign_up`, signUpField.value)
      signUpRes.value = res.data.uid
      alert('註冊成功！即將跳轉...')
      window.location.hash = '#todoListPage'
    } catch (error) {
      console.log(error)
      alert('註冊失敗，請重試')
    }
  } else {
    alert('請重新確認密碼')
  }
}

// 驗證登入
const user = ref({
  nickname: '',
  uid: ''
})

onMounted(async function () {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  console.log(token)

  const res = await axios.get(`${api}/users/checkout`, {
    headers: {
      Authorization: token
    }
  })
  user.value = res.data
  router.push('/todo')
})
</script>

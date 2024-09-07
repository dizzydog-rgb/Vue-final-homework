<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signInField.email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="signInField.password"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            onclick="javascript:location.href='#todoListPage'"
            value="登入"
            @click="signIn"
          />
          UID: {{ signInField }}
          <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>
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

// 登入
const signInField = ref({
  email: '',
  password: ''
})

const signIn = async function () {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)

    // 檢查登入回應中的 token，確認是否成功登入
    if (res.data.token) {
      document.cookie = `customTodoToken=${res.data.token}; path=/;`
      console.log('Token saved to cookie')

      alert('登入成功，即將跳轉')

      // 成功後才跳轉到 todoListPage
      router.push('/todo')
    }
  } catch (error) {
    console.log(error)
    alert('登入失敗')
  }
}

// 驗證登入
const user = ref({
  nickname: '',
  uid: ''
})

onMounted(async function () {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // console.log(token)

    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token
      }
    })
    user.value = res.data
    router.push('/todo')
  } catch (error) {
    console.log(error)
  }
})
</script>

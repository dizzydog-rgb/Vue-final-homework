<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ user.nickname }} 的代辦清單</span></a
          >
        </li>
        <li @click="signOut"><a href="#">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodo" />
          <a href="#" @click="addTodo">
            <i class="fa fa-plus">+</i>
          </a>
        </div>
        <div class="todoList_list">
          <div v-if="todos.length > 0">
            <ul class="todoList_tab">
              <li>
                <a
                  href="#"
                  :class="{ active: filterStatus === 'all' }"
                  @click="filterStatus = 'all'"
                  >全部</a
                >
              </li>
              <li>
                <a
                  href="#"
                  :class="{ active: filterStatus === 'active' }"
                  @click="filterStatus = 'active'"
                  >待完成</a
                >
              </li>
              <li>
                <a
                  href="#"
                  :class="{ active: filterStatus === 'completed' }"
                  @click="filterStatus = 'completed'"
                  >已完成</a
                >
              </li>
            </ul>
            <div class="todoList_items">
              <ul class="todoList_item">
                <li v-for="(todo, index) in filteredTodos" :key="index">
                  <label class="todoList_label">
                    <input
                      class="todoList_input"
                      type="checkbox"
                      :checked="todo.status"
                      @click="toggleStatus(todo.id)"
                    />
                    <span>{{ todo.content }}</span>
                  </label>
                  <a href="#" @click="deleteTodo(todo.id)">
                    <i class="fa fa-times">delete</i>
                  </a>
                </li>
              </ul>
              <div class="todoList_statistics">
                <p>{{ uncompletedTodosCount }} 個待完成項目</p>
              </div>
            </div>
          </div>
          <div v-else class="no-todos">
            <h1>目前無待辦事項</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const api = 'https://todolist-api.hexschool.io'

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
    router.push('/')
  }
})

// 登出
const tokenSignOut = ref('')

onMounted(async function () {
  tokenSignOut.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  // console.log(tokenSignOut)
})

const signOut = async function () {
  try {
    if (!tokenSignOut.value) {
      throw new Error('沒有token')
    }

    const res = await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: tokenSignOut.value
        }
      }
    )
    console.log(res.data)
    document.cookie = 'customTodoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    tokenSignOut.value = ''

    router.push('/')
    alert('登出成功')
  } catch (error) {
    console.log(error)
    alert('登出失敗: ' + error.message)
  }
}

// Todo list
const todos = ref([])
const newTodo = ref('')
const token = ref('')
const filterStatus = ref('all') // 篩選狀態

// 在組件掛載時獲取 token
onMounted(async () => {
  token.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  if (token.value) {
    await getTodos()
    // 確保取得 todos
    // console.log('todos.value: ', todos.value)

    // 確保取得 filteredTodos
    // console.log('filteredTodos.value: ', filteredTodos.value)
  }
})

const getTodos = async () => {
  const res = await axios.get(`${api}/todos`, {
    headers: {
      Authorization: token.value
    }
  })
  todos.value = res.data.data
}

const filteredTodos = computed(() => {
  if (filterStatus.value === 'active') {
    return todos.value.filter((todo) => !todo.status)
  } else if (filterStatus.value === 'completed') {
    return todos.value.filter((todo) => todo.status)
  }
  return todos.value
})

const uncompletedTodosCount = computed(() => {
  return todos.value.filter((todo) => !todo.status).length
})

const addTodo = async () => {
  if (!newTodo.value) return

  const todo = {
    content: newTodo.value
  }
  await axios.post(`${api}/todos`, todo, {
    headers: {
      Authorization: token.value
    }
  })
  newTodo.value = ''
  getTodos()
}

const deleteTodo = async (id) => {
  await axios.delete(`${api}/todos/${id}`, {
    headers: {
      Authorization: token.value
    }
  })
  getTodos()
}

const toggleStatus = async (id) => {
  const res = await axios.patch(
    `${api}/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token.value
      }
    }
  )
  console.log(res.data)

  getTodos()
}

const TodoToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexschoolTodo='))
  ?.split('=')[1]

onMounted(() => {
  if (TodoToken) {
    token.value = TodoToken
  }
})
</script>

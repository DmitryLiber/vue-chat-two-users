import { ref } from 'vue'
import { defineStore } from 'pinia'

interface IMsg {
  text: string
  status: 'success' | 'warning' | 'error'
  id?: string
}

const generateRandomValue = (): string => {
  const digits = '0123456789'
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let randomValue = ''
  for (let i = 0; i < 8; i++) {
    randomValue +=
      i < 6 ? digits[Math.floor(Math.random() * 10)] : letters[Math.floor(Math.random() * 52)]
  }
  return randomValue
}

const useNotificationsStore = defineStore('notifications', () => {
  const msgList = ref<IMsg[]>([])

  function showMsg({ text = '', status = 'success' } = {} as IMsg) {
    const idMsg = generateRandomValue()
    msgList.value.push({ text, status, id: idMsg })

    setTimeout(() => {
      msgList.value.splice(
        msgList.value.findIndex((msg) => msg.id === idMsg),
        1
      )
    }, 4000)
  }

  return { showMsg, msgList }
})

export default useNotificationsStore

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IMessage } from './IMessage'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([] as IMessage[])

  function addMessage(idUser: number, text: string) {
    messages.value.push({ idUser, text, time: Date.now() })
  }

  return { messages, addMessage }
})

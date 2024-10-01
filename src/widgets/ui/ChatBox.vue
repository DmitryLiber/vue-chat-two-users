<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { Users, useMessagesStore, type IUser } from '@entities/model'
import { useNotificationsStore } from '@shared/model'

interface IProps {
  idUser: number
}

const { idUser } = defineProps<IProps>()

const messagesStore = useMessagesStore()
const notificationsStore = useNotificationsStore()

const getUserData = (idUser: number) => <IUser>Users.find((user) => user.id === idUser)
const userMessage = ref('')

const sendMessage = () => {
  if (!userMessage.value) {
    notificationsStore.showMsg({ text: 'Сообщение не может быть пустым', status: 'error' })
    return
  }

  messagesStore.addMessage(idUser, userMessage.value)
  userMessage.value = ''
}

watch(messagesStore.messages, () => {
  nextTick(() => {
    document.querySelectorAll('.chat-box__main').forEach((el) => {
      el.scrollTop = el.scrollHeight
    })
  })
})
</script>

<template>
  <div class="chat-box">
    <div class="chat-box__header">
      <Typography tag="h2" mods="heading3">{{ getUserData(idUser).name }}</Typography>
    </div>

    <div class="chat-box__main">
      <ul class="chat-box__messages">
        <li
          :class="['chat-box__message', { 'chat-box__message--alt': msg.idUser !== idUser }]"
          v-for="msg in messagesStore.messages"
        >
          <div class="chat-box__message-header">
            <span class="chat-box__message-user">{{ getUserData(msg.idUser).name }}</span>
          </div>
          <div class="chat-box__message-main">{{ msg.text }}</div>
          <div class="chat-box__message-footer">
            <span class="chat-box__message-date">{{
              msg.time ? new Date(msg.time).toLocaleString() : ''
            }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="chat-box__footer">
      <form class="chat-box__form" @submit.prevent="sendMessage">
        <Field
          placeholder="Ваше сообщение"
          :value="userMessage"
          @input="userMessage = $event.target.value"
        />
        <Btn mods="small" type="submit">Отправить</Btn>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@layer block {
  .chat-box {
    border: 1px solid cl(surface-alt);
    border-radius: var(--radius-s);
    padding: var(--gap-s);
    height: calc(100dvh - var(--header-height) - var(--gap-s));
    display: flex;
    flex-direction: column;
    gap: var(--gap-xs);

    &__main {
      flex-grow: 1;
      overflow-y: scroll;
    }

    &__messages {
      @include reset-list();

      display: flex;
      flex-direction: column;
      gap: var(--gap-xs);
      padding-right: var(--gap-xxs);
    }

    &__message {
      background-color: cl(surface-third);
      border-radius: var(--radius-s);
      padding: var(--gap-xxs) var(--gap-xs);
      width: 60%;

      &::before {
        content: '';
        background-color: red;
        height: 20px;
        height: 20px;
      }
    }

    &__message-user {
      @include font(18px, normal, 500);
    }

    &__message-footer {
      @include font(12px, normal);
      display: flex;
    }

    &__message-date {
      margin-left: auto;
      color: cl(text, 0.6);
    }

    &__form {
      display: flex;
      gap: var(--gap-s);
    }

    &__footer,
    &__header {
      background-color: cl(surface);
      border-radius: var(--radius-s);
      padding: var(--gap-s) var(--gap-xs);
    }
  }
}

@layer mod {
  .chat-box {
    &__message--alt {
      background-color: cl(surface-fourth);
      margin-left: auto;
    }
  }
}
</style>

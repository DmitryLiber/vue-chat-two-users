<script lang="ts" setup>
import { ChatBox } from '@widgets/ui'
</script>

<template>
  <Container>
    <Typography tag="h1" mods="heading1" class="pb-s">Чат двух пользователей</Typography>

    <Grid columns="2">
      <ChatBox :idUser="1" />
      <ChatBox :idUser="2" />
    </Grid>
  </Container>
</template>

<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script>
import { currentUser } from '../../constants/config'
import AppLayout from '../../layouts/AppLayout'

export default {
  components: {
    'app-layout': AppLayout
  }
}
</script>

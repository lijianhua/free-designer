<template>
  <div class="home">
    home
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('home', ['getterA', 'getterB'])
  },
  methods: {
    ...mapMutations('home', ['SET_TEST1', 'SET_TEST2']),
    ...mapActions('home', ['test3', 'test4'])
  },
  mounted () {
    console.log(this.getterA)
    console.log(this.getterB)
    this.SET_TEST1(3)
    this.SET_TEST2(4)
    console.log(this.getterA)
    console.log(this.getterB)

    this.test3(5)
    this.test4(6)
  }
}
</script>

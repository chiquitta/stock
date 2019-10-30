<template>
  <div id="app">
    <b-container>
      <b-row class="py-4">
        <b-col cols="12" class="pb-3">
          <!-- <h1>
            台股買賣獲利線上試算
          </h1> -->
        </b-col>
        <b-col cols="12" md="6">
          <b-row>
            <b-col>
              <b-form-group
                label="買入成交價"
                class="text-black-50"
              >
                <b-form-input v-model="buy" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="買入股數"
                class="text-black-50"
                description="*一張為 1000 股"
              >
                <b-form-input v-model="buyNum" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            label="券商下單折扣"
            class="text-black-50"
            description="可自行輸入折數"
          >
            <b-form-select v-model="fee" :options="fees" size="lg" />
            或
            <b-input-group append="折">
              <b-form-input v-model="fee" type="number" size="lg" placeholder="請輸入" />
            </b-input-group>
          </b-form-group>
          <b-row class="pt-4">
            <b-col class="text-right">
              <span class="text-black-50">買入價格</span>
              <p class="lead">
                ${{ buyPrice.toLocaleString() }}
              </p>
            </b-col>
            <b-col class="text-right">
              <span class="text-black-50">買入手續費</span>
              <p class="lead">
                ${{ buyFee.toLocaleString() }}
              </p>
            </b-col>
            <b-col class="text-right">
            <span class="text-black-50">買入總價格</span>
            <p class="lead">
              ${{ buyTotal.toLocaleString() }}
            </p>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <!-- <b-form-input v-model="sell" placeholder="" />
          <b-form-input v-model="sellNum" placeholder="請輸入" /> -->
        </b-col>
      </b-row>
    </b-container>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
/* eslint-disable no-console */
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data() {
    return {
      buy: 40,
      buyNum: 1000,
      sell: 0,
      sellNum: 1000,
      brokerFee: null,
      feePercentage: 0.001425,
      fee: 6,
      fees: this.range(0, 10, 0.5).map(val => {
        let text = `${val}折`
        text = val === 10 ? '無折扣' : text
        text = val === 0 ? '免手續費' : text
        return { value: val, text }
      })
    }
  },
  computed: {
    buyPrice() {
      return this.buy * this.buyNum
    },
    buyFee() {
      const brokerFee = this.buy * this.buyNum * this.feePercentage * this.fee * 0.1
      return Math.round(brokerFee < 20 ? 20 : brokerFee)
    },
    buyTotal() {
      return Math.round(this.buyPrice + this.buyFee)
    }
  },
  methods: {
    range(start, end, step = 1) {
      const len = Math.floor((end - start) / step) + 1
      return Array(len).fill().map((_, idx) => start + (idx * step)).reverse()
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

<template>
  <div id="app">
    <b-container>
      <b-row class="py-4">
        <b-col cols="12" class="pb-5">
          <h2 class="font-weight-light text-center">
            台股買賣獲利線上試算
          </h2>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="6" md="3" order="1" order-sm="1">
              <b-form-group
                label="買入成交價"
                class="text-black-50"
              >
                <b-form-input v-model="buy" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
            <b-col cols="6" md="3" order="3" order-sm="2">
              <b-form-group
                label="買入股數"
                class="text-black-50"
                description="一張為 1000 股"
              >
                <b-form-input v-model="buyNum" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
            <b-col cols="6" md="3" order="2" order-sm="3">
              <b-form-group
                label="賣出成交價"
                class="text-black-50"
              >
                <b-form-input v-model="sell" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
            <b-col cols="6" md="3" order="4" order-sm="4">
              <b-form-group
                label="賣出股數"
                class="text-black-50"
                description="一張為 1000 股"
              >
                <b-form-input v-model="sellNum" type="number" size="lg" placeholder="請輸入" />
              </b-form-group>
            </b-col>
            <b-col cols="6" order="5" order-sm="5">
              <label class="text-black-50">
                券商下單折扣
                <b-link class="small" @click="manualFeeA = !manualFeeA">
                  手動輸入
                </b-link>
              </label>
              <b-form-select v-if="!manualFeeA" v-model="sellFee" :options="fees" size="lg" />
              <b-input-group v-else append="折">
                <b-form-input v-model="sellFee" type="number" size="lg" placeholder="請輸入" />
              </b-input-group>
            </b-col>
            <b-col cols="6" order="6" order-sm="6">
              <label class="text-black-50">
                券商下單折扣
                <b-link class="small" @click="manualFeeB = !manualFeeB">
                  手動輸入
                </b-link>
              </label>
              <b-form-select v-if="!manualFeeB" v-model="buyFee" :options="fees" size="lg" />
              <b-input-group v-else append="折">
                <b-form-input v-model="buyFee" type="number" size="lg" placeholder="請輸入" />
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="pt-5">
            <b-col cols="4" class="text-right">
              <span class="text-black-50">買入價格</span>
              <p class="lead">
                ${{ buyPrice.toLocaleString() }}
              </p>
            </b-col>
            <b-col cols="4" class="text-right">
              <span class="text-black-50">買入手續費</span>
              <p class="lead">
                ${{ bfee.toLocaleString() }}
              </p>
            </b-col>
            <b-col cols="4" class="text-right">
            <span class="text-black-50">買入總價格</span>
            <p class="lead">
              ${{ buyTotal.toLocaleString() }}
            </p>
            </b-col>
            <b-col class="text-right">
              <span class="text-black-50">賣出價格</span>
              <p class="lead">
                ${{ sellPrice.toLocaleString() }}
              </p>
            </b-col>
            <b-col class="text-right">
              <span class="text-black-50">賣出手續費</span>
              <p class="lead">
                ${{ sfee.toLocaleString() }}
              </p>
            </b-col>
            <b-col class="text-right">
            <span class="text-black-50">賣出總價格</span>
            <p class="lead">
              ${{ sellTotal.toLocaleString() }}
            </p>
            </b-col>
          </b-row>
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
      sell: 42,
      sellNum: 1000,
      manualFeeA: false,
      manualFeeB: false,
      brokerFee: null,
      feePercentage: 0.001425,
      buyFee: 6,
      sellFee: 6,
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
    bfee() {
      const brokerFee = this.buyPrice * this.feePercentage * this.buyFee * 0.1
      if(brokerFee === 0) return 0
      return Math.round(brokerFee < 20 ? 20 : brokerFee)
    },
    buyTotal() {
      return Math.round(this.buyPrice + this.bfee)
    },
    sellPrice() {
      return this.sell * this.sellNum
    },
    sfee() {
      const brokerFee = this.sellPrice * this.feePercentage * this.sellFee * 0.1
      if(brokerFee === 0) return 0
      return Math.round(brokerFee < 20 ? 20 : brokerFee)  
    },
    sellTotal() {
      return Math.round(this.sellPrice + this.sfee)
    },
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
.v-icon {
  width: 18px;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

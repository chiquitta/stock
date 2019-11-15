<template>
  <b-container class="m-auto">
    <b-row class="min-vh-100" align-v="center">
      <b-col cols="12" class="text-center">
        <b-link href="/" class="h2 font-weight-light text-decoration-none">
          台股買賣獲利線上試算
        </b-link>
      </b-col>
      <b-col cols="7" md="6">
        <b-form-group label="">
          <b-form-radio-group
            v-model="type"
            :options="options"
            size="lg"
            class="mt-3"
          />
        </b-form-group>
      </b-col>
      <b-col cols="5" md="6" class="text-right">
        <div 
          class="fb-share-button" 
          data-href="https://twstocks.com/" 
          data-layout="button">
        </div>
        <div class="float-right mt-1 ml-1">
          <div 
            class="line-it-button"
            data-lang="zh_Hant"
            data-type="share-a"
            data-ver="3"
            data-url="https://twstocks.com/"
            data-color="default"
            data-size="small"
            data-count="false"
            style="display: none;"
          ></div>
        </div>
      </b-col>
      <b-col cols="12">
        <b-row class="bg-light py-5">
          <b-col cols="6" md="3" order="1" order-sm="1">
            <b-form-group
              label="買入成交價"
              class="text-black-50 font-weight-light"
            >
              <b-form-input v-model="buy" type="number" size="lg" placeholder="" />
            </b-form-group>
          </b-col>
          <b-col cols="6" md="3" order="3" order-sm="2">
            <b-form-group
              label="買入股數(一張1000股)"
              class="text-black-50 font-weight-light"
            >
              <b-form-input v-model="buyNum" type="number" size="lg" placeholder="請輸入股數" />
              <!-- <div class="text-right">
                <small class="text-black-50 font-weight-light">
                  (一張為 1000 股)
                </small>
              </div> -->
            </b-form-group>
          </b-col>
          <b-col cols="6" md="3" order="2" order-sm="3">
            <b-form-group
              label="賣出成交價"
              class="text-black-50 font-weight-light"
            >
              <b-form-input v-model="sell" type="number" size="lg" placeholder="" />
            </b-form-group>
          </b-col>
          <b-col cols="6" md="3" order="4" order-sm="4">
            <b-form-group
              label="賣出股數(一張1000股)"
              class="text-black-50 font-weight-light"
            >
              <b-form-input v-model="sellNum" type="number" size="lg" placeholder="請輸入股數" />
            </b-form-group>
          </b-col>
          <b-col cols="6" order="5" order-sm="5">
            <label class="text-black-50 font-weight-light">
              下單折扣
              <b-link class="small" @click="manualFeeB = !manualFeeB">
                手動輸入
              </b-link>
            </label>
            <b-form-select v-if="!manualFeeB" v-model="buyFee" :options="fees" size="lg" />
            <b-input-group v-else append="折">
              <b-form-input v-model="buyFee" type="number" size="lg" placeholder="請輸入" max="10" min="0" />
            </b-input-group>
          </b-col>
          <b-col cols="6" order="6" order-sm="6">
            <label class="text-black-50 font-weight-light">
              下單折扣
              <b-link class="small" @click="manualFeeA = !manualFeeA">
                手動輸入
              </b-link>
            </label>
            <b-form-select v-if="!manualFeeA" v-model="sellFee" :options="fees" size="lg" />
            <b-input-group v-else append="折">
              <b-form-input v-model="sellFee" type="number" size="lg" placeholder="請輸入" max="10" min="0" />
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="py-5">
          <b-col cols="6" md="2" order="1" order-sm="1" class="text-right">
            <span class="text-black-50">買入價格</span>
            <p class="lead font-weight-bold">
              ${{ buyPrice.toLocaleString() }}
            </p>
          </b-col>
          <b-col cols="6" md="2" order="3" order-sm="2" class="text-right">
            <span class="text-black-50">買入手續費</span>
            <p class="lead font-weight-bold">
              ${{ bfee.toLocaleString() }}
            </p>
          </b-col>
          <b-col cols="6" md="2" order="5" order-sm="3" class="text-right">
          <span class="text-black-50">買入總價格</span>
          <p class="lead font-weight-bold">
            ${{ buyTotal.toLocaleString() }}
          </p>
          </b-col>
          <b-col cols="6" md="2" order="2" order-sm="4" class="text-right">
            <span class="text-black-50">賣出價格</span>
            <p class="lead font-weight-bold">
              ${{ sellPrice.toLocaleString() }}
            </p>
          </b-col>
          <b-col cols="6" md="2" order="3" order-sm="5" class="text-right">
            <span class="text-black-50">賣出手續費+證交稅</span>
            <p class="lead font-weight-bold">
              ${{ sfee.toLocaleString() }}
              +
              ${{ tax.toLocaleString() }}
              <!-- <small class="text-black-50">
                (${{ tax.toLocaleString() }})
              </small> -->
            </p>
          </b-col>
          <b-col cols="6" md="2" order="6" order-sm="6" class="text-right">
          <span class="text-black-50">賣出總價格</span>
          <p class="lead font-weight-bold">
            ${{ sellTotal.toLocaleString() }}
          </p>
          </b-col>
          <b-col cols="6" md="6" order="7" class="text-right">
            <span class="text-black-50">損益</span>
            <p
              :class="{
              'h4': true,
              'text-monospace': true,
              'font-weight-bold': true,
              'text-danger': profit > 0,
              'text-success': profit < 0
              }"
            >
              ${{ profit.toLocaleString() }}
            </p>
          </b-col>
          <!-- <b-col cols="6" md="4" order="8" class="text-right">
            <span class="text-black-50">賣出證交稅</span>
            <p class="lead">
              ${{ tax.toLocaleString() }}
            </p>
          </b-col> -->
          <b-col cols="6" md="6" order="8" class="text-right">
            <span class="text-black-50">獲利率</span>
            <p
              :class="{
              'h4': true,
              'text-monospace': true,
              'font-weight-bold': true,
              'text-danger': profitPercentage > 0,
              'text-success': profitPercentage < 0
              }"
            >
              {{ profitPercentage }}%
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-link to="/policy" class="small text-reset">privacy policy</b-link>
  </b-container>
</template>

<script>
/* eslint-disable no-console */
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'HelloWorld',
  components: {
    // HelloWorld
  },
  data() {
    return {
      buy: null,
      buyNum: 1000,
      sell: null,
      sellNum: 1000,
      manualFeeA: false,
      manualFeeB: false,
      brokerFee: null,
      feePercentage: 0.001425,
      buyFee: 6,
      sellFee: 6,
      fees: this.range(0, 10, 0.5).map(val => {
        let text = `${val} 折`
        text = val === 10 ? '無折扣' : text
        text = val === 0 ? '免手續費' : text
        return { value: val, text }
      }),
      type: 0.003,
      options: [
        { text: '台股', value: 0.003 },
        { text: 'ETF', value: 0.001 }
      ]
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
      return Math.round(this.sellPrice - this.sfee - this.tax)
    },
    profit() {
      return this.sellTotal - this.buyTotal
    },
    profitPercentage() {
      if(this.buyTotal === 0) return 0
      return ((this.profit / this.buyTotal * 100) || 0).toFixed(3)
    },
    tax() {
      return Math.round(this.sellPrice * this.type)
    }
  },
  methods: {
    range(start, end, step = 1) {
      const len = Math.floor((end - start) / step) + 1
      return Array(len).fill().map((_, idx) => start + (idx * step)).reverse()
    },
    selectVal(ele) {
      this.$set(this, 'sellFee', ele)
      console.dir(this.sellFee)
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

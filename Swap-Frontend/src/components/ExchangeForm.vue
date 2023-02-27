<template>
  <h1>Exchange Form</h1>
  <div class="container">
    <h4 class="dynamic-label">Dynamic Label</h4>
    <form class="form">
      <label class="form_input-cover">
        <div class="form_input-cover_span1">
          <svg>
            <use xlink:href="../assets/sprite.svg#ether-icon"></use>
          </svg>
        </div>
        <div class="form_input-cover_span2">
          <!-- the span will be a v-if and it will be invisible or stay as a placeholder some how till it is clicked-->
          <!-- <span class="form_input-cover_span2_label_amount">Amount</span> -->
          
          <input
            id ="amount"
            class="form_input-cover_span2_input"
            type="text"
            autocomplete="off"
          />
          <label for="amount" class="form_input-cover_span2_label">
            <span class="form_input-cover_span2_label_amount">Amount</span>
          </label>
        </div>
        <div class="input-cover__span3">
          <button class="input-cover__span3__btn">
            <img src="../assets/exchange-2.svg" class="colorize" />
          </button>
        </div>
      </label>

      <label class="form_label">Wallet Address from</label>
      <label class="form_label">Wallet Address to</label>
      <button class="form_button">Connect Wallet</button>
      <button class="form_button">Confirm</button>
    </form>
  </div>
</template>

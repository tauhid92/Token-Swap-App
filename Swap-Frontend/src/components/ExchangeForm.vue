<template>
  <h1>Exchange Form</h1>
  <div class="container">
    <h4 class="dynamic-label">Dynamic Label</h4>
    <form class="form">
      <div class="form_input-block">
      <div class="form_input-block_icon">
        <svg>
            <use xlink:href="../assets/sprite.svg#ether-icon"></use>
        </svg>
      </div>
      <div class="form_input-block_field"> 
        <input class="form_input-block_field_input" id="amount" type="text">     
        <label class="form_input-block_field_input-label" for="amount">
          Amount
        </label>
        
      </div>
      </div>
      <label class="form_label">Wallet Address from</label>
      <label class="form_label">Wallet Address to</label>
      <button class="form_button">Connect Wallet</button>
      <button class="form_button">Confirm</button>
    </form>
  </div>
</template>

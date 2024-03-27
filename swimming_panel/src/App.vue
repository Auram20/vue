<template>
  <div>
    <!--<router-link to="/">Home</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  body {
    background-color: #4D5154; /* Black with 80% opacity */
    color: #D0D0D1;
  }
  /* CSS */
  button {
  appearance: none;
  background-color: #e89541;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

button:hover {
  background-color: #2c974b;
}


button.active {
  background-color: #298e46 !important;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}


  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin-top: 50px;
  }
  
  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
</style>
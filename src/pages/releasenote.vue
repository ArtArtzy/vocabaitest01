<template>
  <div class="bg-black text-white">
    <div class="row">
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Release Note</div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div style="height:200px" class="releasebg1">
          <table style="width:100%">
            <tr>
              <td>
                <div class="roundbanner text-center text-black">
                  <div class="text-h2 q-mt-sm">&alpha;</div>
                  <div class="text-h6">1.0.0</div>
                </div>
              </td>
              <td>123</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bginside {
  height: calc(100vh - 82px);
  background-color: #1a2945;
  width: 100%;
  overflow-y: auto;
}
.brx {
  border: 1px solid red;
}
.releasebg1 {
  background-color: #3e547d;
}
.roundbanner {
  height: 120px;
  width: 120px;
  border-radius: 60px;
  background-color: #e5d4ba;
  line-height: 30px;
  position: relative;
  top: 30px;
  left: 30px;
}
</style>
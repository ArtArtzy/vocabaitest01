<template>
  <div class="bg-black text-white">
    <div class="row">
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Release Note</div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div style="height:120px" class="releasebg1 row">
          <div style="width:100px">
            <div class="roundbanner text-center text-black">
              <div class="text-h3 q-mt-sm">&alpha;</div>
              <div class="text-body1">1.0.0</div>
            </div>
          </div>
          <div style="width:calc(100% - 200px)" class="q-pa-lg row">
            <div class="col-12 self-center">
              <div>- เพิ่มระบบ Data Entry</div>
              <div>- เพิ่มระบบ Release note</div>
            </div>
          </div>
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
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #e5d4ba;
  line-height: 30px;
  position: relative;
  top: 10px;
  left: 30px;
}
</style>
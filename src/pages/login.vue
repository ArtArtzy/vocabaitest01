<template>
  <div class="bgdiv">
    <div class="logindiv absolute-center shadow-4">
      <div align="center" class="q-mt-md">
        <img src="../statics/winnerlab.png" style="width:350px;" alt />
      </div>
      <hr />
      <div class="text-h6" align="center">Encrytion code</div>
      <div class="text-h6" align="center">{{encryCode}}</div>
      <div align="center" class="q-mt-md">
        <div class="row passwordPanel">
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer"
              :class="{'bg-deep-orange': key1==3}"
              @click="checkCode(3,1)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer"
              :class="{'bg-deep-orange': key2==3 }"
              @click="checkCode(3,2)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer"
              :class="{'bg-deep-orange': key3==3}"
              @click="checkCode(3,3)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer"
              :class="{'bg-deep-orange': key4==3}"
              @click="checkCode(3,4)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-orange': key1>=2}"
              @click="checkCode(2,1)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-orange': key2>=2}"
              @click="checkCode(2,2)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-orange': key3>=2}"
              @click="checkCode(2,3)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-orange': key4>=2}"
              @click="checkCode(2,4)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-amber': key1>=1}"
              @click="checkCode(1,1)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-amber': key2>=1}"
              @click="checkCode(1,2)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-amber': key3>=1}"
              @click="checkCode(1,3)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-amber': key4>=1}"
              @click="checkCode(1,4)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-light-green': key1>=0}"
              @click="checkCode(0,1)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-light-green': key2>=0}"
              @click="checkCode(0,2)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-light-green': key3>=0}"
              @click="checkCode(0,3)"
            ></div>
          </div>
          <div class="col-3" align="center">
            <div
              class="inputPassword cursor-pointer q-mt-md"
              :class="{'bg-light-green': key4>=0}"
              @click="checkCode(0,4)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div align="center" class="absolute-bottom q-mb-md">
      <img src="../statics/subtitle.png" style="width: 450px;" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key1: 0,
      key2: 0,
      key3: 0,
      key4: 0,
      encryCode: "0000",
      passwordCode: "0000"
    };
  },
  methods: {
    genPassword() {
      let digit1 = this.randomCode();
      let digit2 = this.randomCode();
      let digit3 = this.randomCode();
      let digit4 = this.randomCode();

      let keyEncode = this.randomCode();
      this.encryCode =
        digit1.toString() +
        digit2.toString() +
        digit3.toString() +
        digit4.toString() +
        "-" +
        keyEncode.toString();
      this.passwordCode =
        Math.abs(digit1 - keyEncode).toString() +
        Math.abs(digit2 - keyEncode).toString() +
        Math.abs(digit3 - keyEncode).toString() +
        Math.abs(digit4 - keyEncode).toString();
    },
    randomCode() {
      return Math.floor(Math.random() * 4);
    },
    checkCode(num, orderNum) {
      if (orderNum == 1) {
        this.key1 = num;
      } else if (orderNum == 2) {
        this.key2 = num;
      } else if (orderNum == 3) {
        this.key3 = num;
      } else {
        this.key4 = num;
      }
      let inputCode =
        this.key1.toString() +
        this.key2.toString() +
        this.key3.toString() +
        this.key4.toString();

      if (inputCode == this.passwordCode) {
        this.notifyGreen("login successful");
        setTimeout(() => {
          this.$router.push("/dataentry");
        }, 2500);
      }
    }
  },
  mounted() {
    this.genPassword();
  }
};
</script>

<style scoped>
.bgdiv {
  background-image: url("../statics/bg.png");
  width: 100%;
  height: 100vh;
}
.logindiv {
  width: 400px;
  height: 450px;
  background-color: #1a2945;
  border-radius: 10px;
}
.inputPassword {
  width: 50px;
  height: 50px;
  background-color: white;
}
.passwordPanel {
  width: 300px;
}
.brx {
  border: 1px solid red;
}
</style>
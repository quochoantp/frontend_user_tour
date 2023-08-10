<template>
  <div class="login-page">
    <transition name="fade">
      <v-card class="wallpaper-login"></v-card>
    </transition>
    <v-card class="wallpaper-register"></v-card>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div
          v-if="!registerActive"
          class="card login"
          v-bind:class="{ error: emptyFields }"
          style="height: 250px"
        >
          <v-card class="py-6">
            <v-card-title class="d-flex justify-center">
              <div class="text-h4">Đăng nhập</div>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Tên đăng nhập"
                outlined
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="Mật khẩu"
                outlined
                v-model="password"
              ></v-text-field>
              <div class="text-right">
                <v-btn color="primary" @click="submit"> Đăng nhập </v-btn>
              </div>
            </v-card-text>
            <div class="text-center">
              <p>
                Không có tài khoản?
                <a href="#" @click="changRegisterStatus">Đăng ký tại đây</a>
              </p>
            </div>
            <div class="text-center">
              <p><a href="#">Quên mật khẩu ?</a></p>
            </div>
          </v-card>
        </div>

        <div
          v-else
          v-bind:class="{ error: emptyFields }"
          style="min-height: 300px"
        >
          <v-card>
            <v-card-title class="justify-center"
              >Đăng ký tài khoản</v-card-title
            >
            <form class="form-group" style="margin: 20px">
              <v-row>
                <v-col>
                  <h6>Tên đăng nhập</h6>
                  <v-text-field
                    outlined
                    dense
                    v-model="registerForm.username"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h6>Mật khẩu</h6>
                  <v-text-field
                    type="password"
                    outlined
                    dense
                    v-model="registerForm.password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h6>Họ và tên</h6>
                  <v-text-field
                    outlined
                    dense
                    v-model="registerForm.fullname"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h6>Số CMND/CCCD</h6>
                  <v-text-field
                    outlined
                    dense
                    v-model="registerForm.indentityCard"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h6>Email</h6>
                  <v-text-field
                    type="email"
                    outlined
                    dense
                    v-model="registerForm.email"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h6>Địa chỉ</h6>
                  <v-text-field
                    outlined
                    dense
                    v-model="registerForm.address"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h6>Số điện thoại</h6>
                  <v-text-field
                    outlined
                    dense
                    v-model="registerForm.phoneNumber"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h6>Ngày sinh</h6>
                  <v-text-field
                    type="date"
                    outlined
                    dense
                    v-model="registerForm.dob"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h6>Giới tính <span class="red--text"></span></h6>
                  <v-select
                    dense
                    outlined
                    v-model="registerForm.gender"
                    :items="gender"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-card-actions class="d-flex justify-center">
                <v-btn color="primary" @click="doRegister">Đăng ký</v-btn>
              </v-card-actions>
              <div class="d-flex justify-center">
                <p>
                  Đã có tài khoản?
                  <a href="#" @click="changRegisterStatus">Đăng nhập tại đây</a>
                </p>
              </div>
            </form>
          </v-card>
        </div>
      </v-col></v-row
    >
  </div>
</template>

<script>
import axiosIns from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      registerActive: false,
      registerForm: {
        username: null,
        password: null,
        fullname: null,
        phoneNumber: null,
        indentityCard: null,
        email: null,
        address: null,
        dob: null,
        gender: null,
      },
      gender: [
        { value: "Nam", text: "Nam" },
        { value: "Nữ", text: "Nữ" },
      ],
    };
  },
  methods: {
    ...mapActions({
      setAuthentication: "user/setAuthentication",
    }),
    changRegisterStatus() {
      this.registerActive = !this.registerActive;
    },
    async doRegister() {
      const data = await axiosIns.post(
        "http://localhost:8091/api/v1/register",
        this.registerForm
      );
      console.log(data);
      if (data.data.success === true) {
        localStorage.username = this.username;
        localStorage.userId = data.data.data.id;
        localStorage.jwt = data.data.data.jwt;
        // this.$router.push({ path: '/' })
        this.$router.push({ name: "Home" });
        alert("Đăng ký thành công, vui lòng đăng nhập để tiếp tục!");
      } else {
        alert(data.data.message);
      }
    },
    async submit() {
      try {
        const data = await axiosIns.post("http://localhost:8091/api/v1/login", {
          username: this.username,
          password: this.password,
        });
        if (data.data.success === true) {
          localStorage.username = this.username;
          localStorage.userId = data.data.data.id;
          localStorage.jwt = data.data.data.jwt;
          this.setAuthentication(true);
          // this.$router.push({ path: '/' })
          this.$router.push({ name: "Home" });
          alert("Đăng nhập thành công!");
        } else {
          alert("Đăng nhập không thành công. Vui lòng thử lại!");
        }
      } catch (error) {
        alert("Đăng nhập không thành công. Vui lòng thử lại!");
      }
    },
  },
};
</script>
<style>
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
  width: 1500 px !important;
}

.wallpaper-login {
  background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1600)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 1500px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wallpaper-register {
  background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1600)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

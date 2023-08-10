<template>
  <v-container>
    <v-card v-if="authentication == true">
      <v-card-title class="justify-center">Thông tin người dùng</v-card-title>
      <v-card-text>
        <v-row>
          <v-col xl="5">
            <v-img
              src="https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg"
              width="300px"
              gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
              height="300px"
              class="elevation-2"
              style="border-radius: 100%; margin: auto"
            ></v-img>
          </v-col>
          <v-col>
            <v-row>
              <v-col lg="4">Họ và tên</v-col>
              <v-col>{{ user.fullname }}</v-col>
            </v-row>
            <v-row>
              <v-col lg="4">Ngày sinh</v-col>
              <v-col>{{ user.dob }}</v-col>
            </v-row>
            <v-row>
              <v-col lg="4">Giới tính</v-col>
              <v-col>{{ user.gender }}</v-col>
            </v-row>
            <v-row>
              <v-col lg="4">Email</v-col>
              <v-col>{{ user.email }}</v-col>
            </v-row>
            <v-row>
              <v-col lg="4">Địa chỉ</v-col>
              <v-col>{{ user.address }}</v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <h5 class="text-center black--text">Lịch sử đặt tour</h5>
          <v-data-table
            :headers="headers"
            :items="getOrderHistory"
            :items-per-page="5"
            show-expand
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="custom-expanded-content">
                  <div class="expanded-row">
                    <h6 class="text-center black--text">Chi tiết lịch sử</h6>
                    <v-row>
                      <v-row>
                        <v-col lg="1">Mã Tour :</v-col>
                        <v-col lg="5">{{ item.tourCode }}</v-col>
                        <v-col lg="1">Tên Tour :</v-col>
                        <v-col lg="5">{{ item.tourName }}</v-col></v-row
                      >
                      <v-row>
                        <v-col lg="2">Tên người dùng :</v-col>
                        <v-col lg="4">{{ item.fullname }}</v-col>
                        <v-col lg="1">Email :</v-col>
                        <v-col lg="5">{{ item.email }}</v-col></v-row
                      >
                      <v-row>
                        <v-col lg="2">Số điện thoại :</v-col>
                        <v-col lg="4">{{ item.phoneNumber }}</v-col>
                        <v-col lg="1">Địa chỉ :</v-col>
                        <v-col lg="5">{{ item.address }}</v-col></v-row
                      >
                      <v-row>
                        <v-col lg="2">Người lớn :</v-col>
                        <v-col lg="2">{{ item.adultCount }}</v-col>
                        <v-col lg="2">Trẻ 5 - 11 tuổi :</v-col>
                        <v-col lg="2">{{ item.childrenCount }}</v-col>
                        <v-col lg="2">Trẻ dưới 5 tuổi :</v-col>
                        <v-col lg="2">{{ item.kidCount }}</v-col></v-row
                      >
                      <v-row>
                        <v-col lg="2">Trạng thái Tour :</v-col>
                        <v-col lg="2">{{ item.statusTour }}</v-col>
                        <v-col lg="2">Trạng thái đơn :</v-col>
                        <v-col lg="2">{{ item.statusOrder }}</v-col>
                        <v-col lg="2">Tổng tiền :</v-col>
                        <v-col lg="2">{{ item.sumPrice }}</v-col></v-row
                      >
                      <h6
                        class="text-center black--text"
                        style="margin-top: 40px"
                      >
                        Danh sách hành khách
                      </h6>
                      <v-data-table
                        :headers="headersTourist"
                        :items="item.touristDTOList"
                        :items-per-page="5"
                        class="elevation-1"
                        ><template v-slot:[`item.dob`]="{ item }">
                          {{ formatDate(item.dob) }}
                        </template>
                      </v-data-table>
                      <!-- <v-row>
                        <v-col cols="12" md="12">
                          <v-row>
                            <v-col lg="4">Tên người dùng</v-col>
                            <v-col lg="4">Giới tính</v-col>
                            <v-col lg="4">Ngày sinh</v-col></v-row
                          >
                        </v-col>
                        <v-col
                          v-for="(itemTourist, index) in item.touristDTOList"
                          :key="index"
                          cols="12"
                          md="12"
                        >
                          <v-row>
                            <v-col lg="4">{{ itemTourist.fullname }}</v-col>
                            <v-col lg="4">{{ itemTourist.gender }}</v-col>
                            <v-col lg="4">{{
                              formatDate(itemTourist.dob)
                            }}</v-col></v-row
                          >
                        </v-col>
                      </v-row> -->
                    </v-row>
                  </div>
                </div>
              </td>
            </template>
          </v-data-table>
        </v-row>
      </v-card-text>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Đánh giá Tour</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-rating
                    v-model="editedItem.rate"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    half-increments
                    hover
                    large
                  ></v-rating>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    outlined
                    v-model="editedItem.comment"
                    label="Nhận xét"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">
              Hủy bỏ
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveDialog"> Lưu </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card-actions class="justify-right">
        <v-col class="text-right"
          ><v-btn color="primary" @click="logOut">Đăng xuất</v-btn></v-col
        >
      </v-card-actions>
    </v-card>
    <v-card v-if="authentication == false">
      <v-card-title class="justify-center">Bạn chưa đăng nhập</v-card-title>
    </v-card>
    <!-- <v-row>
      <v-col cols="12" lg="12" xl="4">
        <div>
          <div>
            <div class="my-2">
              <h2 class="text-h4 font-weight-bold">Our Authors</h2>
            </div>

            <v-row>
              <v-col cols="12" md="6" v-for="i in 8" :key="i">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="50"
                  close-delay="50"
                >
                  <div>
                    <v-card
                      flat
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      hover
                    >
                      <v-img
                        src="https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg"
                        :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="300px"
                        class="elevation-2"
                        style="border-radius: 16px"
                      ></v-img>

                      <v-card-text class="text-center">
                        <v-avatar color="accent" size="86" class="authors">
                          <v-icon dark size="64">mdi-feather</v-icon>
                        </v-avatar>

                        <div
                          class="text-h5 font-weight-bold primary--text pt-4"
                        >
                          Yan Lee
                        </div>

                        <div class="text-body-1 py-4">
                          Ultrices sagittis orci a scelerisque. Massa placerat
                          duis ultricies lacus sed turpis tincidunt id.
                        </div>

                        <div>
                          <v-btn icon>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon>mdi-twitter</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon>mdi-youtube</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon>mdi-instagram</v-icon>
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>

      <v-col>
        <div>
          
        </div>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data() {
    return {
      dialog: false,
      editedItem: {
        tourCode: null,
        userId: null,
        rate: null,
        comment: null,
      },
      headers: [
        {
          text: "Mã đơn",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Tên tour", value: "tourName" },
        { text: "Người lớn(SL)", value: "adultCount" },
        { text: "Trẻ em(SL)", value: "childrenCount" },
        { text: "Trẻ nhỏ(SL)", value: "kidCount" },
        { text: "Em bé(SL)", value: "babyCount" },
        { text: "Tổng tiền", value: "sumPrice" },
        { text: "Đánh giá", value: "actions" },
      ],
      headersTourist: [
        { text: "Họ và tên", value: "fullname" },
        { text: "Giới tính", value: "gender" },
        { text: "Ngày sinh", value: "dob" },
      ],
    };
    statusOrder: [];
  },
  computed: {
    ...mapGetters({
      authentication: "user/getAuthentication",
      user: "user/getUser",
      getOrderHistory: "order/getOrderHistory",
    }),
    dataOrderHistory() {},
  },
  created() {
    if (this.authentication == true) {
      console.log(localStorage.getItem("username"));
      this.getUser(localStorage.getItem("username"));
      this.actionOrderListHistory(localStorage.getItem("userId"));
    }
  },
  methods: {
    ...mapActions({
      getUser: "user/getUser",
      setAuthentication: "user/setAuthentication",
      actionOrderListHistory: "order/actionOrderListHistory",
      actionUpsertComment: "order/actionUpsertComment",
    }),
    editItem(item) {
      this.dialog = true;
      this.editedItem.userId = item.userId;
      this.editedItem.tourCode = item.tourCode;
      this.editedItem.rate = item.rateUser;
      this.editedItem.comment = item.comment;
    },
    closeDialog() {
      this.dialog = false;
    },
    async saveDialog() {
      this.dialog = false;
      await this.actionUpsertComment(this.editedItem);
      alert("Đánh giá thành công!");
      console.log(this.editedItem);
    },
    logOut() {
      this.setAuthentication(false);
      // this.$router.push({ path: '/' })
      this.$router.push({ name: "Login" });
    },
    formatDate(inputDate) {
      const date = new Date(inputDate);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-expanded-content {
  min-height: 300px; /* Điều chỉnh kích thước tùy ý */
  padding: 20px;
  border: 1px solid #ddd;
}

.expanded-row {
  margin-top: 10px;
}
.authors {
  position: relative;
  top: -50px;
  margin-bottom: -50px;
}
</style>

<template>
  <div class="curriculum">
    <Swiper :listImg="listImg" :height="height"></Swiper>
    <Calendar v-on:datas="datas" @my-event="getMyEvent"></Calendar>
    <div class="line-clo">
    </div>
    <div class="listcomment" v-for="(item, index) in listItem" :key="index">
      <div class="list" v-if="item.courseDate <= Date.parse(new Date()) ">
        <div class="Item">
          <div class="time">
            <p>{{new Date(item.courseDate).getMonth() + 1 >= 10 ? new Date(item.courseDate).getMonth() + 1 : `0${new Date(item.courseDate).getMonth() + 1}`}}月{{ new Date(item.courseDate).getDate() >= 10 ? new Date(item.courseDate).getDate() : `0${new Date(item.courseDate).getDate()}`}}日</p>
            <p>{{new Date(item.courseDate).getHours()>=10? new Date(item.courseDate).getHours(): `0${new Date(item.courseDate).getHours()}`}}:{{new Date(item.courseDate).getMinutes() >= 10 ? new Date(item.courseDate).getMinutes() : `0${new Date(item.courseDate).getMinutes()}`}}</p>
          </div>
          <div class="line-shu">
          </div>
          <div class="name">
            <p>{{item.courseName}} {{item.courseNameen}}</p>
            <p v-if="item.type == 1"><img src="../Icon/yuan-icon.png" alt=""> 员工课</p>
            <p v-if="item.type == 3"><img src="../Icon/hu-icon.png" alt=""> 户外课</p>
            <p v-if="item.type == 2"><img src="../Icon/yuan-icon.png" alt=""> 团建课</p>
            <p v-if="item.type == 4"><img src="../Icon/gao-icon.png" alt=""> 高管课</p>
          </div>
        </div>
        <div class="list-btn active">
          已过期
        </div>
      </div>
      <div class="list" @click="goDetails(item.id)" v-else>
        <div class="Item">
          <div class="time">
            <p>{{new Date(item.courseDate).getMonth() + 1 >= 10 ? new Date(item.courseDate).getMonth() + 1 : `0${new Date(item.courseDate).getMonth() + 1}`}}月{{ new Date(item.courseDate).getDate() >= 10 ? new Date(item.courseDate).getDate() : `0${new Date(item.courseDate).getDate()}`}}日</p>
            <p>{{new Date(item.courseDate).getHours() >= 10 ? new Date(item.courseDate).getHours() :`0${new Date(item.courseDate).getHours()}`}}:{{new Date(item.courseDate).getMinutes() >= 10 ? new Date(item.courseDate).getMinutes() : `0${new Date(item.courseDate).getMinutes()}`}}</p>
          </div>
          <div class="line-shu">
          </div>
          <div class="name">
            <p>{{item.courseName}} {{item.courseNameen}}</p>
            <p v-if="item.type == 1"><img src="../Icon/yuan-icon.png" alt=""> 员工课</p>
            <p v-if="item.type == 3"><img src="../Icon/hu-icon.png" alt=""> 户外课</p>
            <p v-if="item.type == 2"><img src="../Icon/yuan-icon.png" alt=""> 团建课</p>
            <p v-if="item.type == 4"><img src="../Icon/gao-icon.png" alt=""> 高管课</p>
          </div>
        </div>
        <div class="list-btn" v-if="item.state != 1 && item.courseState == 2 && item.state != 2">
          可选
        </div>
        <div class="list-btn" v-if="item.state == 1 ">
          已选
        </div>
        <div class="list-btn" v-if="item.state == 2 ">
          完成
        </div>
        <div class="list-btn active" v-if="item.state != 1 && item.courseState == 1 &&  item.state != 2">
          满员
        </div>
      </div>
      <div class="line-clo">
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "base/calendar/calendar"
import Swiper from "base/swiper/swiper"
import { getSmallBannerPictures } from "api/dataList"
import { ERR_OK, vxconfig } from 'api/config'

export default {
  data() {
    return {
      listImg: [],
      listItem: [],
      height: '163'
    };
  },
  created() {
    this._getSmallBannerPictures()
    this._getParam()
  },
  methods: {
    _getParam() {
      vxconfig(window.location.href.split('#')[0])
    },
    getMyEvent(msg) {
      if (msg) {
        document.body.scrollTop = 500
      }
    },
    goDetails(item) {
      // 路由跳转
      this.$router.push({
        path: `/Details/${item}`
      });
    },
    datas(datas) {
      this.listItem = datas;
    },
    _getSmallBannerPictures() {
      getSmallBannerPictures().then(res => {
        if (res.code === ERR_OK) {
          this.listImg = res.data;
        }
      });
    }
  },
  components: {
    Calendar,
    Swiper
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.curriculum {
  background: #fff;
  width: 100vw;
  padding-bottom: 120px;
  .line-clo {
    width: 100%;
    height: 4px;
    background: -webkit-linear-gradient(left, #81d1db, #c6cbcc, #85d2db);
    background: -o-linear-gradient(right, #81d1db, #c6cbcc, #85d2db);
    background: -moz-linear-gradient(right, #81d1db, #c6cbcc, #85d2db);
    background: linear-gradient(to right, #81d1db, #c6cbcc, #85d2db);
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-btn {
      width: 79px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      background: #57c2cf;
      border-radius: 20px;
      font-weight: bold;
      margin-right: 40px;
    }
    .active {
      background: #b3b3b3;
    }
    .Item {
      height: 112px;
      width: 85%;
      display: flex;
      align-items: center;
      .time {
        width: 137px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 26px;
          font-weight: bold;
          line-height: 45px;
        }
      }
      .line-shu {
        height: 75px;
        width: 2px;
        background: #89d4dd;
        margin-right: 23px;
      }
      .name {
        p {
          font-size: 26px;
          font-weight: bold;
          line-height: 45px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        img {
          width: 26px;
          height: 26px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

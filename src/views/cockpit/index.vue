<template>
  <div class="cockpit-container">
    <div id="app-screen" class="screen-box" :style="screenStyle">
      
      <div class="layer-bg">
        <img :src="require('@/assets/images/cockpit/bg1.png')" class="bg-cover" alt="bg1" />
      </div>
      <div class="layer-bg overlay">
        <img :src="require('@/assets/images/cockpit/bg2.png')" class="bg-cover" alt="bg2" />
      </div>

      <div class="map-layer">
        <div class="map-element map-base" 
             style="width: 1198px; height: 363px; left: 869px; top: 1076px;">
          <img :src="require('@/assets/images/cockpit/底座一层@2x.png')" class="full-img" alt="map-base" />
        </div>
        <div class="map-element map-shadow" 
             style="width: 782px; height: 723px; left: 1017px; top: 591px;">
          <img :src="require('@/assets/images/cockpit/NB-Map-down.png')" class="full-img" alt="map-down" />
        </div>
        <div class="map-element map-up" 
             style="width: 758px; height: 684px; left: 1044px; top: 604px;">
          <img :src="require('@/assets/images/cockpit/NB-Map-up.png')" class="full-img" alt="map-up" />
        </div>
      </div>

      <header class="header-bar">
        <img :src="require('@/assets/images/cockpit/header-bg.png')" class="full-img header-bg-img" alt="header-bg" />
        
        <div class="header-title-wrapper">
          <h1 class="header-title">上饶市公安反诈预警平台</h1>
        </div>

        <div class="light-effect" style="left: 1220px; top: 102px; width: 458px; height: 71px;">
          <img :src="require('@/assets/images/cockpit/light.png')" class="full-img" alt="light" />
        </div>

        <div class="nav-btn btn-home" @click="handleNav('home')">
          <img :src="currentNav === 'home' ? require('@/assets/images/cockpit/xuanzhong.png') : require('@/assets/images/cockpit/weixuan.png')" class="full-img" />
          <span :class="['btn-text', currentNav === 'home' ? 'nav-active' : '']">首页</span>
        </div>

        <div class="nav-btn btn-admin" @click="handleNav('admin')">
          <img :src="currentNav === 'admin' ? require('@/assets/images/cockpit/xuanzhong.png') : require('@/assets/images/cockpit/weixuan.png')" class="full-img" />
          <span :class="['btn-text', currentNav === 'admin' ? 'nav-active' : '']">管理后台</span>
        </div>
      </header>

      <main class="main-content">
        <div class="panel-left">
          <!-- <div class="chart-block" style="height: 357px;"> -->
          <div class="chart-block">
            <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">当月区县警情数排名</span>
            </div>
            <!-- 左侧第一个模块 -->
            <div class="chart-area ranking-container">
              
              <div class="top-rank-zone">
                <div class="platform-img-wrapper">
                  <img :src="require('@/assets/images/cockpit/底座.png')" class="full-img" alt="rank-base" />
                </div>

                <div class="top-three-items">
                  <div class="rank-card rank-2" v-if="topThree[1]">
                    <div class="card-bg" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/yellow_bg.png') + ')' }"></div>
                    <div class="card-info">
                      <span class="area-name">{{ topThree[1].name }}</span>
                      <span class="area-val text-yellow">{{ topThree[1].value }}</span>
                    </div>
                  </div>
                  <div class="rank-card rank-1" v-if="topThree[0]">
                    <div class="card-bg" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/orange_bg.png') + ')' }"></div>
                    <div class="card-info">
                      <span class="area-name">{{ topThree[0].name }}</span>
                      <span class="area-val text-orange">{{ topThree[0].value }}</span>
                    </div>
                  </div>
                  <div class="rank-card rank-3" v-if="topThree[2]">
                    <div class="card-bg" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/pink_bg.png') + ')' }"></div>
                    <div class="card-info">
                      <span class="area-name">{{ topThree[2].name }}</span>
                      <span class="area-val text-pink">{{ topThree[2].value }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="other-rank-grid">
                <div v-for="(item, index) in otherRanks" :key="index" class="other-item" 
                     :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/blue_bg.png') + ')' }">
                  <span class="other-name">{{ item.name }}</span>
                  <span class="other-val">{{ item.value }}</span>
                </div>
              </div>

            </div>
          </div>
          
          <div class="chart-block" style="height: 380px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">恶意网址类型访问量排名</span>
            </div>
            <div class="chart-area url-rank-container">
              <div class="scroll-wrapper">
                <div v-for="(item, index) in doubleUrlData" :key="index" class="url-row">
                  <div class="url-bg" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/url_bg.png') + ')' }"></div>
                  
                  <div class="url-content">
                    <span class="url-name text-ellipsis">{{ item.name }}</span>
                    
                    <div class="url-bar-box">
                      <div class="bar-bg">
                        <div class="bar-fill" :style="{ width: (item.value / maxUrlValue * 100) + '%' }">
                          <div class="bar-shine"></div>
                        </div>
                      </div>
                    </div>

                    <span class="url-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chart-block" style="height: 334px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">处置方式</span>
            </div>
            <div class="chart-area"><div class="placeholder-box">Pie Chart</div></div>
          </div>
        </div>

        <div class="panel-center">
          <div class="digital-board">
            <div class="digital-item">
              <div class="digital-label">累计预警用户数</div>
              <div class="digit-container">
                <div v-for="(num, index) in String(warningUserCount)" :key="'warn-' + index" class="digit-box">
                  <img :src="require('@/assets/images/cockpit/shuzi_bg2.png')" class="digit-bg shadow-layer" />
                  <img :src="require('@/assets/images/cockpit/shuzi_bg1.png')" class="digit-bg top-layer" />
                  <span class="digit-text">{{ num }}</span>
                </div>
              </div>
            </div>

            <div class="digital-item">
              <div class="digital-label">累计处置用户数</div>
              <div class="digit-container">
                <div v-for="(num, index) in String(handledUserCount)" :key="'handle-' + index" class="digit-box">
                  <img :src="require('@/assets/images/cockpit/shuzi_bg2.png')" class="digit-bg shadow-layer" />
                  <img :src="require('@/assets/images/cockpit/shuzi_bg1.png')" class="digit-bg top-layer" />
                  <span class="digit-text">{{ num }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="center-cards" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/data_bg.png') + ')' }">
            <div v-for="(item, index) in centerCards" :key="index" class="card-item">
              <span class="card-num">{{ item.num }}</span>
              <span class="card-label">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="panel-right">
          <div class="chart-block" style="height: 355px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">恶意网址访问量趋势</span>
            </div>
            <div class="chart-area"><div class="placeholder-box">Line Chart</div></div>
          </div>
          
          <div class="chart-block">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">今日恶意网址访问信息</span>
            </div>
            <div class="chart-area table-area">
              <table class="custom-table">
                <thead><tr><th>手机号码</th><th>时间</th><th>区县</th><th>状态</th></tr></thead>
                <tbody>
                  <tr v-for="(row, i) in tableData" :key="i">
                    <td>{{ row.phone }}</td><td>{{ row.time }}</td><td>{{ row.area }}</td>
                    <td :class="row.status === '未处置' ? 'text-red' : 'text-green'">{{ row.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="chart-block" style="height: 325px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">预警处置情况统计</span>
            </div>
            <div class="chart-area"><div class="placeholder-box">Gauge Chart</div></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AntiFraudCockpit',
  data() {
    return {
      screenStyle: {},
      currentNav: 'home', // 默认选中首页
      warningUserCount: 167611, // 预警用户数
      handledUserCount: 167611, // 处置用户数
      // 恶意网址数据
      maliciousUrlData: [
        { "name": "高危聊天APP主控网址", "value":60 },
        { "name": "虚假投资APP", "value": 48 },
        { "name": "网络刷单网址", "value": 42 },
        { "name": "虚假赌博APP", "value": 32 },
        { "name": "共享屏幕主控网址", "value": 13 },
        { "name": "虚假投资诈骗网址", "value": 12 },
        { "name": "虚假赌博诈骗网址", "value": 7 },
        { "name": "钓鱼仿冒网址", "value": 6 }
      ],
      // 模拟后端返回的区县数据
      districtData: [
        { name: "弋阳县", value: 324 },
        { name: "广丰区", value: 1200 },
        { name: "余干县", value: 500 },
        { name: "信州区", value: 1600 },
        { name: "广信区", value: 1340 },
        { name: "德兴市", value: 242 },
        { name: "玉山县", value: 221 },
        { name: "铅山县", value: 111 },
        { name: "横峰县", value: 55 },
        { name: "鄱阳县", value: 87 },
        { name: "万年县", value: 56 },
        { name: "婺源县", value: 345 }
      ],
      centerCards: [
        { num: 5000, label: '72小时预警用户数' },
        { num: 700, label: '72小时处置用户数' },
        { num: 500, label: '24小时预警用户数' },
        { num: 1314, label: '24小时处置用户数' }
      ],
      tableData: [
        { phone: '180****5232', time: '19:20:31', area: '信州区', status: '未处置' },
        { phone: '139****1234', time: '19:25:12', area: '广信区', status: '未处置' },
        { phone: '158****6789', time: '19:30:05', area: '玉山县', status: '已处置' },
        { phone: '177****9988', time: '19:35:45', area: '鄱阳县', status: '未处置' },
        { phone: '133****5566', time: '19:42:11', area: '余干县', status: '已处置' }
      ]
    }
  },
  computed: {
    // 对数据进行排序
    sortedDistrictData() {
      return [...this.districtData].sort((a, b) => b.value - a.value);
    },
    // 获取前三名
    topThree() {
      return this.sortedDistrictData.slice(0, 3);
    },
    // 获取剩余排名
    otherRanks() {
      return this.sortedDistrictData.slice(3);
    },
    // 构造双倍数据用于无缝滚动
    doubleUrlData() {
      return [...this.maliciousUrlData, ...this.maliciousUrlData];
    },
    // 计算最大值，用于进度条百分比 (防止除以0)
    // maxUrlValue() {
    //   const max = Math.max(...this.maliciousUrlData.map(item => item.value));
    //   return max === 0 ? 1 : max;
    // }
    // 计算总和，用于进度条百分比
    maxUrlValue() {
      // 累加所有值为总和
      const total = this.maliciousUrlData.reduce((sum, item) => sum + item.value, 0);
      return total === 0 ? 1 : total;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const designWidth = 2880;
      const designHeight = 1450;
      const scale = Math.min(window.innerWidth / designWidth, window.innerHeight / designHeight);
      const x = (window.innerWidth - designWidth * scale) / 2;
      const y = (window.innerHeight - designHeight * scale) / 2;
      this.screenStyle = {
        width: `${designWidth}px`, height: `${designHeight}px`,
        transform: `scale(${scale})`, transformOrigin: 'left top',
        position: 'absolute', left: `${x}px`, top: `${y}px`
      };
    },
    handleNav(type) {
      this.currentNav = type;
      if (type === 'admin') {
        // this.$router.push('/index'); // 如需跳转请解开
        console.log("跳转管理后台");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ================= 字体声明 ================= */
@font-face {
  font-family: 'DigifaceWide';
  src: url('~@/assets/fonts/DigifaceWide.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'PangMenZhengDao';
  src: url('~@/assets/fonts/PangMenZhengDao.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Adobe Heiti Std';
  src: local('Adobe Heiti Std'), local('SimHei'), local('Heiti SC');
}

@font-face {
  font-family: 'SourceHanSansCN';
  /* 请确保字体路径正确，若无字体文件可暂时注释 */
  src: local('Source Han Sans CN'), local('SimHei'); 
  font-weight: bold;
}

/* ================= 恶意网址排名样式 ================= */
.url-rank-container {
  overflow: hidden;
  position: relative;
  padding: 10px 0;
  height: 100%; 
  box-sizing: border-box;
}

/* 滚动动画容器 */
.scroll-wrapper {
  /* 动画：向上滚动，时间根据数据量调整，linear 保证匀速 */
  animation: scrollUp 20s linear infinite; 
}

/* 鼠标悬停暂停动画 (可选优化) */
.scroll-wrapper:hover {
  animation-play-state: paused;
}

@keyframes scrollUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); } /* 滚动一半的高度（即一组数据的长度），配合双倍数据实现无缝 */
}

/* 单行样式 */
.url-row {
  position: relative;
  width: 100%;
  height: 56px; /* 背景图高度 */
  margin-bottom: 12px; /* 行间距 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
}

/* 悬停高亮 */
.url-row:hover {
  filter: brightness(1.2);
  transform: scale(1.01);
}

/* 背景图 */
.url-bg {
  position: absolute;
  top: 0; 
  left: 50%;
  width: 738px; /* 设计稿宽度 */
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 0;
  /* 居中背景图 */
  transform: translateX(-50%);
  opacity: 0.8;
}

/* 内容布局 */
.url-content {
  position: relative;
  z-index: 1;
  width: 90%; /* 内容宽度 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

/* 1. 网址类型名称 */
.url-name {
  width: 160px; /* 蓝湖参数 */
  height: 24px;
  font-family: 'SourceHanSansCN', 'Microsoft YaHei', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #75E1EF; /* 蓝湖参数 */
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 0 5px rgba(117, 225, 239, 0.4);
}

/* 2. 占比条容器 */
.url-bar-box {
  flex: 1; /* 占据中间剩余空间 */
  margin: 0 20px;
  height: 10px;
  display: flex;
  align-items: center;
}

.bar-bg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.08); /* 槽底色 */
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  /* 蓝青色渐变进度条 */
  background: linear-gradient(90deg, #007EFF 0%, #01FFF6 100%);
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 10px rgba(1, 255, 246, 0.6);
  transition: width 1s ease;
}

/* 进度条末端的小光点装饰 */
.bar-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
}

/* 3. 访问量数值 */
.url-value {
  width: 81px; /* 蓝湖参数 */
  height: 30px;
  font-family: 'SourceHanSansCN', sans-serif;
  font-weight: bold;
  font-size: 30px;
  color: #95AEEC; /* 蓝湖参数 */
  line-height: 30px;
  text-align: right;
  text-shadow: 0 0 5px rgba(149, 174, 236, 0.4);
}

/* ================= 基础布局 ================= */
.cockpit-container {
  width: 100vw; height: 100vh;
  background-color: #030409; overflow: hidden; position: relative;
}
.screen-box { overflow: hidden; z-index: 1; }
.full-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bg-cover { width: 100%; height: 100%; object-fit: fill; display: block; }

/* 背景 */
.layer-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
.overlay { opacity: 0.8; mix-blend-mode: overlay; }

/* 地图层 */
.map-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; }
.map-element { position: absolute; pointer-events: auto; }
.map-up { z-index: 12; animation: floatMap 4s ease-in-out infinite; }
.map-shadow { z-index: 11; opacity: 0.8; mix-blend-mode: multiply; }
.map-base { z-index: 10; }
@keyframes floatMap { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* ================= Header ================= */
.header-bar {
  position: absolute; top: 0; left: 0; width: 100%; height: 140px; z-index: 50;
  display: flex; justify-content: center;
}
.header-bg-img { position: absolute; top: 0; left: 0; z-index: 1; }

.header-title-wrapper {
  position: absolute; top: 0; left: 0; width: 100%; height: 140px;
  display: flex; justify-content: center; align-items: center;
  z-index: 20;
}
.header-title {
  width: 797px;
  font-family: 'PangMenZhengDao', sans-serif;
  font-weight: 400;
  font-size: 72px;
  color: #8BE5EE;
  background: linear-gradient(0deg, #C6F3FF 0%, #F3FEFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0; text-align: center; line-height: 1;
}

.light-effect { position: absolute; z-index: 30; pointer-events: none; }

/* ================= 导航按钮优化 ================= */
.nav-btn {
  position: absolute; top: 71px; width: 219px; height: 51px; z-index: 40;
  cursor: pointer; transition: filter 0.3s;
}
.btn-home { left: 598px; }
.btn-admin { right: 598px; }

.btn-text {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  font-family: 'PangMenZhengDao', sans-serif;
  font-weight: 400;
  font-size: 27px;
  color: #FFFFFF;
  padding-top: 4px;
  // text-shadow: 0px 0px 3px rgba(126,196,255,0.39);
}

/* 选中发光效果 */
.nav-active {
  text-shadow: 0px 0px 3px rgba(126,196,255,0.39);
}

/* ================= 小标题修复 (关键修改) ================= */
.panel-title {
  /* 父级只负责背景图和布局 */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 508px; 
  height: 89px;
  box-sizing: border-box;
  
  /* 严格按照设计稿：左边距71px, 上边距30px */
  padding-left: 71px;
  padding-top: 30px; 
  
  display: flex; 
  align-items: flex-start; /* 顶部对齐 */
  /* 关键修改：防止 flex 布局空间不足时挤压标题高度 */
  flex-shrink: 0;
}

.title-text {
  /* 子级只负责文字样式和渐变 */
  font-family: 'Adobe Heiti Std', 'SimHei', sans-serif;
  font-weight: normal;
  font-size: 36px;
  line-height: 1;
  
  /* 渐变样式 */
  background: linear-gradient(0deg, #007EFF 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* 兼容处理 */
}

/* ================= 内容布局 ================= */
.main-content {
  position: absolute; 
  top: 150px; 
  left: 0; 
  width: 100%; 
  height: 1300px;
  padding: 0 60px; 
  display: grid; 
  // grid-template-columns: 1fr 2fr 1fr;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 40px; 
  box-sizing: border-box; 
  z-index: 20; 
  pointer-events: none;
}
.panel-left, .panel-right, .panel-center { pointer-events: auto; }
.panel-left, .panel-right {
  display: flex; 
  flex-direction: column; 
  // justify-content: space-between; 
  gap: 20px;
  height: 100%;
  padding-bottom: 40px;
}
.panel-center { display: flex; flex-direction: column; padding-top: 20px; }
.chart-block { 
  /* 删除 height: 32%; 让高度自适应或由 flex 权重控制 */
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  /* 防止内容溢出 */
  overflow: hidden;
}
.chart-area { flex: 1; margin-top: 10px; position: relative; }
.placeholder-box { width: 100%; height: 100%; border: 2px dashed rgba(0, 210, 255, 0.2); background: rgba(0, 40, 80, 0.1); display: flex; justify-content: center; align-items: center; color: rgba(0, 210, 255, 0.5); }

/* ================= 区县排名模块样式 ================= */
.ranking-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

/* --- 上半部分：前三名 + 图片底座 --- */
.top-rank-zone {
  position: relative;
  /* 增加高度以容纳底座和卡片，避免挤压 */
  height: 150px; 
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 10px;
}

.platform-img-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  /* 宽度根据底座图片实际比例调整，建议 95% 或 100% */
  width: 95%; 
  height: auto;
  z-index: 0; /* 放在最底层 */
  pointer-events: none;
  opacity: 0.9; /* 可选：微调透明度融合背景 */
}

/* 前三名卡片容器 (位置调整) */
.top-three-items {
  position: relative;
  z-index: 10; /* 确保在底座之上 */
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 50px; /* 间距微调 */
  width: 100%;
  /* 关键点：底部 Padding，决定卡片"站"在底座的什么高度 */
  padding-bottom: 50px; 
}

.rank-card {
  position: relative;
  width: 155px;
  height: 94px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.card-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 0;
}

.card-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; height: 100%;
  justify-content: center;
}

.area-name {
  font-family: 'Adobe Heiti Std';
  color: #fff;
  font-weight: normal;
  font-size: 23px;
  margin-bottom: 5px;
  letter-spacing: 5px;
}

.area-val {
  font-family: 'Adobe Heiti Std';
  font-size: 23px;
  margin-top: 5px;
  letter-spacing: 3px;
}

.text-orange { color: #FFB256; text-shadow: 0 0 5px #FFB256; }
.text-yellow { color: #FFD42B; text-shadow: 0 0 5px #FFD42B; }
.text-pink { color: #F6AE96; text-shadow: 0 0 5px #F6AE96; }

/* 第一名向上偏移 (加大偏移量以突显) */
.rank-1 {
  margin-bottom: 10px; /* 向上提，形成领奖台高度差 */
}

/* --- 下半部分：其他排名 Grid --- */
.other-rank-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 一行3个 */
  gap: 15px;
  padding: 0 20px;
  max-height: 200px;
  overflow: hidden; /* 防止溢出 */
}

.other-item {
  height: 50px; /* 预估高度 */
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  font-size: 18px;
}

.other-name {
  font-family: 'Adobe Heiti Std';
  color: #fff;
  font-weight: normal;
  font-size: 22px;
  letter-spacing: 2px;
}

.other-val {
  color: #00d2ff;
  font-family: 'Adobe Heiti Std';
  font-size: 22px;
  letter-spacing: 2px;
}

/* ================= 数字模块样式 ================= */

/* 数字与表格 */
.digital-board { height: 150px;
  display: flex;
  justify-content: center;
  gap: 80px; /* 调整间距以适应更大的字体 */
  margin-bottom: 20px;
  margin-top: 20px; }
.digital-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.digital-label {
  font-family: 'Adobe Heiti Std', 'SimHei', sans-serif;
  font-weight: normal;
  font-size: 48px;
  color: #94F9FF;
  line-height: 1.2;
  margin-bottom: 15px;
  text-shadow: 0 0 30px rgba(148, 249, 255, 0.7); /* 模拟外发光 */
}
/* 数字容器 */
.digit-container {
  display: flex;
  gap: 8px; /* 数字之间的间距 */
}
/* 单个数字盒子 */
.digit-box {
  position: relative;
  width: 46px; /* 根据切图大小适当调整宽度 */
  height: 60px; /* 根据字体大小适当调整高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 背景切图通用样式 */
.digit-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
/* 上层背景 */
.top-layer {
  z-index: 1;
  top: 0;
  left: 0;
}

/* 下层背景 (右下偏移 4px) */
.shadow-layer {
  z-index: 0;
  top: 4px;
  left: 4px;
  opacity: 0.8;
}
/* 数字文字样式：DigifaceWide, 50px, #01FFF6 */
.digit-text {
  position: relative;
  z-index: 2; /* 位于背景之上 */
  font-family: 'DigifaceWide', sans-serif;
  font-weight: 400;
  font-size: 50px;
  color: #01FFF6;
  line-height: 1;
  margin-top: -2px; /* 微调垂直对齐 */
  text-shadow: 0 0 5px rgba(1, 255, 246, 0.5); /* 增加一点数字发光增加质感 */
}
.digital-num-box { background: rgba(30, 58, 138, 0.3); padding: 10px 40px; border-left: 2px solid rgba(0, 210, 255, 0.5); border-right: 2px solid rgba(0, 210, 255, 0.5); border-radius: 8px; }
.digital-num { color: white; font-size: 80px; font-weight: bold; font-family: Arial, sans-serif; text-shadow: 0 0 20px #00d2ff; }

/* ================= 核心指标区 (72/24小时) 样式 =============== */
.center-cards { 
  /* 容器尺寸：w:1148px, h:206px */
  width: 1148px;
  height: 206px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  
  /* 布局调整：水平居中于中间面板 */
  // margin: 20px auto 0;
  margin: 0px 0px 20px -10px;
  
  /* 内部布局：让四个指标均匀分布 */
  display: flex;
  justify-content: space-around; /* 均匀分布 */
  align-items: center;
  // padding: 0 50px; /* 根据背景图实际内容区域调整内边距，防止贴边 */ 
  padding: 0 25px 0 50px;
}
.card-item { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 根据背景图的文字位置，可能需要微调上边距 */
  margin-top: 0px; 
}
/* 数值样式 */
.card-num { 
  font-family: 'PangMenZhengDao', sans-serif;
  font-weight: 400;
  font-size: 46px;
  color: #00A8FF;
  line-height: 39px;
  margin-bottom: 12px; /* 数值与标题间距 */
  text-shadow: 0 0 5px rgba(0, 168, 255, 0.4); 
}
/* 标题样式 */
.card-label {
  font-family: 'PangMenZhengDao', sans-serif;
  font-weight: 400;
  font-size: 27px;
  color: #FFFFFF;
  line-height: 23px;
  margin-top: 0;
}

.table-area { background: rgba(30, 58, 138, 0.1); border: 1px solid rgba(0, 210, 255, 0.2); padding: 20px; border-radius: 8px; overflow: hidden; }
.custom-table { width: 100%; border-collapse: collapse; color: #ccc; font-size: 20px; }
.custom-table th { color: #00d2ff; border-bottom: 1px solid #666; padding: 10px; text-align: left; }
.custom-table td { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.text-red { color: #ff6b6b; } .text-green { color: #4ade80; }
</style>
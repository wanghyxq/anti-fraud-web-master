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
          <div class="chart-block">
            <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">当月区县警情数排名</span>
            </div>
            <div class="chart-area"><div class="placeholder-box">Bar Chart</div></div>
          </div>
          
          <div class="chart-block">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">恶意网址类型访问量排名</span>
            </div>
            <div class="chart-area"><div class="placeholder-box">Horizontal Bar</div></div>
          </div>
          
          <div class="chart-block">
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
          <div class="chart-block">
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
          
          <div class="chart-block">
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
.panel-left, .panel-right { display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding-bottom: 40px; }
.panel-center { display: flex; flex-direction: column; padding-top: 20px; }
.chart-block { height: 32%; display: flex; flex-direction: column; }
.chart-area { flex: 1; margin-top: 10px; position: relative; }
.placeholder-box { width: 100%; height: 100%; border: 2px dashed rgba(0, 210, 255, 0.2); background: rgba(0, 40, 80, 0.1); display: flex; justify-content: center; align-items: center; color: rgba(0, 210, 255, 0.5); }

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
/* ================= 核心指标区 (72/24小时) 样式 */
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
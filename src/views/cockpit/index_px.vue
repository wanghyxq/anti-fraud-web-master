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
          
          <div class="chart-block" style="height: 380px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">处置方式</span>
            </div>

            <div class="chart-area disposal-container">
              <div class="chart-left-zone"> 
                <div class="visual-wrapper">
                  <div class="total-floating">
                    <span class="total-num">{{ disposalTotal }}</span>
                    <span class="total-label">处置总数</span>
                  </div>
                  <div ref="disposalChart" class="gl-chart-box"></div>
                  <img :src="require('@/assets/images/cockpit/处置底座.png')" class="base-img-box" alt="base" />
                </div>  
              </div>

              <div class="legend-right-zone">
                <div v-for="(item, index) in sortedDisposalData" :key="index" class="legend-item">
                  <div class="legend-rect" :style="{ background: colorList[index] }"></div>
                  <span class="legend-name">{{ item.name }}</span>
                  <span class="legend-val">{{ item.value }}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="panel-center">
          <div class="digital-board">
            <div class="digital-item">
              <div class="digital-label">累计预警用户数</div>
              <div class="digit-container">
                <div v-for="(num, index) in String(summaryData.totalWarningUsers)" :key="'warn-' + index" class="digit-box">
                  <img :src="require('@/assets/images/cockpit/shuzi_bg2.png')" class="digit-bg shadow-layer" />
                  <img :src="require('@/assets/images/cockpit/shuzi_bg1.png')" class="digit-bg top-layer" />
                  <span class="digit-text">{{ num }}</span>
                </div>
              </div>
            </div>

            <div class="digital-item">
              <div class="digital-label">累计处置用户数</div>
              <div class="digit-container">
                <div v-for="(num, index) in String(summaryData.totalHandledUsers)" :key="'handle-' + index" class="digit-box">
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
          <div class="chart-block" style="height: 344px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">恶意网址访问量趋势</span>
            </div>
            <div class="chart-area">
              <div ref="trendChart" class="full-chart"></div>
            </div>
          </div>
          
          <div class="chart-block" style="height: 480px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">今日恶意网址访问信息</span>
            </div>
            <div class="chart-area live-feed-container">
              <div class="feed-header-row">
                <div class="header-item col-phone">手机号码</div>
                <div class="header-item col-normal">时间</div>
                <div class="header-item col-narrow">区县</div>
                <div class="header-item col-wide">涉诈网址类型</div>
                <div class="header-item col-narrow">处置情况</div>
              </div>

              <div class="feed-scroll-window">
                <div class="feed-scroll-content" :class="{ 'animating': liveFeedData.length > 5 }">
                  <div 
                    v-for="(item, index) in doubleLiveFeedData" 
                    :key="index" 
                    class="feed-row"
                    :class="{ 'row-highlight': index % 2 === 0 }"
                  >
                    <span class="cell-text col-phone">{{ item.msisdn }}</span>
                    
                    <span class="cell-text col-normal">{{ item.startTime }}</span>
                    
                    <span class="cell-text col-narrow">{{ item.baseCoutry }}</span>
                    
                    <div class="cell-text col-wide">
                      <span class="text-truncate" :title="item.type">{{ item.type }}</span>
                    </div>
                    
                    <span class="cell-text col-narrow" 
                          :class="item.disposalStatus === '已处置' ? 'text-handled' : 'text-unhandled'">
                      {{ item.disposalStatus }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      
          <div class="chart-block" style="height: 400px;">
             <div class="panel-title" :style="{ backgroundImage: 'url(' + require('@/assets/images/cockpit/title.png') + ')' }">
              <span class="title-text">预警处置情况统计</span>
            </div>
            
            <div class="chart-area stats-container">
              <div class="stats-left">
                <div ref="rateChart" class="rate-chart"></div>
                <div class="rate-label">处置率</div>
              </div>

              <div class="stats-right">
                
                <div class="stats-dual-box">
                  
                  <div class="stat-item">
                    <div class="stat-header">
                      <span class="indicator-point blue-point"></span>
                      <span class="stat-label">已处置</span>
                    </div>
                    <span class="stat-value">{{ summaryData.totalHandledUsers }}</span>
                  </div>

                  <div class="vertical-divider"></div>

                  <div class="stat-item">
                    <div class="stat-header">
                      <span class="indicator-point yellow-point"></span>
                      <span class="stat-label">未处置</span>
                    </div>
                    <span class="stat-value text-warn">{{ summaryData.unhandledUsers }}</span>
                  </div>

                </div>

                <div class="progress-section">
                  <div class="progress-box">
                    <div class="progress-track">
                      <div class="progress-bar" :style="{ width: summaryData.disposalRate + '%' }">
                        <div class="progress-glow"></div>
                      </div>
                    </div>
                  </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl'; // 必须引入 GL 库
import request from '@/utils/request';

export default {
  name: 'AntiFraudCockpit',
  data() {
    return {
      screenStyle: {},
      currentNav: 'home', // 默认选中首页
      // 汇总统计数据
      summaryData: {
        totalWarningUsers: 0,
        totalHandledUsers: 0,
        unhandledUsers: 0,
        disposalRate: 0,
        todayWarningCount: 0
      },
      rateChartInstance: null, // 处置率图表实例
      liveFeedData: [], // 今日恶意网址访问信息数据
      trendChartInstance: null, // 新增：趋势图实例
      trendData: [], // 恶意网址访问量趋势数据 (00-24时) 
      // 颜色配置：黄(Max), 蓝(Mid), 红(Min)
      colorList: ['#FFE00D', '#20DDFF', '#FF674E'],
      // disposalData: [
      //   { name: "电话预警", value: 11 },
      //   { name: "短信预警", value: 4 },
      //   { name: "上门预警", value: 7 }
      // ],
      disposalData: [], // 处置方式数据 (初始设为空，等待接口加载)
      disposalChartInstance: null, // 图表实例
      // warningUserCount: 0, // 预警用户数
      // handledUserCount: 0, // 处置用户数
      // 恶意网址数据
      maliciousUrlData: [],
      // 后端返回的区县数据
      districtData: [],
      // districtData: [
      //   { name: "弋阳县", value: 324 },
      //   { name: "广丰区", value: 1200 },
      //   { name: "余干县", value: 500 },
      //   { name: "信州区", value: 1600 },
      //   { name: "广信区", value: 1340 },
      //   { name: "德兴市", value: 242 },
      //   { name: "玉山县", value: 221 },
      //   { name: "铅山县", value: 111 },
      //   { name: "横峰县", value: 55 },
      //   { name: "鄱阳县", value: 87 },
      //   { name: "万年县", value: 56 },
      //   { name: "婺源县", value: 345 }
      // ],
      centerCards: [
        { num: 0, label: '72小时预警用户数' },
        { num: 0, label: '72小时处置用户数' },
        { num: 0, label: '24小时预警用户数' },
        { num: 0, label: '24小时处置用户数' }
      ]
    }
  },
  computed: {
    // 构造双倍数据用于无缝滚动
    doubleLiveFeedData() {
      // 如果数据过少不需要滚动，直接返回；否则复制一份
      if (this.liveFeedData.length < 5) return this.liveFeedData;
      return [...this.liveFeedData, ...this.liveFeedData];
    },
    // 对处置数据进行排序
    sortedDisposalData() {
      return [...this.disposalData].sort((a, b) => b.value - a.value);
    },
    // 计算总数
    disposalTotal() {
      return this.disposalData.reduce((p, c) => p + c.value, 0);
    },
    // 对区县数据进行排序
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

    // 初始化 3D 图表
    this.$nextTick(() => {
      // this.initDisposalChart(); // 新增：调用处置数图表初始化
      this.getTrendData(); // 不再直接 initTrendChart，调用获取趋势数据的方法
      this.getLiveFeedData(); // 调用今日实时信息接口
      this.getSummaryData(); // 调用汇总接口
      this.getDisposalStats(); // 调用处置方式接口
      this.getMaliciousUrlData(); // 获取恶意网址数据
      this.getDistrictData(); // 获取当月区县警情数排名
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    // 销毁实例，防止内存泄漏
    if (this.disposalChartInstance) {
      this.disposalChartInstance.dispose();
    }
    // 新增销毁
    if (this.trendChartInstance) {
      this.trendChartInstance.dispose();
    }
    if (this.rateChartInstance) {
      this.rateChartInstance.dispose();
    }
  },
  methods: {
    // 获取当月区县警情数排名
    getDistrictData() {
      request({
        url: '/api/dashboard/districtRanking',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          this.districtData = response.data;
        }
      }).catch(error => {
        console.error("获取当月区县警情数排名:", error);
      });
    },
    // 获取恶意网址数据
    getMaliciousUrlData() {
      request({
        url: '/api/dashboard/urlTypeRanking',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          this.maliciousUrlData = response.data;
        }
      }).catch(error => {
        console.error("获取恶意网址数据失败:", error);
      });
    },
    // 获取处置方式统计数据
    getDisposalStats() {
      request({
        url: 'api/dashboard/disposalStats',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          this.disposalData = response.data;
          
          // 数据更新后，重新初始化或更新 3D 饼图
          this.$nextTick(() => {
            this.initDisposalChart();
          });
        }
      }).catch(error => {
        console.error("获取处置方式数据失败:", error);
      });
    },
    // 获取汇总统计数据
    getSummaryData() {
      request({
        url: 'api/dashboard/summary',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          const data = response.data;
          this.summaryData = {
            totalWarningUsers: data.totalWarningUsers,
            totalHandledUsers: data.totalHandledUsers,
            todayWarningCount: data.todayWarningCount,
            // 计算未处置：总数 - 已处置
            unhandledUsers: data.totalWarningUsers - data.totalHandledUsers,
            // 处置率转为百分比整数
            disposalRate: Math.round(data.disposalRate * 100)
          };

          // 获取汇总数据并更新地图上方核心指标
          this.centerCards = [
            { num: data.warningCount72h, label: '72小时预警用户数' },
            { num: data.handledCount72h, label: '72小时处置用户数' },
            { num: data.warningCount24h, label: '24小时预警用户数' },
            { num: data.handledCount24h, label: '24小时处置用户数' }
          ];

          // 数据获取后更新图表
          this.$nextTick(() => {
            if (this.initRateChart) this.initRateChart();
          });
        }
      }).catch(error => {
        console.error("获取汇总数据失败:", error);
      });
    },
    // 获取今日恶意网址访问实时信息
    getLiveFeedData() {
      request({
        url: 'api/dashboard/live-feed',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          this.liveFeedData = response.data;
        }
      }).catch(error => {
        console.error("获取实时访问信息失败:", error);
      });
    },
    // 实现科技感百分比环
    initRateChart() {
      if (this.rateChartInstance) {
        this.rateChartInstance.dispose();
      }
      const chartDom = this.$refs.rateChart;
      if (!chartDom) return;

      this.rateChartInstance = echarts.init(chartDom);
      const rate = this.summaryData.disposalRate; // 0-100

      const option = {
        series: [
          // --- 第一层：外围装饰虚线环 (增加科技感) ---
          {
            type: 'gauge',
            radius: '95%', // 比主环稍大
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
            progress: { show: false },
            detail: { show: false },
            axisLine: {
              lineStyle: {
                width: 1, // 极细线条
                color: [[1, 'rgba(0, 227, 254, 0.2)']] // 淡青色
              }
            },
            axisTick: { show: false },
            splitLine: { show: false }, // 不显示分割线
            axisLabel: { show: false }
          },
          
          // --- 第二层：内部底环 (轨道) ---
          {
            type: 'gauge',
            radius: '75%',
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
            detail: { show: false },
            axisLine: {
              lineStyle: {
                width: 30, // 环宽
                color: [[1, 'rgba(255, 255, 255, 0.08)']] // 非常淡的底色
              }
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false }
          },

          // --- 第三层：进度环 (实际数据) ---
          {
            type: 'gauge',
            radius: '75%', // 与底环重合
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
            // 进度条样式
            progress: {
              show: true,
              overlap: false,
              roundCap: true, // 圆头效果
              clip: false,
              itemStyle: {
                // 亮眼渐变色
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 0, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#00FFFF' }, // 亮青
                    { offset: 1, color: '#007EFF' }  // 蓝
                  ]
                },
                // 发光阴影
                shadowBlur: 10,
                shadowColor: 'rgba(0, 227, 254, 0.6)'
              }
            },
            // 隐藏这一层的轴线，只显示 progress
            axisLine: {
              lineStyle: {
                width: 30,
                color: [[1, 'transparent']] 
              }
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            // 中间数字样式
            detail: {
              valueAnimation: true,
              fontSize: 48, // 字号调大
              fontWeight: 'bold',
              color: '#ffffff',
              fontFamily: 'DigifaceWide', // 数码字体
              formatter: '{value}%',
              offsetCenter: ['0%', '0%'] // 绝对居中
            },
            data: [{ value: rate }]
          }
        ]
      };
      this.rateChartInstance.setOption(option);
    },
    // 获取恶意网址趋势数据
    getTrendData() {
      // 调用后端接口
      request({
        url: 'api/dashboard/hourlyTrend',
        method: 'get'
      }).then(response => {
        if (response.code === 200 && response.data) {
          // let data = response.data;
          
          // --- 核心逻辑：前端补全 24 时 ---
          // // 1. 找到 00 时的数据值
          // const zeroHourItem = data.find(item => item.name === '00');
          // const zeroHourValue = zeroHourItem ? zeroHourItem.value : 0;

          // 2. 构造 24 时的数据对象
          // const twentyFourHourItem = {
          //   name: '24',
          //   value: zeroHourValue // 让 24 时等于 00 时，形成闭环
          // };

          // 3. 追加到数组末尾
          this.trendData = response.data;

          // 4. 数据准备好后，初始化或更新图表
          this.$nextTick(() => {
            this.initTrendChart();
          });
        }
      }).catch(error => {
        console.error("获取趋势图数据失败:", error);
        // 可选：失败时提供默认空数据防止报错
        // this.trendData = Array.from({ length: 25 }, (_, i) => ({ name: String(i).padStart(2, '0'), value: 0 }));
        // this.initTrendChart();
      });
    },
    // 初始化趋势折线图
    initTrendChart() {
      if (this.trendChartInstance) {
        this.trendChartInstance.dispose();
      }
      const chartDom = this.$refs.trendChart;
      this.trendChartInstance = echarts.init(chartDom);

      // 提取 X 轴和 Y 轴数据
      const xData = this.trendData.map(item => item.name);
      const yData = this.trendData.map(item => item.value);

      const option = {
        // 提示框
        tooltip: {
          trigger: 'axis',
          // backgroundColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(3, 4, 9, 0.8)', // 背景更深
          borderColor: '#00E3FE',
          textStyle: { color: '#fff', fontSize: 16 },
          padding: [10, 15],
          // 格式化 Tooltip，使其也显示“xx时”
          formatter: function (params) {
            return `${params[0].name}时<br/>${params[0].marker} 访问量: <span style="color:#fff;font-weight:bold">${params[0].value}</span>`;
          }
        },
        // 布局：去掉边框，留出坐标轴空间
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 线条贴边
          data: xData,
          axisLine: { show: false }, // 隐藏轴线
          axisTick: { show: false }, // 隐藏刻度
          axisLabel: {
            fontFamily: 'Adobe Heiti Std', 
            fontSize: 21,                  
            color: '#0180D9',              
            lineHeight: 18,                
            margin: 15,                    
            // 间隔逻辑：强制显示首尾，中间按规律显示
            interval: (index) => {
              // 1. 强制显示第一个点 (1时)
              if (index === 0) return true;
              // 2. 强制显示最后一个点 (24时)
              if (index === xData.length - 1) return true;
              // 3. 中间部分维持原有的稀疏策略 (每4小时显示一次：5, 9, 13, 17, 21)
              return index % 4 === 0;
            },                
            // 格式化：增加“时”
            formatter: (value) => value + '时'
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1, // 保证最小间隔为1，避免出现0.2, 0.4这种小数
          // 不设置 max，实现动态高度适配
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.05)', // 虚线颜色
              type: 'dashed' // 虚线
            }
          },
          axisLabel: {
            fontFamily: 'Adobe Heiti Std',
            fontSize: 21,
            color: '#0180D9',
            lineHeight: 18,
            margin: 30 
          }
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            smooth: true, // 平滑曲线
            symbol: 'none', // 默认不显示拐点，鼠标悬停才显示 
            showSymbol: false,
            data: yData,
            // 线条样式
            lineStyle: {
              width: 2,
              color: '#00E3FE', // 亮青色
              shadowBlur: 5,       // 光晕大小
              shadowColor: '#00E3FE' // 光晕颜色
            },
            // 区域填充样式 (阴影)
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 227, 254, 0.4)' // 顶部颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0, 227, 254, 0)'   // 底部透明
                }
              ])
            },
            // 鼠标悬停时的样式
            emphasis: {
              itemStyle: {
                color: '#fff',
                borderColor: '#00E3FE',
                borderWidth: 3
              }
            }
          }
        ]
      };

      this.trendChartInstance.setOption(option);
    },
    // === 新增：3D 扇形曲面生成算法 (核心) ===
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算弧度
      const midRatio = (startRatio + endRatio) / 2;
      const startRadian = startRatio * Math.PI * 2;
      const endRadian = endRatio * Math.PI * 2;
      
      // 选中偏移量（本例暂不交互，设为0）
      const offsetX = 0;
      const offsetY = 0;

      // === 调整缩放系数 ===
      // 将原先的 * 0.1 改为 * 0.4 (根据底座大小微调，0.4~0.45 应该刚好撑满)
      // 注意：z 轴的 scaling (高度) 暂时保持 0.1 或根据需要调整，否则可能太高
      const rScale = 0.45; // 半径缩放系数 (控制胖瘦/大小)

      // 返回参数化方程对象
      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: function (u, v) {
          // 修改处：将最后的 * 0.1 替换为 * rScale (即 0.4)
          if (u < startRadian) return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * rScale;
          if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * rScale;
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * rScale;
        },
        y: function (u, v) {
          // 修改处：将最后的 * 0.1 替换为 * rScale (即 0.4)
          if (u < startRadian) return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * rScale;
          if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * rScale;
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * rScale;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;
          // z 轴通常不需要跟 xy 一样放大，否则柱子会飞出屏幕。保持 0.1 或微调即可。
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },

    // === 新增：生成 Series 数据 ===
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

      // 计算总和
      pieData.forEach(item => sumValue += item.value);

      // 生成每个扇区
      pieData.forEach((item, index) => {
        endValue = startValue + item.value;
        const startRatio = startValue / sumValue;
        const endRatio = endValue / sumValue;
        
        // 核心：根据数值计算高度 (基础高度 5 + 占比 * 30)
        // 这样数值越大的饼图，看起来越高 (3D Rose Effect)
        const height = 5 + (item.value / sumValue) * 35; 

        const equation = this.getParametricEquation(startRatio, endRatio, false, false, k, height);

        series.push({
          name: item.name,
          type: 'surface',
          parametric: true,
          wireframe: { show: false }, // 隐藏网格线
          itemStyle: {
            color: this.colorList[index],
            // opacity: 0.9 // 稍微透明一点，更有质感
          },
          parametricEquation: equation
        });

        startValue = endValue;
      });
      return series;
    },

    // === 新增：初始化图表 ===
    initDisposalChart() {
      if (!this.$refs.disposalChart) return;
      // 如果数据为空，暂时不渲染，直接返回
      if (!this.sortedDisposalData || this.sortedDisposalData.length === 0) return;
      if (this.disposalChartInstance) this.disposalChartInstance.dispose();
      
      this.disposalChartInstance = echarts.init(this.$refs.disposalChart);

      // 0.6 是内径比例，制造空心环效果
      const series = this.getPie3D(this.sortedDisposalData, 0.6);
      
      const option = {
        // 3D 坐标轴配置（必须存在但隐藏）
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false, // 隐藏边框
          boxHeight: 8, // 3D 容器高度 
          // 视角控制：模拟设计稿的俯视角度
          viewControl: {
            alpha: 22, // 俯仰角
            beta: 10,  // 旋转角
            distance: 80, // 视距
            autoRotate: false, // 开启自动旋转
            autoRotateSpeed: 10,
            panSensitivity: 0, 
            zoomSensitivity: 0
          },
          // 光照配置
          light: {
            main: {
              intensity: 1.5,
              shadow: true,
              alpha: 30,
              beta: 10
            },
            ambient: { 
              intensity: 0.3  
            }
          }
        },
        series: series 
      };

      this.disposalChartInstance.setOption(option);
    },
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
      // 加入 resize（折线图）
        this.$nextTick(() => {
            if (this.disposalChartInstance) this.disposalChartInstance.resize();
            if (this.trendChartInstance) this.trendChartInstance.resize();
            if (this.rateChartInstance) this.rateChartInstance.resize();
        })
    },
    handleNav(type) {
      this.currentNav = type;
      if (type === 'admin') {
        this.$router.push('/index'); // 如需跳转请解开
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

/* ================= 预警处置统计样式 ================= */
.stats-container {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 100%;
  box-sizing: border-box; /* 避免子元素超出容器 */
}

/* --- 左侧：环形图区域 --- */
.stats-left {
  position: relative;
  flex: 1; 
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  
  /* 用 CSS 模拟科技感底座光晕 */
  background: radial-gradient(closest-side, rgba(0, 227, 254, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
}

.rate-chart {
  width: 100%; /* 撑满容器 */
  height: 100%;
  z-index: 1;
}

.rate-label {
  position: absolute;
  bottom: 30%; /* 调整位置，避免遮挡 */
  font-family: 'Adobe Heiti Std';
  font-size: 24px;
  font-weight: normal;
  color: #FFFFFF;
  z-index: 2;
  text-shadow: 0 0 5px rgba(0, 227, 254, 0.5);
  pointer-events: none; /* 防止遮挡鼠标事件 */
}

/* --- 右侧：统计信息区域 --- */
.stats-right {
  flex: 1.5; /* 占据右侧剩余空间 */
  height: 100%; /* 内容垂直居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
}

/* 1. 上半部分：左右分栏 */
.stats-dual-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐 */
  flex: 1;
}

.stat-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* 指示点 (黄色/蓝色) */
.indicator-point {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 40px;
  box-shadow: 0 0 5px currentColor;
}
.blue-point { background-color: #00E3FE; color: #00E3FE; }
/* 【核心需求】黄色指示 */
.yellow-point { background-color: #FFE00D; color: #FFE00D; }

/* 标签样式 (蓝湖代码还原) */
.stat-label {
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 30px;
  color: #FFFFFF;
  line-height: 1; 
}

/* 数值样式 (蓝湖代码还原) */
.stat-value {
  font-family: 'Adobe Heiti Std', 'SimHei'; /* 这里的数值没用数码字体，按设计稿走 */
  font-weight: normal;
  font-size: 32px;
  color: #E7FFFF;
  text-shadow: 0 0 10px rgba(231, 255, 255, 0.4);
}

.text-warn {
  color: #FFE00D; /* 未处置数值也用黄色呼应 */
  text-shadow: 0 0 10px rgba(255, 224, 13, 0.4);
}

/* 2. 中间分隔线 */
.vertical-divider {
  width: 1px;
  height: 60px; /* 线条高度 */
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  margin: 0 40px;
}

/* --- 进度条样式 --- */
.progress-section {
  width: 100%;
  // padding: 0 5px; /* 防止光晕被切 */
}
.progress-box {
  width: 100%;
  height: 20px;
}

.progress-track {
  width: 100%;
  height: 100%; /* 跟随父级 */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  /* 蓝青色渐变 */
  background: linear-gradient(90deg, #007EFF 0%, #00E3FE 100%);
  border-radius: 4px;
  position: relative;
  transition: width 1s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 227, 254, 0.6);
}

/* 进度条光效 */
.progress-glow {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  background: #fff;
  filter: blur(3px);
  opacity: 0.6;
  border-radius: 50%;
}

/* ================= 今日恶意网址访问信息样式 ================= */
.live-feed-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  height: 100%;
  overflow: hidden;
}
/* --- 通用列宽定义 (关键：确保头和身对齐) --- */
/* 1. 手机号码：加宽，防止遮挡 (Flex 1.3) */
.col-phone {
  flex: 1.2; 
}
/* 2. 普通列：时间 (Flex 1.1) - 稍微宽一点点保险 */
.col-normal {
  flex: 1;
}
/* 3. 窄列：区县、处置情况 (Flex 0.8) - 内容短，省出空间给手机号 */
.col-narrow {
  flex: 0.8;
}
/* 4. 宽列：涉诈网址类型 (Flex 1.6) - 最宽，允许截断 */
.col-wide {
  flex: 1.6; 
}
/* --- 新增：文本截断样式 (内层元素) --- */
.text-truncate {
  display: block;          /* 必须是 block 或 inline-block */
  width: 100%;             /* 宽度撑满父容器 */
  overflow: hidden;        /* 超出隐藏 */
  white-space: nowrap;     /* 强制不换行 */
  text-overflow: ellipsis; /* 超出显示省略号 */
  text-align: center;      /* 文字居中 */
  // padding : 0 10px;
  /* 继承父级字体样式，确保设计稿还原 */
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
}
/* --- 表头部分 --- */
.feed-header-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 5px;
}

.header-item {
  /* 继承通用列宽 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  background: linear-gradient(0deg, rgba(0,180,255,0.4), rgba(0,180,255,0.05));
  border-radius: 4px;
  border: 1px solid #00b4ff; /* 黑色边框稍微透明一点，融合暗色背景 */
  margin-right: 16px; /* 间距 */
  // margin: 0px 8px;

  /* 文字样式 */
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 26px;   /* 修改 */
  color: #52CCFF; 
  white-space: nowrap;
}

.header-item:last-child {
  margin-right: 0;
}

/* --- 滚动列表部分 --- */
.feed-scroll-window {
  flex: 1;
  overflow: hidden; /* 隐藏超出部分 */
  position: relative;
}

.feed-scroll-content {
  /* 默认无动画 */
}

/* 开启滚动动画 */
.animating {
  animation: scrollUp 20s linear infinite;
}

/* 鼠标悬停暂停 */
.feed-scroll-window:hover .animating {
  animation-play-state: paused;
}

@keyframes scrollUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); } /* 滚动双倍数据的一半 */
}

/* --- 单行样式 --- */
.feed-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 适配父容器宽度 */
  height: 66px; /* 蓝湖设计稿高度 */
  // padding-left: 5px;
  padding: 0 5px;
  transition: all 0.3s;
}

/* 隔行背景色 (第一条加背景，第二条不加) */
/* index % 2 === 0 为偶数索引，即第1, 3, 5...条 */
.row-highlight {
  /* 使用 rgba 避免影响文字透明度 */
  background-color: rgba(12, 38, 72, 0.8);
  border-left: 2px solid #00E3FE; /* 可选：增加左侧亮条增加科技感 */
}

.cell-text {
  /* 继承通用列宽 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* 【关键】间距与表头保持严格一致，确保对齐 */
  margin-right: 16px;
  /* 【关键】添加透明边框，抵消表头的 1px 边框占位，保证内容区宽度完全相等 */
  border: 1px solid transparent;

  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 24px;  /* 修改 */
  color: #FFFFFF;   /* 修改 */
  
  white-space: nowrap;
  overflow: hidden; /* 兜底防止撑开 */ 
}

/* 去掉每行最后一个单元格的右边距 */
.cell-text:last-child {
  margin-right: 0;
}


/* --- 处置状态颜色 --- */
/* 已处置 */
.text-handled { 
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 26px; 
  color: #26549B; /* 修改：深蓝色 */
}

/* 未处置 */
.text-unhandled { 
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 26px; 
  color: #E70837; /* 修改：红色 */
}

/* ================= 趋势图 ================= */
/* 确保图表容器占满空间 */
.full-chart {
  width: 100%;
  height: 100%;
}

/* ================= 处置方式 (3D GL版) 样式 ================= */
.disposal-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
}

/* --- 左侧区域 --- */
.chart-left-zone {
  /* 增加权重，给左侧留出足够空间放置 400px 的底座 */
  flex: 1.5; 
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 底部对齐，防止向上顶到标题 */
  // padding-bottom: 10px; /* 稍微留点底边距 */
}

/* 视觉包裹容器 */
.visual-wrapper {
  position: relative; /* 建立绝对定位坐标系 */
  width: 100%;
  height: 100%;
  overflow: hidden; /* 防止溢出 */
}

/* 总数悬浮 */
.total-floating {
  position: absolute;
  /* 【核心】绝对居中定位 */
  left: 50%;
  top: 25%; /* 位于容器垂直中心偏上一点，对应饼图中心 */
  transform: translate(-50%, -50%);
  
  z-index: 20; /* 最上层 */
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* 穿透点击 */
}

.total-num {
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 48px;
  color: #EAFF00;
  text-shadow: 0px 3px 7px rgba(0,0,0,0.35);
  line-height: 1;
}

.total-label {
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-size: 24px;
  color: #EAFF00;
  opacity: 0.8;
  margin-top: 5px;
  display: block;
}

/* 底座图片 */
.base-img-box {
  position: absolute;
  /* 【核心】水平绝对居中，与图表完全一致 */
  left:50%;
  transform: translateX(-53%);
  
  /* 【核心】垂直定位：贴底 */
  bottom: 10px; 
  
  /* 调整底座大小 */
  width: 380px; /* 根据实际切图宽度调整 */
  /* height: auto; */
  opacity: 0.5;
  z-index: 1;
  pointer-events: none; /* 防止图片遮挡图表的鼠标交互 */
}

/* GL 图表容器 */
.gl-chart-box {
  position: absolute;
  /* 【核心】水平绝对居中 */
  left: 50%; 
  transform: translateX(-50%);
  
  /* 【核心】垂直定位：调整 bottom 让饼图“悬浮”在底座正上方 */
  bottom: 20px; /* 您可能需要微调这个值，比如 20px 或 30px */
  
  width: 340px; /* 限制宽度，防止 ECharts 过宽导致视差偏移 */
  height: 200px; /* 给定高度 */
  z-index: 10; /* 保证在底座上方，但在文字下方 */ 
}

/* --- 右侧：图例列表 --- */
.legend-right-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px; /* 图例间距 */
  padding: 0 10px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  width: 100%;
}

/* 矩形标识: 20x23 */
.legend-rect {
  width: 20px;
  height: 23px;
  margin-right: 15px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); /* 增加一点发光质感 */
}

/* 处置方式名: 30px, White */
.legend-name {
  width: 122px; /* 蓝湖参数 */
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 26px; /* 原稿 30px 容易导致换行，建议 26px */
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 5px;
}

/* 处置量: 30px, Blue */
.legend-val {
  flex: 1;
  font-family: 'Adobe Heiti Std', 'SimHei';
  font-weight: normal;
  font-size: 30px;
  color: #00E3FE; /* 蓝湖参数 */
  text-align: right;
  min-width: 50px;
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

/* ================= 小标题 ================= */
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

.custom-table { width: 100%; border-collapse: collapse; color: #ccc; font-size: 20px; }
.custom-table th { color: #00d2ff; border-bottom: 1px solid #666; padding: 10px; text-align: left; }
.custom-table td { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.text-red { color: #ff6b6b; } .text-green { color: #4ade80; }
</style>
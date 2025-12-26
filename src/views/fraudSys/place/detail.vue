<template>
  <div class="form-detail-page">
    <!-- 加载状态 -->
    <el-loading v-if="isLoading" lock text="加载中..." spinner="el-icon-loading"
                background="rgba(0, 0, 0, 0.7)"></el-loading>

    <!-- 表格容器 -->
    <div class="form-detail-table-wrapper">
      <table class="form-detail-table">
        <tbody>
        <tr class="form-detail-row" v-for="(item, key) in filteredFormData" :key="key">
          <td class="form-label-td">{{ getLabel(key) }}</td>
          <td class="form-value-td">
            <!-- 金额字段单独处理：空值显示-，0显示0 -->
            <template v-if="key === 'interceptAmount' || key === 'cheatedAmount'">
              {{ formatAmount(item) }}
            </template>
            <!-- 文件列表渲染 -->
            <template v-else-if="key === 'cannotMeetFilePath'">
              <ul class="file-list" v-if="computedFiles.length > 0">
                <li v-for="(file, idx) in computedFiles" :key="idx">
                  <a href="javascript:void(0)" @click="downloadFile(file)" class="file-link">
                    <i class="el-icon-document"></i>
                    <span class="file-name">{{ file.name }}</span>
                  </a>
                </li>
              </ul>
              <template v-else>-</template>
            </template>
            <!-- 其他字段 -->
            <template v-else>
              {{ transformValue(key, item) || '-' }}
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getPlaceDetails } from "@/api/fraudSys/place";
import { getAlertTaskDict } from "@/api/fraudSys/dict";
import request from '@/utils/request';
import MobileUtils from "@/utils/mobileUtils";

export default {
  data() {
    return {
      msisdn: this.$route.params.msisdn,
      formData: {},
      alertTaskDict: {},
      isLoading: false,
      needTransformFields: [
        'cheatedType', 'disposalMethod', 'feedbackResult',
        'feedbackStatus', 'isFollowUp', 'isReport', 'meetResult',
        'noPhoneContactReason', 'phoneContactResult'
      ]
    };
  },
  created() {
    this.getAlertTaskDictTree().then(() => {
      this.loadDetailData();
    });
  },
  computed: {
    // 新增：用于替代 v-for 内的 v-if 判断
    filteredFormData() {
      const result = {};
      Object.keys(this.formData).forEach(key => {
        if (key !== 'id') {
          result[key] = this.formData[key];
        }
      });
      return result;
    },
    computedFiles() {
      const filePaths = this.formData.cannotMeetFilePath;
      if (!filePaths) {
        return [];
      }
      let paths = Array.isArray(filePaths) ? filePaths : [filePaths];
      paths = paths.filter(path => path !== null && path !== undefined && path !== '');
      return paths.map((filePath, idx) => {
        if (typeof filePath !== 'string') {
          return {
            path: '',
            name: `无效文件-${idx + 1}`
          };
        }
        const name = filePath.split('/').pop() || `file-${idx + 1}`;
        return {
          path: filePath,
          name: name
        };
      });
    }
  },
  methods: {
    // 核心修改：区分空值和0的显示
    formatAmount(value) {
      // 空值（null/undefined）显示 "-"
      if (value === null || value === undefined) {
        return '-';
      }
      // 有效数值（包括0）显示实际值（保留两位小数）
      if (!isNaN(Number(value))) {
        return Number(value).toFixed(2);
      }
      // 非数值的无效值显示 "-"
      return '-';
    },

    getAlertTaskDictTree() {
      return new Promise((resolve) => {
        getAlertTaskDict().then((res) => {
          const data = res.data || {};
          Object.keys(data).forEach(dictKey => {
            if (Array.isArray(data[dictKey])) {
              const obj = {};
              data[dictKey].forEach(item => {
                if (item.value !== undefined) {
                  obj[item.value] = item;
                }
              });
              data[dictKey] = obj;
            }
          });
          this.alertTaskDict = data;
          resolve();
        });
      });
    },

    loadDetailData() {
      this.isLoading = true;
      getPlaceDetails(this.msisdn).then((response) => {
        console.log("详情接口响应:", response);
        
        // 处理文件路径数组
        let cannotMeetData = response.data.cannotMeetFilePath;
        if (typeof cannotMeetData === 'string') {
          if (cannotMeetData.startsWith('[') && cannotMeetData.endsWith(']')) {
            cannotMeetData = cannotMeetData.substring(1, cannotMeetData.length - 1).split(',').map(item => item.trim());
          } else {
            cannotMeetData = [cannotMeetData];
          }
        }
        if (!Array.isArray(cannotMeetData)) {
          cannotMeetData = [cannotMeetData];
        }
        response.data.cannotMeetFilePath = cannotMeetData;

        // 移除金额字段的强制兜底，保留原始值
        this.formData = response.data || {};
      }).catch((err) => {
        console.error("详情加载失败:", err);
        this.$message.error('数据加载失败，请重试');
        this.formData = {};
      }).finally(() => {
        this.isLoading = false;
      });
    },

    downloadFile(file) {
      if (!file || !file.name) {
        this.$message.error('文件信息无效');
        return;
      }

      const downloadUrl = `/alert/alertsys/downloadCannotMeetFile/${this.msisdn}/${file.name}`;

      request({
        url: downloadUrl,
        method: 'POST',
        responseType: 'blob'
      }).then(response => {
        if (!response) {
          throw new Error('服务器无响应');
        }

        const blob = new Blob([response]);
        if (blob.size === 0) {
          this.$message.error('下载的文件为空');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name || 'download.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      }).catch(error => {
        console.error('下载失败:', error);
        this.$message.error('文件下载失败: ' + (error.message || '未知错误'));
      });
    },

    transformValue(field, value) {
      // 处理手机号字段，解密但不脱敏
      if (field === 'msisdn') {
        return MobileUtils.decodeMobileOnly(value);
      }
      
      if (!this.needTransformFields.includes(field)) {
        return value;
      }

      const fieldDict = this.alertTaskDict[field] || {};
      const key = String(value);
      return fieldDict[key]?.label || '-';
    },

    getLabel(field) {
      const labelMap = {
        msisdn: '手机号码',
        city: '号段归属地',
        type: '网址大类',
        host: '网址域名',
        subcat: '网址小类',
        protocol: '协议类型',
        cnName: '应用名称',
        cnt: '日志条数',
        baseAdcode: '基站区县行政区划编码',
        startTime: '起始时间',
        endTime: '截止时间',
        baseCity: '基站地市',
        baseCoutry: '基站区县',
        baseTown: '基站乡镇街道',
        baseTowncode: '基站乡镇街道行政区划编码',
        disposalMethod: '处置方式',
        feedbackStatus: '反馈情况',
        phoneContactResult: '电话联系结果',
        noPhoneContactReason: '未电话联系原因',
        feedbackResult: '反馈结果',
        meetResult: '见面结果',
        meetDutyUnit: '见面责任单位',
        meetDutyOfficer: '见面责任民警',
        meetAddress: '见面地址',
        noMeetReason: '无法见面原因',
        cannotMeetFilePath: '无法见面的文件',
        cheatedType: '被骗类型',
        cheatedAmount: '被骗金额',
        isReport: '是否报案',
        interceptAmount: '拦截金额',
        remark: '备注',
        isFollowUp: '是否回访',
        id: '序号',
      };
      return labelMap[field] || field;
    }
  }
};
</script>

<style scoped>
/* 样式保持不变 */
.form-detail-page {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}

.form-detail-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.form-detail-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.form-detail-row {
  border-bottom: 1px solid #f0f2f5;
}

.form-detail-row:last-child {
  border-bottom: none;
}

.form-label-td {
  width: 220px;
  padding: 16px 24px;
  text-align: right;
  font-weight: 500;
  color: #606266;
  background-color: #e7e7e7;
  box-sizing: border-box;
}

.form-value-td {
  padding: 16px 24px;
  text-align: left;
  color: #303133;
  border-left: 1px solid #f0f2f5;
  box-sizing: border-box;
  word-break: break-all;
  word-wrap: break-word;
}

.file-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.file-list li {
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px dashed #eee;
}

.file-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.file-link {
  color: #409eff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.file-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.file-link .el-icon-document {
  margin-right: 8px;
  font-size: 16px;
}

.file-name {
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
    
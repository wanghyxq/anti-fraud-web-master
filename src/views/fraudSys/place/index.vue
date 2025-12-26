<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="手机号码" prop="msisdn">
        <el-input v-model="queryParams.msisdn" placeholder="请输入手机号码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="HOST" prop="host">
        <el-input v-model="queryParams.host" placeholder="请输入HOST" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="区县" prop="baseCoutry">
        <el-select v-model="queryParams.baseCoutry" placeholder="请选择区县" clearable @keyup.enter.native="handleQuery">
          <el-option v-for="dict in alertTaskDict.baseCoutryType" :key="dict.value" :label="dict.label"
            :value="dict.label" :disabled="dict.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网址大类" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择网址大类" clearable @keyup.enter.native="handleQuery">
          <el-option v-for="dict in alertTaskDict.appNameType" :key="dict.value" :label="dict.label" :value="dict.label"
            :disabled="dict.disabled"></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="起始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="请选择起始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截至时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="请选择截至时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>

      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess1" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate">下载待处置数据</el-link>
          <span>仅允许导入xls、xlsx格式文件。</span>

        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-table v-loading="loading" :data="placeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="序号" align="center" prop="id" /> -->
      <el-table-column label="手机号码" align="center" prop="msisdn" />
      <!-- <el-table-column label="号段归属地" align="center" prop="city" /> -->
      <el-table-column label="网址大类" align="center" prop="type" />
      <el-table-column label="网址域名" align="center" prop="host" />
      <el-table-column label="应用名称" align="center" prop="cnName" />
      <el-table-column label="网址小类" align="center" prop="subcat" />
      <el-table-column label="日志条数" align="center" prop="cnt" />
      <el-table-column label="起始时间" align="center" prop="startTime" width="180">
      </el-table-column>
      <el-table-column label="截至时间" align="center" prop="endTime" width="180">
      </el-table-column>
      <el-table-column label="区县" align="center" prop="baseCoutry" />
      <el-table-column label="乡镇街道" align="center" prop="baseTown" />
      <el-table-column label="处置方式" align="center" prop="disposalMethod" />
      <el-table-column label="反馈情况" align="center" prop="feedbackStatus" />
      <!-- <el-table-column label="未电话联系原因" align="center" prop="noPhoneContactReason" /> -->
      <el-table-column label="反馈结果" align="center" prop="feedbackResult" />
      <el-table-column label="拦截金额" align="center" prop="interceptAmount" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">处置</el-button>
          <el-button size="mini" type="text" icon="el-icon-view" @click="getDetailData(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改预警任务管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px" size="medium" label-position="left">
        <el-form-item label-width="180px" label="处置方式" prop="disposalMethod">
          <el-radio-group v-model="formData.disposalMethod" size="medium">
            <el-radio v-for="dict in alertTaskDict.disposalMethod" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="反馈情况" prop="feedbackStatus">
          <el-radio-group v-model="formData.feedbackStatus" size="medium">
            <el-radio v-for="dict in alertTaskDict.feedbackStatus" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="已电话联系" prop="phoneContactResult" v-if="formData.feedbackStatus === 1">
          <el-radio-group v-model="formData.phoneContactResult" size="medium">
            <el-radio v-for="dict in alertTaskDict.phoneContactResult" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="见面结果" prop="meetResult" v-if="formData.disposalMethod === 3">
          <el-radio-group v-model="formData.meetResult" size="medium" @change="handleJianmianChange">
            <el-radio v-for="dict in alertTaskDict.meetResult" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="无法见面原因" prop="noMeetReason" v-if="formData.meetResult === 3">
          <el-input v-model="formData.noMeetReason" placeholder="请输入无法见面原因" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>

        <el-form-item label-width="180px" label="无法见面的文件：" prop="cannotMeetFilePath" required
          v-if="formData.meetResult === 3">
          <el-upload ref="upload2" accept=".pdf" :headers="upload2.headers" :action="upload2.url"
            :file-list="cannotMeetFilePathList" :disabled="upload2.isUploading" :on-success="handleFileSuccess2"
            :before-upload="cannotMeetFilePathBeforeUpload" :on-remove="handleFileRemove" :auto-upload="true">
            <el-button size="small" type="primary" icon="el-icon-upload">上传PDF文件</el-button>
            <div slot="tip" class="el-upload__tip">需注明无法见到本人原因并区县科所队及以上单位公章的.pdf文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="180px" label="见面责任单位" prop="meetDutyUnit" v-if="formData.meetResult === 1">
          <el-input v-model="formData.meetDutyUnit" placeholder="请输入见面责任单位" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="见面责任民警" prop="meetDutyOfficer" v-if="formData.meetResult === 1">
          <el-input v-model="formData.meetDutyOfficer" placeholder="请输入见面责任民警" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="见面地址" prop="meetAddress" v-if="formData.meetResult === 1">
          <el-input v-model="formData.meetAddress" placeholder="请输入见面地址" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="未电话联系原因" prop="noPhoneContactReason">
          <el-radio-group v-model="formData.noPhoneContactReason" size="medium">
            <el-radio v-for="dict in alertTaskDict.noPhoneContactReason" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="反馈结果" prop="feedbackResult">
          <el-radio-group v-model="formData.feedbackResult" size="medium">
            <el-radio v-for="dict in alertTaskDict.feedbackResult" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
            <el-checkbox v-model="formData.huifang" :disabled="formData.meetResult === 2">回访</el-checkbox>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="被骗类型" prop="cheatedType" v-if="formData.feedbackResult === 2">
          <el-radio-group v-model="formData.cheatedType" size="medium">
            <el-radio v-for="dict in alertTaskDict.cheatedType" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="是否报案" prop="isReport" v-if="formData.feedbackResult === 2">
          <el-radio-group v-model="formData.isReport" size="medium">
            <el-radio v-for="dict in alertTaskDict.isReport" :key="dict.value" :label="dict.value"
              :disabled="dict.disabled">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px" label="被骗金额（没有请填0）" prop="cheatedAmount" v-if="formData.feedbackResult === 2">
          <el-input v-model="formData.cheatedAmount" placeholder="请输入被骗金额" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="拦截金额（没有请填0）" prop="interceptAmount">
          <el-input v-model="formData.interceptAmount" placeholder="请输入拦截金额" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

import { listPlace, getPlace, updatePlace, getPlaceDetails } from "@/api/fraudSys/place"
import { getAlertTaskDict } from "@/api/fraudSys/dict"
import { getToken } from "@/utils/auth"
import MobileUtils from "@/utils/mobileUtils";

export default {
  name: "Place",
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      needTransformFields: ['cheatedType', 'disposalMethod', 'feedbackResult', 'feedbackStatus', 'isFollowUp', 'isReport'
        , 'meetResult', 'noPhoneContactReason', 'phoneContactResult'
      ],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 1,  // 1更新已经存在的用户数据
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/alert/alertsys/importData"
      },
      //无法见面文件上传参数
      upload2: {
        // 是否显示弹出层（用户导入）
        // open: false,
        // 弹出层标题（用户导入）
        // title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        // updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/alert/alertsys/uploadCannotMeetFile"
      },
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 预警任务管理表格数据
      placeList: [
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        msisdn: null,
        type: null,
        host: null,
        subcat: null,
        protocol: null,
        startTime: null,
        endTime: null,
        baseCoutry: null,
      },
      alertTaskDict: {},
      formData: {
        disposalMethod: undefined,
        meetResult: undefined,
        noMeetReason: undefined,
        meetDutyUnit: undefined,
        meetDutyOfficer: undefined,
        meetAddress: undefined,
        feedbackStatus: undefined,
        noPhoneContactReason: undefined,
        feedbackResult: undefined,
        interceptAmount: undefined,
        remark: undefined,
        phoneContactResult: undefined,
        cheatedType: undefined,
        isReport: undefined,
        cheatedAmount: undefined,
        huifang: false,
        cannotMeetFilePath: [],
      },
      cannotMeetFilePathList: [],
      // uploadUrl: process.env.VUE_APP_BASE_API + '/alert/alertsys/uploadCannotMeetFile',  // 上传地址
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/user/importData",  // 上传地址
      // 表单校验
      rules: {
        disposalMethod: [{
          required: true,
          message: '处置方式不能为空',
          trigger: 'change'
        }],
        meetResult: [{
          required: true,
          message: '见面结果不能为空',
          trigger: 'change'
        }],
        feedbackStatus: [{
          required: true,
          message: '反馈情况不能为空',
          trigger: 'change'
        }],
        phoneContactResult: [{
          required: true,
          message: '不能为空',
          trigger: 'change'
        }],
        noPhoneContactReason: [],
        feedbackResult: [{
          required: true,
          message: '反馈结果不能为空',
          trigger: 'change'
        }],
        interceptAmount: [{
          required: true,
          message: '请输入拦截金额',
          trigger: 'blur'
        }],
        meetAddress: [{
          required: true,
          message: '请输入见面地址',
          trigger: 'blur'
        }],
        meetDutyUnit: [{
          required: true,
          message: '请输入责任单位',
          trigger: 'blur'
        }],
        meetDutyOfficer: [{
          required: true,
          message: '请输入责任民警',
          trigger: 'blur'
        }],
        noMeetReason: [{
          required: true,
          message: '请输入无法见面原因',
          trigger: 'blur'
        }],
      },
    }
  },
  created() {
    // this.getList();
    this.getAlertTaskDictTree().then(() => {
      this.getList();
    });
  },
  methods: {
    transformValue(field, value) {
      if (field === 'type' || field === 'baseCoutry') {
        // 构造字典属性名
        const dictKey = field === 'type' ? 'appNameType' : 'baseCoutryType';

        // 如果对应的字典不存在，返回空字符串
        if (!this.alertTaskDict[dictKey]) {
          return '';
        }

        // 统一转为字符串进行匹配
        const key = String(value);
        const transformed = this.alertTaskDict[dictKey][key];

        // 检查转换结果
        if (transformed !== undefined) {
          if (transformed.label !== undefined) {
            return transformed.label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      }
      // console.log("field",field)
      // console.log("value",value)
      // 如果字段不在需要转换的列表中，直接返回原值
      if (!this.needTransformFields.includes(field)) {
        return value;
      }
      // 如果字典中没有该字段的映射关系，返回原值
      if (!this.alertTaskDict[field]) {
        return value;
      }
      
      // 尝试从字典中获取对应的文字描述
      // 考虑到value可能是数字或字符串，统一转为字符串进行匹配
      const key = String(value);

      const transformed = this.alertTaskDict[field][key];

      // 先判断transformed是否存在，再判断label是否存在
      if (transformed !== undefined) {
        // 如果transformed存在，再检查它是否有label属性
        if (transformed.label !== undefined) {
          return transformed.label;
        } else {
          // transformed存在但没有label，返回原始值加提示
          return '';
        }
      } else {
        // transformed不存在，返回原始值加提示
        return '';
      }
    },
    // getAlertTaskDictTree() {
    //   return getAlertTaskDict().then((res) => {
    //     console.log(res.data)
    //     this.alertTaskDict = res.data;
    //   })
    // },
    getAlertTaskDictTree() {
      return new Promise((resolve) => {
        getAlertTaskDict().then((res) => {
          const data = res.data || {};
          // 遍历所有字典字段，将数组转成「以value为键」的对象
          Object.keys(data).forEach(dictKey => {
            if (Array.isArray(data[dictKey])) {
              const obj = {};
              data[dictKey].forEach(item => {
                if (item.value !== undefined) { // 确保item有value属性
                  obj[item.value] = item;
                }
              });
              data[dictKey] = obj; // 替换为对象格式
            }
          });
          this.alertTaskDict = data;
          resolve();
        });
      });
    },
    handleJianmianChange(value) {
      if (value === 2) {
        this.formData.huifang = true;
      }
      // 2. 当切换到其他见面结果时，自动取消回访（用户可手动重新勾选）
      else {
        this.formData.huifang = false;
      }
    },
    //上传文件前检验
    cannotMeetFilePathBeforeUpload(file) {
      // 验证文件类型是否为PDF
      const isPDF = file.type === 'application/pdf' || file.name.endsWith('.pdf');
      if (!isPDF) {
        this.$message.error('只能上传PDF格式的文件!');
        return false; // 阻止上传
      }

      // 验证文件大小（例如限制5MB以内）
      // const isLt5M = file.size / 1024 / 1024 < 5;
      // if (!isLt5M) {
      //   this.$message.error('上传文件大小不能超过5MB!');
      //   return false; // 阻止上传
      // }

      // 可以在这里设置上传状态
      this.upload2.isUploading = true;
      return true; // 允许上传
    },
    //获得上传文件URL
    //   async getUploadUrl(){
    //     console.log("1.1")
    //     try {
    //       console.log("1")
    //   const response = await uploadCannotMeetFiles();
    //   console.log("response",response)
    //   if (response && response.data && response.data.uploadUrl) {
    //     this.uploadUrl = response.data.uploadUrl;
    //     return this.uploadUrl;
    //   } else {
    //     this.$message.error('获取上传地址失败，响应格式不正确');
    //     return '';
    //   }
    // } catch (error) {
    //   console.error('获取上传URL失败:', error);
    //   console.error("4");
    //   this.$message.error('获取上传地址失败，请稍后重试');
    //   return '';
    // }
    //   },
    // 文件上传成功处理
    handleFileSuccess2(response, file, fileList) {
      if (response.code === 200) {
        this.$message.success('文件上传成功');

        // 直接使用接口返回的完整路径
        const newPath = response.data;
        if (newPath) {
          // 更新文件列表
          this.cannotMeetFilePathList = [
            ...this.cannotMeetFilePathList.filter(f => f.status === 'success'),
            {
              name: file.name,
              url: newPath,
              response: { data: newPath },
              status: 'success'
            }
          ];

          // 更新表单数据，确保是数组格式
          if (!Array.isArray(this.formData.cannotMeetFilePath)) {
            this.formData.cannotMeetFilePath = [];
          }
          // 避免重复添加
          if (!this.formData.cannotMeetFilePath.includes(newPath)) {
            this.formData.cannotMeetFilePath.push(newPath);
          }
        }
      } else {
        this.$message.error(`上传失败: ${response.msg || '未知错误'}`);
      }
      this.upload2.isUploading = false;
    },

    // 移除文件处理
    handleFileRemove(file, fileList) {
      this.cannotMeetFilePathList = fileList;
      // 同步更新数组
      this.formData.cannotMeetFilePath = fileList
        .map(f => f.response?.data || '')
        .filter(path => path && path.trim() !== '');
      this.$message.info('文件已移除');
    },
    /** 查询预警任务管理列表 */
    getList() {
      this.loading = true
      listPlace(this.queryParams).then(response => {
        // 处理原始数据，转换需要转换的字段
        const processedList = response.rows.map(row => {
          // 复制一行数据，避免直接修改原对象
          const newRow = { ...row }
          
          // 特别处理手机号字段
          if (newRow.msisdn) {
            newRow.msisdn = MobileUtils.processEncodedMobile(newRow.msisdn)
          } 

          // 遍历需要转换的字段列表
          this.needTransformFields.forEach(field => {
            // 检查当前行是否有这个字段
            if (newRow.hasOwnProperty(field)) {
              // 使用transformValue方法进行转换
              newRow[field] = this.transformValue(field, newRow[field])
            }
          })

          return newRow
        })

        this.placeList = processedList
        console.log("处理后的数据", processedList)
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.formData = { // 重置表单数据（保持与初始定义一致）
        disposalMethod: undefined,
        meetResult: undefined,
        noMeetReason: undefined,
        meetDutyUnit: undefined,
        meetDutyOfficer: undefined,
        meetAddress: undefined,
        feedbackStatus: undefined,
        noPhoneContactReason: undefined,
        feedbackResult: undefined,
        interceptAmount: undefined,
        remark: undefined,
        phoneContactResult: undefined,
        cheatedType: undefined,
        isReport: undefined,
        cheatedAmount: undefined,
        huifang: false,
        cannotMeetFilePath: null, // 重置文件路径数组
      };
      this.cannotMeetFilePathList = []; // 重置文件列表（关键）
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.msisdn)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    // handleUpdate(row) {
    //   this.reset();
    //   this.open = true;
    //   this.title = "编辑预警任务";

    //   const id = row.id;
    //   console.log(id)
    //   getPlace(id).then(response => {
    //     console.log("后端返回的formData：", response.data);
    //     this.formData = response.data;
    //     this.initFileList();
    //     this.open = true;
    //     this.title = "预警任务管理";
    //   });
    // },
    handleUpdate(row) {
      this.reset();
      this.open = true;
      const id = row.id;
      getPlace(id).then(response => {
        this.formData = response.data;
        this.initFileList(); // 关键：编辑时调用处理方法
        this.open = true;
        this.title = "预警任务管理";
      });
    },
    // 新增：初始化文件列表（将表单中的文件路径转为 ElUpload 格式）
    initFileList() {
      this.cannotMeetFilePathList = [];
      let rawData = this.formData.cannotMeetFilePath;

      console.log('原始文件路径数据:', rawData);
      console.log('原始数据类型:', typeof rawData);

      // 1. 处理字符串格式的数组（如"[/path1, /path2]"）
      let parsedData = rawData;
      if (typeof parsedData === 'string') {
        // 移除字符串中的所有双引号
        parsedData = parsedData.replace(/"/g, '');
        // 移除字符串两端的方括号
        parsedData = parsedData.replace(/^\[|\]$/g, '');
        // 按逗号分割并去除空格
        parsedData = parsedData.split(',').map(item => item.trim());
      }

      // 2. 确保是数组格式
      let filePaths = Array.isArray(parsedData) ? parsedData : [];

      // 3. 过滤无效路径
      const validPaths = filePaths.filter(path => {
        return path && typeof path === 'string' && path.trim() !== '';
      });

      console.log('解析后的有效文件路径:', validPaths);

      // 4. 更新表单数据和文件列表
      this.formData.cannotMeetFilePath = validPaths;

      if (validPaths.length > 0) {
        this.cannotMeetFilePathList = validPaths.map((path, index) => ({
          name: path.split('/').pop() || `file-${index}`,
          url: path,
          response: { data: path },
          status: 'success'
        }));
      }
    },

    getDetailData(row) {
      console.log('1111')
      const targetPath = `/fraudSys/place/detail/${row.id}`;
      console.log("要跳转的路径:", targetPath);
      this.$router.push(targetPath);
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 确保最终是数组（无文件则为空数组）
          if (!Array.isArray(this.formData.cannotMeetFilePath)) {
            this.formData.cannotMeetFilePath = [];
          }

          updatePlace(this.formData).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          }).catch(error => {
            this.$modal.msgError("提交失败: " + (error.message || "未知错误"));
          });
        }
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      console.log("111")
      console.log("请求参数：", this.queryParams);
      this.download('/alert/alertsys/exportManualData', {
        ...this.queryParams
      }, `place_${new Date().getTime()}.xlsx`)

    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入"
      this.upload.open = true
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess1(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true })
      this.getList()
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('/alert/alertsys/exportNonManualData', {
      }, `anti_fraud_template_${new Date().getTime()}.xlsx`)
    },
    // 提交上传文件
    submitFileForm() {

      this.$refs.upload.submit()
    }
  }
}
</script>

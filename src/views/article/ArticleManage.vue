<script setup>
import { artDelService, artGetChannelsService } from '@/api/article'
import ChannelSelect from './components/ChannelSelect.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { formatTime } from '@/utils/format'
// 假数据
const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: null,
    cate_name: '体育'
  }
])
const loading = ref(false)
const total = ref(5)

const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
})
// 获取文章列表
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService(params.value)
  console.log('获取文章列表', res)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getChannelList()
// const onEdit = (row) => {
//   console.log('编辑', row)
// }
// 处理分页逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getChannelList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getChannelList()
}
const articleEditRef = ref()
// const drawer = ref(false)
// 添加文章
const onAddActicle = () => {
  // drawer.value = true
  articleEditRef.value.open({})
}
const onEdit = async (row) => {
  // drawer.value = true
  articleEditRef.value.open(row)
}
// 处理筛选逻辑
const onSearch = () => {
  params.value.pagenum = 1
  getChannelList()
}
// 处理重置逻辑
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getChannelList()
}
// 发布文章成功后的处理
const onPublishSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getChannelList()
}

// 删除逻辑
const onDeleteArticle = async (row) => {
  // 提示用户是否要删除
  await ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelService(row.id)
  ElMessage.success('删除成功')
  // 重新渲染列表
  getChannelList()
}
</script>
<template>
  <page-container title="添加教材">
    <template v-slot:extra>
      <el-button @click="onAddActicle" type="primary">添加教材</el-button>
    </template>
    <el-form inline>
      <el-form-item style="width: 200px" label="教材分类：">
        <!--Vue2 =>v-model :value 和@input 的简写-->
        <!-- Vue3 => v-model:modelValue 和 @update:modelValue 的简写-->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item style="width: 200px" label="完成状态">
        <el-select v-model="params.state">
          <el-option label="已完成" value="已发布"></el-option>
          <el-option label="未完成" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column :value="articleList" label="教材名称">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="添加时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state">
        <template #default="{ row }">
          {{ row.state === '已发布' ? '已完成' : '未完成' }}
        </template>
      </el-table-column>
      <!-- 利用作用域插槽row可以获取当前行的数据 => v-for遍历item- -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="success"
            @click="onEdit(row)"
            :icon="Edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="onDeleteArticle(row)"
            :icon="Delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next "
      :total="total"
      style="justify-content: end; margin-top: 20px"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <article-edit
      ref="articleEditRef"
      @success="onPublishSuccess"
    ></article-edit>
    <!-- 抽屉 -->
    <!-- <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="ltr"
      :before-close="handleClose"
      size="50%"
    >
      <span>Hi, there!</span>
    </el-drawer> -->
  </page-container>
</template>

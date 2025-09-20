/**
 * 搜索增强脚本 - 支持简体中文搜索匹配繁体中文内容
 * 使用简繁转换映射表进行转换
 */

// 简繁转换映射表（常用词汇）
const simplifiedToTraditional = {
  // 学习相关核心词汇
  '学习': '學習',
  '记忆': '記憶', 
  '练习': '練習',
  '能力': '能力',
  '方法': '方法',
  '技巧': '技巧',
  '技能': '技能',
  '知识': '知識',
  '理解': '理解',
  '掌握': '掌握',
  '提升': '提升',
  '提高': '提高',
  '训练': '訓練',
  '实践': '實踐',
  '应用': '應用',
  '使用': '使用',
  '操作': '操作',
  '系统': '系統',
  '过程': '過程',
  '结果': '結果',
  '效果': '效果',
  '效率': '效率',
  '速度': '速度',
  '时间': '時間',
  '经验': '經驗',
  '问题': '問題',
  '解决': '解決',
  '分析': '分析',
  '思考': '思考',
  '思维': '思維',
  '大脑': '大腦',
  '认知': '認知',
  '科学': '科學',
  '研究': '研究',
  '实验': '實驗',
  '测试': '測試',
  '验证': '驗證',
  '证明': '證明',
  '理论': '理論',
  '概念': '概念',
  '原理': '原理',
  '机制': '機制',
  '功能': '功能',
  '特性': '特性',
  '特点': '特點',
  '优势': '優勢',
  '缺点': '缺點',
  '挑战': '挑戰',
  '困难': '困難',
  '障碍': '障礙',
  '限制': '限制',
  '条件': '條件',
  '环境': '環境',
  '情况': '情況',
  '状态': '狀態',
  '阶段': '階段',
  '步骤': '步驟',
  '流程': '流程',
  '程序': '程序',
  '计划': '計劃',
  '目标': '目標',
  '目的': '目的',
  '意义': '意義',
  '价值': '價值',
  '重要性': '重要性',
  '关键': '關鍵',
  '核心': '核心',
  '基础': '基礎',
  '根本': '根本',
  '本质': '本質',
  '实质': '實質',
  '内容': '內容',
  '信息': '信息',
  '数据': '數據',
  '资料': '資料',
  '材料': '材料',
  '资源': '資源',
  '工具': '工具',
  '技术': '技術',
  '科技': '科技',
  '创新': '創新',
  '发展': '發展',
  '进步': '進步',
  '改善': '改善',
  '优化': '優化',
  '改进': '改進',
  '完善': '完善',
  '实现': '實現',
  '完成': '完成',
  '达到': '達到',
  '获得': '獲得',
  '取得': '取得',
  '建立': '建立',
  '创建': '創建',
  '构建': '構建',
  '设计': '設計',
  '开发': '開發',
  '制作': '製作',
  '生产': '生產',
  '制造': '製造',
  '创造': '創造',
  '发明': '發明',
  '发现': '發現',
  '探索': '探索',
  '寻找': '尋找',
  '搜索': '搜索',
  '查找': '查找',
  '选择': '選擇',
  '决定': '決定',
  '判断': '判斷',
  '评估': '評估',
  '比较': '比較',
  '对比': '對比',
  '区别': '區別',
  '差异': '差異',
  '相同': '相同',
  '相似': '相似',
  '不同': '不同',
  '类似': '類似',
  '相关': '相關',
  '联系': '聯繫',
  '关系': '關係',
  '连接': '連接',
  '结合': '結合',
  '整合': '整合',
  '融合': '融合',
  '统一': '統一',
  '协调': '協調',
  '配合': '配合',
  '合作': '合作',
  '协作': '協作',
  '团队': '團隊',
  '组织': '組織',
  '机构': '機構',
  '部门': '部門',
  '单位': '單位',
  '公司': '公司',
  '企业': '企業',
  '行业': '行業',
  '领域': '領域',
  '专业': '專業',
  '学科': '學科',
  '课程': '課程',
  '教育': '教育',
  '教学': '教學',
  '培训': '培訓',
  '指导': '指導',
  '辅导': '輔導',
  '帮助': '幫助',
  '支持': '支持',
  '协助': '協助',
  '服务': '服務',
  '提供': '提供',
  '给予': '給予',
  '接受': '接受',
  '接收': '接收',
  '处理': '處理',
  '管理': '管理',
  '控制': '控制',
  '调节': '調節',
  '调整': '調整',
  '改变': '改變',
  '变化': '變化',
  '转换': '轉換',
  '转变': '轉變',
  '成长': '成長',
  '成功': '成功',
  '失败': '失敗',
  '错误': '錯誤',
  '正确': '正確',
  '准确': '準確',
  '精确': '精確',
  '详细': '詳細',
  '简单': '簡單',
  '复杂': '複雜',
  '容易': '容易',
  '快速': '快速',
  '缓慢': '緩慢',
  '高效': '高效',
  '低效': '低效',
  '有效': '有效',
  '无效': '無效',
  '有用': '有用',
  '无用': '無用',
  '重要': '重要',
  '次要': '次要',
  '主要': '主要',
  '基本': '基本',
  '高级': '高級',
  '初级': '初級',
  '中级': '中級',
  '业余': '業餘',
  '正式': '正式',
  '非正式': '非正式',
  '公开': '公開',
  '私人': '私人',
  '个人': '個人',
  '集体': '集體'
};

/**
 * 将简体中文转换为繁体中文
 * @param {string} text - 输入的简体中文文本
 * @returns {string} - 转换后的繁体中文文本
 */
function convertToTraditional(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let result = text;
  
  // 遍历转换映射表
  for (const [simplified, traditional] of Object.entries(simplifiedToTraditional)) {
    // 使用全局替换
    const regex = new RegExp(simplified, 'g');
    result = result.replace(regex, traditional);
  }
  
  return result;
}

/**
 * 增强搜索功能
 * 在原有搜索基础上添加简繁转换支持
 */
function enhanceSearch() {
  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceSearch);
    return;
  }
  
  // 查找搜索输入框
  const searchInput = document.querySelector('input[data-md-component="search-query"]');
  if (!searchInput) {
    console.log('搜索输入框未找到，延迟重试...');
    setTimeout(enhanceSearch, 1000);
    return;
  }
  
  console.log('搜索增强功能已启用');
  
  // 防抖定时器
  let searchTimeout = null;
  
  // 监听搜索输入
  searchInput.addEventListener('input', function(event) {
    const query = event.target.value;
    
    // 清除之前的定时器
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // 设置防抖，100ms后执行搜索（更快的响应）
    searchTimeout = setTimeout(() => {
      const trimmedQuery = query.trim();
      
      if (trimmedQuery.length === 0) {
        return;
      }
      
      // 检查是否包含简体中文
      const hasSimplifiedChinese = /[\u4e00-\u9fff]/.test(trimmedQuery);
      
      if (hasSimplifiedChinese) {
        // 转换为繁体中文
        const traditionalQuery = convertToTraditional(trimmedQuery);
        
        // 如果转换后的查询与原始查询不同，则使用转换后的查询进行搜索
        if (traditionalQuery !== trimmedQuery) {
          console.log(`搜索查询转换: "${trimmedQuery}" -> "${traditionalQuery}"`);
          
          // 直接更新搜索框的值，不触发额外事件
          event.target.value = traditionalQuery;
          
          // 延迟触发搜索，确保 Material for MkDocs 搜索系统已准备好
          setTimeout(() => {
            triggerSearch(event.target, traditionalQuery);
          }, 50);
        } else {
          // 即使没有转换，也触发搜索以确保搜索正常工作
          setTimeout(() => {
            triggerSearch(event.target, trimmedQuery);
          }, 50);
        }
      }
    }, 300);
  });
  
  // 手动触发搜索的函数
  function triggerSearch(inputElement, query) {
    console.log(`触发搜索: "${query}"`);
    
    // 主要方法: 触发 input 事件，让 Material for MkDocs 的搜索系统处理
    const inputEvent = new Event('input', { 
      bubbles: true, 
      cancelable: true 
    });
    inputElement.dispatchEvent(inputEvent);
    
    // 备用方法: 触发 keyup 事件
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
      code: 'Enter',
      keyCode: 13
    });
    inputElement.dispatchEvent(keyupEvent);
    
    // 备用方法: 触发 change 事件
    const changeEvent = new Event('change', { 
      bubbles: true, 
      cancelable: true 
    });
    inputElement.dispatchEvent(changeEvent);
  }
  
  // 监听搜索表单提交
  const searchForm = document.querySelector('form[data-md-component="search"]');
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
      const query = searchInput.value.trim();
      
      if (query.length > 0) {
        const traditionalQuery = convertToTraditional(query);
        
        if (traditionalQuery !== query) {
          console.log(`搜索表单提交转换: "${query}" -> "${traditionalQuery}"`);
          searchInput.value = traditionalQuery;
        }
      }
    });
  }
}

// 启动搜索增强功能
enhanceSearch();

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    convertToTraditional,
    enhanceSearch
  };
}
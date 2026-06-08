/**
 * 通用工具函数 — 催收台账小程序
 */

// ==================== Toast ====================
function showToast(msg, duration = 1800) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ==================== 格式化工具 ====================
function formatMoney(num) {
  if (num == null || num === '') return '-';
  return Number(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return dateStr;
}

// ==================== 状态标签 ====================

// 收款状态 — PRD: 待回款(灰), 已回款(绿), 坏账关闭(黑)
function getCollectStatusTag(status) {
  const map = {
    '待回款': '<span class="status-tag pending">待回款</span>',
    '已回款': '<span class="status-tag paid">已回款</span>',
    '坏账关闭': '<span class="status-tag bad">坏账关闭</span>',
  };
  return map[status] || status;
}

// 逾期状态 — PRD: 未逾期(绿), 已逾期(红)
function getOverdueStatusTag(status) {
  const map = {
    '未逾期': '<span class="status-tag normal">未逾期</span>',
    '已逾期': '<span class="status-tag overdue">已逾期</span>',
  };
  return map[status] || status;
}

// 审批状态 — PRD: 审批中(蓝), 已通过(绿), 已拒绝(红)
function getApprovalStatusTag(status) {
  const map = {
    '待审批': '<span class="status-tag approving">审批中</span>',
    '已通过': '<span class="status-tag approved">已通过</span>',
    '已拒绝': '<span class="status-tag rejected">已拒绝</span>',
  };
  return map[status] || status;
}

// 获取用户名
function getUserName(uid) {
  const user = MOCK.users.find(u => u.id === uid);
  return user ? user.name : '-';
}

// ==================== 通知类型标签 ====================
function getNotificationTypeTag(type) {
  const colors = {
    '催收提醒': '#ff4d4f',
    '审批通知': '#1677ff',
    '回款通知': '#52c41a',
    '系统通知': '#999',
  };
  return `<span style="color:${colors[type]||'#666'};font-size:11px">${type}</span>`;
}

// ==================== 数据过滤 ====================

// 获取当前用户信息
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// 获取当前用户角色过滤后的项目
function getFilteredProjects() {
  const user = getCurrentUser();
  if (!user) return [...MOCK.projects];
  if (user.role === 'salesman') {
    return MOCK.projects.filter(p => p.collector === user.id);
  }
  return [...MOCK.projects];
}

// 获取当前用户过滤后的延期审批
function getFilteredApprovals() {
  const user = getCurrentUser();
  if (!user) return [...MOCK.delayApprovals];
  if (user.role === 'salesman') {
    return MOCK.delayApprovals.filter(a => a.applicant === user.id);
  }
  return [...MOCK.delayApprovals];
}

// 获取当前用户过滤后的消息
function getFilteredNotifications() {
  const user = getCurrentUser();
  if (!user) return [...MOCK.notifications];
  if (user.role === 'admin') {
    // 管理员看到管理员消息 + 全部消息
    return [...MOCK.notifications].filter(n =>
      n.targetRole === 'admin' || n.targetRole === 'all' || !n.targetRole
    );
  }
  if (user.role === 'salesman') {
    return [...MOCK.notifications].filter(n =>
      n.targetUser === user.id || n.targetRole === 'all' || (n.targetRole === 'salesman' && !n.targetUser)
    );
  }
  if (user.role === 'finance') {
    return [...MOCK.notifications].filter(n =>
      n.targetRole === 'finance' || n.targetRole === 'all'
    );
  }
  return [...MOCK.notifications];
}

// ==================== 逾期计算 ====================

// 计算节点的逾期状态（基于"当前日期" 2026-06-08）
function calcOverdueStatus(node) {
  if (node.collectStatus === '已回款' || node.collectStatus === '坏账关闭') return '未逾期';
  const today = new Date('2026-06-08');
  const plan = new Date(node.planDate);
  return today > plan ? '已逾期' : '未逾期';
}

function getOverdueDays(planDate) {
  if (!planDate) return 0;
  const plan = new Date(planDate);
  const now = new Date('2026-06-08');
  return Math.floor((now - plan) / (1000 * 60 * 60 * 24));
}

// 获取项目的所有节点（展平）
function getAllNodes(projects) {
  const nodes = [];
  projects.forEach(p => {
    (p.nodes || []).forEach(n => {
      nodes.push({ ...n, projectId: p.id, projectName: p.projectName, projectNo: p.projectNo, region: p.region, collector: p.collector });
    });
  });
  return nodes;
}

// 获取带有逾期状态的节点
function getNodesWithOverdue(project) {
  return (project.nodes || []).map(n => ({
    ...n,
    overdueStatus: calcOverdueStatus(n),
    diffAmount: n.amount - (n.receivedAmount || 0)
  }));
}

// ==================== 项目金额汇总 ====================
function getProjectTotalAmount(project) {
  return (project.nodes || []).reduce((sum, n) => sum + n.amount, 0);
}

function getProjectReceivedAmount(project) {
  return (project.nodes || []).reduce((sum, n) => sum + (n.receivedAmount || 0), 0);
}

// ==================== 防抖 ====================
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ==================== 渲染工具 ====================
function renderEmpty(text = '暂无数据') {
  return `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <div class="empty-text">${text}</div>
    </div>
  `;
}

function renderLoading() {
  return `
    <div class="loading">
      <div class="spinner"></div>
    </div>
  `;
}

// ==================== 弹窗 ====================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.classList.remove('show');
  });
  document.body.style.overflow = '';
}

// 点击遮罩关闭弹窗
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// ==================== 表单校验 ====================
function validateForm(formEl) {
  let valid = true;
  const groups = formEl.querySelectorAll('.form-group');
  groups.forEach(g => {
    const input = g.querySelector('.form-input, .form-select, .form-textarea');
    if (input && input.hasAttribute('data-required') && !input.value.trim()) {
      g.classList.add('error');
      valid = false;
    } else {
      g.classList.remove('error');
    }
  });
  return valid;
}

// ==================== 项目类型标签 ====================
function getProjectTypeTag(type) {
  const colors = { '工程': '#1677ff', '集采': '#52c41a' };
  return `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500;background:${colors[type] || '#f0f0f0'};color:#fff">${type}</span>`;
}

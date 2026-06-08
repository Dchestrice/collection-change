/**
 * Mock 数据 — 催收台账小程序
 * 数据模型: 项目 → 收款节点 → 延期审批
 */
const MOCK = {
  // 用户列表
  users: [
    { id: 'u1', name: '张明', phone: '13800138000', role: 'admin' },
    { id: 'u2', name: '李强', phone: '13800138001', role: 'salesman' },
    { id: 'u3', name: '王芳', phone: '13800138002', role: 'salesman' },
    { id: 'u4', name: '陈伟', phone: '13800138004', role: 'salesman' },
    { id: 'u5', name: '刘洋', phone: '13800138005', role: 'salesman' },
    { id: 'u6', name: '孙静', phone: '13800138006', role: 'finance' },
  ],

  // ==================== 项目 ====================
  projects: [
    {
      id: 'P001', region: '华东', projectNo: 'PRJ-2026-001', projectName: '上海浦东新区智慧园区项目',
      projectType: '工程', contractFile: '上海智园-合同-v3.pdf', collector: 'u2',
      remark: '客户方资金审批流程较长，需持续跟进',
      nodes: [
        { id: 'N001', amount: 1500000, planDate: '2026-04-15', collectStatus: '已回款', receivedAmount: 1500000, receivedDate: '2026-04-20' },
        { id: 'N002', amount: 1000000, planDate: '2026-06-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N003', amount: 500000,  planDate: '2026-08-15', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P002', region: '华南', projectNo: 'PRJ-2026-002', projectName: '深圳龙华区数据中心项目',
      projectType: '集采', contractFile: '深圳数通-采购合同.pdf', collector: 'u3',
      remark: '',
      nodes: [
        { id: 'N004', amount: 1800000, planDate: '2026-06-10', collectStatus: '待回款', receivedAmount: 500000, receivedDate: '2026-05-20' },
        { id: 'N005', amount: 800000,  planDate: '2026-09-30', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P003', region: '华北', projectNo: 'PRJ-2026-003', projectName: '北京朝阳区智慧交通项目',
      projectType: '工程', contractFile: '北京智慧交通集团-合同.pdf', collector: 'u4',
      remark: '政府项目，分三期回款',
      nodes: [
        { id: 'N006', amount: 1200000, planDate: '2026-05-01', collectStatus: '已回款', receivedAmount: 1200000, receivedDate: '2026-05-10' },
        { id: 'N007', amount: 1000000, planDate: '2026-06-15', collectStatus: '待回款', receivedAmount: 300000, receivedDate: '' },
        { id: 'N008', amount: 1000000, planDate: '2026-09-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P004', region: '华东', projectNo: 'PRJ-2026-004', projectName: '杭州西湖区城市大脑项目',
      projectType: '工程', contractFile: '杭州城市大脑-服务合同.pdf', collector: 'u2',
      remark: '已全部回款',
      nodes: [
        { id: 'N009', amount: 950000, planDate: '2026-05-20', collectStatus: '已回款', receivedAmount: 950000, receivedDate: '2026-05-18' },
      ]
    },
    {
      id: 'P005', region: '西南', projectNo: 'PRJ-2026-005', projectName: '成都高新区政务云项目',
      projectType: '集采', contractFile: '成都政务云-集采合同.pdf', collector: 'u5',
      remark: '多次催收无果，需升级处理',
      nodes: [
        { id: 'N010', amount: 2200000, planDate: '2026-03-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N011', amount: 2000000, planDate: '2026-06-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P006', region: '华南', projectNo: 'PRJ-2026-006', projectName: '广州天河区智慧社区项目',
      projectType: '工程', contractFile: '广州智慧社区-合同.pdf', collector: 'u3',
      remark: '',
      nodes: [
        { id: 'N012', amount: 800000,  planDate: '2026-06-25', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N013', amount: 700000,  planDate: '2026-10-15', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P007', region: '华中', projectNo: 'PRJ-2026-007', projectName: '武汉光谷物联网平台项目',
      projectType: '工程', contractFile: '武汉物联网-合同.pdf', collector: 'u2',
      remark: '质保金部分有争议',
      nodes: [
        { id: 'N014', amount: 1600000, planDate: '2026-06-15', collectStatus: '待回款', receivedAmount: 800000, receivedDate: '' },
        { id: 'N015', amount: 1200000, planDate: '2026-11-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P008', region: '华北', projectNo: 'PRJ-2026-008', projectName: '天津滨海新区安防项目',
      projectType: '工程', contractFile: '天津滨海安防-合同.pdf', collector: 'u4',
      remark: '客户已破产清算，坏账处理',
      nodes: [
        { id: 'N016', amount: 680000, planDate: '2026-02-28', collectStatus: '坏账关闭', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P009', region: '华东', projectNo: 'PRJ-2026-009', projectName: '南京玄武区智慧教育项目',
      projectType: '集采', contractFile: '南京智慧教育-采购合同.pdf', collector: 'u2',
      remark: '',
      nodes: [
        { id: 'N017', amount: 600000, planDate: '2026-05-25', collectStatus: '已回款', receivedAmount: 600000, receivedDate: '2026-05-22' },
        { id: 'N018', amount: 500000, planDate: '2026-07-15', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P010', region: '山东', projectNo: 'PRJ-2026-010', projectName: '济南高新区智慧园区项目',
      projectType: '工程', contractFile: '济南高新-合同.pdf', collector: 'u3',
      remark: '新签项目，按节点推进',
      nodes: [
        { id: 'N019', amount: 1200000, planDate: '2026-07-15', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N020', amount: 800000,  planDate: '2026-10-01', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N021', amount: 500000,  planDate: '2026-12-15', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P011', region: '行拓1组', projectNo: 'PRJ-2026-011', projectName: '青岛港智慧物流平台',
      projectType: '工程', contractFile: '青岛港物流-合同.pdf', collector: 'u5',
      remark: '',
      nodes: [
        { id: 'N022', amount: 3500000, planDate: '2026-06-20', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
        { id: 'N023', amount: 2000000, planDate: '2026-09-20', collectStatus: '待回款', receivedAmount: 0, receivedDate: '' },
      ]
    },
    {
      id: 'P012', region: '智能化', projectNo: 'PRJ-2026-012', projectName: '合肥包河区智慧停车项目',
      projectType: '工程', contractFile: '合肥智慧停车-合同.pdf', collector: 'u2',
      remark: '',
      nodes: [
        { id: 'N024', amount: 320000, planDate: '2026-05-28', collectStatus: '已回款', receivedAmount: 320000, receivedDate: '2026-05-28' },
      ]
    },
  ],

  // ==================== 催收记录（操作日志） ====================
  collectRecords: [
    { id: 'R001', projectId: 'P001', nodeId: 'N001', type: '到账', content: '到账 ¥1,500,000.00', operator: 'u6', time: '2026-04-20 10:30' },
    { id: 'R002', projectId: 'P001', nodeId: 'N001', type: '状态变更', content: '收款状态由"待回款"变更为"已回款"', operator: 'u6', time: '2026-04-20 10:35' },
    { id: 'R003', projectId: 'P001', nodeId: 'N002', type: '催收', content: '电话催收：客户表示6月初可安排付款', operator: 'u2', time: '2026-05-10 14:30' },
    { id: 'R004', projectId: 'P003', nodeId: 'N007', type: '催收', content: '发送催收函，提醒按计划回款', operator: 'u4', time: '2026-05-20 09:15' },
    { id: 'R005', projectId: 'P003', nodeId: 'N007', type: '延期', content: '延期审批通过：原计划2026-06-15，延期至2026-07-01', operator: 'u1', time: '2026-06-01 15:00' },
    { id: 'R006', projectId: 'P004', nodeId: 'N009', type: '到账', content: '到账 ¥950,000.00', operator: 'u6', time: '2026-05-18 11:00' },
    { id: 'R007', projectId: 'P004', nodeId: 'N009', type: '状态变更', content: '收款状态由"待回款"变更为"已回款"', operator: 'u6', time: '2026-05-18 11:05' },
    { id: 'R008', projectId: 'P005', nodeId: 'N010', type: '催收', content: '上门拜访客户，了解回款困难原因', operator: 'u5', time: '2026-05-05 16:00' },
  ],

  // ==================== 延期审批 ====================
  delayApprovals: [
    {
      id: 'D001', projectId: 'P003', nodeId: 'N007', projectName: '北京朝阳区智慧交通项目',
      nodeInfo: '第2期（¥1,000,000）',
      applicant: 'u4', applicantName: '陈伟',
      originalDate: '2026-06-15', newDate: '2026-07-01',
      reason: '客户内部审批流程延迟，预计6月底可完成支付',
      status: '待审批', opinion: '', approver: '', approverName: '', approvalTime: ''
    },
    {
      id: 'D002', projectId: 'P006', nodeId: 'N012', projectName: '广州天河区智慧社区项目',
      nodeInfo: '第1期（¥800,000）',
      applicant: 'u3', applicantName: '王芳',
      originalDate: '2026-06-25', newDate: '2026-07-10',
      reason: '客户财务总监出差，签字审批需延后',
      status: '待审批', opinion: '', approver: '', approverName: '', approvalTime: ''
    },
    {
      id: 'D003', projectId: 'P006', nodeId: 'N012', projectName: '广州天河区智慧社区项目',
      nodeInfo: '第1期（¥800,000）',
      applicant: 'u3', applicantName: '王芳',
      originalDate: '2026-07-10', newDate: '2026-08-01',
      reason: '项目验收时间推迟，需再次延期',
      status: '已通过', opinion: '情况属实，同意延期',
      approver: 'u1', approverName: '张明', approvalTime: '2026-06-05 15:30'
    },
    {
      id: 'D004', projectId: 'P007', nodeId: 'N014', projectName: '武汉光谷物联网平台项目',
      nodeInfo: '第1期（¥1,600,000）',
      applicant: 'u2', applicantName: '李强',
      originalDate: '2026-06-15', newDate: '2026-07-15',
      reason: '保证金争议需要时间协商解决',
      status: '已拒绝', opinion: '请按原计划收款，保证金争议可单独处理',
      approver: 'u1', approverName: '张明', approvalTime: '2026-05-20 10:00'
    },
    {
      id: 'D005', projectId: 'P001', nodeId: 'N002', projectName: '上海浦东新区智慧园区项目',
      nodeInfo: '第2期（¥1,000,000）',
      applicant: 'u2', applicantName: '李强',
      originalDate: '2026-06-01', newDate: '2026-06-20',
      reason: '客户端午假期影响付款排期',
      status: '已通过', opinion: '同意延期至6月20日',
      approver: 'u1', approverName: '张明', approvalTime: '2026-05-28 14:00'
    },
    {
      id: 'D006', projectId: 'P011', nodeId: 'N022', projectName: '青岛港智慧物流平台',
      nodeInfo: '第1期（¥3,500,000）',
      applicant: 'u5', applicantName: '刘洋',
      originalDate: '2026-06-20', newDate: '2026-07-15',
      reason: '项目验收延期，回款时间顺延',
      status: '待审批', opinion: '', approver: '', approverName: '', approvalTime: ''
    },
  ],

  // ==================== 提醒规则 ====================
  reminderRules: [
    { id: 'RM001', name: '即将到期提醒-3天', enabled: true, conditions: '距离计划收款日期 3 天', frequency: '每日', projectIds: [], content: '项目【{项目名称}】的应收款将于3天后到期，应收金额【{应收金额}】元，请及时跟进催收。' },
    { id: 'RM002', name: '即将到期提醒-1天', enabled: true, conditions: '距离计划收款日期 1 天', frequency: '每日', projectIds: [], content: '项目【{项目名称}】的应收款将于明天到期！金额【{应收金额}】元，请立即联系客户确认回款。' },
    { id: 'RM003', name: '逾期1天提醒', enabled: true, conditions: '逾期 1 天', frequency: '每日', projectIds: [], content: '项目【{项目名称}】已逾期1天，逾期金额【{差额}】元，请尽快催收。' },
    { id: 'RM004', name: '逾期7天升级提醒', enabled: true, conditions: '逾期 7 天', frequency: '每周', projectIds: [], content: '⚠️ 项目【{项目名称}】已逾期7天，逾期金额【{差额}】元，请升级处理。' },
    { id: 'RM005', name: '逾期30天严重警告', enabled: false, conditions: '逾期 30 天', frequency: '每月', projectIds: [], content: '🚨 严重警告：项目【{项目名称}】已逾期30天，金额【{差额}】元，可能面临坏账风险！' },
  ],

  // ==================== 消息通知 ====================
  notifications: [
    { id: 'N001', type: '催收提醒', title: '逾期提醒：上海浦东新区智慧园区项目', content: '项目【上海浦东新区智慧园区项目】第2期（¥1,000,000）已逾期，请尽快催收。', time: '2026-06-08 09:00', read: false, targetRole: 'salesman', targetUser: 'u2' },
    { id: 'N002', type: '催收提醒', title: '即将到期提醒：深圳龙华区数据中心项目', content: '项目【深圳龙华区数据中心项目】第1期（¥1,300,000）将于2天后到期，请及时跟进。', time: '2026-06-08 09:00', read: false, targetRole: 'salesman', targetUser: 'u3' },
    { id: 'N003', type: '审批通知', title: '延期审批待处理', content: '陈伟提交了项目【北京朝阳区智慧交通项目】的延期申请，请尽快审批。', time: '2026-06-07 14:00', read: false, targetRole: 'admin', targetUser: '' },
    { id: 'N004', type: '回款通知', title: '回款到账通知', content: '项目【杭州西湖区城市大脑项目】已到账 ¥950,000.00，请知悉。', time: '2026-05-18 11:00', read: true, targetRole: 'all', targetUser: '' },
    { id: 'N005', type: '审批通知', title: '延期审批结果', content: '您的延期申请（武汉光谷物联网平台项目）已被拒绝，理由：请按原计划收款，保证金争议可单独处理。', time: '2026-05-20 10:00', read: true, targetRole: 'salesman', targetUser: 'u2' },
    { id: 'N006', type: '催收提醒', title: '严重逾期提醒：成都高新区政务云项目', content: '项目【成都高新区政务云项目】第1期（¥2,200,000）已逾期99天，属于风险项目，请立即处理。', time: '2026-06-08 08:00', read: false, targetRole: 'salesman', targetUser: 'u5' },
    { id: 'N007', type: '系统通知', title: '新项目分配通知', content: '您被分配为项目【合肥包河区智慧停车项目】的催收负责人，请关注。', time: '2026-05-15 09:00', read: true, targetRole: 'salesman', targetUser: 'u2' },
    { id: 'N008', type: '审批通知', title: '延期审批待处理', content: '王芳提交了项目【广州天河区智慧社区项目】的延期申请，请尽快审批。', time: '2026-06-06 16:30', read: false, targetRole: 'admin', targetUser: '' },
    { id: 'N009', type: '审批通知', title: '延期审批待处理', content: '刘洋提交了项目【青岛港智慧物流平台】的延期申请，请尽快审批。', time: '2026-06-05 10:00', read: false, targetRole: 'admin', targetUser: '' },
    { id: 'N010', type: '回款通知', title: '回款到账通知', content: '项目【北京朝阳区智慧交通项目】第一期到账 ¥1,200,000.00。', time: '2026-05-10 14:00', read: true, targetRole: 'all', targetUser: '' },
  ],

  // ==================== Dashboard 统计（动态计算） ====================
  // 注意：dashboard 对象保留用于静态引用，实际渲染时动态计算
  dashboard: {
    trendData: [
      { month: '2026-01', amount: 1200000 },
      { month: '2026-02', amount: 1800000 },
      { month: '2026-03', amount: 2100000 },
      { month: '2026-04', amount: 2500000 },
      { month: '2026-05', amount: 3580000 },
    ],
  }
};

// 模拟网络延迟
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 300));
}

// 模拟API调用
async function mockFetch(data, ms) {
  await delay(ms);
  return JSON.parse(JSON.stringify(data));
}

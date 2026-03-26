/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Plus, 
  Download, 
  Upload, 
  Printer, 
  ChevronDown, 
  Calendar,
  MoreHorizontal,
  LayoutGrid,
  Filter,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const mockData = [
  { id: 'Y0100000017', code: 'COJOTONOX1Q6', warehouse: 'USWC Warehouse', volume: '0.002662', pkgQty: 0, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-27 20:35:13' },
  { id: 'Y0100000011', code: 'IOROKONOH1V0', warehouse: 'USWC Warehouse', volume: '0.045254', pkgQty: 0, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-24 16:21:05' },
  { id: 'Y0100000006', code: 'I0I0P0I0K0S5', warehouse: 'USWC Warehouse', volume: '0.05718', pkgQty: 2, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-24 11:50:20' },
  { id: 'Y0100000004', code: 'X0V0G0R0Y0D3', warehouse: 'USWC Warehouse', volume: '0.0567', pkgQty: 0, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-23 19:51:13' },
  { id: 'Y0100000003', code: 'Q0E0T0A0T0X2', warehouse: 'USWC Warehouse', volume: '0.0189', pkgQty: 1, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-23 14:47:31' },
  { id: 'Y0100000002', code: 'A0R0Y0N0S0K1', warehouse: 'USWC Warehouse', volume: '0.0189', pkgQty: 0, status: '待预约', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '', actualDelivery: '', actualUnload: '', createdAt: '2024-04-23 14:44:47' },
  { id: 'Y0100000001', code: 'B0Z0X0Y0W0V9', warehouse: 'USWC Warehouse', volume: '0.0234', pkgQty: 5, status: '预约成功', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '2024-04-25 10:00:00', actualDelivery: '', actualUnload: '', createdAt: '2024-04-22 09:30:15' },
  { id: 'Y0100000000', code: 'C0A0B0C0D0E1', warehouse: 'USWC Warehouse', volume: '0.0112', pkgQty: 1, status: '已到仓', type: '普通预约', delivery: '散货', container: '', unload: '', deliveryTime: '2024-04-21 14:00:00', actualDelivery: '2024-04-21 13:45:00', actualUnload: '2024-04-21 15:30:00', createdAt: '2024-04-20 11:20:44' },
];

const tabs = [
  { name: '全部订单', count: null },
  { name: '待预约', count: 6 },
  { name: '待送仓', count: 0 },
  { name: '预约成功', count: 1 },
  { name: '已到仓', count: 1 },
  { name: '待审批', count: 0 },
  { name: '已取消', count: 0 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('待预约');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map(row => row.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待预约':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case '预约成功':
        return 'bg-green-50 text-green-600 border-green-100';
      case '已到仓':
        return 'bg-slate-50 text-slate-600 border-slate-100';
      case '待审批':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case '已取消':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="h-14 bg-white border-bottom border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutGrid className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">BEP 预约系统</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 h-14 flex items-center">首页</a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">预约管理</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="菜单搜索, 快捷键 /" 
              className="bg-slate-100 border-none rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
              B
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Title & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">预约订单列表</h1>
            <p className="text-slate-500 text-sm mt-1">高效查询、状态Tab切换、批量审核和取消一在列表页完成。</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200">
              <Plus className="w-4 h-4" />
              新增预约订单
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Upload className="w-4 h-4" />
              导入
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Download className="w-4 h-4" />
              导出
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Printer className="w-4 h-4" />
              打印
            </button>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">关键字</label>
              <div className="flex gap-2">
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <option>入库单号</option>
                  <option>预约码</option>
                </select>
                <input 
                  type="text" 
                  placeholder="请输入" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">预约仓库</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                <option>请选择</option>
                <option>USWC Warehouse</option>
                <option>USEC Warehouse</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">预约码</label>
              <input 
                type="text" 
                placeholder="请输入" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">预约类型</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                <option>请选择</option>
                <option>普通预约</option>
                <option>紧急预约</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">创建日期</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    defaultValue="2024-01-30" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <span className="text-slate-400">至</span>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    defaultValue="2024-04-30" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">是否紧急</label>
              <div className="flex items-center gap-3 h-10">
                <button className="w-10 h-5 bg-slate-200 rounded-full relative transition-colors hover:bg-slate-300">
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
                <span className="text-sm text-slate-600">普通优先级</span>
              </div>
            </div>
            <div className="lg:col-span-2 flex items-end justify-end gap-3">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors">
                重置
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-blue-200">
                查询
              </button>
            </div>
          </div>
        </div>

        {/* Tabs & Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-slate-200 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.name 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.name}
                {tab.count !== null && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.name ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.name && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Table Actions */}
          <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === mockData.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600">全选</span>
              </div>
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 mr-2">已选中 {selectedRows.length} 条</span>
                  <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">批量审核</button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-red-600">批量取消</button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">批量导出</button>
                </div>
              )}
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-3 w-10">选择</th>
                  <th className="px-6 py-3">预约单号</th>
                  <th className="px-6 py-3">预约码</th>
                  <th className="px-6 py-3">预约仓库</th>
                  <th className="px-6 py-3">体积(CBM)</th>
                  <th className="px-6 py-3">包裹数量</th>
                  <th className="px-6 py-3">状态</th>
                  <th className="px-6 py-3">预约类型</th>
                  <th className="px-6 py-3">送仓方式</th>
                  <th className="px-6 py-3">创建时间</th>
                  <th className="px-6 py-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {mockData.map((row) => (
                    <motion.tr 
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`group hover:bg-blue-50/30 transition-colors ${selectedRows.includes(row.id) ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-blue-600 font-medium cursor-pointer hover:underline">{row.id}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{row.code}</td>
                      <td className="px-6 py-4 text-sm">{row.warehouse}</td>
                      <td className="px-6 py-4 text-sm font-mono">{row.volume}</td>
                      <td className="px-6 py-4 text-sm">{row.pkgQty}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${getStatusStyle(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{row.type}</td>
                      <td className="px-6 py-4 text-sm">{row.delivery}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 leading-relaxed">
                        {row.createdAt.split(' ')[0]}<br/>
                        {row.createdAt.split(' ')[1]}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">详情</button>
                          <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">编辑</button>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/30">
            <span className="text-xs text-slate-500">共 {mockData.length} 条</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">每页</span>
                <select className="bg-white border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-500">
                  <option>20条</option>
                  <option>50条</option>
                  <option>100条</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-600 bg-blue-600 text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-xs hover:bg-slate-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">跳转</span>
                <input type="text" className="w-10 border border-slate-200 rounded px-2 py-1 text-xs text-center outline-none focus:border-blue-500" defaultValue="1" />
                <button className="px-3 py-1 text-xs font-medium bg-white border border-slate-200 rounded hover:bg-slate-50">确定</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Optional, for mobile-like feel) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-300 flex items-center justify-center z-50"
      >
        <RefreshCw className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

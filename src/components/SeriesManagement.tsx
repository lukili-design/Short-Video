/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  Save,
  Upload,
  Download,
  Calendar,
  Tag as TagIcon,
  Globe,
  Users,
  Film,
  MoreHorizontal,
  History,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Series, SeriesVideo, SeriesType } from '../types';
import { toast } from 'sonner';

const MOCK_SERIES: Series[] = [
  {
    id: 1,
    name: "龍王歸來：戰神贅婿",
    type: 'ShortDrama',
    category_ids: [1],
    cover_image: "https://picsum.photos/seed/drama1/800/450",
    short_desc: "一代戰神隱退都市，竟成豪門贅婿？",
    tags: ["戰神", "贅婿"],
    status: 'Active',
    visible_to_client: true,
    show_time_start: "2024-01-01 00:00:00",
    show_time_end: "2025-12-31 23:59:59",
    show_episode_count: true,
    regions: ["HK"],
    artist_ids: [1, 2],
    seo_title: "龍王歸來：戰神贅婿",
    seo_description: "一代戰神隱退都市，竟成豪門贅婿？",
    creator: "Admin",
    author: "張三",
    created_at: "2024-01-01 10:00:00",
    updated_at: "2024-01-05 15:30:00",
    series_updated_at: "2024-01-05 15:30:00",
    videos: []
  }
];

export default function SeriesManagement() {
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [seriesList, setSeriesList] = useState<Series[]>(MOCK_SERIES);
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Filters
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterVisible, setFilterVisible] = useState<string>('all');

  const filteredSeries = seriesList.filter(s => {
    const matchesName = s.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesType = filterType === 'all' || s.type === filterType;
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesVisible = filterVisible === 'all' || (filterVisible === 'true' ? s.visible_to_client : !s.visible_to_client);
    return matchesName && matchesType && matchesStatus && matchesVisible;
  });

  const handleAdd = () => {
    setEditingSeries(null);
    setActiveTab('basic');
    setView('FORM');
  };

  const handleEdit = (series: Series, tab: string = 'basic') => {
    setEditingSeries(series);
    setActiveTab(tab);
    setView('FORM');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingSeries ? '清單修改成功' : '清單新增成功');
    setView('LIST');
  };

  if (view === 'FORM') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setView('LIST')}>
              <ChevronLeft size={20} />
            </Button>
            <h2 className="text-2xl font-bold">{editingSeries ? '修改清單' : '新增清單'}</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setView('LIST')}>取消</Button>
            <Button onClick={handleSave} className="bg-black text-white hover:bg-black/90">
              <Save size={18} className="mr-2" /> 保存清單
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-100 p-1 mb-4">
            <TabsTrigger value="basic">基礎信息</TabsTrigger>
            <TabsTrigger value="videos" disabled={!editingSeries}>視頻管理</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader><CardTitle>核心信息</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="s_name">清單名稱 <span className="text-red-500">*</span></Label>
                  <Input id="s_name" defaultValue={editingSeries?.name} maxLength={30} placeholder="0-30字" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s_type">清單類型 <span className="text-red-500">*</span></Label>
                  <Select defaultValue={editingSeries?.type || 'ShortDrama'}>
                    <SelectTrigger><SelectValue placeholder="選擇類型" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="News">普通新聞</SelectItem>
                      <SelectItem value="ShortVideo">短視頻</SelectItem>
                      <SelectItem value="ShortDrama">短劇</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>清單分類 <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50 min-h-[40px]">
                    <Badge variant="secondary">都市熱血</Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]">+ 選擇 (1-5個)</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>顯示集數</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch defaultChecked={editingSeries?.show_episode_count ?? true} />
                    <span className="text-sm text-gray-500">開啟 / 關閉</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>封面圖 (16:9) <span className="text-red-500">*</span></Label>
                  <div className="flex gap-4 items-start">
                    <div className="w-48 h-27 bg-gray-100 rounded border-2 border-dashed flex items-center justify-center overflow-hidden">
                      {editingSeries?.cover_image ? (
                        <img src={editingSeries.cover_image} className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="text-gray-400" size={24} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Button variant="outline" size="sm" type="button">上傳圖片</Button>
                      <p className="text-[10px] text-gray-500">建議比例 16:9</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s_short">Short Desc <span className="text-red-500">*</span></Label>
                  <Input id="s_short" defaultValue={editingSeries?.short_desc} maxLength={255} placeholder="0-255字" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s_long">Long Desc</Label>
                  <Textarea id="s_long" defaultValue={editingSeries?.long_desc} placeholder="詳細描述..." />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader><CardTitle>授權與狀態</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>授權播放區域 <span className="text-red-500">*</span></Label>
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="reg_hk" defaultChecked={editingSeries?.regions.includes('HK')} />
                      <Label htmlFor="reg_hk" className="font-normal">香港</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="reg_mo" defaultChecked={editingSeries?.regions.includes('Macau')} />
                      <Label htmlFor="reg_mo" className="font-normal">澳門</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>用戶端是否可見</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch defaultChecked={editingSeries?.visible_to_client ?? true} />
                    <span className="text-sm text-gray-500">可見 / 隱藏</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>顯示時間 <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input className="pl-9" type="datetime-local" defaultValue={editingSeries?.show_time_start.replace(' ', 'T')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>隱藏時間 <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input className="pl-9" type="datetime-local" defaultValue={editingSeries?.show_time_end.replace(' ', 'T')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Artists (最多50個)</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50 min-h-[40px]">
                    <Badge variant="secondary">張三</Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]">+ 添加/選擇</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>標籤 (最多5個)</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50 min-h-[40px]">
                    <Badge variant="outline">熱血</Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]">+ 選擇標籤</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader><CardTitle>SEO 設置</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_t">SEO 標題 <span className="text-red-500">*</span></Label>
                  <Input id="seo_t" defaultValue={editingSeries?.seo_title || editingSeries?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_d">SEO 描述 <span className="text-red-500">*</span></Label>
                  <Textarea id="seo_d" defaultValue={editingSeries?.seo_description || editingSeries?.short_desc} required />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <VideoBatchManagement seriesId={editingSeries?.id || 0} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">清單管理</h2>
        <Button onClick={handleAdd} className="bg-black text-white hover:bg-black/90">
          <Plus size={18} className="mr-2" /> 新增清單
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>清單名稱</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="搜索清單名稱..." 
                  className="pl-9" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>清單類型</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger><SelectValue placeholder="全部類型" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部類型</SelectItem>
                  <SelectItem value="News">普通新聞</SelectItem>
                  <SelectItem value="ShortVideo">短視頻</SelectItem>
                  <SelectItem value="ShortDrama">短劇</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>狀態</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger><SelectValue placeholder="全部狀態" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  <SelectItem value="Active">開啟</SelectItem>
                  <SelectItem value="Inactive">關閉</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>用戶端是否可見</Label>
              <Select value={filterVisible} onValueChange={setFilterVisible}>
                <SelectTrigger><SelectValue placeholder="全部" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="true">可見</SelectItem>
                  <SelectItem value="false">隱藏</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button className="bg-black text-white hover:bg-black/90">
                <Search size={16} className="mr-2" /> 搜索
              </Button>
              <Button variant="outline" onClick={() => {
                setFilterName('');
                setFilterType('all');
                setFilterStatus('all');
                setFilterVisible('all');
              }}>重置篩選</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[80px]">清單ID</TableHead>
              <TableHead>清單名稱</TableHead>
              <TableHead>清單類型</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>用戶端可見</TableHead>
              <TableHead>創建人</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>創建時間</TableHead>
              <TableHead>更新時間</TableHead>
              <TableHead>清單更新時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSeries.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs text-gray-500">{s.id}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{s.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={s.status === 'Active' ? 'default' : 'secondary'}>
                    {s.status === 'Active' ? '開啟' : '關閉'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={s.visible_to_client ? 'outline' : 'secondary'} className={s.visible_to_client ? 'border-green-200 text-green-700' : ''}>
                    {s.visible_to_client ? '可見' : '隱藏'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{s.creator}</TableCell>
                <TableCell className="text-sm">{s.author || '-'}</TableCell>
                <TableCell className="text-xs text-gray-500">{s.created_at}</TableCell>
                <TableCell className="text-xs text-gray-500">{s.updated_at}</TableCell>
                <TableCell className="text-xs text-gray-500">{s.series_updated_at}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={() => handleEdit(s)}>
                      編輯
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={() => handleEdit(s, 'videos')}>
                      視頻管理
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-red-500 hover:text-red-600">
                      刪除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function VideoBatchManagement({ seriesId }: { seriesId: number }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [videoType, setVideoType] = useState<'File' | 'Library'>('File');
  
  const [importLogs] = useState([
    {
      id: 1001,
      creator: "Admin",
      time: "2024-01-05 14:20:00",
      operation: "批量導入",
      status: "成功",
      records: [
        { order: 1, filename: "v1.mp4", title: "第一集", desc: "描述1", v_status: "開啟", time: "2024-01-01 至 2025-01-01", pricing: "免費", validity: "-", status: "成功", reason: "-" }
      ]
    },
    {
      id: 1002,
      creator: "Admin",
      time: "2024-01-06 09:15:00",
      operation: "批量導入",
      status: "部分成功",
      records: [
        { order: 2, filename: "v2.mp4", title: "第二集", desc: "描述2", v_status: "開啟", time: "2024-01-01 至 2025-01-01", pricing: "付費", validity: "30天", status: "成功", reason: "-" },
        { order: 3, filename: "v3.mp4", title: "第三集", desc: "描述3", v_status: "關閉", time: "2024-01-01 至 2025-01-01", pricing: "免費", validity: "-", status: "失敗", reason: "文件格式錯誤" }
      ]
    }
  ]);

  const selectedLog = importLogs.find(l => l.id === selectedLogId);

  const [videos, setVideos] = useState<SeriesVideo[]>([
    {
      video_id: 101,
      type: 'File',
      title: "第1集：戰神回歸",
      description: "龍王戰神低調回歸",
      is_free: true,
      status: 'Active',
      show_time_start: "2024-01-01 00:00:00",
      show_time_end: "2025-12-31 23:59:59",
      order: 1
    }
  ]);

  const handleImport = () => {
    toast.success("批量導入成功 (模擬)");
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("視頻新增成功 (模擬)");
    setIsAddModalOpen(false);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>單個視頻批量管理</CardTitle>
          <CardDescription>管理清單下的視頻實體，支持批量上傳與連載更新</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download size={14} className="mr-2" /> 模板下載</Button>
          <Button className="bg-black text-white hover:bg-black/90" size="sm" onClick={handleImport}>
            <Upload size={14} className="mr-2" /> 批量上傳
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsLogModalOpen(true)}>
            <History size={14} className="mr-2" /> 導入日誌
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">順序</TableHead>
              <TableHead>視頻標題</TableHead>
              <TableHead>類型</TableHead>
              <TableHead>免費/付費</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>顯示/隱藏時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((v) => (
              <TableRow key={v.video_id}>
                <TableCell className="font-bold">{v.order}</TableCell>
                <TableCell>
                  <div className="font-medium">{v.title}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">{v.description}</div>
                </TableCell>
                <TableCell><Badge variant="outline">{v.type === 'File' ? '視頻文件' : '視頻庫'}</Badge></TableCell>
                <TableCell>
                  <Badge variant={v.is_free ? 'secondary' : 'default'}>
                    {v.is_free ? '免費' : '付費'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={v.status === 'Active' ? 'default' : 'secondary'}>
                    {v.status === 'Active' ? '開啟' : '關閉'}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {v.show_time_start} 至 {v.show_time_end}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><Edit2 size={14} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500"><Trash2 size={14} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-gray-50/50 border-t p-4 flex justify-between items-center">
        <p className="text-xs text-gray-500">共 {videos.length} 個視頻實體</p>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">+ 手動新增視頻</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>手動新增視頻</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddVideo} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="v_order">播放順序 <span className="text-red-500">*</span></Label>
                <Input id="v_order" type="number" placeholder="例如: 1" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="v_title">視頻標題 <span className="text-red-500">*</span></Label>
                <Input id="v_title" placeholder="輸入視頻標題" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="v_type">視頻類型 <span className="text-red-500">*</span></Label>
                <Select value={videoType} onValueChange={(val: 'File' | 'Library') => setVideoType(val)}>
                  <SelectTrigger><SelectValue placeholder="選擇類型" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="File">視頻文件</SelectItem>
                    <SelectItem value="Library">視頻庫</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {videoType === 'File' ? (
                <div className="space-y-2">
                  <Label>上傳視頻 <span className="text-red-500">*</span></Label>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" type="button" className="w-full">
                      <Upload size={16} className="mr-2" /> 上傳視頻
                    </Button>
                    <p className="text-xs text-gray-500">
                      請上傳5000M以內的(mp4)文件, 本地文件上傳後將轉碼成Volo視頻
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>選擇視頻 <span className="text-red-500">*</span></Label>
                  <Button variant="outline" type="button" className="w-full">
                    從視頻庫中選擇視頻
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="v_desc">視頻描述</Label>
                <Textarea id="v_desc" placeholder="輸入視頻簡介..." />
              </div>

              <div className="space-y-2">
                <Label>是否免費</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch defaultChecked={true} />
                  <span className="text-sm text-gray-500">免費 / 付費</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>狀態</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch defaultChecked={true} />
                  <span className="text-sm text-gray-500">開啟 / 關閉</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>顯示時間 <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input className="pl-9" type="datetime-local" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>隱藏時間 <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input className="pl-9" type="datetime-local" required />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>取消</Button>
                <Button type="submit" className="bg-black text-white hover:bg-black/90">保存視頻</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 導入日誌彈窗 */}
        <Dialog open={isLogModalOpen} onOpenChange={setIsLogModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>導入日誌</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>創建人</TableHead>
                  <TableHead>操作時間</TableHead>
                  <TableHead>操作</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">詳情</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.creator}</TableCell>
                    <TableCell className="text-xs">{log.time}</TableCell>
                    <TableCell>{log.operation}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === '成功' ? 'default' : log.status === '部分成功' ? 'secondary' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" size="sm" onClick={() => setSelectedLogId(log.id)}>查看詳情</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>

        {/* 導入詳情彈窗 */}
        <Dialog open={!!selectedLogId} onOpenChange={(open) => !open && setSelectedLogId(null)}>
          <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>導入詳情 - 日誌 ID: {selectedLogId}</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">順序</TableHead>
                    <TableHead className="whitespace-nowrap">視頻檔案名稱</TableHead>
                    <TableHead className="whitespace-nowrap">視頻標題</TableHead>
                    <TableHead className="whitespace-nowrap">視頻描述</TableHead>
                    <TableHead className="whitespace-nowrap">視頻狀態</TableHead>
                    <TableHead className="whitespace-nowrap">顯示/隱藏時間</TableHead>
                    <TableHead className="whitespace-nowrap">免費/付費</TableHead>
                    <TableHead className="whitespace-nowrap">付費有效期</TableHead>
                    <TableHead className="whitespace-nowrap">狀態</TableHead>
                    <TableHead className="whitespace-nowrap">失敗原因</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedLog?.records.map((rec, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{rec.order}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={rec.filename}>{rec.filename}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={rec.title}>{rec.title}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={rec.desc}>{rec.desc}</TableCell>
                      <TableCell>{rec.v_status}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">{rec.time}</TableCell>
                      <TableCell>{rec.pricing}</TableCell>
                      <TableCell>{rec.validity}</TableCell>
                      <TableCell>
                        <Badge variant={rec.status === '成功' ? 'default' : 'destructive'}>
                          {rec.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-red-500 text-xs">{rec.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedLogId(null)}>關閉</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

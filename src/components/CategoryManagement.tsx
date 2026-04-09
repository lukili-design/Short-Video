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
  Image as ImageIcon
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
  CardDescription
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
import { Category } from '../types';
import { toast } from 'sonner';

const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "都市熱血",
    status: 'Active',
    visible_to_client: true,
    seo_title: "都市熱血",
    created_at: "2024-01-01 10:00:00",
    updated_at: "2024-01-05 15:30:00"
  },
  {
    id: 2,
    name: "豪門恩怨",
    status: 'Active',
    visible_to_client: true,
    seo_title: "豪門恩怨",
    created_at: "2024-01-02 11:00:00",
    updated_at: "2024-01-02 11:00:00"
  }
];

export default function CategoryManagement() {
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Filters
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterVisible, setFilterVisible] = useState<string>('all');

  const filteredCategories = categories.filter(c => {
    const matchesName = c.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesVisible = filterVisible === 'all' || (filterVisible === 'true' ? c.visible_to_client : !c.visible_to_client);
    return matchesName && matchesStatus && matchesVisible;
  });

  const handleAdd = () => {
    setEditingCategory(null);
    setView('FORM');
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setView('FORM');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingCategory ? '分類修改成功' : '分類新增成功');
    setView('LIST');
  };

  if (view === 'FORM') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setView('LIST')}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-2xl font-bold">{editingCategory ? '修改分類' : '新增分類'}</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">分類名稱 <span className="text-red-500">*</span></Label>
                <Input id="name" defaultValue={editingCategory?.name} required />
              </div>
              <div className="space-y-2">
                <Label>顯示狀態</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch defaultChecked={editingCategory?.status === 'Active'} />
                  <span className="text-sm text-gray-500">開啟 / 關閉</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>用戶端是否可見</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch defaultChecked={editingCategory?.visible_to_client ?? true} />
                  <span className="text-sm text-gray-500">可見 / 隱藏</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>SEO 設置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo_title">Title (SEO使用) <span className="text-red-500">*</span></Label>
                <Input id="seo_title" defaultValue={editingCategory?.seo_title} maxLength={5} placeholder="0-5字" required />
                <p className="text-[10px] text-gray-500">默認使用分類名稱</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo_desc">描述 (SEO使用)</Label>
                <Textarea id="seo_desc" defaultValue={editingCategory?.seo_description} maxLength={255} placeholder="0-255字" />
              </div>
              <div className="space-y-2">
                <Label>OG Image (SEO使用)</Label>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-20 bg-gray-100 rounded border-2 border-dashed flex items-center justify-center overflow-hidden">
                    {editingCategory?.og_image ? (
                      <img src={editingCategory.og_image} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <Button variant="outline" size="sm" type="button">
                      <Upload size={14} className="mr-2" /> 上傳圖片
                    </Button>
                    <p className="text-[10px] text-gray-500">建議尺寸: 960 x 540, 3M以內</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="og_alt">Og Image Alt Txt</Label>
                <Input id="og_alt" defaultValue={editingCategory?.og_image_alt} maxLength={30} placeholder="0-30字" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setView('LIST')}>取消</Button>
            <Button type="submit" className="bg-black text-white hover:bg-black/90">
              <Save size={18} className="mr-2" /> 保存
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">短劇分類管理</h2>
        <Button onClick={handleAdd} className="bg-black text-white hover:bg-black/90">
          <Plus size={18} className="mr-2" /> 新增分類
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>分類名稱</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="搜索分類名稱..." 
                  className="pl-9" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>狀態</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="全部狀態" />
                </SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="全部" />
                </SelectTrigger>
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
              <TableHead className="w-[100px]">分類ID</TableHead>
              <TableHead>分類名稱</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>用戶端可見</TableHead>
              <TableHead>創建時間</TableHead>
              <TableHead>更新時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs text-gray-500">{c.id}</TableCell>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>
                  <Badge variant={c.status === 'Active' ? 'default' : 'secondary'}>
                    {c.status === 'Active' ? '開啟' : '關閉'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={c.visible_to_client ? 'outline' : 'secondary'} className={c.visible_to_client ? 'border-green-200 text-green-700' : ''}>
                    {c.visible_to_client ? '可見' : '隱藏'}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-gray-500">{c.created_at}</TableCell>
                <TableCell className="text-xs text-gray-500">{c.updated_at}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}>
                    <Edit2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

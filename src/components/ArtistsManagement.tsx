/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  ChevronLeft, 
  Save
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
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Artist } from '../types';
import { toast } from 'sonner';

const MOCK_ARTISTS: Artist[] = [
  { id: 1, name: "張三", created_at: "2024-01-01 10:00:00", updated_at: "2024-01-01 10:00:00" },
  { id: 2, name: "李四", created_at: "2024-01-02 11:00:00", updated_at: "2024-01-02 11:00:00" },
  { id: 3, name: "王五", created_at: "2024-01-03 12:00:00", updated_at: "2024-01-03 12:00:00" },
];

export default function ArtistsManagement() {
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [filterName, setFilterName] = useState('');

  const filteredArtists = artists.filter(a => 
    a.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleAdd = () => {
    setEditingArtist(null);
    setView('FORM');
  };

  const handleEdit = (artist: Artist) => {
    setEditingArtist(artist);
    setView('FORM');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingArtist ? '藝人修改成功' : '藝人新增成功');
    setView('LIST');
  };

  if (view === 'FORM') {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setView('LIST')}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-2xl font-bold">{editingArtist ? '修改藝人' : '新增藝人'}</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名 <span className="text-red-500">*</span></Label>
                <Input id="name" defaultValue={editingArtist?.name} maxLength={50} placeholder="1-50字" required />
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
        <h2 className="text-2xl font-bold">Artists 管理</h2>
        <Button onClick={handleAdd} className="bg-black text-white hover:bg-black/90">
          <Plus size={18} className="mr-2" /> 新增藝人
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="max-w-sm space-y-2">
            <Label>姓名</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="搜索姓名..." 
                className="pl-9" 
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>創建時間</TableHead>
              <TableHead>更新時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-xs text-gray-500">{a.id}</TableCell>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-xs text-gray-500">{a.created_at}</TableCell>
                <TableCell className="text-xs text-gray-500">{a.updated_at}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(a)}>
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

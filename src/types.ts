/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: number;
  name: string;
  status: 'Active' | 'Inactive'; // 顯示: 開啟/關閉
  visible_to_client: boolean;
  seo_title: string; // Title (SEO使用)
  seo_description?: string; // 描述 (SEO使用)
  og_image?: string; // OG Image (SEO使用)
  og_image_alt?: string; // Og Image Alt Txt
  created_at: string;
  updated_at: string;
}

export interface Artist {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SeriesVideo {
  video_id: number;
  type: 'File' | 'Library';
  title: string;
  description?: string;
  paid_validity_start?: string;
  paid_validity_end?: string;
  status: 'Active' | 'Inactive';
  show_time_start: string;
  show_time_end: string;
  order: number;
}

export interface Series {
  id: number;
  name: string;
  category_ids: number[]; // 可以選擇1-5個短劇分類
  cover_image: string; // Portrait 3:4
  short_desc: string;
  long_desc?: string;
  tags: string[]; // 0-5個標籤
  status: 'Active' | 'Inactive'; // 系統根據顯示隱藏時間判斷
  visible_to_client: boolean;
  show_time_start: string; // 顯示/隱藏時間
  show_time_end: string;
  show_episode_count: boolean; // 顯示集數: 開啟、關閉
  regions: string[]; // 授權播放區域: 香港、澳門
  artist_ids: number[]; // 0-50個
  pricing_type: 'Free' | 'Paid';
  free_episodes_count?: number;
  pay_validity_start?: string;
  pay_validity_end?: string;
  seo_title: string;
  seo_description: string;
  creator: string;
  author?: string;
  created_at: string;
  updated_at: string;
  series_updated_at: string; // 短劇更新時間
  videos: SeriesVideo[];
}

export type SubMenu = 'CATEGORY' | 'SERIES' | 'ARTISTS';

export interface AppState {
  currentSubMenu: SubMenu;
  viewState: 'LIST' | 'CREATE' | 'EDIT';
  selectedId: number | null;
}

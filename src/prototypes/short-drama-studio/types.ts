/**
 * 短剧工坊 - 类型定义
 */

// 用户
export interface User {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
}

// 短剧项目
export interface Drama {
  id: string;
  title: string;
  cover: string;
  episodeCount: number;
  status: 'draft' | 'in-progress' | 'completed';
  updatedAt: string;
  description?: string;
}

// 分集
export interface Episode {
  id: string;
  dramaId: string;
  episodeNumber: number;
  title: string;
  scriptContent: string;
}

// 分镜
export interface Storyboard {
  id: string;
  episodeId: string;
  sequenceNumber: number;
  prompt: string;
  thumbnail: string;
  videoCount: number;
}

// 角色
export interface Character {
  id: string;
  dramaId: string;
  name: string;
  description: string;
  multiViews: MultiView;
  costumes: Costume[];
}

// 多视图
export interface MultiView {
  front: string;
  back: string;
  side: string;
  hair: string;
  closeup: string;
}

// 服装
export interface Costume {
  id: string;
  characterId: string;
  name: string;
  episodeNumber: number;
  scene: string;
  image: string;
}

// 场景
export interface Scene {
  id: string;
  dramaId: string;
  name: string;
  description: string;
  referenceImage: string;
}

// 道具
export interface Prop {
  id: string;
  dramaId: string;
  name: string;
  description: string;
  referenceImage: string;
}

// 音色
export interface VoiceTone {
  id: string;
  characterId: string;
  characterName: string;
  toneName: string;
  speed: number;
  pitch: number;
  audioUrl: string;
}

// 视频
export interface Video {
  id: string;
  storyboardId: string;
  thumbnail: string;
  prompt: string;
  status: 'generating' | 'completed';
}

// 页面类型
export type PageId = 
  | 'login' 
  | 'register' 
  | 'profile' 
  | 'dramas' 
  | 'scripts' 
  | 'storyboard' 
  | 'characters' 
  | 'scenes' 
  | 'props' 
  | 'voice' 
  | 'videos';

// Tab 类型
export type TabId = 
  | 'scripts' 
  | 'storyboard' 
  | 'characters' 
  | 'scenes' 
  | 'props' 
  | 'voice' 
  | 'videos';

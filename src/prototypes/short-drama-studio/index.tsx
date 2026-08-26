/**
 * @name 短剧工坊
 */

import React, { useState, useCallback } from 'react';
import {
  Film,
  Home,
  FileText,
  LayoutGrid,
  Users,
  Mountain,
  Box,
  Mic,
  Video,
  User,
  LogOut,
  ChevronDown,
  Plus,
  Search,
  Settings,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import type { 
  User as UserType, Drama, Episode, Storyboard, TabId, Video as VideoType 
} from './types';
import {
  mockUser,
  mockDramas,
  mockEpisodes,
  mockStoryboards,
  mockCharacters,
  mockScenes,
  mockProps,
  mockVoiceTones,
  mockVideos,
  mockGeneratedScript,
  mockGeneratedStoryboards,
} from './mock-data';
import './style.css';

// 路由定义
const dramaTabs: { id: TabId; title: string; icon: LucideIcon }[] = [
  { id: 'scripts', title: '剧本', icon: FileText },
  { id: 'storyboard', title: '分镜', icon: LayoutGrid },
  { id: 'characters', title: '角色', icon: Users },
  { id: 'scenes', title: '场景', icon: Mountain },
  { id: 'props', title: '道具', icon: Box },
  { id: 'voice', title: '音色', icon: Mic },
  { id: 'videos', title: '视频', icon: Video },
];

// 路由配置
const appRoute = defineHashPageRoute([
  { id: 'login', title: '登录' },
  { id: 'register', title: '注册' },
  { id: 'profile', title: '个人中心' },
  { id: 'dramas', title: '短剧列表' },
  { id: 'drama', title: '短剧工作台' },
], { defaultPageId: 'login' });

// 主应用组件
export default function ShortDramaStudio() {
  const { page: currentPage, setPage } = useHashPage(appRoute);

  const [user, setUser] = useState<UserType | null>(null);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('scripts');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // 登录
  const handleLogin = useCallback(() => {
    setUser(mockUser);
    setPage('dramas');
  }, [setPage]);

  // 注册
  const handleRegister = useCallback(() => {
    setUser(mockUser);
    setPage('dramas');
  }, [setPage]);

  // 退出登录
  const handleLogout = useCallback(() => {
    setUser(null);
    setSelectedDrama(null);
    setPage('login');
  }, [setPage]);

  // 选择短剧
  const handleSelectDrama = useCallback((drama: Drama) => {
    setSelectedDrama(drama);
    setActiveTab('scripts');
    setPage('drama');
  }, [setPage]);

  // 返回短剧列表
  const handleBackToDramas = useCallback(() => {
    setSelectedDrama(null);
    setPage('dramas');
  }, [setPage]);

  // 渲染登录/注册页
  if (currentPage === 'login' || currentPage === 'register') {
    return (
      <AuthPage 
        isLogin={currentPage === 'login'}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSwitchPage={(page) => setPage(page)}
      />
    );
  }

  // 渲染主布局
  return (
    <div className="studio-shell">
      <Sidebar 
        user={user}
        selectedDrama={selectedDrama}
        activeTab={activeTab}
        currentPage={currentPage}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onGoProfile={() => setPage('profile')}
        onBackToDramas={handleBackToDramas}
      />
      <main className="studio-main">
        {currentPage === 'profile' && (
          <ProfilePage 
            user={user} 
            onBack={() => setPage('dramas')} 
          />
        )}
        {currentPage === 'dramas' && (
          <DramaListPage 
            dramas={mockDramas}
            onSelectDrama={handleSelectDrama}
          />
        )}
        {currentPage === 'drama' && selectedDrama && (
          <DramaWorkspace 
            drama={selectedDrama}
            activeTab={activeTab}
            selectedEpisode={selectedEpisode}
            onTabChange={setActiveTab}
            onEpisodeChange={setSelectedEpisode}
          />
        )}
      </main>
    </div>
  );
}

// 认证页面组件
function AuthPage({ 
  isLogin, 
  onLogin, 
  onRegister, 
  onSwitchPage 
}: { 
  isLogin: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onSwitchPage: (page: string) => void;
}) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin();
    } else {
      onRegister();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <Film size={32} />
          </div>
          <h1>短剧工坊</h1>
          <p>{isLogin ? '登录你的账号' : '创建新账号'}</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>昵称</label>
              <input 
                type="text" 
                placeholder="请输入昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label>手机号</label>
            <input 
              type="tel" 
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>验证码</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  placeholder="请输入验证码"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
                <button type="button" className="btn-secondary">获取验证码</button>
              </div>
            </div>
          )}
          <div className="form-group">
            <label>密码</label>
            <input 
              type="password" 
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary btn-full">
            {isLogin ? '登录' : '注册'}
          </button>
        </form>
        
        <div className="auth-footer">
          {isLogin ? (
            <p>还没有账号？ <button onClick={() => onSwitchPage('register')}>立即注册</button></p>
          ) : (
            <p>已有账号？ <button onClick={() => onSwitchPage('login')}>立即登录</button></p>
          )}
        </div>
      </div>
    </div>
  );
}

// 侧边栏组件
function Sidebar({ 
  user, 
  selectedDrama, 
  activeTab, 
  currentPage,
  onTabChange, 
  onLogout,
  onGoProfile,
  onBackToDramas,
}: {
  user: UserType | null;
  selectedDrama: Drama | null;
  activeTab: TabId;
  currentPage: string;
  onTabChange: (tab: TabId) => void;
  onLogout: () => void;
  onGoProfile: () => void;
  onBackToDramas: () => void;
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <aside className="studio-sidebar">
      <div className="sidebar-brand">
        <Film size={24} />
        <span>短剧工坊</span>
      </div>
      
      {currentPage === 'drama' && selectedDrama ? (
        <>
          <button className="sidebar-back-btn" onClick={onBackToDramas}>
            <Home size={16} />
            <span>返回短剧列表</span>
          </button>
          <div className="sidebar-drama-title">
            <span>{selectedDrama.title}</span>
          </div>
          <nav className="sidebar-nav">
            {dramaTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </nav>
        </>
      ) : (
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-item ${currentPage === 'dramas' ? 'active' : ''}`}
            onClick={onBackToDramas}
          >
            <Home size={18} />
            <span>短剧列表</span>
          </button>
          <button 
            className={`sidebar-nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={onGoProfile}
          >
            <Settings size={18} />
            <span>个人设置</span>
          </button>
        </nav>
      )}
      
      <div className="sidebar-user">
        <div 
          className="user-avatar"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.nickname} />
          ) : (
            <span>{user?.nickname?.charAt(0) || 'U'}</span>
          )}
          <ChevronDown size={14} />
        </div>
        {showUserMenu && (
          <div className="user-menu">
            <div className="user-menu-header">
              <span className="user-name">{user?.nickname}</span>
              <span className="user-phone">{user?.phone}</span>
            </div>
            <div className="user-menu-divider" />
            <button onClick={onGoProfile}>
              <User size={16} />
              <span>个人中心</span>
            </button>
            <button onClick={onLogout}>
              <LogOut size={16} />
              <span>退出登录</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

// 短剧列表页
function DramaListPage({ 
  dramas, 
  onSelectDrama 
}: { 
  dramas: Drama[];
  onSelectDrama: (drama: Drama) => void;
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDramas = dramas.filter(d => 
    d.title.includes(searchQuery)
  );

  const getStatusLabel = (status: Drama['status']) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'in-progress': return '进行中';
      case 'completed': return '已完成';
    }
  };

  const getStatusClass = (status: Drama['status']) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'in-progress': return 'status-progress';
      case 'completed': return 'status-completed';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>我的短剧</h1>
          <span className="page-count">{dramas.length} 部短剧</span>
        </div>
        <div className="page-header-right">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="搜索短剧..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            <span>创建短剧</span>
          </button>
        </div>
      </div>
      
      <div className="drama-grid">
        {filteredDramas.map(drama => (
          <div 
            key={drama.id} 
            className="drama-card"
            onClick={() => onSelectDrama(drama)}
          >
            <div className="drama-cover">
              <div className="drama-cover-placeholder">
                <Film size={48} />
              </div>
              <span className={`drama-status ${getStatusClass(drama.status)}`}>
                {getStatusLabel(drama.status)}
              </span>
            </div>
            <div className="drama-info">
              <h3>{drama.title}</h3>
              <p className="drama-desc">{drama.description}</p>
              <div className="drama-meta">
                <span>{drama.episodeCount} 集</span>
                <span>{drama.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showCreateModal && (
        <CreateDramaModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// 创建短剧弹窗
function CreateDramaModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟创建成功
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>创建新短剧</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>短剧名称</label>
              <input 
                type="text" 
                placeholder="请输入短剧名称"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>短剧简介</label>
              <textarea 
                placeholder="请输入短剧简介"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>取消</button>
            <button type="submit" className="btn-primary">创建</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 短剧工作台
function DramaWorkspace({ 
  drama, 
  activeTab, 
  selectedEpisode,
  onTabChange, 
  onEpisodeChange 
}: {
  drama: Drama;
  activeTab: TabId;
  selectedEpisode: Episode | null;
  onTabChange: (tab: TabId) => void;
  onEpisodeChange: (episode: Episode | null) => void;
}) {
  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <h1>{drama.title}</h1>
        <div className="workspace-tabs">
          {dramaTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`workspace-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="workspace-content">
        {activeTab === 'scripts' && (
          <ScriptsPage 
            dramaId={drama.id}
            selectedEpisode={selectedEpisode}
            onEpisodeChange={onEpisodeChange}
          />
        )}
        {activeTab === 'storyboard' && (
          <StoryboardsPage dramaId={drama.id} />
        )}
        {activeTab === 'characters' && (
          <CharactersPage dramaId={drama.id} />
        )}
        {activeTab === 'scenes' && (
          <ScenesPage dramaId={drama.id} />
        )}
        {activeTab === 'props' && (
          <PropsPage dramaId={drama.id} />
        )}
        {activeTab === 'voice' && (
          <VoicePage dramaId={drama.id} />
        )}
        {activeTab === 'videos' && (
          <VideosPage dramaId={drama.id} />
        )}
      </div>
    </div>
  );
}

// 剧本编辑页
function ScriptsPage({ 
  dramaId, 
  selectedEpisode,
  onEpisodeChange 
}: { 
  dramaId: string;
  selectedEpisode: Episode | null;
  onEpisodeChange: (episode: Episode | null) => void;
}) {
  const episodes = mockEpisodes.filter(ep => ep.dramaId === dramaId);
  const [scriptContent, setScriptContent] = useState(
    selectedEpisode?.scriptContent || episodes[0]?.scriptContent || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectEpisode = (episode: Episode) => {
    onEpisodeChange(episode);
    setScriptContent(episode.scriptContent);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setScriptContent(mockGeneratedScript);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="scripts-page">
      <div className="scripts-sidebar">
        <div className="scripts-sidebar-header">
          <h3>分集列表</h3>
          <button className="btn-icon">
            <Plus size={16} />
          </button>
        </div>
        <div className="episode-list">
          {episodes.map(episode => (
            <button
              key={episode.id}
              className={`episode-item ${(selectedEpisode?.id || episodes[0]?.id) === episode.id ? 'active' : ''}`}
              onClick={() => handleSelectEpisode(episode)}
            >
              <span className="episode-number">第{episode.episodeNumber}集</span>
              <span className="episode-title">{episode.title.replace(/^第\d+集：/, '')}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="scripts-editor">
        <div className="editor-toolbar">
          <div className="editor-toolbar-left">
            <span className="editor-title">
              {selectedEpisode?.title || episodes[0]?.title || '选择一集'}
            </span>
          </div>
          <div className="editor-toolbar-right">
            <button className="btn-secondary">
              <FileText size={14} />
              <span>保存</span>
            </button>
            <button 
              className="btn-primary"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <span>AI生成剧本</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="editor-content">
          <textarea
            className="script-editor"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            placeholder="开始编写剧本..."
          />
        </div>
      </div>
    </div>
  );
}

// 分镜管理页
function StoryboardsPage({ dramaId }: { dramaId: string }) {
  const episodes = mockEpisodes.filter(ep => ep.dramaId === dramaId);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(episodes[0]?.id || '');
  const [storyboards, setStoryboards] = useState(
    mockStoryboards.filter(sb => sb.episodeId === selectedEpisodeId)
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStoryboard, setSelectedStoryboard] = useState<Storyboard | null>(null);

  const handleEpisodeChange = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setStoryboards(mockStoryboards.filter(sb => sb.episodeId === episodeId));
    setSelectedStoryboard(null);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setStoryboards([...storyboards, ...mockGeneratedStoryboards]);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="storyboards-page">
      <div className="storyboards-sidebar">
        <div className="storyboards-sidebar-header">
          <h3>分集分镜</h3>
        </div>
        <div className="episode-list">
          {episodes.map(episode => (
            <button
              key={episode.id}
              className={`episode-item ${selectedEpisodeId === episode.id ? 'active' : ''}`}
              onClick={() => handleEpisodeChange(episode.id)}
            >
              <span className="episode-number">第{episode.episodeNumber}集</span>
              <span className="episode-count">
                {mockStoryboards.filter(sb => sb.episodeId === episode.id).length} 个分镜
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="storyboards-content">
        <div className="content-header">
          <h2>分镜列表</h2>
          <button 
            className="btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <span>AI生成分镜</span>
              </>
            )}
          </button>
        </div>
        
        <div className="storyboard-grid">
          {storyboards.map(storyboard => (
            <div 
              key={storyboard.id} 
              className={`storyboard-card ${selectedStoryboard?.id === storyboard.id ? 'selected' : ''}`}
              onClick={() => setSelectedStoryboard(storyboard)}
            >
              <div className="storyboard-thumbnail">
                <div className="thumbnail-placeholder">
                  <LayoutGrid size={32} />
                </div>
                <span className="storyboard-number">#{storyboard.sequenceNumber}</span>
              </div>
              <div className="storyboard-info">
                <p className="storyboard-prompt">{storyboard.prompt}</p>
                <div className="storyboard-meta">
                  <span>{storyboard.videoCount} 个视频</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedStoryboard && (
          <div className="storyboard-detail">
            <h3>分镜详情</h3>
            <div className="detail-content">
              <div className="detail-label">提示词：</div>
              <div className="detail-text">{selectedStoryboard.prompt}</div>
            </div>
            <div className="detail-content">
              <div className="detail-label">关联视频：</div>
              <div className="detail-text">
                {mockVideos.filter(v => v.storyboardId === selectedStoryboard.id).length} 个视频
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 角色管理页
function CharactersPage({ dramaId }: { dramaId: string }) {
  const characters = mockCharacters.filter(c => c.dramaId === dramaId);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0] || null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="characters-page">
      <div className="characters-sidebar">
        <div className="characters-sidebar-header">
          <h3>角色列表</h3>
          <button className="btn-icon">
            <Plus size={16} />
          </button>
        </div>
        <div className="character-list">
          {characters.map(character => (
            <button
              key={character.id}
              className={`character-item ${selectedCharacter?.id === character.id ? 'active' : ''}`}
              onClick={() => setSelectedCharacter(character)}
            >
              <div className="character-avatar">
                {character.name.charAt(0)}
              </div>
              <span className="character-name">{character.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="characters-content">
        {selectedCharacter && (
          <>
            <div className="content-header">
              <div className="character-header-info">
                <h2>{selectedCharacter.name}</h2>
                <p>{selectedCharacter.description}</p>
              </div>
              <button 
                className="btn-primary"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner" />
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <span>生成角色图</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="character-section">
              <h3>多视图参考</h3>
              <div className="multi-view-grid">
                <div className="multi-view-item">
                  <div className="view-placeholder">
                    <Users size={48} />
                  </div>
                  <span>正面</span>
                </div>
                <div className="multi-view-item">
                  <div className="view-placeholder">
                    <Users size={48} />
                  </div>
                  <span>背面</span>
                </div>
                <div className="multi-view-item">
                  <div className="view-placeholder">
                    <Users size={48} />
                  </div>
                  <span>侧面</span>
                </div>
                <div className="multi-view-item">
                  <div className="view-placeholder">
                    <Users size={48} />
                  </div>
                  <span>发型</span>
                </div>
                <div className="multi-view-item">
                  <div className="view-placeholder">
                    <Users size={48} />
                  </div>
                  <span>面部特写</span>
                </div>
              </div>
            </div>
            
            <div className="character-section">
              <div className="section-header">
                <h3>服装参考</h3>
                <button 
                  className="btn-secondary"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner" />
                      <span>生成中...</span>
                    </>
                  ) : (
                    <>
                      <span>生成服装</span>
                    </>
                  )}
                </button>
              </div>
              <div className="costume-grid">
                {selectedCharacter.costumes.map(costume => (
                  <div key={costume.id} className="costume-card">
                    <div className="costume-image">
                      <div className="image-placeholder">
                        <Users size={32} />
                      </div>
                    </div>
                    <div className="costume-info">
                      <span className="costume-name">{costume.name}</span>
                      <span className="costume-meta">第{costume.episodeNumber}集 · {costume.scene}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 场景管理页
function ScenesPage({ dramaId }: { dramaId: string }) {
  const scenes = mockScenes.filter(s => s.dramaId === dramaId);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="scenes-page">
      <div className="content-header">
        <h2>场景管理</h2>
        <button 
          className="btn-primary"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="spinner" />
              <span>生成中...</span>
            </>
          ) : (
            <>
              <span>AI生成场景</span>
            </>
          )}
        </button>
      </div>
      
      <div className="scene-grid">
        {scenes.map(scene => (
          <div key={scene.id} className="scene-card">
            <div className="scene-image">
              <div className="image-placeholder">
                <Mountain size={48} />
              </div>
            </div>
            <div className="scene-info">
              <h3>{scene.name}</h3>
              <p>{scene.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 道具管理页
function PropsPage({ dramaId }: { dramaId: string }) {
  const props = mockProps.filter(p => p.dramaId === dramaId);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="props-page">
      <div className="content-header">
        <h2>道具管理</h2>
        <button 
          className="btn-primary"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="spinner" />
              <span>生成中...</span>
            </>
          ) : (
            <>
              <span>AI生成道具</span>
            </>
          )}
        </button>
      </div>
      
      <div className="prop-grid">
        {props.map(prop => (
          <div key={prop.id} className="prop-card">
            <div className="prop-image">
              <div className="image-placeholder">
                <Box size={48} />
              </div>
            </div>
            <div className="prop-info">
              <h3>{prop.name}</h3>
              <p>{prop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 音色管理页
function VoicePage({ dramaId }: { dramaId: string }) {
  const voiceTones = mockVoiceTones.filter(v => 
    mockCharacters.some(c => c.id === v.characterId && c.dramaId === dramaId)
  );
  const [selectedVoice, setSelectedVoice] = useState(voiceTones[0] || null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="voice-page">
      <div className="voice-sidebar">
        <div className="voice-sidebar-header">
          <h3>角色音色</h3>
        </div>
        <div className="voice-list">
          {voiceTones.map(voice => (
            <button
              key={voice.id}
              className={`voice-item ${selectedVoice?.id === voice.id ? 'active' : ''}`}
              onClick={() => setSelectedVoice(voice)}
            >
              <div className="voice-avatar">
                {voice.characterName.charAt(0)}
              </div>
              <div className="voice-info">
                <span className="voice-name">{voice.characterName}</span>
                <span className="voice-tone">{voice.toneName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="voice-content">
        {selectedVoice && (
          <>
            <div className="content-header">
              <h2>{selectedVoice.characterName} 的音色</h2>
              <button 
                className="btn-primary"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner" />
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <span>AI生成音色</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="voice-settings">
              <div className="setting-item">
                <label>音色名称</label>
                <input type="text" value={selectedVoice.toneName} readOnly />
              </div>
              <div className="setting-item">
                <label>语速</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    value={selectedVoice.speed}
                    readOnly
                  />
                  <span className="slider-value">{selectedVoice.speed}x</span>
                </div>
              </div>
              <div className="setting-item">
                <label>语调</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    value={selectedVoice.pitch}
                    readOnly
                  />
                  <span className="slider-value">{selectedVoice.pitch}x</span>
                </div>
              </div>
            </div>
            
            <div className="voice-preview">
              <h3>音频预览</h3>
              <div className="audio-player">
                <div className="audio-waveform">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="waveform-bar"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
                <div className="audio-controls">
                  <button className="play-btn">▶</button>
                  <span className="audio-time">0:00 / 0:30</span>
                </div>
              </div>
              
              <div className="upload-section">
                <p>或上传参考音频：</p>
                <button className="btn-secondary">
                  <Mic size={16} />
                  <span>上传音频</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 视频管理页
function VideosPage({ dramaId }: { dramaId: string }) {
  const episodes = mockEpisodes.filter(ep => ep.dramaId === dramaId);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(episodes[0]?.id || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const storyboards = mockStoryboards.filter(sb => sb.episodeId === selectedEpisodeId);
  const videos = mockVideos.filter(v => 
    storyboards.some(sb => sb.id === v.storyboardId)
  );

  const handleEpisodeChange = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setSelectedVideo(null);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="videos-page">
      <div className="videos-sidebar">
        <div className="videos-sidebar-header">
          <h3>按集查看</h3>
        </div>
        <div className="episode-list">
          {episodes.map(episode => (
            <button
              key={episode.id}
              className={`episode-item ${selectedEpisodeId === episode.id ? 'active' : ''}`}
              onClick={() => handleEpisodeChange(episode.id)}
            >
              <span className="episode-number">第{episode.episodeNumber}集</span>
              <span className="episode-count">
                {mockStoryboards.filter(sb => sb.episodeId === episode.id).length} 个分镜
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="videos-content">
        <div className="content-header">
          <h2>视频列表</h2>
          <button 
            className="btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <span>生成视频</span>
              </>
            )}
          </button>
        </div>
        
        <div className="storyboard-video-section">
          {storyboards.map(storyboard => {
            const storyboardVideos = videos.filter(v => v.storyboardId === storyboard.id);
            if (storyboardVideos.length === 0) return null;
            
            return (
              <div key={storyboard.id} className="storyboard-group">
                <div className="storyboard-group-header">
                  <span className="storyboard-label">分镜 #{storyboard.sequenceNumber}</span>
                  <span className="storyboard-prompt-preview">{storyboard.prompt.substring(0, 50)}...</span>
                </div>
                <div className="video-grid">
                  {storyboardVideos.map(video => (
                    <div 
                      key={video.id} 
                      className={`video-card ${selectedVideo?.id === video.id ? 'selected' : ''}`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="video-thumbnail">
                        <div className={`thumbnail-placeholder ${video.status === 'generating' ? 'generating' : ''}`}>
                          {video.status === 'generating' ? (
                            <span className="spinner" />
                          ) : (
                            <Video size={32} />
                          )}
                        </div>
                        <span className="video-status">
                          {video.status === 'completed' ? '已完成' : '生成中...'}
                        </span>
                      </div>
                      <div className="video-info">
                        <p className="video-prompt">{video.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {selectedVideo && (
          <div className="video-detail">
            <h3>视频详情</h3>
            <div className="detail-content">
              <div className="detail-label">对应分镜提示词：</div>
              <div className="detail-text">{selectedVideo.prompt}</div>
            </div>
            <div className="detail-content">
              <div className="detail-label">状态：</div>
              <div className="detail-text">
                {selectedVideo.status === 'completed' ? '已完成' : '生成中...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 个人中心页
function ProfilePage({ 
  user, 
  onBack 
}: { 
  user: UserType | null;
  onBack: () => void;
}) {
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [phone, setPhone] = useState(user?.phone || '');

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>个人中心</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>基本信息</h3>
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.nickname} />
              ) : (
                <span>{user?.nickname?.charAt(0) || 'U'}</span>
              )}
            </div>
            <button className="btn-secondary">更换头像</button>
          </div>
          
          <div className="form-group">
            <label>昵称</label>
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>手机号</label>
            <div className="input-with-button">
              <input 
                type="text" 
                value={phone}
                readOnly
              />
              <button className="btn-secondary">更换手机号</button>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>安全设置</h3>
          <div className="form-group">
            <label>修改密码</label>
            <button className="btn-secondary">修改密码</button>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn-primary" onClick={onBack}>保存修改</button>
          <button className="btn-secondary" onClick={onBack}>返回</button>
        </div>
      </div>
    </div>
  );
}

/**
 * 短剧工坊 - Mock 数据
 */

import type { 
  User, Drama, Episode, Storyboard, Character, 
  Scene, Prop, VoiceTone, Video 
} from './types';

// 模拟用户
export const mockUser: User = {
  id: 'user-001',
  nickname: '创作者小明',
  avatar: '',
  phone: '138****8888',
};

// 模拟短剧列表
export const mockDramas: Drama[] = [
  {
    id: 'drama-001',
    title: '重生之都市修仙',
    cover: '',
    episodeCount: 24,
    status: 'in-progress',
    updatedAt: '2024-03-15',
    description: '林天重生回到都市，带着上一世的修仙记忆，重新踏上巅峰之路。',
  },
  {
    id: 'drama-002',
    title: '暗夜追凶',
    cover: '',
    episodeCount: 12,
    status: 'completed',
    updatedAt: '2024-03-10',
    description: '刑警队长李明阳追查连环杀人案，却发现真相隐藏在最亲近的人身边。',
  },
  {
    id: 'drama-003',
    title: '甜蜜的谎言',
    cover: '',
    episodeCount: 16,
    status: 'draft',
    updatedAt: '2024-03-08',
    description: '都市白领苏小暖意外获得读心术，却发现男友一直在隐瞒一个惊天秘密。',
  },
];

// 模拟分集数据（重生之都市修仙）
export const mockEpisodes: Episode[] = [
  {
    id: 'ep-001',
    dramaId: 'drama-001',
    episodeNumber: 1,
    title: '第一集：重生归来',
    scriptContent: `第一集：重生归来

【场景一：医院病房 · 夜】
（主角林天睁开眼睛，发现自己躺在医院病床上）
林天：（内心独白）我竟然...重生了？上一世我被人陷害，修为尽失，惨死街头。这一世...

【场景二：医院走廊 · 夜】
（林天走出病房，遇到护士）
护士：先生，您不能下床！
林天：（淡淡一笑）我没事了。
护士：可是您的检查报告还没...
（林天已经走远）

【场景三：城市街道 · 晨】
（林天走在街上，感受着都市的气息）
林天：（内心独白）灵气稀薄，但足以让我重新修炼。这一世，我要让所有背叛我的人付出代价。
（远处传来汽车喇叭声，林天侧身避开）

【场景四：林天公寓 · 日】
（林天回到家中，盘腿坐下开始修炼）
林天：（内心独白）先天期...突破！
（身体周围泛起微弱的光芒，房间内的物品轻轻震动）`,
  },
  {
    id: 'ep-002',
    dramaId: 'drama-001',
    episodeNumber: 2,
    title: '第二集：初露锋芒',
    scriptContent: `第二集：初露锋芒

【场景一：公司大楼 · 日】
（林天站在公司门口，这里是上一世他工作过的地方）
林天：（内心独白）王浩，这一世我不会再被你利用。

【场景二：办公室 · 日】
（林天走进办公室，同事们投来异样的目光）
同事A：听说林天住院了，怎么这么快就回来了？
同事B：谁知道呢，可能是装病想请假吧。
林天：（面无表情地走向自己的工位）

【场景三：会议室 · 日】
（部门会议，王浩正在讲话）
王浩：这个季度的业绩必须提升30%，做不到的直接走人。
（林天冷笑一声）
王浩：林天，你笑什么？
林天：没什么，只是觉得30%太少了。

【场景四：天台 · 夜】
（林天独自站在天台上，手中凝聚出一团灵力）
林天：（内心独白）筑基期初期，足以应对接下来的挑战了。`,
  },
  {
    id: 'ep-003',
    dramaId: 'drama-001',
    episodeNumber: 3,
    title: '第三集：暗流涌动',
    scriptContent: `第三集：暗流涌动

【场景一：酒吧 · 夜】
（林天坐在角落，观察着周围的动静）
林天：（内心独白）上一世就是在这里，我被人下了毒。

【场景二：酒吧吧台 · 夜】
（一个神秘女子走近）
女子：一个人？
林天：（警惕地看向她）你是谁？
女子：（微笑）我叫苏瑶，我们可以聊聊吗？

【场景三：酒吧后巷 · 夜】
（林天发现有人跟踪）
林天：（内心独白）果然来了。
（几个黑衣人出现）
黑衣人A：林天，有人出钱买你的命。
林天：（冷笑）那就看你们有没有这个本事了。

【场景四：后巷战斗 · 夜】
（林天轻松击败黑衣人）
林天：（拍了拍手）不堪一击。`,
  },
];

// 模拟分镜数据
export const mockStoryboards: Storyboard[] = [
  {
    id: 'sb-001',
    episodeId: 'ep-001',
    sequenceNumber: 1,
    prompt: '医院病房内，夜晚，男主角林天躺在病床上，眼睛刚刚睁开，表情震惊，窗外月光透过窗帘洒进来',
    thumbnail: '',
    videoCount: 2,
  },
  {
    id: 'sb-002',
    episodeId: 'ep-001',
    sequenceNumber: 2,
    prompt: '医院走廊，夜晚，男主角穿着病号服行走，护士在身后追赶，走廊灯光昏暗',
    thumbnail: '',
    videoCount: 1,
  },
  {
    id: 'sb-003',
    episodeId: 'ep-001',
    sequenceNumber: 3,
    prompt: '城市街道，清晨，男主角独自走在街上，表情坚毅，朝阳从远处升起',
    thumbnail: '',
    videoCount: 3,
  },
  {
    id: 'sb-004',
    episodeId: 'ep-001',
    sequenceNumber: 4,
    prompt: '公寓房间内，男主角盘腿坐在地上修炼，身体周围有微弱光芒，房间物品轻微震动',
    thumbnail: '',
    videoCount: 2,
  },
  {
    id: 'sb-005',
    episodeId: 'ep-002',
    sequenceNumber: 1,
    prompt: '公司大楼外，白天，男主角站在门口仰望大楼，表情复杂',
    thumbnail: '',
    videoCount: 1,
  },
  {
    id: 'sb-006',
    episodeId: 'ep-002',
    sequenceNumber: 2,
    prompt: '办公室内，同事们窃窃私语，男主角面无表情走向工位',
    thumbnail: '',
    videoCount: 2,
  },
  {
    id: 'sb-007',
    episodeId: 'ep-002',
    sequenceNumber: 3,
    prompt: '会议室内，男主角与上司对峙，气氛紧张',
    thumbnail: '',
    videoCount: 2,
  },
  {
    id: 'sb-008',
    episodeId: 'ep-002',
    sequenceNumber: 4,
    prompt: '天台，夜晚，男主角手中凝聚灵力，表情自信',
    thumbnail: '',
    videoCount: 1,
  },
];

// 模拟角色数据
export const mockCharacters: Character[] = [
  {
    id: 'char-001',
    dramaId: 'drama-001',
    name: '林天',
    description: '男主角，重生者，拥有上一世的修仙记忆，性格坚毅，外冷内热。',
    multiViews: {
      front: '',
      back: '',
      side: '',
      hair: '',
      closeup: '',
    },
    costumes: [
      {
        id: 'costume-001',
        characterId: 'char-001',
        name: '病号服',
        episodeNumber: 1,
        scene: '医院病房',
        image: '',
      },
      {
        id: 'costume-002',
        characterId: 'char-001',
        name: '休闲装',
        episodeNumber: 1,
        scene: '城市街道',
        image: '',
      },
      {
        id: 'costume-003',
        characterId: 'char-001',
        name: '西装',
        episodeNumber: 2,
        scene: '公司办公',
        image: '',
      },
    ],
  },
  {
    id: 'char-002',
    dramaId: 'drama-001',
    name: '苏瑶',
    description: '神秘女子，真实身份是修仙界的人，表面温柔实则心机深沉。',
    multiViews: {
      front: '',
      back: '',
      side: '',
      hair: '',
      closeup: '',
    },
    costumes: [
      {
        id: 'costume-004',
        characterId: 'char-002',
        name: '晚礼服',
        episodeNumber: 3,
        scene: '酒吧',
        image: '',
      },
    ],
  },
  {
    id: 'char-003',
    dramaId: 'drama-001',
    name: '王浩',
    description: '男主角的上司，实际上是反派，上一世陷害男主角的人。',
    multiViews: {
      front: '',
      back: '',
      side: '',
      hair: '',
      closeup: '',
    },
    costumes: [
      {
        id: 'costume-005',
        characterId: 'char-003',
        name: '商务西装',
        episodeNumber: 2,
        scene: '公司会议',
        image: '',
      },
    ],
  },
];

// 模拟场景数据
export const mockScenes: Scene[] = [
  {
    id: 'scene-001',
    dramaId: 'drama-001',
    name: '医院病房',
    description: '现代化医院的单人病房，白色墙壁，窗外有月光洒入，氛围略显阴暗。',
    referenceImage: '',
  },
  {
    id: 'scene-002',
    dramaId: 'drama-001',
    name: '城市街道',
    description: '繁华的都市街道，高楼大厦林立，人来人往，清晨阳光照射。',
    referenceImage: '',
  },
  {
    id: 'scene-003',
    dramaId: 'drama-001',
    name: '男主角公寓',
    description: '简约现代风格的公寓，客厅宽敞，适合修炼。',
    referenceImage: '',
  },
  {
    id: 'scene-004',
    dramaId: 'drama-001',
    name: '公司办公室',
    description: '开放式办公区域，现代化装修，气氛压抑。',
    referenceImage: '',
  },
  {
    id: 'scene-005',
    dramaId: 'drama-001',
    name: '酒吧',
    description: '昏暗的酒吧内部，霓虹灯光闪烁，气氛暧昧。',
    referenceImage: '',
  },
];

// 模拟道具数据
export const mockProps: Prop[] = [
  {
    id: 'prop-001',
    dramaId: 'drama-001',
    name: '灵力光球',
    description: '男主角修炼时凝聚的灵力，呈淡蓝色光芒。',
    referenceImage: '',
  },
  {
    id: 'prop-002',
    dramaId: 'drama-001',
    name: '身份证',
    description: '男主角的身份证件。',
    referenceImage: '',
  },
  {
    id: 'prop-003',
    dramaId: 'drama-001',
    name: '手机',
    description: '现代智能手机，男主角与外界联系的工具。',
    referenceImage: '',
  },
];

// 模拟音色数据
export const mockVoiceTones: VoiceTone[] = [
  {
    id: 'voice-001',
    characterId: 'char-001',
    characterName: '林天',
    toneName: '沉稳男声',
    speed: 1.0,
    pitch: 1.0,
    audioUrl: '',
  },
  {
    id: 'voice-002',
    characterId: 'char-002',
    characterName: '苏瑶',
    toneName: '温柔女声',
    speed: 0.95,
    pitch: 1.1,
    audioUrl: '',
  },
  {
    id: 'voice-003',
    characterId: 'char-003',
    characterName: '王浩',
    toneName: '威严男声',
    speed: 1.05,
    pitch: 0.95,
    audioUrl: '',
  },
];

// 模拟视频数据
export const mockVideos: Video[] = [
  {
    id: 'video-001',
    storyboardId: 'sb-001',
    thumbnail: '',
    prompt: '医院病房内，夜晚，男主角林天躺在病床上，眼睛刚刚睁开，表情震惊',
    status: 'completed',
  },
  {
    id: 'video-002',
    storyboardId: 'sb-001',
    thumbnail: '',
    prompt: '医院病房内，夜晚，男主角林天躺在病床上，眼睛刚刚睁开，表情震惊（慢动作版）',
    status: 'completed',
  },
  {
    id: 'video-003',
    storyboardId: 'sb-002',
    thumbnail: '',
    prompt: '医院走廊，夜晚，男主角穿着病号服行走，护士在身后追赶',
    status: 'completed',
  },
  {
    id: 'video-004',
    storyboardId: 'sb-003',
    thumbnail: '',
    prompt: '城市街道，清晨，男主角独自走在街上，表情坚毅',
    status: 'completed',
  },
  {
    id: 'video-005',
    storyboardId: 'sb-003',
    thumbnail: '',
    prompt: '城市街道，清晨，男主角独自走在街上，表情坚毅（远景版）',
    status: 'generating',
  },
  {
    id: 'video-006',
    storyboardId: 'sb-003',
    thumbnail: '',
    prompt: '城市街道，清晨，男主角独自走在街上，表情坚毅（特写版）',
    status: 'generating',
  },
];

// 模拟剧本内容（用于AI生成）
export const mockGeneratedScript = `第一集：重生归来

【场景一：医院病房 · 夜】
（主角林天睁开眼睛，发现自己躺在医院病床上）
林天：（内心独白）我竟然...重生了？上一世我被人陷害，修为尽失，惨死街头。这一世...

【场景二：医院走廊 · 夜】
（林天走出病房，遇到护士）
护士：先生，您不能下床！
林天：（淡淡一笑）我没事了。
护士：可是您的检查报告还没...
（林天已经走远）

【场景三：城市街道 · 晨】
（林天走在街上，感受着都市的气息）
林天：（内心独白）灵气稀薄，但足以让我重新修炼。这一世，我要让所有背叛我的人付出代价。
（远处传来汽车喇叭声，林天侧身避开）

【场景四：林天公寓 · 日】
（林天回到家中，盘腿坐下开始修炼）
林天：（内心独白）先天期...突破！
（身体周围泛起微弱的光芒，房间内的物品轻轻震动）`;

// 模拟分镜数据（用于AI生成）
export const mockGeneratedStoryboards: Storyboard[] = [
  {
    id: 'sb-new-001',
    episodeId: 'ep-001',
    sequenceNumber: 1,
    prompt: '医院病房内，夜晚，男主角林天躺在病床上，眼睛刚刚睁开，表情震惊，窗外月光透过窗帘洒进来',
    thumbnail: '',
    videoCount: 0,
  },
  {
    id: 'sb-new-002',
    episodeId: 'ep-001',
    sequenceNumber: 2,
    prompt: '医院走廊，夜晚，男主角穿着病号服行走，护士在身后追赶，走廊灯光昏暗',
    thumbnail: '',
    videoCount: 0,
  },
  {
    id: 'sb-new-003',
    episodeId: 'ep-001',
    sequenceNumber: 3,
    prompt: '城市街道，清晨，男主角独自走在街上，表情坚毅，朝阳从远处升起',
    thumbnail: '',
    videoCount: 0,
  },
];

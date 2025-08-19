import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: '대시보드 Dashboard',
    path: '/pages/dashboard',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
  {
    id: 'journal',
    subheader: '기록하기 Journal', // 프로필(사진, 상메) 꾸미기, 일정 공유(친구와의 약속 잡기, 생일 등), 일기 등
    path: '/pages/journal',
    icon: 'mingcute:star-fill',
    active: true,
  },
  {
    id: 'community',
    subheader: '소통하기 Community', // 익명 질문함, 챌린지(개인, 공통), 비밀 편지
    path: '/pages/community',
    icon: 'mingcute:user-2-fill',
    active: true,
  },
  {
    id: 'chat',
    subheader: '채팅하기 Chat', // 일반 채팅, 단체 채팅, 비밀 채팅
    path: '/pages/chat',
    icon: 'mingcute:chat-1-fill',
    active: true,
  },
  {
    id: 'memories',
    subheader: '추억하기 Memories', // 타임라인 회고(오늘부터 1년 전/한달 전 게시글 보여주기), 타임캡슐(특정 날짜 이후에만 열람 가능), 좋아요 아카이브
    path: '/pages/memories',
    icon: 'mingcute:plugin-2-fill',
    active: true,
  },
  {
    id: 'authentication',
    subheader: '인증 Authentication',
    icon: 'mingcute:safe-lock-fill',
    items: [
      {
        name: '로그인 Login',
        pathName: 'login',
        path: paths.login,
      },
      {
        name: '가입하기 Sign up',
        pathName: 'signup',
        path: paths.signup,
      },
    ],
  },
  {
    id: 'settings',
    subheader: '세팅하기 Settings',
    path: '#!',
    icon: 'material-symbols:settings-rounded',
    active: true,
  },
  {
    id: 'account-settings',
    subheader: 'Janet',
    path: '#!',
  },
];

export default sitemap;

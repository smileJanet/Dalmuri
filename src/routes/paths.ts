export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pagesRoot}/dashboard`,
  journal: `/${rootPaths.pagesRoot}/journal`,
  community: `/${rootPaths.pagesRoot}/community`,
  chat: `/${rootPaths.pagesRoot}/chat`,
  memories: `/${rootPaths.pagesRoot}/memories`,
  settings: `/${rootPaths.pagesRoot}/settings`,
  accountSettings: `/${rootPaths.pagesRoot}/account-settings`,

  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  comingSoon: `/coming-soon`,
  404: `/${rootPaths.errorRoot}/404`,
};


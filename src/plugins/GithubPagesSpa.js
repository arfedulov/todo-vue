const normPath = (path) => {
  path = path.split('/').filter(s => !!s).join('/');

  if (!path) {
    return '/';
  }

  return '/' + path + '/';
};

/**
 * Allows to host SPA application from subfolders on github pages.
 *
 * It assumes that we have `404.html` in the root folder on github pages
 * which redirects requests to SPA application and put subpath
 * into query parameter with `p` key.
 */
export default {
  install(Vue, router) {
    router.beforeEach((to, from, next) => {
      if (to.query.p) {
        next(normPath(to.path + '/' + to.query.p));
        return;
      }

      next();
    });
  },
};

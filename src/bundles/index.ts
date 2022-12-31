const bundles = {
  home: () => import(/* webpackChunkName: "home" */ "./home"),
  segment: () => import(/* webpackChunkName: "segment" */ "./segment"),
  notFound: () => import(/* webpackChunkName: "notFound" */ "./notFound"),
};

export default bundles;

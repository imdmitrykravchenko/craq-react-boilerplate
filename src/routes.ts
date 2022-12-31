const routes = [
  {
    name: "home",
    path: "/",
    config: {
      renderer: "react",
      bundle: "home",
      page: "HomePage",
      actions: ["updateMetaAction"],
    },
  },
  {
    name: "segment",
    path: "/items/:slug",
    config: {
      renderer: "react",
      bundle: "segment",
      page: "SegmentPage",
      actions: ["updateMetaAction"],
    },
  },
  {
    name: "404",
    path: "/(.*)",
    config: {
      renderer: "react",
      bundle: "model",
      page: "NotFound",
      actions: ["updateMetaAction"],
    },
  },
];

export default routes;

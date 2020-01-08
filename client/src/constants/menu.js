const data = [
  {
    id: "site-audit",
    icon: "iconsminds-air-balloon-1",
    label: "menu.site-audit",
    to: "/app/site",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.import-from-csv",
        to: "/app/site/import-from-csv"
      },
      {
        icon: "simple-icon-paper-plane",
        label: "menu.create-site",
        to: "/app/site/create-site"
      },
      {
        icon: "simple-icon-paper-plane",
        label: "menu.site-list",
        to: "/app/site/site-list"
      }
    ]
  },
  {
    id: "project-management",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.project-management",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.project-detail",
        to: "/app/second-menu/second"
      }
    ]
  },
  {
    id: "entity-user-management",
    icon: "iconsminds-business-mens",
    label: "menu.entity-user-management",
    to: "/app/entity",
    subs: [
      {
        icon: "simple-icon-organization",
        label: "menu.entity-management",
        to: "/app/entity/entity-list"
      },
      {
        icon: "simple-icon-people",
        label: "menu.user-management",
        to: "/app/entity/user-list"
      }
    ]
  },
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/blank-page"
  },
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }
];
export default data;

const modal = {
  opened: {
    opacity: 1,
    scale: [0, 1.1, 1],
  },
  closed: {
    opacity: 0,
    scale: 0,
  },
};

const alert = {
  opened: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: 100,
  },
};

const accordion = {
  opened: {
    height: "auto",
  },
  closed: {
    height: 0,
  },
};

const listItem = {
  init: {
    x: "-100%",
  },
  load: {
    x: 0,
  },
};

const list = {
  init: {
    opacity: 0,
  },
  load: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default {
  modal,
  alert,
  accordion,
  listItem,
  list,
};

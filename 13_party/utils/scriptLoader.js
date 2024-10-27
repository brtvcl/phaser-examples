const scriptLoader = {
  load: function (scripts, context) {
    scripts.forEach((script) => {
      script(context);
    });
  },
};

export { scriptLoader };

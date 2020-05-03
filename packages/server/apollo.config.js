module.exports = {
  service: {
    endpoint: {
      name: "backend",
      url:
        process.env.NODE_ENV === "production"
          ? "http://backend:4000"
          : "http://localhost:4000",
    },
  },
};

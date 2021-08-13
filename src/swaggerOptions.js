export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Geo-Logysto API",
      version: "1.0.0",
      description:
        "Api para registar usuario, hacer login y buscar direccione.",
    },
  },

  apis: ["./src/routes/*.js"],
};

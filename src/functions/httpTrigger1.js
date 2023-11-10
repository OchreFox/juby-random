const { app } = require("@azure/functions");
const juby = require("../juby");
app.http("juby", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const jubyText = await juby();

    return { body: jubyText };
  },
});

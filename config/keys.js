if (process.env.NODE_ENV === "production") {
  module.exports = {
    MONGODB_URI: process.env.MONGO_URI,
    secretKey: process.env.SECRET_OR_KEY,
  };
} else {
  module.exports = {
    MONGODB_URI: "mongodb://localhost/todo-app",
    secretKey: "bonfox98",
    googleClientID:
      "1077966741168-vs47enuufj497qvgjo0gt1241hm6h2pb.apps.googleusercontent.com",
    googleClientSecret: "cXfuGE_EjoUXRl_alSJ9ZBmS",
  };
}

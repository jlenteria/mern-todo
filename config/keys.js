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
      "348653924741-br3pl65kjru675evlohd9fjdj7o86sla.apps.googleusercontent.com",
    googleClientSecret: "_98wmUEJOBAdxMg8YU6yeXnR",
  };
}

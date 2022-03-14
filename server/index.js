import express from "express";
import mongoose from "mongoose";
import { pool,client,sequelize } from './postgres.js'

import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

import userRouter from "./routes/user.js";
import postRoutes from "./routes/post.js";
import courseRoutes from "./routes/course.js";
import professorRoutes from "./routes/professor.js";
import departmentRoutes from "./routes/department.js";
import courseFeedBackRoutes from "./routes/courseFeedBack.js";
import courseResourceRoutes from "./routes/courseResource.js";
import productRoutes from "./routes/product.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Add headers
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://nccucourseguide.herokuapp.com"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/course", courseRoutes);
app.use("/user", userRouter);
app.use("/posts", postRoutes);
app.use("/feedback", courseFeedBackRoutes);
app.use("/resource", courseResourceRoutes);
app.use("/department", departmentRoutes);
app.use("/professor", professorRoutes);
app.use("/product", productRoutes);

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy.Strategy(
    {
      // authorizationURL: 'https://www.example.com/oauth2/authorize',
      // tokenURL: 'https://www.example.com/oauth2/token',
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:80/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log('request :', request);
      console.log('accessToken :', accessToken);
      console.log('refreshToken :', refreshToken);
      console.log('profile :', profile);
      console.log('done :', done);
      // console.log(profile);

      //在這裡處理db ()
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      const user_exist = true;

      if(user_exist){
        return done(null, 
          {
            test:"test",
            profile
          });
      }
      else{
        return done(null, "user not exist in postgres db");
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//test
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  }
  )
);

app.get("/protected", isLoggedIn, (req, res) => {
  console.log('req :', req);
  console.log('req.sessionStore.sessions :', req.sessionStore.sessions);
  // res.send(`Hello ${req.user.displayName}`);
  res.redirect('http://localhost:3000')
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

const CONNECTION_URL =
  "mongodb+srv://william:reverse321@cluster0.mhbnf.mongodb.net/nccu-course-guide?retryWrites=true&w=majority";

const PORT = process.env.PORT || 80;

try {
  await sequelize.authenticate();
  console.log('sequelize postgres Connection has been established successfully.');
  
  // clients will also use environment variables
  // for connection information
  await client.connect()
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

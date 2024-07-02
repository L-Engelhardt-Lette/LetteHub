import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import argon2 from 'argon2';
import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './model'; // Stellen Sie sicher, dass der Pfad korrekt ist
import { connectDB } from './src/backend/utils/database'; // Stellen Sie sicher, dass der Pfad korrekt ist

interface RegisterRequest {
  name: string;
  vorname: string;
  email: string;
  password: string;
}

const app = new Koa();
const router = new Router();

// Connect to the database
connectDB();

// Passport local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
router.post('/register', async (ctx) => {
  const { name, vorname, email, password } = ctx.request.body as RegisterRequest; // Type assertion
  try {
    const hashedPassword = await argon2.hash(password);
    await User.create({ name, vorname, email, password: hashedPassword });
    ctx.status = 201;
    ctx.body = { message: 'User registered' };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { message: 'Error registering user' };
  }
});

router.post('/login', (ctx, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return ctx.throw(500);
    }
    if (!user) return ctx.throw(401, info.message);

    ctx.body = { message: 'Login successful' };
  })(ctx, next);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

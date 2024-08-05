const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

// Configure Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/v1/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google profile:', profile);
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        console.log('Existing user found:', user);
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
          console.log('Updated user with Google ID');
        }
        return done(null, user);
      }
      console.log('Creating new user');
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        accountType: 'Team Member' // Set a default account type
      });
      console.log('New user created:', user);
      done(null, user);
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      done(error, null);
    }
  }
));

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    jwt.sign(
      { id: user._id, email: user.email, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT Sign Error:', err);
          return res.status(500).json({
            success: false,
            message: 'Error generating token'
          });
        }
        res.status(200).json({
          success: true,
          token
        });
      }
    );
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    })
  }
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    console.log('Google Auth Callback - Start');
    if (err) {
      console.error('Google Auth Error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }
    if (!user) {
      console.error('No user found:', info);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_no_user`);
    }
    console.log('User authenticated:', user);
    try {
      const token = jwt.sign(
        {
          id: user._id.toString(),
          email: user.email,
          accountType: user.accountType
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('JWT created successfully');
      console.log('Token payload:', jwt.decode(token));  // Log the decoded token for debugging
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (error) {
      console.error('JWT creation error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=token_creation_failed`);
    }
  })(req, res, next);
};

module.exports = exports;
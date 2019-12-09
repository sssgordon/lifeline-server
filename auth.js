const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "41211512517-64dvhdbbcruocksj6il55mefdkqvvcff.apps.googleusercontent.com",
        clientSecret: "UgJWiC0Lig7Gkp3LEYSsOvwp",
        callbackURL:
          "https://rocky-beyond-35781.herokuapp.com/auth/google/callback"
      },
      (token, refreshToken, profile, done) => {
        return done(null, {
          profile: profile,
          token: token
        });
      }
    )
  );
};

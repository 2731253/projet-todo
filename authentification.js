import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail } from "./model/user.js";

// Configuration générale, le client envoit une variable "email" et "motDePasse" au serveur pour l'authentification.
const config = {
    usernameField: "email",
    passwordField: "password",
};

// Configuration de quoi faire avec l'identifiant et le mot de passe pour les valider
passport.use(
    new Strategy(config, async (email, password, done) => {
        // S'il y a une erreur avec la base de données, on retourne l'erreur au serveur
        try {
            // On va chercher l'user dans la base de données avec son email
            const user = await getUserByEmail(email);

            // Si on ne trouve pas le user, on retourne un message d'erreur
            if (!user) {
                return done(null, false, { erreur: "mauvais_utilisateur" });
            }

            // Si on a trouvé le user, on compare son mot de passe dans la base de données avec celui envoyé au serveur.
            const valide = await bcrypt.compare(password, user.password);

            // Si les mot de passe correspond pas, on retourne un message d'erreur
            if (!valide) {
                return done(null, false, { erreur: "mauvais_mot_de_passe" });
            }

            // Si les mot de passe concorde, on retourne l'information de l'user au serveur
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Configuration de la sérialisation
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Configuration de la désérialisation
passport.deserializeUser(async (email, done) => {
    // S'il y a une erreur de base de donnée, on retourne l'erreur au serveur
    try {
        const user = await getUserByEmail(email);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

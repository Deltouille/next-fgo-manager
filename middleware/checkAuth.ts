import jwt from 'jsonwebtoken';
import {PrismaClient, Prisma } from "@prisma/client";

export default function authMiddleware(handler, p: { res: any; req: any }) {
    return async (req, res) => {
        const prisma = new PrismaClient();
        try {
            // Vérifiez si le cookie contenant le jsonwebtoken existe
            if (!req.cookies.jwt) {
                throw new Error('Aucun cookie trouvé');
            }

            // Décodez le jsonwebtoken pour obtenir les informations de l'utilisateur
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

            // Vérifiez que l'utilisateur existe en base de données, ou dans un fichier ou autre selon la structure de votre application
            const user = await prisma.User.findOne({ _id: decoded._id });

            if (!user) {
                throw new Error('Aucun utilisateur trouvé');
            }

            // Stockez les informations de l'utilisateur dans la requête pour y accéder plus tard
            req.user = user;

            // Appelez la fonction de gestionnaire de requêtes (handler) pour continuer le traitement de la requête
            return handler(req, res);
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Non autorisé' });
        }
    };
}

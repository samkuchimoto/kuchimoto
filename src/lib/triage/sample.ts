// /src/lib/triage/sample.ts
// "Charger un exemple réel" on /demo-triage: fifteen raw inbox rows, as
// Gmail gives them when rows are copied (sender, "subject - snippet",
// date, separated by tabs). Fictional senders, so the engine has
// something real to read for a visitor who keeps their own inbox private.

export const SAMPLE_INBOX = [
  "Agence Lumen\tRe: Devis refonte du site - Bonjour Samuel, c'est validé de notre côté. Pouvez-vous nous envoyer le contrat avant le 5 novembre ?\t10:42",
  "Banque Horizon\tPrélèvement rejeté - Votre prélèvement du 18 octobre a été rejeté pour solde insuffisant. Merci de régulariser avant le 25 octobre.\t09:15",
  "Banque Horizon\tVotre code de connexion : 482913 - Ce code expire dans 10 minutes. Ne le communiquez à personne.\t09:02",
  "Hébergeur Nuage\tAlerte : échec du déploiement en production - Le déploiement de 08:52 a échoué. Le site reste sur la version précédente.\t08:53",
  "Signature en ligne\tDocument à signer : contrat de prestation - Le contrat de prestation vous attend. Signature requise avant le 30 octobre.\t08:51",
  "Réseau Pro\tSamuel, vous apparaissez dans 12 recherches cette semaine - Découvrez qui a consulté votre profil et développez votre réseau.\t08:00",
  "Messagerie Pro\tAlerte de sécurité : nouvelle connexion sur Windows - Si c'était vous, aucune action n'est requise.\t07:40",
  "Emplois Plus\t15 nouvelles offres d'emploi : Développeur React - Postulez dès aujourd'hui aux offres qui correspondent à votre profil.\t07:30",
  "Mode & Co\t-40 % sur toute la collection, dernier jour ! - Profitez des soldes avant minuit. Se désabonner\t06:12",
  "Registre de domaines\tVotre nom de domaine expire le 2 novembre - Renouvelez-le dès maintenant pour éviter la coupure du site et des e-mails.\t18 oct.",
  "Assurance Atlas\tVotre attestation d'assurance expire le 31 octobre - Merci de nous transmettre la nouvelle attestation de votre activité.\t17 oct.",
  "Service Cloud\tMise à jour de nos conditions d'utilisation - Les nouvelles conditions entrent en vigueur le 1er décembre.\t16 oct.",
  "Atelier Bois & Co\tCommande n° 10482 confirmée - Merci pour votre commande, la livraison est prévue jeudi.\t16 oct.",
  "Équipe Produit\tCompte rendu du point hebdo - Sprint 14 : 3 tickets livrés, 1 blocage côté API à lever cette semaine.\t15 oct.",
  "La Lettre Tech\tNewsletter : les 5 tendances IA de la semaine - Au sommaire : agents, automatisation et nouveaux modèles. Se désinscrire\t15 oct.",
].join("\n");

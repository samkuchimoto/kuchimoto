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

/** The same fifteen rows for /en/demo-triage, in English (fictional senders). */
export const SAMPLE_INBOX_EN = [
  "Lumen Studio\tRe: Website redesign quote - Hi Samuel, it's approved on our side. Could you send us the contract by November 5?\t10:42",
  "Horizon Bank\tDirect debit rejected - Your direct debit of October 18 was rejected for insufficient funds. Please settle it by October 25.\t09:15",
  "Horizon Bank\tYour sign-in code: 482913 - This code expires in 10 minutes. Never share it with anyone.\t09:02",
  "Cloud Host\tAlert: production deployment failed - The 08:52 deployment failed. The site stays on the previous version.\t08:53",
  "Online Signature\tDocument to sign: service agreement - Your service agreement is waiting. Signature required by October 30.\t08:51",
  "Pro Network\tSamuel, you appeared in 12 searches this week - See who viewed your profile and grow your network.\t08:00",
  "Pro Mail\tSecurity alert: new sign-in on Windows - If this was you, no action is needed.\t07:40",
  "Jobs Plus\t15 new jobs: React Developer - Apply today to the jobs that match your profile.\t07:30",
  "Mode & Co\t40% off the whole collection, last day! - Shop the sale before midnight. Unsubscribe\t06:12",
  "Domain Registry\tYour domain name expires on November 2 - Renew it now to keep your site and email running.\tOct 18",
  "Atlas Insurance\tYour insurance certificate expires on October 31 - Please send us the new certificate for your business.\tOct 17",
  "Cloud Service\tUpdate to our terms of service - The new terms take effect on December 1.\tOct 16",
  "Woodshop & Co\tOrder #10482 confirmed - Thank you for your order, delivery is planned for Thursday.\tOct 16",
  "Product Team\tWeekly meeting notes - Sprint 14: 3 tickets shipped, 1 API blocker to clear this week.\tOct 15",
  "The Tech Letter\tNewsletter: the 5 AI trends of the week - In this issue: agents, automation and new models. Unsubscribe\tOct 15",
].join("\n");

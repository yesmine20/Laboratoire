# Documentation du projet — Lab1

## 1. Présentation

**Lab1** est une application web monopage (SPA) développée avec Angular. Elle constitue un prototype pédagogique de tableau de bord administratif : son périmètre principal est la consultation et la gestion de membres, avec une page de connexion, une navigation latérale et un tableau de bord statistique.

L’application utilise Firebase Authentication pour les opérations de connexion et de déconnexion. Les données des membres sont lues et modifiées par HTTP auprès d’une API REST simulée localement avec JSON Server.

> **État fonctionnel :** la gestion des membres et le tableau de bord disposent d’une logique applicative visible dans le code. Les sections Articles, Tools et Events ont des composants et des routes, mais leur logique métier est actuellement vide ou minimale. Ce projet doit donc être considéré comme un prototype de laboratoire, et non comme une application prête pour la production.

## 2. Technologies

| Technologie | Utilisation |
|---|---|
| Angular 21 | Framework de l’application et composants standalone |
| TypeScript | Langage de programmation |
| Angular Router | Navigation entre les vues |
| Angular Material et CDK | Éléments d’interface : tableaux, formulaires, menus, panneaux |
| AngularFire et Firebase Authentication | Connexion et déconnexion |
| HttpClient | Appels HTTP vers l’API des membres |
| RxJS | Traitement des réponses HTTP et événements de navigation |
| ng2-charts / Chart.js | Graphique du tableau de bord |
| JSON Server | API REST locale de développement |

Les versions déclarées et les commandes disponibles figurent dans [`package.json`](./package.json).

## 3. Fonctionnalités

### 3.1 Authentification

La page `Login` récupère une adresse e-mail et un mot de passe et les transmet au service d’authentification Firebase. Après une connexion réussie, l’utilisateur est redirigé vers `/member`. La déconnexion est proposée dans le menu utilisateur du layout.

La page de connexion est définie dans `src/app/login/`. Le service Firebase se trouve dans `src/services/auth-service.ts`.

La gestion des erreurs de connexion est encore sommaire. Le garde de route présent dans `src/app/auth-guard.ts` est commenté et n’est pas activé dans la configuration des routes. **Les routes ne sont donc pas protégées par ce garde à l’état actuel.**

### 3.2 Gestion des membres

La page Membres récupère la liste des membres depuis l’API et l’affiche dans un tableau Angular Material. Une suppression demande une confirmation, puis recharge la liste après la réponse de l’API.

Le formulaire de membre est utilisé pour créer un membre ou modifier un membre existant :

- `/create` ouvre un formulaire de création ;
- `/:id/edit` ouvre le formulaire d’édition et charge le membre correspondant à l’identifiant.

Le service `MemberService`, dans `src/services/member-service.ts`, expose des méthodes pour :

- récupérer tous les membres ;
- ajouter un membre ;
- récupérer un membre par identifiant ;
- mettre à jour un membre ;
- supprimer un membre.

Les requêtes ciblent actuellement `http://localhost:3000/members`.

### 3.3 Tableau de bord

La page `/dashboard` récupère la liste des membres, calcule le nombre total et agrège les membres par type. Elle prépare ces valeurs pour un graphique circulaire avec ng2-charts.

### 3.4 Navigation et autres sections

Le layout du composant `Template` comprend une barre supérieure, un menu latéral et des liens vers le tableau de bord, les membres, les outils, les articles et les événements. Le layout n’est pas affiché sur la page de connexion.

Les pages `/tools`, `/articles` et `/events` existent dans le routage et disposent de composants dédiés. Leur logique métier n’est toutefois pas implémentée dans les composants actuellement présents.

## 4. Architecture et organisation des fichiers

Les principaux fichiers applicatifs se trouvent dans `src/` :

```text
src/
├── app/
│   ├── app.config.ts          Configuration des fournisseurs Angular
│   ├── app.routes.ts          Déclaration des routes
│   ├── app.ts / app.html      Composant racine et template
│   ├── auth-guard.ts          Garde d’authentification (actuellement inactif)
│   ├── login/                 Connexion Firebase
│   ├── dashboard/             Synthèse et graphique
│   ├── member/                Liste et suppression de membres
│   ├── member-form/           Création et modification de membres
│   ├── confirme-comp/         Boîte de confirmation
│   ├── template/              Layout et navigation
│   ├── article/               Page Articles (à compléter)
│   ├── tool/                  Page Tools (à compléter)
│   └── event/                 Page Events (à compléter)
├── assets/
│   └── db10.json              Données locales pour JSON Server
├── models/                    Interfaces de données
├── services/
│   ├── auth-service.ts        Accès à Firebase Authentication
│   └── member-service.ts      Appels HTTP pour les membres
├── index.html
├── main.ts
└── styles.css
```

Les fichiers de composants suivent principalement la convention Angular du projet : un fichier TypeScript, un template HTML et une feuille de style CSS. Des fichiers de tests unitaires (`*.spec.ts`) sont également présents.

## 5. Données et API locale

Le fichier `src/assets/db10.json` contient actuellement une collection `members` avec des champs correspondant au modèle de membre :

| Champ | Description |
|---|---|
| `id` | Identifiant du membre |
| `name` | Nom affiché |
| `cin` | Numéro CIN |
| `type` | Catégorie du membre, par exemple étudiant ou enseignant |
| `createdAt` | Date de création ou date associée au membre |

Le modèle TypeScript correspondant est défini dans `src/models/Member.ts`.

JSON Server expose les opérations de cette collection sur `http://localhost:3000/members`. Il ne s’agit pas d’un backend de production : les données sont destinées au développement local.

> **Point à vérifier :** le modèle TypeScript déclare `id` comme un nombre, alors que les données d’exemple du fichier JSON contiennent des identifiants sous forme de chaînes. La cohérence du type d’identifiant doit être rétablie avant de s’appuyer sur ce contrat dans une application plus complète.

## 6. Installation et démarrage en développement

### Prérequis

- Node.js compatible avec les outils Angular installés ;
- npm ;
- accès à Firebase si l’on souhaite tester l’authentification.

### Installation

Depuis un terminal, se placer dans le dossier `lab1`, puis installer les dépendances :

```bash
cd lab1
npm install
```

### Démarrage des services

Ouvrir un premier terminal dans `lab1` et démarrer l’API JSON :

```bash
npm run json-server
```

L’API est alors attendue sur `http://localhost:3000`.

Dans un second terminal, toujours depuis `lab1`, démarrer Angular :

```bash
npm start
```

L’application est normalement accessible sur `http://localhost:4200`.

Les commandes de compilation et de tests définies par le projet sont :

```bash
npm run build
npm test
```

Le comportement exact des tests dépend de la configuration Angular et du runner configuré dans le projet.

## 7. Configuration et sécurité

La configuration Firebase est référencée depuis `src/app/env.ts` et utilisée lors de l’initialisation d’AngularFire dans `src/app/app.config.ts`. Pour un déploiement réel, il convient de gérer les paramètres selon les environnements (développement, test, production) et de configurer les règles Firebase côté serveur.

Une clé de configuration Firebase côté client ne remplace pas les règles de sécurité. L’accès aux données et aux opérations doit être contrôlé par les règles Firebase et par le backend. Il ne faut jamais placer de secrets privés ou de clés serveur dans le code livré au navigateur.

Avant une mise en production, il est également nécessaire de :

- activer et tester la protection des routes après authentification ;
- présenter clairement les erreurs de connexion et d’appels API ;
- valider les champs du formulaire côté client et côté serveur ;
- remplacer JSON Server par un backend adapté ;
- déplacer les URL d’API dans une configuration par environnement ;
- vérifier la cohérence du type d’identifiant des membres ;
- examiner les tests, les routes et la compilation de production.

## 8. Tests et qualité

Le dépôt contient plusieurs fichiers de tests pour les composants et services. Le script `npm test` lance la commande Angular configurée dans le projet. Les tests doivent être exécutés depuis le dossier `lab1`.

La documentation décrit la structure et les fonctionnalités visibles dans les sources ; elle ne certifie pas à elle seule que toutes les routes, tous les tests ou la compilation sont actuellement sans erreur.

## 9. Résumé

Lab1 est une base Angular de gestion administrative, centrée sur les membres. Elle illustre la séparation entre composants, services et modèles, l’utilisation du routeur, les appels HTTP, les formulaires, Angular Material, Firebase Authentication et un graphique de synthèse. Les pages Articles, Tools et Events, la protection des routes et plusieurs aspects de robustesse restent à développer avant d’envisager un usage de production.

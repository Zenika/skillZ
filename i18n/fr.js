export default {
  error: {
    title404: "Nous sommes désolé, page invalide !",
    text404:
      "L'URL de la page que vous avez demandé n'existe probablement pas ou est temporairement indisponible.",
    button404: "Retour au menu",
    insertSkillError:
      "Impossible d'ajouter cette compétence, vérifiez que celle-ci n'existe pas déjà.",
    unknown: "Une erreur inconnue est survenue.",
    refetch: "Réessayer",
    noData: "Aucune donnée disponible.",
    requiredField: "Ce champs est obligatoire",
    tagRequired: "Ajoutez au minimum 1 tag",
    topicRequired: "Ajoutez au minimum 1 sujet",
    duplicatedTag: "Ce tag existe déjà, vous ne pouvez pas le créer",
  },
  admin: {
    deleteSkill: "Supprimer de Skillz",
    verified: "Vérifier",
    skillsPending: "Compétences en attente de validation",
    allSkills: "Toutes les compétences",
    skills: "Compétences",
    modify: "Modifier",
    update: "Mettre à jour",
    skillList: "Liste des compétences",
    category: "Catégorie",
    categories: "Catégories",
    categoriesList: "Liste des catégories",
    topics: "Sujets associés",
    addTags: "Ajouter des tags",
    placeHolderDescription: "Modifier la description",
    save: "Sauvegarder",
    approve: "Approuver ce skill",
    description: "Description",
    notification: {
      descriptionEmpty: "La description ne peut pas être vide",
      descriptionSuccess: "La description de %skill% a été changée avec succès",
      descriptionError: "Erreur, essayez encore",
    },
  },
  nav: {
    mySkills: "Compétences",
    zenikaSkills: "Zenika",
    search: "Rechercher",
    darkmode: "Sombre",
    classic: "Classique",
    preferences: "Préférences",
  },
  sidepanel: {
    profile: "Profil",
    language: "Langue",
    darkMode: "Mode sombre",
    logout: "Se déconnecter",
    tutorial: "Mode tutoriel",
    botNotifications: "Notifications du bot Slack",
  },
  home: {
    bestSkills: "Top 5 des compétences",
    addSkill: "Ajouter une compétence",
    noSkill: "Aucune compétence",
    practices: "Pratiques",
    activities: "Activités",
    knowledge: "Connaissances",
    behaviors: "Postures",
  },
  commonPageNav: {
    addSkill: "Ajouter une compétence",
    practices: "Pratiques",
    activities: "Activités",
    knowledge: "Connaissances",
    behaviors: "Postures",
    profile: "Profil",
    search: "Recherche",
  },
  onboarding: {
    skip: "Passer",
    addSkillsDescription: "Ajoutez et gérez vos compétences",
    discoverZenikaSkillsDescription:
      "Découvrez les compétences des collaborateurs Zenika",
    home: {
      welcome:
        "Tu es actuellement en mode tutoriel. Nous serons ravis de t'aider à t'y retrouver !",
      remind:
        "Tu peux le désactiver, et le réactiver à tout moment dans ta barre de tâches.",
      remindBeginner: "Commence par noter ta première compétence",
      startTutorial: "C'est parti !",
      stopTutorial: "Arrêter le tutoriel",
    },
    demo: {
      steps: {
        back: "Retour",
        next: "Suivant",
        last: "Fermer",
        skip: "Passer",
        close: "Fermer",
      },
      home: {
        titlestep1: "Le nombre total de tes skills notés",
        step1:
          "Ici, tu peux voir le nombre total des compétences que tu as noté pour cette catégorie.",
        step2:
          "Ce sont les 5 meilleurs compétences que tu as pu noter en fonction de tes niveaux de désire, et de compétence.",
        titlestep3: "C'est parti ! 🚀",
        step3:
          "Ici, tu peux voir la représentation graphique de tes 5 meilleurs compétences. Mais en cliquant dessus, tu pourra noter de nouvelles compétences, ou modifier celles que tu souhaites !",
      },
      mine: {
        titlestep1: "Mes compétences",
        step1:
          "C'est l'onglet de tes compétences. Toutes celles que tu as déjà noté, et qui sont représentés sur le graphique, se mettent dans cette liste.",
        titlestep2: "Ajouter",
        step2:
          "Cet onglet permet de noter de nouvelles compétences qui sont déjà créées. Mais il est aussi possible d'en créer de nouvelles grâce à la barre de recherche.",
        mySkills: {
          titlestep1: "Sujets et tags",
          step1:
            "En cliquant sur une compétence, tu pourra accéder à sa description, ses Sujets et Tags. Ils permettent d'améliorer la compréhension, et d'implémenter un système de suggestion de compétence.",
          titlestep2: "Allons-y ! 🚀",
          step2:
            "Ce bouton permet de noter une compétence, et donc de l'ajouter dans ton graphique. Tu pourra la modifier à tout moment !",
        },
      },
    },
  },
  loading: {
    loadingText: "Chargement...",
  },
  createProfile: {
    title: "Créez votre profil !",
    profileCreated: "Bravo, votre profil a été créé !",
    homepage: "Retour à l'accueil",
    agency: "Premièrement, dans quelle agence travaillez vous ?",
    topics:
      "Quels sujets vous intéressent ? Ne vous en faites pas vous pouvez modifier vos choix plus tard",
    submit: "Envoyer",
    warningAgencyTitle: "Attention",
    warningAgency:
      "Pour utiliser pleinement Skillz, veuillez renseigner votre agence.",
  },
  skillLevels: {
    1: "J'ai regardé ce que c'était",
    2: "J'ai joué avec, j'ai testé",
    3: "J'ai bossé avec sur des projets significatifs",
    4: "J'ai bossé avec, je maîtrise bien, j'ai creusé le fonctionnement",
    5: "Je l'ai utilisé dans de différents contextes, je connais parfaitement",
  },
  desireLevels: {
    1: "Je ne veux plus l'utiliser et/ou je ne veux pas apprendre",
    2: "Je préfère éviter, ou seulement pour dépanner",
    3: "Je n'adore pas mais ca ne me dérange pas",
    4: "J'aime beaucoup",
    5: "Je veux l'utiliser tous les jours",
  },
  skills: {
    nothingHere: "Il n'y a rien ici, essayez d'ajouter une compétence",
    editSkill: "Modifier cette compétence",
    cancelAction: "Annuler l'action",
    mySkills: "MES COMPÉTENCES",
    addSkill: "AJOUTER",
    add: "AJOUTER",
    desireLevel: "Niveau d'appétence",
    skillLevel: "Niveau de compétence",
    searchPlaceholder: "Rechercher une compétence",
    noMatchingSkills:
      "Il n'y a pas de compétences correspondants à votre recherche",
    didYouMean: "Vouliez-vous dire :",
    addNewSkill: "Ajoutez %skill% comme nouvelle compétence",
    addButton: "Ajouter %skill%",
    modal: {
      knowledge: "Niveau de connaissance",
      desire: "Niveau d'appétence",
      cancel: "ANNULER",
      addSkill: "AJOUTER",
      editSkill: "MODIFIER",
      delete: "Supprimer",
    },
    addSkillSuccess: "La compétence %skill% a été ajoutée avec succès",
    updateSkillSuccess: "La compétence %skill% a été modifiée avec succès",
    addSkillTopicSuccess: "Le sujet %topic% a bien été ajouté au skill",
    deleteSkillTopicSuccess: "Le sujet %topic% a bien été supprimé du skill",
    deleteSkillSuccess: "La compétence %skill% a été supprimée avec succès",
    refreshSkillFailed: "Erreur lors de la récupération des compétences",
    updateSkillFailed:
      "Erreur lors de la modification de la compétence %skill%.",
    deleteSkillFailed:
      "Erreur lors de la suppression de la compétence %skill%.",
    topBar: {
      title: "Voici le graphique %category% de",
    },
    lastUpdate: "Dernière mise à jour",
    topics: {
      topics: "Sujets associés",
    },
    tags: {
      tags: "Tags associés",
      create: "Créer un nouveau tag : ",
      tagDeleted: "Le tag a été supprimé avec succès",
      tagAdded: "Le tag %tag% a été ajouté dans la liste de tags",
      tagLinked: "Le tag %tag% a été lié à %skill% avec succès",
      description:
        "Créez ou modifiez les tags que vous jugez être associés à cette compétence. Votre contribution nous permettra d'améliorer la classification des données de Skillz 🚀",
    },
  },
  myProfile: {
    onboardingButton: "C'est parti !",
    onboarding:
      "Bienvenue sur SkillZ ! 🎉 Nous vous recommandons de renseigner vos sujets préférés et vos certifications pour que votre profil soit complet. Mais commençons par votre agence.",
    lastLogin: "Dernière connexion",
    agency: "Mon agence",
    selectPlaceholder: "Sélectionner mon agence",
    contact: "Ma méthode de contact préférée",
    topics: "Mes sujets préférés",
    certifications: "Mes certifications",
    addCertification: "Ajouter une certification",
    removeCertification: "Supprimer",
    confirm: "CONFIRMER LE PROFIL",
    validFrom: "valide depuis",
    targeting: "ciblée pour le",
    validTo: "jusqu'au",
    addCert: "Ajouter Certif",
    updateUserCertSuccess: "Les certifications ont été modifiées avec succès",
    updateUserCertError: "Erreur lors de la mise à jour de la certification",
    deleteUserCertSuccess: "La certification a été supprimée avec succès",
    deleteUserCertError: "Erreur lors de la suppression de la certification",
    certModal: {
      confirm: "Confirmer",
      cancel: "Annuler",
      editCert: "Modifier",
      orDelete: "Ou supprimer?",
      addCert: "Ajouter une certif",
      selectCert: "Sélectionner une certif",
      obtained: "Je l'ai !",
      deadline: "Date ciblée",
      from: "Valide depuis",
      hasExpiryDate: "A une date limite?",
      to: "Valide jusqu'au",
      selectDate: "Sélectionner une date",
    },
  },
  userProfile: {
    agency: "Agence",
    contact: "Méthode de contact préférée",
    topics: "Sujets préférés",
    certifications: "Certifications",
    selectPlaceholder: "Agence",
    validFrom: "valide depuis",
    targeting: "ciblée pour le",
    validTo: "jusqu'au",
    addCert: "Ajouter Certif",
    seeRadars: "Voir les graphs",
    certModal: {
      confirm: "Confirmer",
      cancel: "Annuler",
      editCert: "Modifier",
      orDelete: "Ou supprimer?",
      addCert: "Ajouter une certif",
      selectCert: "Sélectionner une certif",
      obtained: "Je l'ai !",
      deadline: "Date ciblée",
      from: "Valide depuis",
      hasExpiryDate: "A une date limite?",
      to: "Valide jusqu'au",
      selectDate: "Sélectionner une date",
    },
  },
  graph: {
    scatter: {
      desire: "Niveau d'appétence",
      level: "Niveau de compétence",
    },
  },
  search: {
    placeholder: "Rechercher une compétence",
    skills: "Compétences",
    profiles: "Profils",
    placeHolderFilterSelect: "Ordre alphabétique",
    trends: "Les mieux notés",
    alphabetical: "Ordre alphabétique",
    noSkill: "Aucune compétence trouvée",
    noProfile: "Aucun profil trouvé",
    mostNoted: "Les plus notés",
    pageSkillzGraphs: {
      title: "Ce sont les graphiques Skillz de ",
    },
    result: "résultats",
  },
  statistics: {
    myTitleSection: "Mes statistiques",
    titleSection: "Statistiques",
    monthStreak: "Mois d'affilés",
    sentenceRankIncodming1: "Il te reste ",
    sentenceRankIncodming2: "xp à avoir pour être promu",
    add: "Ajouter des %label%",
    league: "Classement général",
    bronze: "Bronze",
    silver: "Argent",
    gold: "Or",
    platin: "Platine",
    diamond: "Diamant",
    numberCompetencies: "Compétences ajoutées",
    ProfileCompDesc: "Complète ta page de profil",
    ProfileCompTitle: "Page de profil",
    subobjectivesLegends:
      "Ajoute et note plus de compétences pour améliorer ton score !",
  },
};

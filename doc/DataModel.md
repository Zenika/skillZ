# skillZ — Modèle de données

Documentation de l'**état courant** du modèle de données de skillZ (Hasura / PostgreSQL).
Les référentiels sont versionnés dans `hasura/seeds/` et exportés depuis la base.

## Schéma des tables

![Schéma des tables skillZ](./DataModel.svg)

Le modèle s'organise autour de deux entités centrales :

- **`Skill`** — le référentiel de compétences. Chaque skill appartient à **une** `Category`
  (N:1) et se rattache à plusieurs `Tag` (via `SkillTag`), `Topic` (via `SkillTopic`) et
  `Certification` (via `CertificationSkill`).
- **`User`** — les collaborateur·rice·s. Un·e user porte des rôles (`UserRole` → `Role`),
  une agence (`UserAgency` → `Agency`), des centres d'intérêt (`UserTopic` → `Topic`),
  des certifications (`UserCertification` → `Certification`) et des succès (`UserAchievements`).
  Son **auto-évaluation** par skill — niveau maîtrisé et niveau désiré, historisée par date —
  vit dans **`UserSkillDesire`**.

Les tables en pointillés sont des **tables de liaison** (pivots).

## Catégories & types de topic

![Catégories et types de topic](./DomainSensitivityGeneric.svg)

- **`Category`** (4) — positionne la skill dans un quadrant via `x` (left/right) et `y` (top/bot) :
  `practices`, `activities`, `knowledge`, `behaviors`.
- **`Topic.type`** (3) — `domain` (métier / domaine technique), `sensitivity` (sensibilités et
  pratiques transverses), `generic` (transverse à tout).

## Topics

![Topics par type](./Topics.svg)

## Rôles

![Rôles par famille](./Roles.svg)

## Exemple

![Exemple : la skill ReactJS](./DataExample.svg)

## Volumétrie du référentiel

| Table | Nombre |
| --- | ---: |
| Agency | 16 |
| Category | 4 |
| Tag | 187 |
| Topic | 30 |
| Skill | 771 |
| SkillTag | 765 |
| SkillTopic | 764 |
| Certification | 153 |
| CertificationSkill | 128 |
| Role | 25 |

import re, unicodedata, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
SEED = os.path.join(HERE, "..", "hasura", "seeds", "05-skills.sql")   # tools_rao -> repo skillZ

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def norm(s):
    s = strip_accents(s).lower()
    s = re.sub(r'[^a-z0-9]', '', s)
    return s

# --- load referential skill names ---
names = []
with open(SEED, encoding='utf-8') as f:
    for line in f:
        m = re.match(r"\s*\('((?:[^']|'')*)'", line)
        if m:
            names.append(m.group(1).replace("''", "'"))
names = sorted(set(names))
norm2name = {}
for n in names:
    norm2name.setdefault(norm(n), n)

# --- requested list ---
requested = """AB Initio - AB Initio GDE
Adobe - Adobe Experience Manager (AEM)
Adobe Experience Manager
Amazon Web Services (AWS)
AMBARI
Android Studio
Angular
AngularJS
Ansible
Apache Tomcat
Appium
Archimate
ArgoCD
ARIS
Armide; Start
Artifactory
Atlassian - Confluence
Atlassian - JIRA Align
Atlassian - Jira Service Management
Atlassian - JIRA Software
Atlassian - Trello
Axway - GateWayNavigator CFT (Axway synchrony)
Azure
Bitbucket
Bonitasoft
Bootstrap
Business Objects
Chai
CouchBase
Cucumber
Datastage
DB2
Django
Docker
Easytrieve
Eclipse
Egen
Elastic Stack
eSCM CL et SP
Excalidraw
Express JS
Flask
Flutter
Foundation
Gatling
GCL
Ghostlab
Git
GitBucket
GitHub
GitLab
Gitlab CI-CD
Gradle
IBM
IntelliJ
iObeya
IVALUA
JaCoCo
Jasmine
Java Spring
Jenkins
Jest
JetBrains - Data Grip
JetBrains - IntelliJ
JetBrains - Phpstorm
Jfrog Xray
Jira XRay
Jmeter
Jobfactory
jQuery
Junit
Jupyter notebook
Kafka
Karma
Kubernetes
Laravel
Loodback
MariaDB
Maven
MicroFocus
Microfocus MFED
Microsoft - .NET
Microsoft - M365
Microsoft - MS Project
Microsoft - SQL Management Studio
Microsoft - Teams
Microsoft SQL Server
Microstrategy
MicroStrategy (MSTR)
Miro
Mocha
Mockito
MongoDB
mRemoteNG
Mural
MySql
MySql workbench
Neo4J
Neoload
Nest
Nexus
NiFi
NightWatch
Node.JS
Oracle
Phoenix
PITTest
PostgreSQL
PostMan
PTF
Puppet
Pytest
Qlik Replicate
Quarkus
React JS
React Native
REST Assured
RSA
RSA Modeler
Ruby on rails
Salt
SAP - Business Intelligence
SAP - PowerDesigner
Saucelabs
Selenium
SelfBI
SIDV2
Slack
SoapUI
SonarQube
Spark
Spring
Springboot
SQL Server
Sqoop
Stambia
Storybook
Swagger
Swift UI
Symfony
TAG Commander
Talend
Teradata
TestNG
TWS
UiPath
Vertica
visual studio code
VSCode
Vue.js
VueJS
Web methods
WinMerge
Xanpan
Xcode
XL Release
Zeroheight""".splitlines()

# alias: requested-normalized -> list of alt normalized forms to try
ALIAS = {
    'vscode': ['visualstudiocode'],
    'visualstudiocode': ['vscode'],
    'nodejs': ['node'],
    'reactjs': ['react'],
    'vuejs': ['vue'],
    'angularjs': ['angular'],
    'expressjs': ['express'],
    'springboot': ['springboot', 'spring'],
    'javaspring': ['spring'],
    'swiftui': ['swiftui'],
    'microsoftnet': ['net'],
    'microsoftsqlserver': ['sqlserver', 'microsoftsqlserver'],
    'sqlserver': ['sqlserver'],
    'oracle': ['oracledatabase', 'oracle'],
    'db2': ['db2', 'ibmdb2'],
    'restassured': ['restassured'],
    'rubyonrails': ['rubyonrails', 'rails'],
    'elasticstack': ['elasticstack', 'elk'],
    'pittest': ['pitest'],
}

# forced requested-normalized -> exact DB skill name (confirmés par grep)
FORCE = {
    'apachetomcat': 'Tomcat',
    'kafka': 'Apache Kafka',
    'nest': 'NestJS',
    'salt': 'SaltStack',
    'gitlabcicd': 'GitLab CI',
    'springboot': 'Spring Boot',
    'amazonwebservicesaws': 'AWS',
    'atlassianjirasoftware': 'Jira',
    'atlassianjiraservicemanagement': 'Jira',
    'adobeexperiencemanager': 'Adobe Experience Manager (AEM)',
}

def variants(label):
    out = []
    base = label
    # remove parenthetical
    noparen = re.sub(r'\([^)]*\)', '', label)
    parts = [label, noparen]
    # vendor prefix "A - B" -> B, A
    for p in (label, noparen):
        if ' - ' in p:
            a, b = p.split(' - ', 1)
            parts += [b, a, a + ' ' + b]
    cand = set()
    for p in parts:
        n = norm(p)
        if n:
            cand.add(n)
            cand.update(ALIAS.get(n, []))
            # strip trailing 'js'
            if n.endswith('js') and len(n) > 3:
                cand.add(n[:-2])
    return cand

print(f"Référentiel: {len(names)} skills\n")
matched, unmatched = [], []
for label in requested:
    label = label.strip()
    if not label:
        continue
    hit = None
    if norm(label) in FORCE:
        hit = FORCE[norm(label)]
    else:
        for v in variants(label):
            if v in norm2name:
                hit = norm2name[v]; break
    if hit:
        matched.append((label, hit))
    else:
        # near suggestions
        nl = norm(label)
        sugg = [nm for k, nm in norm2name.items()
                if nl and (nl in k or k in nl) and abs(len(k)-len(nl)) <= 6][:3]
        unmatched.append((label, sugg))

print(f"=== MATCHÉS ({len(matched)}) ===")
for lbl, db in matched:
    tag = '' if norm(lbl) == norm(db) else '   <-- nom DB différent'
    print(f"  {lbl:40s} -> {db}{tag}")

print(f"\n=== NON TROUVÉS ({len(unmatched)}) ===")
for lbl, sugg in unmatched:
    s = ('  ~ ' + ', '.join(sugg)) if sugg else ''
    print(f"  {lbl}{s}")

# --- génère le SQL ---
def q(s): return s.replace("'", "''")
req_rows = []
for i, label in enumerate([l.strip() for l in requested if l.strip()], 1):
    req_rows.append(f"  ({i},'{q(label)}')")
map_rows = [f"  ('{q(lbl)}','{q(db)}')" for lbl, db in matched]

AGENCIES = ['Bordeaux','Brest','Casablanca','Clermont-Ferrand','Grenoble','La Réunion',
            'Lille','Lyon','Montreal','Nantes','Niort','Paris','Rennes','Singapore','Toronto','Toulouse']
filters = ",\n".join(
    f"  COUNT(DISTINCT ud.\"userEmail\") FILTER (WHERE agency='{q(a)}') AS \"{a}\"" for a in AGENCIES)

sql = f"""WITH
req (ord, label) AS (VALUES
{chr(10).join(r + ',' for r in req_rows[:-1])}
{req_rows[-1]}
),
map_skill (label, skill) AS (VALUES
{chr(10).join(r + ',' for r in map_rows[:-1])}
{map_rows[-1]}
),
tech_skill AS (
  SELECT ms.label, s.id AS "skillId"
  FROM map_skill ms JOIN "Skill" s ON s.name = ms.skill
),
ud AS (
  SELECT DISTINCT ts.label, cs."userEmail", la.agency
  FROM tech_skill ts
  JOIN "UsersCurrentSkillsAndDesires" cs ON cs."skillId" = ts."skillId"
  JOIN "User" u             ON u.email = cs."userEmail" AND u.active
  JOIN "UserLatestAgency" la ON la."userEmail" = cs."userEmail"
)
SELECT r.label AS techno,
{filters},
  COUNT(DISTINCT ud."userEmail") AS "Total"
FROM req r
LEFT JOIN ud ON ud.label = r.label
GROUP BY r.ord, r.label
ORDER BY r.ord;
"""
with open(os.path.join(HERE, "rao_outils.sql"), "w", encoding="utf-8") as f:
    f.write(sql)
print(f"\nSQL écrit ({len(req_rows)} technos, {len(map_rows)} mappings) -> tools_rao/rao_outils.sql")

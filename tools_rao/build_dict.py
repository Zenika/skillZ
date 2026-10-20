import re, json, unicodedata, os

HERE = os.path.dirname(os.path.abspath(__file__))
SEED = os.path.join(HERE, "..", "hasura", "seeds", "05-skills.sql")   # tools_rao -> repo skillZ
DICT = os.path.join(HERE, "skill-synonyms.json")

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
def norm(s):
    return re.sub(r'[^a-z0-9]', '', strip_accents(s).lower())

# all referential skills
names = []
with open(SEED, encoding='utf-8') as f:
    for line in f:
        m = re.match(r"\s*\('((?:[^']|'')*)'", line)
        if m:
            names.append(m.group(1).replace("''", "'"))
names = sorted(set(names))
norm_names = {norm(n) for n in names}

def auto_aliases(n):
    out = set()
    m = re.search(r'\(([^)]{2,12})\)', n)          # acronyme entre parenthèses
    if m:
        out.add(m.group(1).strip())
        base = re.sub(r'\s*\([^)]*\)', '', n).strip()
        if base:
            out.add(base)
    low = n.lower()
    if low.endswith('js') or '.js' in low or low.endswith(' js'):   # variantes JS
        stem = re.sub(r'(\.js|\s*js)$', '', n, flags=re.I).strip()
        if stem:
            out.update([stem + 'JS', stem + ' JS', stem + '.js'])
    if '-' in n:
        out.add(n.replace('-', ' '))
    # ne garder que les alias utiles et non ambigus
    res = []
    for a in out:
        na = norm(a)
        if not na or na == norm(n):
            continue
        if na in norm_names and na != norm(n):   # collision avec un AUTRE skill -> on évite
            continue
        res.append(a)
    return sorted(set(res))

# charge le dico existant (sections curées à préserver)
with open(DICT, encoding='utf-8') as f:
    d = json.load(f)
syn = d.get("synonyms", {})

# fusionne alias auto dans synonyms (sans écraser le curé)
added = 0
for n in names:
    aa = auto_aliases(n)
    if not aa:
        continue
    cur = syn.get(n, [])
    curset = {norm(x) for x in cur}
    for a in aa:
        if norm(a) not in curset:
            cur.append(a); curset.add(norm(a)); added += 1
    if cur:
        syn[n] = sorted(set(cur), key=str.lower)

out = {
    "_description": d["_description"],
    "_maj": "2026-10-20",
    "_usage": d.get("_usage", ""),
    "_note_completude": f"all_skills = liste exhaustive des {len(names)} skills du référentiel SkillZ (clés autorisées). synonyms = alias (curés + auto: acronymes (), variantes JS, tirets). À enrichir à chaque RAO.",
    "synonyms": dict(sorted(syn.items(), key=lambda kv: kv[0].lower())),
    "groupings": d.get("groupings", {}),
    "loose_matches": d.get("loose_matches", {}),
    "absent_du_referentiel": d.get("absent_du_referentiel", {}),
    "all_skills": names,
}
with open(DICT, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print(f"skills: {len(names)} | synonyms clés: {len(syn)} | alias auto ajoutés: {added}")
# échantillon
for k in ["Adobe Experience Manager (AEM)", "Node.js", "Transact-SQL (T-SQL)", "Visual Studio Code", "Golang", "Kubernetes"]:
    if k in syn: print(f"  {k} -> {syn[k]}")

import sqlite3, json

# Connexion à la base SQLite
conn = sqlite3.connect('./backend/scanbillet.db')
cursor = conn.cursor()

# 🔍 Récupérer toutes les tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]

# 📤 Exporter chaque table
export = {}
for table in tables:
    cursor.execute(f"SELECT * FROM {table}")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    export[table] = [dict(zip(columns, row)) for row in rows]

# 💾 Sauvegarder dans un fichier JSON
with open("scanbillet_export.json", "w", encoding="utf-8") as f:
    json.dump(export, f, ensure_ascii=False, indent=2)

print("✅ Export complet terminé")
conn.close()

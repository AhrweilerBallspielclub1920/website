# ahrweilerbc.com – neue Vereinsseite

Statische Website mit [Astro](https://astro.build), gehostet auf Netlify, Redaktion über [Sveltia CMS](https://sveltiacms.app) unter `/admin`.

## Aufbau

| Wo | Was |
|---|---|
| `src/content/news/` | News-Beiträge (eine Markdown-Datei je Beitrag) |
| `src/content/teams/` | Mannschaften – Trainer, Trainingszeiten, Liga, Foto |
| `src/data/spiele.json` | „Die nächsten Spiele“ auf der Startseite |
| `src/data/vorstand.json`, `sponsoren.json` | Vorstand, Sponsoren |
| `src/data/gruppen.json` | Altersklassen/Seiten unter /mannschaften |
| `src/pages/` | alle übrigen Seiten |
| `src/styles/global.css` | Farben und Gestaltung (Rot, Gold, warme Töne) |
| `public/_headers` | Sicherheits-Header |
| `public/_redirects` | Weiterleitungen von alten WordPress-Adressen |
| `public/admin/config.yml` | Redaktionsbereich |

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # fertige Seite in dist/
```

## Veröffentlichen

**Jetzt (Vorschau):** Ordner `dist` in Netlify bei Projekt *ahrweilerbc-website* unter **Deploys** per Drag & Drop hochladen.

**Dauerhaft (empfohlen):**
1. Projekt in ein GitHub-Repository legen (`AhrweilerBallspielclub1920/website` (öffentlich – keine Passwörter oder internen Daten ins Repo!)).
2. In Netlify das Projekt mit dem Repository verbinden – jede Änderung wird dann automatisch gebaut.
3. Redaktions-Login einrichten:
   - In GitHub eine OAuth-App anlegen (Settings → Developer settings → OAuth Apps), Callback-URL `https://api.netlify.com/auth/done`.
   - In Netlify: Project configuration → Access & security → OAuth → GitHub-Provider mit Client-ID und Secret eintragen.
   - In `public/admin/config.yml` unter `repo:` den echten Repository-Namen eintragen.
   - Redakteure brauchen einen GitHub-Account und Schreibrechte im Repository.
4. In Netlify unter **Forms** die Formularerkennung einschalten und E-Mail-Benachrichtigungen einrichten.

## fussball.de-Tabellen und -Spielpläne einbinden

Alle Mannschaften sind bereits mit ihrer fussball.de-Seite (Saison 2026/27) verknüpft. Für die eingebettete Tabelle braucht jede Mannschaft einen Widget-Code von fussball.de:

1. Auf fussball.de mit dem Vereins-/DFBnet-Konto einloggen, Bereich **Widgets** öffnen.
2. Widget für die Mannschaft anlegen, Typ **Tabelle** (optional ein zweites vom Typ Spielplan), als Website `ahrweilerbc.com` eintragen (für die Vorschau zusätzlich `ahrweilerbc-website.netlify.app`).
3. **Code anzeigen**. Aus dem `<div class="fussballde_widget" …>` nur zwei Werte übernehmen: `data-id` (36 Zeichen) und `data-type` (z. B. `table`, `next-match`).
4. Im Redaktionsbereich unter Mannschaften → Team → „fussball.de-Widgets“ einen Eintrag hinzufügen, Typ wählen, ID einfügen, speichern.

Das Skript `https://www.fussball.de/widgets.js` bindet die Seite selbst ein – den Skript-Teil des fussball.de-Codes braucht man nicht.

Die Seite lädt das Widget erst nach einem Klick (Datenschutz). Besucher können „immer laden“ ankreuzen.

## Vor dem Go-live

- [ ] Impressum und Datenschutzerklärung aus der alten Seite übernehmen, Datenschutz um Netlify (Hosting + Formulare) ergänzen
- [ ] Mit Netlify einen Auftragsverarbeitungsvertrag (DPA) abschließen
- [ ] News-Archiv aus WordPress importieren (Werkzeuge → Daten exportieren oder WP-REST-API) – aktuell nur Kurzfassungen der letzten Beiträge
- [ ] PDFs (Mitgliedsantrag, Beitragsordnung, Satzung) nach `public/downloads/` kopieren, Links in `src/pages/mitglied-werden.astro` anpassen
- [ ] Vereinswappen, Fotos und Sponsorenlogos einsetzen (nur Fotos mit Einverständnis der Eltern)
- [ ] Platzhalter in eckigen Klammern füllen
- [ ] `X-Robots-Tag` in `public/_headers` entfernen, `public/robots.txt` freigeben, `<meta name="robots">` in `src/layouts/Base.astro` entfernen
- [ ] Domain ahrweilerbc.com in Netlify verbinden

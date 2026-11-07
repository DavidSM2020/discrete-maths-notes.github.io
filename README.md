# Discrete Mathematics — Study Notes

Static study notes for the SETU Discrete Mathematics module (Autumn 2026/27), compiled from the official lecture handouts.

## Topics

| # | Page | Covers |
|---|------|--------|
| 01 | `topics/01-computational-thinking.html` | Python fundamentals, loops, functions, `all`/`any`, PythonTutor, coding styles |
| 02 | `topics/02-logic.html` | Propositions, connectives, truth tables, equivalence, conditionals, quantifiers, rules of inference |
| 03 | `topics/03-collections.html` | Sets, power sets, set operations and identities, Cartesian products, sequences, AP/GP, Python collections |
| 04 | `topics/04-relations-and-functions.html` | Relations, domain/image, relation properties, digraphs, closures, functions, injections/surjections/bijections, composition, inverses, Caesar cipher, library of functions |
| 05 | `topics/05-enumeration.html` | Counting principles, pigeonhole, factorials, binomial coefficients, Pascal's triangle, lattice paths, permutations and combinations |
| ∑ | `cheatsheet.html` | One-page formula and reference sheet |

## Features

- No build step — plain HTML, CSS and JavaScript.
- MathJax 3 (CDN) for LaTeX-style mathematics.
- Light/dark theme with persistence.
- Sidebar navigation, mobile drawer, reading progress, back-to-top.
- On-page section search (press `/`).
- Copy buttons on every code block.
- Print-friendly styles; print the cheat sheet to PDF.

## Viewing

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd discrete-maths-notes
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

An internet connection is needed for the Google Fonts and MathJax CDNs; everything else is local.

## Source

Official course site: <https://setu-discretemathematics.github.io/live/>

Notes are a structured rewrite of the 15 lecture handouts. The module introduction, practical notebooks and tutorial sheets are not reproduced. Check the official site for the definitive syllabus and assessment details.

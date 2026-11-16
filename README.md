# Discrete Mathematics — Study Notes

Static study notes for the SETU Discrete Mathematics module (Autumn 2026/27), compiled from the official lecture handouts, tutorial sheets and past exam papers.

## Topics

| # | Page | Covers |
|---|------|--------|
| 01 | `topics/01-computational-thinking.html` | Python fundamentals, loops, functions, `all`/`any`, Σ/Π translation, PythonTutor, coding styles |
| 02 | `topics/02-logic.html` | Propositions, connectives, truth tables, classification, logic circuits, WFFs, equivalence, conditionals, quantifiers, rules of inference |
| 03 | `topics/03-collections.html` | Sets, power sets, set operations and identities, constructing sets from regions, proof by cases, Cartesian products, sequences, AP/GP, Python collections |
| 04 | `topics/04-relations-and-functions.html` | Relations, domain/image, relation properties, digraphs, closures, functions, injections/surjections/bijections, composition, inverses, Caesar cipher, library of functions, implementing functions carefully |
| 05 | `topics/05-enumeration.html` | Counting principles, pigeonhole, factorials, binomial coefficients, Pascal's triangle, constrained subsets, bit strings, lattice paths, probability by counting, permutations and combinations |
| 06 | `topics/06-graphs-and-networks.html` | Graph vocabulary, degree sequences and Havel–Hakimi, graph families, adjacency and incidence matrices, walks/trails/cycles, girth, connectivity, Eulerian and Hamiltonian graphs, trees, MST and Kruskal, NetworkX |
| ✎ | `exam-papers.html` | Exam format, topic frequency, question maps for 2022/23–2024/25, recurring question recipes with worked answers, revision plan |
| ∑ | `cheatsheet.html` | One-page formula, graph and method reference sheet |

## Features

- No build step — plain HTML, CSS and JavaScript.
- MathJax 3 (CDN) for LaTeX-style mathematics.
- Light/dark theme with persistence.
- Sidebar navigation, mobile drawer, reading progress, back-to-top.
- On-page section search (press `/`).
- Copy buttons on every code block.
- SVG diagrams for graphs.
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

Notes are a structured rewrite of the lecture handouts, with added summaries and cross-references. The exam guide is compiled from the official past papers and marking schemes. The module introduction and practical notebooks are not reproduced. Check the official site for the definitive syllabus and assessment details.

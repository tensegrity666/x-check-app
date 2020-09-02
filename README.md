# [>>>Task Board<<<](https://github.com/tensegrity666/x-check-app/projects/1)

### Naming convention and code organization.
---
* ⚠️ Commits to the __master__ branch are forbidden.
* ⚠️ Changes to the __dev__ branch are made only through Pull Requests.
* The commit message must be consistent [with the RSSchool convention](https://docs.rs.school/#/git-convention), or it will be rejected by the linter.<br>
Example: `$ git commit -m "feat: implement feature x"`
---
* Branches are named according to features, in lowercase letters and without spaces.
* Feature/components folders are named in __kebab-case only__.<br>
* The entry point of a component is always called an __index.js__.
_No need to create an empty index.js file to collect imports into it_.
* Strings and other constants are collected in a __constants.js__ file.
* All assets of a component (pictures, sounds, fonts) are stored in the folder of the same component, and not in the top-level folder.<br>
<br>
_components/<br>
 --first-component/<br>
 --second-component/<br>
 ----assets/<br>
 ----index.js<br>
 ----index.test.js<br>
 ----constants.js<br>
 ----index.module.css_
 - - -
* The code should not contain commented-out fragments, __useless comments__.
* Functions and variables should be given __clear declarative names__.
* Сomponents are arrow functions.

__Please:__
* Don't name files ".jsx", use ".js".
* Don't override linter rules unnecessarily.
* Don't forget to do `git pull` and `git merge` before pushing from your branch to avoid conflicts.
* Don't put any files (pictures, GIFs etc.) in the root of project.
---
### [Changelog](https://github.com/tensegrity666/x-check-app/blob/dev/CHANGELOG.md)
---

#### Clone repo
`$ git clone git@github.com:tensegrity666/x-check-app.git`<br>
<br>
_then checkout to_ __origin/dev__:<br>
`$ git fetch origin`<br>
`$ git checkout -b dev origin/dev`

#### Install
`$ npm i`

#### Start server
`$ npm start`<br>
_Open_ [http://localhost:3000](http://localhost:3000) _to view it in the browser._

#### Build project
`$ npm run build`


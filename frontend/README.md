# AmroTech public frontend

This directory maintains the existing public https://amrotech.pages.dev/ site.
The Laravel/Inertia app in the repository root is older and is not the source
of the current public build. Do not deploy the root or PHP files to Pages.

## Recovery boundary

`baseline/` contains the publicly served release retrieved on 2026-10-16:
HTML, Vue runtime/application, lazy Three.js scene, styles, logo and project
illustration. These are recovered **compiled artifacts, not original Vue SFCs**.
They preserve the existing animation, bilingual content and WhatsApp behavior
without replacing the site with the older Laravel design. No private source,
environment files, credentials or backend was copied into this directory.
`src/layout.css` is the editable responsive correction layer. It deliberately
loads after the baseline CSS. Original SFCs can later replace this baseline,
but they are not required to build or publish the layout corrections.

## Build from any cloud checkout

Node 22+; no dependency installation or Codespaces instance is needed:

```sh
cd frontend
npm test
npm run build
```

Output: `frontend/dist`. `build-info.json` identifies the layout and CI commit.
Build copies only the static frontend allowlist; never upload the repository.
Do not edit hash-named baseline assets. Keep corrections in source files.

## Deploy the existing project

The original project was created through Direct Upload, per the deployment
session. Its private dashboard configuration still needs account verification.
Cloudflare cannot convert a Direct Upload project to Git integration in place.
GitHub Actions + Wrangler preserves the project name and public URL.

The workflow builds/tests branches and PRs. Deployment runs only on `main`
and uses existing project `amrotech`, production branch `main` (confirm this
branch in the dashboard before enabling the first production deployment).
Configure repository secrets using GitHub's secure settings:
`CLOUDFLARE_API_TOKEN` (limited to Cloudflare Pages Edit on the owning account)
and `CLOUDFLARE_ACCOUNT_ID`. Never put either value into source or chat.
The production environment may have its own approval rules; preserve them.
No domains, paid products or new Pages projects are created by this workflow.

After publishing, verify the public `build-info.json`, both language layouts,
mobile/desktop overflow, header anchors, FAQ, contact validation and prepared
WhatsApp link. A successful build alone is not evidence of a deployment.

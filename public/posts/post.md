---
title: post
image:
  - /posts-images/img_6747-225x300.jpg
image_alt: sdv
background_image: /posts-images/img_6747-225x300.jpg
background_image_alt: bg-image
date: 2025-07-06T21:03:00.000Z
cta: votre
---
This 404 was expected and handled appropriately.

unsentRequest.js:18 

\    

\    

\    POST https://api.github.com/repos/uadopomoga/website/git/trees 422 (Unprocessable Content)

no @ unsentRequest.js:18

so @ unsentRequest.js:74

ao @ unsentRequest.js:65

JP @ API.js:62

await in JP

request @ API.js:173

await in request

createTree @ API.js:1150

updateTree @ API.js:1143

(anonymous) @ API.js:680

Promise.then

persistFiles @ API.js:680

await in persistFiles

(anonymous) @ implementation.js:438

ra @ implementation.js:87

await in ra

persistEntry @ implementation.js:438

persistEntry @ backend.js:913

await in persistEntry

(anonymous) @ entries.js:758

(anonymous) @ index.js:16

dispatch @ page.bundle.js:6

n.<computed> @ bindActionCreators.js:9

(anonymous) @ Editor.js:210

(anonymous) @ EditorInterface.js:141

await in (anonymous)

onSelection @ Dropdown.js:54

l @ createManager.js:135

o.selectItem @ MenuItem.js:47

Lc @ react-dom-client.production.js:11858

(anonymous) @ react-dom-client.production.js:12410

Lt @ react-dom-client.production.js:1470

Uc @ react-dom-client.production.js:11996

np @ react-dom-client.production.js:14699

ep @ react-dom-client.production.js:14667

c @ rocket-loader.min.js:1Understand this error

entries.js:786 API_ERROR: tree.path contains a malformed path component

\    at new t (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:8:66645)

\    at new wo (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:8:66952)

\    at nI.handleRequestError (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:54:107519)

\    at nI.request (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:54:107855)

\    at async nI.createTree (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:58:8854)

\    at async nI.updateTree (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:58:8779)

\    at async ra (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:8:74152)

\    at async wm.persistEntry (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:17:80228)

\    at async Object.onPersist (https://unpkg.com/decap-cms@%5E3.3.3/dist/decap-cms.js:54:43533)

overrideMethod @ hook.js:608

(anonymous) @ entries.js:786

Promise.catch

(anonymous) @ entries.js:785

(anonymous) @ index.js:16

dispatch @ page.bundle.js:6

n.<computed> @ bindActionCreators.js:9

(anonymous) @ Editor.js:210

(anonymous) @ EditorInterface.js:141

await in (anonymous)

onSelection @ Dropdown.js:54

l @ createManager.js:135

o.selectItem @ MenuItem.js:47

Lc @ react-dom-client.production.js:11858

(anonymous) @ react-dom-client.production.js:12410

Lt @ react-dom-client.production.js:1470

Uc @ react-dom-client.production.js:11996

np @ react-dom-client.production.js:14699

ep @ react-dom-client.production.js:14667

c @ rocket-loader.min.js:1Understand this error

Editor.js:216 Uncaught (in promise) {type: 'ENTRY_PERSIST_FAILURE', error: 'Failed to persist entry', payload: {…}}error: "Failed to persist entry"payload: {collectionName: 'blog', entrySlug: '', error: 'API_ERROR: tree.path contains a malformed path component'}type: "ENTRY_PERSIST_FAILURE"\[[Prototype]]: Object

(anonymous) @ Editor.js:216

await in (anonymous)

(anonymous) @ EditorInterface.js:141

await in (anonymous)

onSelection @ Dropdown.js:54

l @ createManager.js:135

o.selectItem @ MenuItem.js:47

Lc @ react-dom-client.production.js:11858

(anonymous) @ react-dom-client.production.js:12410

Lt @ react-dom-client.production.js:1470

Uc @ react-dom-client.production.js:11996

np @ react-dom-client.production.js:14699

ep @ react-dom-client.production.js:14667

c @ rocket-loader.min.js:1Understand this error

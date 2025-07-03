// ==UserScript==
// @name         WulfilaVerse
// @namespace    https://2sh.me/
// @version      v1.1.0
// @description  Add Wulfila.be links to BibleHub
// @author       mafcadio
// @match        https://biblehub.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wulfila.be
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const wulfilaBeFavicon = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAydJREFUWMPFl08s22EYxz/9Uarznybt/DkwRbJkLDhsYiFi2WGXiZOILBwc5ihx3LkRp4ZEQji5kEVsMhLMUskaiiGRTjcTq2WRHmqYqrY77DfzqmqV1ff2Pr83z/t9nvd5nt/7VXAKL8rLJaARqAJKAD0gcTV4gU/APDAFDBhNJu/fj4pTh98B+oGH/F+YgOdGk8l2QkA+fBGIJzLYA4qNJpNNIaf9fQQiPy8Tj6LlOxcOl6KiSNXpSM/K4lZyMh63G7fLhc1iwXVwcK43hSShycoiQ68nJi4Oz/ExVrOZnw5HIALlQGO0XHACiqqrqWpoEGzfbTbW5+YChpOq0/G0tZUUrfbEdreigv729ouyUCnJ1S7g88IC+HxnQlRw5HIF9OSw2/k4OSnYjo+Ogl1DiSS3mgDnzg4bKyuCTZebS4Zef6G3fadTWB8dHgYjkC8F6vPlqSn/fNXXo5ACjwWf1yusF8bHgxEI7G3dYuHL0pJg0+bkcL+mJqA3fVnZvxIfGsJmsQRthQvC8fG2p8cvreV1dSRpNH7bY9VqcouL/2RvepoPIyMh9eKFY/Zgd5ex7m58pwpSGRvLk5YWlDExwt57VVVEKZXMj40x0dfnX8ThEADYXF3ltdGI1+M5sWXm5/OsrQ2lSgVAilbLg9paVmZmeDc4GPLhAFFl2dkvg21y2O3sbG2RV1qKJJdNkkZDdmEh36xWHjc3o05KYthgwON2X2ochvyns1ksvOrs5PjUAbfz8mjq6CCzoIAfGxsBp+S1EAD4urzMsMGA+5yBdNnIwyIAsLW2xpDBIBQmQEJaWmQIANitVhYnJgRbYloaKBSRIQBgHh0V1kqVCpVaHTkC+04nh3t7V76G8N97Ph8Ou93/GiJGAHBsb99gBuQBdaMZ+HWmBhLT08Mi4A2XQGxcnLCOT0m5tGaQZNEQHoEzbbe5unpZF1ZJVixXJmA1m/1mQwiYl2S5FBYSUlMBWJud5U1Xl/DLDhHT0cAA0BSOMDnY3WWit5eVmRm/92CIwmTgxqWZBCALxWJgNkKSrEgQp+fI80pZsORfkzy3ysU+fVae/wYiDhwL7EaQ2AAAAABJRU5ErkJggg==`
  const wulfileBeImage = `<img style='height: 20px;' src="data:image/png;base64,${wulfilaBeFavicon}">`

  const bookFragments = {
    "matthew": [
      [[ 5, 15], [ 6, 32]],
      [[ 7, 12], [10,  1]],
      [[10, 23], [11, 25]],
      [[25, 38], [26,  3]],
      [[26, 65], [27, 66]],
    ],
    "john": [
      [[ 5, 45], [ 7, 52]],
      [[ 8, 12], [12, 49]],
      [[13, 11], [19, 13]],
    ],
    "luke": [
      [[ 1,  1], [10, 30]],
      [[14,  9], [16, 24]],
      [[17,  3], [20, 46]],
    ],
    "mark": [
      [[ 1,  1], [ 6, 30]],
      [[ 6, 53], [12, 38]],
      [[13, 16], [13, 29]],
      [[14,  4], [14, 16]],
      [[14, 41], [16, 20]],
    ],
    "romans": [
      [[ 6, 23], [ 6, 23]],
      [[ 7,  1], [ 8, 10]],
      [[ 8, 34], [11,  1]],
      [[11, 11], [12,  5]],
      [[12,  8], [14,  5]],
      [[14,  9], [14, 20]],
      [[15,  3], [15, 13]],
      [[16, 21], [16, 24]],
    ],
    "1 corinthians": [
      [[ 1, 12], [ 1, 25]],
      [[ 4,  2], [ 4, 12]],
      [[ 5,  3], [ 6,  1]],
      [[ 7,  5], [ 7, 28]],
      [[ 8,  9], [ 9,  9]],
      [[ 9, 19], [10,  4]],
      [[10, 15], [11,  6]],
      [[11, 21], [11, 31]],
      [[12, 10], [12, 22]],
      [[13,  1], [13, 12]],
      [[14, 20], [14, 27]],
      [[15,  1], [15, 35]],
      [[15, 46], [16, 24]],
    ],
    "2 corinthians": [
      [[ 1,  1], [13, 13]],
    ],
    "ephesians": [
      [[ 1,  1], [ 5, 29]],
      [[ 6,  8], [ 6, 24]],
    ],
    "galatians": [
      [[ 1,  1], [ 1,  7]],
      [[ 1, 20], [ 3,  6]],
      [[ 3, 27], [ 6, 18]],
    ],
    "philippians": [
      [[ 1, 14], [ 2,  8]],
      [[ 2, 22], [ 4, 17]],
    ],
    "colossians": [
      [[ 1, 16], [ 1, 29]],
      [[ 2, 11], [ 4, 19]], // 4:19 is actually the end of 4:18
    ],
    "1 thessalonians": [
      [[ 2, 10], [ 5, 28]],
    ],
    "2 thessalonians": [
      [[ 1,  1], [ 2,  4]],
      [[ 2, 15], [ 3, 18]],
    ],
    "1 timothy": [
      [[ 1,  1], [ 5, 14]],
      [[ 5, 16], [ 6, 16]],
    ],
    "2 timothy": [
      [[ 1,  1], [ 4, 16]]
    ],
    "titus": [
      [[ 1,  1], [ 2,  1]],
    ],
    "philemon": [
      [[ 1, 11], [ 1, 23]],
    ],
    "nehemiah": [
      [[ 5, 13], [ 5, 18]],
      [[ 6, 14], [ 7,  3]],
      [[ 7, 13], [ 7, 45]],
    ]
  }

  function checkVerse(loc)
  {
    if (!bookFragments[loc.book]) return false
    for (const c of bookFragments[loc.book])
    {
      const [cStart, vStart] = c[0]
      const [cEnd, vEnd] = c[1]
      if (loc.chapter < cStart)
        return false
      if (cStart < loc.chapter && loc.chapter < cEnd)
        return true
      if (cStart == cEnd)
      {
        if (cStart == loc.chapter && vStart <= loc.verse && loc.verse <= vEnd)
          return true
      }
      else
      {
        if (cStart == loc.chapter && vStart <= loc.verse)
          return true
        if (cEnd == loc.chapter && loc.verse <= vEnd)
          return true
      }
    }
    return false
  }

  const wulfilaBeBookMap = {
    "matthew": 1,
    "john": 2,
    "luke": 3,
    "mark": 4,
    "romans": 5,
    "1 corinthians": 6,
    "2 corinthians": 7,
    "ephesians": 8,
    "galatians": 9,
    "philippians": 10,
    "colossians": 11,
    "1 thessalonians": 12,
    "2 thessalonians": 13,
    "1 timothy": 14,
    "2 timothy": 15,
    "titus": 16,
    "philemon": 17,
    "nehemiah": 18,
  }

  function toWulfilaBeUrl(loc)
  {
    const b = wulfilaBeBookMap[loc.book].toString().padStart(2, '0')
    const c = loc.chapter.toString().padStart(2, '0')
    const v = loc.verse
    return `https://www.wulfila.be/gothic/browse/text/${b}/${c}.html#V${v}`
  }

  function createWulfilaBeLink(loc)
  {
    const base = document.createElement('span')

    if (checkVerse(loc))
    {
      const url = toWulfilaBeUrl(loc)
      base.innerHTML = `<a href='${url}'>${wulfileBeImage}</a>`
    }
    else
    {
      base.innerHTML =
        `<span style='filter: grayscale(100%)'>${wulfileBeImage}</span>`
    }
    base.style.margin = '0 4px'
    return base
  }

  function parseVerse(verseText)
  {
    const matches = verseText.match(
      /((?:[1-9][_ ])?[a-z]+?)[ \/]?([0-9]+)[:-]([0-9]+)/i)
    if (!matches) return null
    return {
      book: matches[1].replace('_', ' ').toLowerCase(),
      chapter: matches[2],
      verse: matches[3],
    }
  }

  function processBibleHub()
  {
    if (location.hostname != "biblehub.com") return
    const loc = parseVerse(location.pathname)
    const socMediaTable = document.querySelector('#anc2 tr')

    if (loc && socMediaTable)
    {
      const wLink = createWulfilaBeLink(loc)
      const tr = document.createElement('tr')
      tr.append(wLink)
      socMediaTable.append(tr)
    }

    const pageLinks = document.querySelectorAll('a')
    for (const link of pageLinks)
    {
      const loc = parseVerse(link.textContent)
      if (loc && checkVerse(loc))
      {
        const wLink = createWulfilaBeLink(loc)
        link.insertAdjacentElement('afterend', wLink)
      }
    }
  }

  window.addEventListener('load', function()
  {
    processBibleHub()
  })
})();
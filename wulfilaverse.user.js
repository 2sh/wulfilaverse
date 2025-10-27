// ==UserScript==
// @name         WulfilaVerse
// @namespace    https://2sh.me/
// @version      v2.1.0
// @description  Add Wulfila.be links to BibleHub
// @author       mafcadio
// @match        https://biblehub.com/*
// @match        https://www.wulfila.be/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wulfila.be
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const wulfilaBeFavicon = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAydJREFUWMPFl08s22EYxz/9Uarznybt/DkwRbJkLDhsYiFi2WGXiZOILBwc5ihx3LkRp4ZEQji5kEVsMhLMUskaiiGRTjcTq2WRHmqYqrY77DfzqmqV1ff2Pr83z/t9nvd5nt/7VXAKL8rLJaARqAJKAD0gcTV4gU/APDAFDBhNJu/fj4pTh98B+oGH/F+YgOdGk8l2QkA+fBGIJzLYA4qNJpNNIaf9fQQiPy8Tj6LlOxcOl6KiSNXpSM/K4lZyMh63G7fLhc1iwXVwcK43hSShycoiQ68nJi4Oz/ExVrOZnw5HIALlQGO0XHACiqqrqWpoEGzfbTbW5+YChpOq0/G0tZUUrfbEdreigv729ouyUCnJ1S7g88IC+HxnQlRw5HIF9OSw2/k4OSnYjo+Ogl1DiSS3mgDnzg4bKyuCTZebS4Zef6G3fadTWB8dHgYjkC8F6vPlqSn/fNXXo5ACjwWf1yusF8bHgxEI7G3dYuHL0pJg0+bkcL+mJqA3fVnZvxIfGsJmsQRthQvC8fG2p8cvreV1dSRpNH7bY9VqcouL/2RvepoPIyMh9eKFY/Zgd5ex7m58pwpSGRvLk5YWlDExwt57VVVEKZXMj40x0dfnX8ThEADYXF3ltdGI1+M5sWXm5/OsrQ2lSgVAilbLg9paVmZmeDc4GPLhAFFl2dkvg21y2O3sbG2RV1qKJJdNkkZDdmEh36xWHjc3o05KYthgwON2X2ochvyns1ksvOrs5PjUAbfz8mjq6CCzoIAfGxsBp+S1EAD4urzMsMGA+5yBdNnIwyIAsLW2xpDBIBQmQEJaWmQIANitVhYnJgRbYloaKBSRIQBgHh0V1kqVCpVaHTkC+04nh3t7V76G8N97Ph8Ou93/GiJGAHBsb99gBuQBdaMZ+HWmBhLT08Mi4A2XQGxcnLCOT0m5tGaQZNEQHoEzbbe5unpZF1ZJVixXJmA1m/1mQwiYl2S5FBYSUlMBWJud5U1Xl/DLDhHT0cAA0BSOMDnY3WWit5eVmRm/92CIwmTgxqWZBCALxWJgNkKSrEgQp+fI80pZsORfkzy3ysU+fVae/wYiDhwL7EaQ2AAAAABJRU5ErkJggg==`
  const wulfileBeImage = `<img style='height: 20px;' src="data:image/png;base64,${wulfilaBeFavicon}">`

  const bibleHubFavicon = `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`
  const bibleHubImage = `<img style='height: 15px;' src="data:image/png;base64,${bibleHubFavicon}">`

  const bookFragments = {
    "matthew": [
      [[ 5, 15], [ 6, 32]],
      [[ 7, 12], [10,  1]],
      [[10, 23], [11, 25]],
      [[25, 38], [26,  3]],
      [[26, 65], [27, 19]],
      [[27, 42], [27, 66]],
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

  const wulfilaBeBooks = [
    "matthew",
    "john",
    "luke",
    "mark",
    "romans",
    "1 corinthians",
    "2 corinthians",
    "ephesians",
    "galatians",
    "philippians",
    "colossians",
    "1 thessalonians",
    "2 thessalonians",
    "1 timothy",
    "2 timothy",
    "titus",
    "philemon",
    "nehemiah",
  ]

  function getWulfilaBeBookNumber(name)
  {
    return wulfilaBeBooks.indexOf(name)+1
  }

  function getNameFromWulfilaBeBookNumber(number)
  {
    return wulfilaBeBooks[number-1]
  }

  function toWulfilaBeUrl(loc)
  {
    const b = getWulfilaBeBookNumber(loc.book).toString().padStart(2, '0')
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

  function createWulfilaBeLinks(loc)
  {
    const links = document.createElement('span')
    links.style.margin = "5px"

    const underscoreBook = loc.book
      .replaceAll(" ", "_")

    links.append((() =>
    {
      const link = document.createElement('a')
      link.href = `https://biblehub.com/${underscoreBook}/${loc.chapter}-${loc.verse}.htm`
      link.innerHTML = bibleHubImage
      return link
    })())
    return links
  }

  function processWulfilaBe()
  {
    if (location.hostname != "www.wulfila.be") return
    if (window.location.pathname.startsWith("/gothic/browse/search/"))
    {
      const results = document.getElementById('results')
      const observer = new MutationObserver(() =>
      {
        for (const el of results.querySelectorAll("dt a"))
        {
          if (el.dataset.linkAdded)
            return

          const matches = el.href.match(/\/text\/([0-9]+)\/([0-9]+).html#V([0-9]+)/)
          const loc = {
            book: getNameFromWulfilaBeBookNumber(parseInt(matches[1])),
            chapter: parseInt(matches[2]),
            verse: parseInt(matches[3]),
          }

          el.insertAdjacentElement('afterend',
              createWulfilaBeLinks(loc))
          el.dataset.linkAdded = true
        }
      })
      observer.observe(results, {
        attributes: true, childList: true, subtree: true });
    }
    else if (window.location.pathname.startsWith("/gothic/browse/text/"))
    {
      const matches = window.location.pathname
        .match(/\/text\/([0-9]+)\/([0-9]+).html/)
      for (const el of document.querySelectorAll("dl.text dt"))
      {
        const verseMatch = el.id.match(/([0-9]+)/)
        const verse = parseInt(verseMatch[1])
        if (verse < 1) continue
        const loc = {
          book: getNameFromWulfilaBeBookNumber(parseInt(matches[1])),
          chapter: parseInt(matches[2]),
          verse,
        }

        el.appendChild(createWulfilaBeLinks(loc))
      }
    }
  }

  function run()
  {
    processBibleHub()
    processWulfilaBe()
  }

  if (document.readyState == "complete")
    run()
  else
    window.addEventListener('load', run)

})();

/*
 * Copyright 2013 Marconi Lanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var RegexMatcher = function (regex, text) {

  var match = function (regex, text) {
    if (regex.length === 0)
      return true

    if (regex[0] === '$' && regex.length === 1)
      return text.length === 0

    if (next(regex, '?'))
      return matchQuestion(regex[0], regex.slice(2), text)

    if (next(regex, '+'))
      return matchPlus(regex[0], regex.slice(2), text)

    if (next(regex, '*'))
      return matchStar(regex[0], regex.slice(2), text)

    if (matchChar(regex[0], text))
      return match(regex.slice(1), text.slice(1))

    return false
  }

  var matchChar = function (c, text) {
    return text.length !== 0 && (c === '.' || c === text[0])
  }

  var matchQuestion = function (c, regex, text) {
    return match(regex, text) ||
        (matchChar(c, text) && match(regex, text.slice(1)))
  }

  var matchPlus = function (c, regex, text) {
    return matchChar(c, text) && matchStar(c, regex, text.slice(1))
  }

  var matchStar = function (c, regex, text) {
    return scan(regex, text, function (t) {
      return matchChar(c, t)
    })
  }

  var next = function (regex, c) {
    return regex.length > 1 && regex[1] === c
  }

  var scan = function (regex, text, cond) {
    var t = text
      , mtc = match(regex, t)
    while (!mtc && cond(t)) {
      t = t.slice(1)
      mtc = match(regex, t)
    }
    return mtc
  }

  if (regex.length === 0)
    return true

  if (regex[0] === '^')
    return match(regex.slice(1), text)

  return scan(regex, text, function (t) {
    return t.length !== 0
  })
}

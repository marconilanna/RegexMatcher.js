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
test("Simple matches", function () {
	ok(RegexMatcher("", ""))
	ok(RegexMatcher("", "a"))
	ok(RegexMatcher("a", "a"))
	ok(RegexMatcher("ab", "ab"))
	ok(RegexMatcher("ab", "abc"))
	ok(RegexMatcher("ab", "zab"))
	ok(RegexMatcher("ab", "zabc"))
	ok(RegexMatcher("ab", "aabc"))
})

test("Non-matches", function () {
	ok(!RegexMatcher("a", ""))
	ok(!RegexMatcher("a", "b"))
	ok(!RegexMatcher("ab", "ba"))
	ok(!RegexMatcher("ab", "bac"))
	ok(!RegexMatcher("ab", "zba"))
	ok(!RegexMatcher("ab", "zbac"))
	ok(!RegexMatcher("ab", "baac"))
})

test("Start anchor", function () {
	ok(RegexMatcher("^", ""))
	ok(RegexMatcher("^a", "a"))
	ok(RegexMatcher("^ab", "ab"))
	ok(RegexMatcher("^ab", "abc"))

	ok(!RegexMatcher("^a", ""))
	ok(!RegexMatcher("^a", "za"))
})

test("End anchor", function () {
	ok(RegexMatcher("$", ""))
	ok(RegexMatcher("a$", "a"))
	ok(RegexMatcher("a$", "za"))
	ok(RegexMatcher("ab$", "ab"))
	ok(RegexMatcher("ab$", "zab"))

	ok(!RegexMatcher("a$", ""))
	ok(!RegexMatcher("a$", "ab"))
})

test("Dot", function () {
	ok(RegexMatcher(".", "."))
	ok(RegexMatcher(".", "a"))
	ok(RegexMatcher(".", "ab"))
	ok(RegexMatcher("a.", "ab"))
	ok(RegexMatcher(".b", "ab"))
	ok(RegexMatcher("a.c", "abc"))

	ok(!RegexMatcher(".", ""))
	ok(!RegexMatcher("a.", "a"))
	ok(!RegexMatcher(".a", "a"))
})

test("Question mark", function () {
	ok(RegexMatcher("a?", ""))
	ok(RegexMatcher("a?", "a"))
	ok(RegexMatcher("a?", "b"))
	ok(RegexMatcher("a?", "aa"))
	ok(RegexMatcher("a?", "za"))
	ok(RegexMatcher("a?", "zaa"))
	ok(RegexMatcher("a?b", "ab"))
	ok(RegexMatcher("a?b", "b"))
	ok(RegexMatcher("a?b", "aab"))
	ok(RegexMatcher("ab?c", "abc"))
	ok(RegexMatcher("ab?c", "ac"))
	ok(RegexMatcher("ab?c", "aabc"))

	ok(!RegexMatcher("ab?c", "abbc"))
})

test("Plus", function () {
	ok(RegexMatcher("a+", "a"))
	ok(RegexMatcher("a+", "aa"))
	ok(RegexMatcher("a+", "za"))
	ok(RegexMatcher("a+", "zaa"))
	ok(RegexMatcher("a+b", "ab"))
	ok(RegexMatcher("a+b", "aab"))
	ok(RegexMatcher("ab+c", "abc"))
	ok(RegexMatcher("ab+c", "aabc"))
	ok(RegexMatcher("ab+c", "abbbc"))

	ok(!RegexMatcher("a+", ""))
	ok(!RegexMatcher("a+", "z"))
	ok(!RegexMatcher("a+b", "b"))
})

test("Star", function () {
	ok(RegexMatcher("a*", ""))
	ok(RegexMatcher("a*", "a"))
	ok(RegexMatcher("a*", "aa"))
	ok(RegexMatcher("a*", "z"))
	ok(RegexMatcher("a*", "za"))
	ok(RegexMatcher("a*", "zaa"))
	ok(RegexMatcher("a*b", "b"))
	ok(RegexMatcher("a*b", "ab"))
	ok(RegexMatcher("a*b", "aab"))
	ok(RegexMatcher("ab*c", "abc"))
	ok(RegexMatcher("ab*c", "aabc"))
	ok(RegexMatcher("ab*c", "abbbc"))
})

test("Complex matches", function () {
	ok(RegexMatcher("^.*$", ""))
	ok(RegexMatcher("^.*$", "a"))
	ok(RegexMatcher("^.*$", "ab"))
	ok(RegexMatcher("^a*$", "a"))
	ok(RegexMatcher("^a*$", "aa"))
	ok(RegexMatcher("a.*c", "zaabcd"))

	ok(!RegexMatcher("^a*$", "ab"))
})

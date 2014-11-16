// Locco Markdown adapter
// ======================
//
// Creates Markdown files side by side with the original files. Optionally
// uses one of them as the general README.
//
// [Locco](https://github.com/xaviervia/locco) plugin.
//
// Usage
// -----
//
// ```sh
// locco --source=src/**/*.js --adapter=markdown \
//       --comment=// --escape=! --adapter-readme=locco.js
// ```
//
var example   = require("washington")
var assert    = require("assert")
var Mediador  = require("mediador")

var LoccoMarkdown = function (options) {
  this.options = options
}

LoccoMarkdown.prototype = Object.create(Mediador.prototype)

// Methods
// -------
//
// ### comment
//
// Receives a comment string and a file path and emits a `post` event with the
// new path and
//
// #### Arguments
//
// - `Object` options
//   - `String` comment
//   - `Object` file
//     - `String` path
//
// #### Events
//
// - `post`
//   - `String` targetFile
//   - `String` line
LoccoMarkdown.prototype.comment = function (options) {
  if (this.options && this.options.readme === options.file.path)
    targetFile = "README.md"
  else
    targetFile = options.file.path.replace(/\.[0-9A-Za-z].+?$/, ".md")

  targetFile = targetFile.replace(/index\.md$/, "README.md")
  this.emit("post", [targetFile, options.comment + "\n"])
}

example("should emit post with the line and target .md", function () {
  var listener = {
    post: function (target, line) {
      (this.post.calls = this.post.calls || [])
        .push([target, line]) } }

  var commentToMarkdown = new LoccoMarkdown()
    .on(listener)

  commentToMarkdown.comment({
    comment: "My comment",
    file: {
      path: "the/file.js"
    }
  })

  assert.equal(listener.post.calls[0][0], "the/file.md")
  assert.equal(listener.post.calls[0][1], "My comment\n")
})


example("should replace index for README.md", function () {
  var listener = {
    post: function (target, line) {
      (this.post.calls = this.post.calls || [])
        .push([target, line]) } }

  var commentToMarkdown = new LoccoMarkdown()
    .on(listener)

  commentToMarkdown.comment({
    comment: "My comment",
    file: {
      path: "the/index.coffee"
    }
  })

  assert.equal(listener.post.calls[0][0], "the/README.md")
  assert.equal(listener.post.calls[0][1], "My comment\n")
})


example("general README path should be configurable", function () {
  var listener = {
    post: function (target, line) {
      (this.post.calls = this.post.calls || [])
        .push([target, line]) } }

  var commentToMarkdown = new LoccoMarkdown({ readme: "the/file.rb"})
    .on(listener)

  commentToMarkdown.comment({
    comment: "My comment",
    file: {
      path: "the/file.rb"
    }
  })

  assert.equal(listener.post.calls[0][0], "README.md")
  assert.equal(listener.post.calls[0][1], "My comment\n")
})

module.exports = LoccoMarkdown

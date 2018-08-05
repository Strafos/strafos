import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
// import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";

import "react-quill/dist/quill.snow.css"; // ES6
import "./Editor.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { content } = nextProps;
    this.setState({
      editorHtml: content.replace(/<\/p>/g, "</p><br />"),
    });
  }

  handleChange(content, delta, source, editor) {
    this.setState({ editorHtml: content });
  }

  render() {
    return (
      <div>
        <Container
          onScroll={() => window.refreshPopup()}
          fluid
          style={{ float: "left" }}
          id="scrollable-content"
        >
          <Container style={{ float: "left" }}>
            <ReactQuill
              className="quill-container"
              theme="snow"
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              value={this.state.editorHtml}
              modules={Editor.modules}
              formats={Editor.formats}
              bounds={".app"}
              placeholder={this.props.placeholder}
            />
          </Container>
        </Container>
      </div>
    );
  }
}

let Inline = Quill.import("blots/inline");

class CommentBlot extends Inline {
  static create(commentText) {
    const node = super.create();
    node.dataset.content = commentText.comment;
    node.dataset.position = "right center";
    if (commentText.id) {
      node.dataset.id = commentText.id;
    }
    if (commentText.resolved) {
      node.dataset.resolved = commentText.resolved;
    }
    return node;
  }
  static formats(node) {
    return node.dataset;
  }

  format(name, value) {
    super.format(name, value);
  }
}

CommentBlot.blotName = "comment";
CommentBlot.tagName = "span";
CommentBlot.className = "ui";

Quill.register({
  "formats/comment": CommentBlot,
});

class InlineComment {
  constructor(quill) {
    this.quill = quill;

    // Attach handler to toolbar icon (that doesn't exist yet)
    this.toolbar = quill.getModule("toolbar");
    if (typeof this.toolbar !== "undefined")
      this.toolbar.addHandler("comment", this.commentEventHanlder);

    // Couple handler with keyboard event
    quill.keyboard.addBinding(
      { key: "M", ctrlKey: true },
      this.commentEventHanlder
    );

    // Create comment icon
    var commentBtns = document.getElementsByClassName("ql-comment");
    if (commentBtns) {
      [].slice.call(commentBtns).forEach(function(commentBtn) {
        commentBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"><g fill="none" fill-rule="evenodd"><path fill="#444" fill-rule="nonzero" d="M9.92 11H13c1.66 0 3-1.36 3-3V5c0-1.66-1.34-3-3-3H5C3.34 2 2 3.34 2 5v3c0 1.64 1.34 3 3 3h1.44l.63 1.88 2.85-1.9zM5 0h8c2.76 0 5 2.24 5 5v3c0 2.75-2.24 5-5 5h-2.47L7.1 15.26c-.47.3-1.1.2-1.4-.27-.05-.1-.08-.18-.1-.26L5 13c-2.76 0-5-2.25-5-5V5c0-2.76 2.24-5 5-5z"/><path stroke="#444" stroke-width="2" d="M5.37 5H13M5.37 8H10" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
      });
    }
  }

  commentEventHanlder() {
    let quill = this.quill;
    checkDialogExist(quill);
  }
}

function checkDialogExist(quill) {
  let commentToolTip = document.getElementById("inline-comment");
  let commentMask = document.getElementById("inline-comment-mask");
  if (commentToolTip) {
    // This only handles case where a dialog box is open
    // We need to handle the case where a comment is written
    commentToolTip.remove();
    commentMask.remove();
  } else {
    createCommentDialog(quill);
  }
}

// Opens up a small dialog box to write a comment
function createCommentDialog(quill) {
  let range = quill.getSelection();
  let text = quill.getText(range.index, range.length);
  if (text.length < 1) {
    return;
  }
  const atSignBounds = quill.getBounds(range.index);
  let containerMask = document.createElement("div");
  containerMask.id = "inline-comment-mask";
  containerMask.style.width = "100%";
  containerMask.style.height = "100%";
  containerMask.style.top = "0px";
  containerMask.style.position = "fixed";
  containerMask.style.display = "block";

  let container = document.createElement("div");
  container.id = "inline-comment";
  container.classList.add("inline-comment");
  quill.container.appendChild(container);
  quill.container.appendChild(containerMask);
  container.style.position = "absolute";
  container.innerHTML =
    '<textarea class="commentText" placeholder="Type your comment"></textarea><div class="inline-comment-bottom"><button class="inline-send">Send</button> </div>';

  container.style.left = atSignBounds.left - 250 + "px";

  if (atSignBounds.left + 250 < quill.container.clientWidth) {
    container.style.left = atSignBounds.left + "px";
  }

  container.style.top = 10 + atSignBounds.top + atSignBounds.height + "px";
  container.style.zIndex = 80;
  document.querySelector(".commentText").focus();

  let commentToolTip = document.querySelector(".inline-comment");
  let inlineSend = document.querySelector(".inline-send");

  inlineSend.addEventListener("click", function() {
    const commentObj = {};
    let commentText = document.querySelector(".commentText").value;
    commentObj.comment = commentText;
    commentToolTip.remove();
    containerMask.remove();
    quill.format("comment", commentObj);
    window.refreshPopup();
  });
}

Quill.register("modules/inline_comment", InlineComment);

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      // ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ color: [] }, { background: [] }],
      [{ font: [] }],
      // [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
      ["comment"], // Need this to add comment to toolbar
    ],
    handlers: { comment: function() {} },
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  inline_comment: true, //And this as well
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "comment",
];

/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;

import { Component } from "react";
import { v4 } from "uuid";

import CommentItem from "../CommentItem";

import "./index.css";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

class Comments extends Component {
  state = {
    nameInput: "",
    commentInput: "",
    commentsList: [],
  };

  deleteComment = (commentId) => {
    const { commentsList } = this.state;

    this.setState({
      commentsList: commentsList.filter((comment) => comment.id !== commentId),
    });
  };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      commentsList: prevState.commentsList.map((eachComment) => {
        if (id === eachComment.id) {
          return { ...eachComment, isLiked: !eachComment.isLiked };
        }
        return eachComment;
      }),
    }));
  };

  renderCommentsList = () => {
    const { commentsList } = this.state;

    return commentsList.map((eachComment) => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ));
  };

  onAddComment = (event) => {
    event.preventDefault();
    const { nameInput, commentInput } = this.state;
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1
        )
      ]
    }`;
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    };

    this.setState((prevState) => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: "",
      commentInput: "",
    }));
  };

  onChangeCommentInput = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };

  onChangeNameInput = (event) => {
    this.setState({
      nameInput: event.target.value,
    });
  };

  render() {
    const { nameInput, commentInput, commentsList } = this.state;

    return (
      <>
        <h1 className="app-heading">Reviews</h1>
        <div className="app-container">
          <div className="comments-container">
            <div className="comments-inputs">
              <form className="form" onSubmit={this.onAddComment}>
                <p className="form-description">
                  Say something about{" "}
                  <strong style={{ color: "blue" }}>
                    {this.props.animeName}
                  </strong>
                </p>
                <input
                  type="text"
                  className="name-input"
                  placeholder="Your Name"
                  value={nameInput}
                  onChange={this.onChangeNameInput}
                />
                <textarea
                  placeholder="Your Review"
                  className="comment-input"
                  value={commentInput}
                  onChange={this.onChangeCommentInput}
                  rows="6"
                />
                <button type="submit" className="add-button">
                  Add Review
                </button>
              </form>
            </div>

            <div>
              <h1 style={{ fontSize: "20px", marginLeft: "100px" }}>
                <span className="comments-count">{commentsList.length}</span>
                Reviews
              </h1>
              <ul className="comments-list">{this.renderCommentsList()}</ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Comments;

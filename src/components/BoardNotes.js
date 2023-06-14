import React, { Component } from "react";
import NewNoteForm from "./NewNoteForm.js";
import ItemNote from "./ItemNote.js";

export default class BoardNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.URL = "https://crud-b.vercel.app/";
  }

  render() {
    return (
      <React.Fragment>
        <h2>
          Notes{" "}
          <span className="material-icons refresh" onClick={this.getNotes()}>
            autorenew
          </span>
        </h2>
        <div className="list-notes">
          {this.state.notes.map((item) => (
            <ItemNote key={item.id} note={item} onDelete={this.handleDelete} />
          ))}
        </div>
        <NewNoteForm onFormSubmit={this.handleSbmit} />
      </React.Fragment>
    );
  }

  handleDelete = (id) => {
    fetch(`${this.URL}/${id}`, {
      method: "DELETE",
    }).then(() => this.getNotes());
  };

  handleSbmit = (newNote) => {
    fetch(this.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newNote),
    }).then(() => this.getNotes());
  };

  getNotes = () => {
    fetch(this.URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ notes: result });
      });
  };

  componentDidMount() {
    this.getNotes();
  }
}
import React, { Component } from "react";
class Posipa extends Component {
  render() {
    console.log(this.props.data);
    const title = this.props.data.title.rendered;
    const teaser = this.props.data.excerpt.rendered;
    const actionUrl = this.props.data.acf.posipa_pdf;
    const lastConfirmed = this.props.data.acf.last_confirmed;
    const tags = this.props.data.tags;
    return (
      <div className="posipa" data-tags={tags}>
        <div className="title">{title}</div>
        <div className="lastConfirmed">{lastConfirmed}</div>
        <div
          className="teaser"
          dangerouslySetInnerHTML={{ __html: teaser }}
        ></div>
        <div className="action">
          <a href={actionUrl} target="_blank">
            Zum Positionspapier
          </a>
        </div>
      </div>
    );
  }
}
export default Posipa;

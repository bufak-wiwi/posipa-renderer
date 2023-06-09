import React, { Component } from "react";
class Posipa extends Component {
  render() {
    const title = this.props.data.title.rendered;
    const teaser = this.props.data.excerpt.rendered;
    const actionUrl = this.props.data.acf.posipa_pdf;
    const lastConfirmed = this.props.data.acf.last_confirmed;
    const tags = this.props.data.tags;
    const tagsStrings = "#"+getTagString(tags,this.props.availableTags);
    return (
      <div className="posipa" data-tags={tags}>
        <div className="title">{title}</div>
        <div className="tags">{tagsStrings}</div>
        <div className="lastConfirmed">{lastConfirmed}</div>
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

function getTagString(tags,tagsStrings){
  let ret = [];
  for(let i=0;i<tags.length;i++){
    const tag = tagsStrings.find(x => x.id === tags[i]);
    if (tag){
      ret.push(tag.name);
    }
  }
  return ret.join(" #");
}
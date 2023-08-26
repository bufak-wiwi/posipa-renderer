import React, { Component } from "react";
import moment from "moment";

class Posipa extends Component {
  render() {
    const title = this.props.data.title.rendered;
    const teaser = this.props.data.excerpt.rendered;
    const actionUrl = this.props.data.acf.posipa_pdf;
    var lastConfirmed;
    if(this.props.data.acf.last_confirmed_date !== undefined){
      // Input date string
      const inputDateStr = this.props.data.acf.last_confirmed_date;

      // Parse the input date string
      const [day, month, year] = inputDateStr.split('/');
      const parsedDate = new Date(`${year}-${month}-${day}`);

      // Format the date as "November 2023"
     lastConfirmed = parsedDate.toLocaleString('de-DE', { year: 'numeric', month: 'long' });
  
    }
    const tags = this.props.data.tags;
    const tagsStrings = "#"+getTagString(tags,this.props.availableTags);
    return (
      <div className="posipa" data-tags={tags}>
        <div className="title">
          <a href={actionUrl} target="_blank">{title}
          </a>
        </div>
        <div className="tags">{tagsStrings}</div>
        <div className="lastConfirmed" data-date={this.props.data.acf.last_confirmed_date}>{lastConfirmed}</div>
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

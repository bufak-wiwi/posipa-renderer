import React, { Component } from "react";
import IconButton from '@mui/material/IconButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
class Posipa extends Component {
  render() {
    const title = this.props.data.title.rendered;
    const teaser = this.props.data.excerpt.rendered;
    const actionUrl = this.props.data.link;
    const fileUrl = this.props.data.acf.posipa_pdf;
    const lastConfirmed = this.props.data.acf.last_confirmed;
    const tags = this.props.data.tags;
    const tagsStrings = "#"+getTagString(tags,this.props.availableTags);
    return (
      <div className="posipa" data-tags={tags}>
        <div className="title">
          <a href={actionUrl} target="_blank">{title}
          </a>
        </div>
        <div className="tags">{tagsStrings}</div>
        <div className="lastConfirmed">{lastConfirmed}</div>
        <div><IconButton className="downloadBtn" href={fileUrl} download ><DownloadForOfflineIcon /></IconButton></div>
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

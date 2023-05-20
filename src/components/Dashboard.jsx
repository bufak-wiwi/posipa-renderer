import React, { Component } from "react";
import Posipa from "./Posipa";
import { baseUrl, categoryId } from "../config/globals";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tags: [],
    };
  }

  async componentDidMount() {
    const data = await fetch(
      `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&_fields=id,title,link,excerpt.rendered,acf.posipa_pdf,tags`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
    this.setState({ data: data });
    const tags = await fetch(`${baseUrl}/wp-json/wp/v2/tags?_fields=id,name`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
    this.setState({ tags: tags });
    console.log("Did mount called");
  }

  onTagsChange = (event, values) => {
    console.log(values);
    let resetFilter = false;
    if (values.length === 0) {
      resetFilter = true;
    }
    const elems = document.getElementsByClassName("posipa");
    for (let i = 0; i < elems.length; i++) {
      const elemTags = elems[i].dataset.tags;
      const isCurrentlyVisible = !elems[i].classList.contains("hidden");
      console.log(isCurrentlyVisible);
      if (!isCurrentlyVisible && resetFilter) {
        elems[i].classList.remove("hidden");
        continue;
      } else if (resetFilter) {
        continue;
      }
      let selectedValues = [];
      for (let i = 0; i < values.length; i++) {
        selectedValues.push(values[i].id);
      }
      const displayItem = checkIfTagMatch(elemTags, selectedValues);
      console.log(displayItem);
      if (displayItem && !isCurrentlyVisible) {
        elems[i].classList.remove("hidden");
      } else if (!displayItem && isCurrentlyVisible) {
        elems[i].classList.add("hidden");
      }
    }
  };

  render() {
    const data = this.state.data;
    const tags = this.state.tags;
    const selectedTags = this.state.selectedTags;
    console.log(this.state);
    console.log(data);
    return (
      <>
        <div id="filter">
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            onChange={this.onTagsChange}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label=""
                placeholder="Themen"
              />
            )}
          />
        </div>
        <div id="posipaWrapper">
          {data.map((posipa) => (
            <Posipa data={posipa} />
          ))}
        </div>
      </>
    );
  }
}
export default Dashboard;

function checkIfTagMatch(itemTags, selectedTags) {
  const itemTagsArray = itemTags.split(",").map(Number);
  console.log(itemTagsArray);
  console.log(selectedTags);
  for (let i = 0; i < selectedTags.length; i++) {
    if (itemTagsArray.includes(selectedTags[i])) return true;
  }
  return false;
}

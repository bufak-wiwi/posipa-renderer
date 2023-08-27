import React, { Component } from "react";
import Posipa from "./Posipa";
import { baseUrl, categoryId } from "../config/globals";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import  Button  from '@mui/base/Button';
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tags: [],
      sortOptions: ["Alphabetisch","Neueste zuerst","Älteste zuerst"],
      currentSorting:0
    };
  }

  async componentDidMount() {
    const data = await fetch(
      `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&_fields=id,title,link,excerpt.rendered,acf.posipa_pdf,tags,acf.last_confirmed_date&orderby=title&order=asc&per_page=100`
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

  }

  onTagsChange = (event, values) => {

    let resetFilter = false;
    if (values.length === 0) {
      resetFilter = true;
    }
    const elems = document.getElementsByClassName("posipa");
    for (let i = 0; i < elems.length; i++) {
      const elemTags = elems[i].dataset.tags;
      const isCurrentlyVisible = !elems[i].classList.contains("hidden");

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

      if (displayItem && !isCurrentlyVisible) {
        elems[i].classList.remove("hidden");
      } else if (!displayItem && isCurrentlyVisible) {
        elems[i].classList.add("hidden");
      }
    }
  };

  async changeSort(){
    let data = this.state.data;
    const newSort = this.state.currentSorting === this.state.sortOptions.length-1 ? 0 : this.state.currentSorting+1;
    this.setState({data:data.sort(this.customSort), currentSorting:newSort})
  }

   customSort  = (a, b) => {
      const newSort = this.state.currentSorting === this.state.sortOptions.length-1 ? 0 : this.state.currentSorting+1;
      if (a.acf.last_confirmed_date !== b.acf.last_confirmed_date && newSort !== 0) {
          if (newSort === 1){
            return new Date(b.acf.last_confirmed_date) - new Date (a.acf.last_confirmed_date);
          } else {
            return new Date(a.acf.last_confirmed_date) - new Date (b.acf.last_confirmed_date);
          }
      } else {
          return a.title.rendered.localeCompare(b.title.rendered); // Sort by name if dates are equal
      }
  };

  render() {
    const data = this.state.data;
    const tags = this.state.tags;
    const selectedTags = this.state.selectedTags;

    return (
      <>
        <div id="filter">
          <Autocomplete
            sx={{ width: 400 }}
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
                fullWidth
              />
            )}
          />
          <Button className="filterBtn" onClick={()=>this.changeSort()} data-sort={this.state.currentSorting}>Sortierung: {this.state.sortOptions[this.state.currentSorting]}</Button>
        </div>
        <div id="posipaWrapper">
          {data.map((posipa) => (
            <Posipa data={posipa} availableTags={tags} />
          ))}
        </div>
      </>
    );
  }
}
export default Dashboard;

function checkIfTagMatch(itemTags, selectedTags) {
  const itemTagsArray = itemTags.split(",").map(Number);
  for (let i = 0; i < selectedTags.length; i++) {
    if (itemTagsArray.includes(selectedTags[i])) return true;
  }
  return false;
}

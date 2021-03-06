//
// DashBoard page
//
// ForumFolders.js
//

// Import the React library
import React from "react";

// Import Lodash library
import _ from "lodash";

// Import Table component
import FoldersTable from  "../FoldersTable";

// Import the API library
import API from "../../utils/API";

// Import Custom css
import "./index.css";

const testData = [];
const rawData = testData;

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

class ForumFolders extends React.Component {
  constructor() {
    super();
    
    this.state = {
      data: null,
      pages: null,
      loading: true,
      showForum: false,
      apbSystem: JSON.parse(localStorage.getItem("apbSystem"))
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  fetchData() {
    
    // Get forum categories
    API.getCategories()
    .then(res =>  {
      //console.log(res);
      this.setState({showForum: true, data: res.data });
    })
    .catch(err => {
        console.log(err);
    });
    return testData;
  }


  fetchDataxx(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  
  render() {
    //const { data, pages, loading } = this.state;
    const { data } = this.state;
    let key = 1;
    if (this.state.showForum) {
      return (
        <React.Fragment>
          <div className="forum-folders">
            <div className="forum-header">
                <img className="forum-image" src="/Forum1.png" alt="forum"></img>             
                <h1 className="forum-title">Forum</h1>
            </div>
            <div className="forum-container"> 
              {data.map(cellData => (
                <FoldersTable data={cellData} key={key++}
                />
              ))}
            </div>

          </div>
        </React.Fragment>
      );
    } else
      return null;
  }
}

export default ForumFolders;
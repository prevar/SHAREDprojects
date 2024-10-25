/*const Pagination = ({ items, pageSize, onPageChange }) => {
  // Part 2 code goes here9
  const { Button } = ReactBootstrap;

  if (items.length <= 1) return null;
  const numPages = Math.ceil(items.length/pageSize);
  const pages = range(1, numPages+1);
  const list = pages.map((page)=> <Button className='page-item' key={page} onClick={onPageChange} >{page}</Button>
  );
  return (
    <nav><ul>
    {list};
    </ul></nav>);
};

const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};

function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}
*/
const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    // Part 1, step 1 code goes here
    let didCancel = false;
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});
      try {
        console.log('call to axios init');
        const cors = require('cors');
app.use(cors());
        const res = await axios(url);
        if(!didCancel) {
          console.log('!didcancel success');
          dispatch({type:'FETCH_SUCCESS', payload: res.data.titles}); }
      } catch (err) {
        if(!didCancel) {
          console.log('!didcancel in err'+err);
        dispatch({type:'FETCH_FAILURE'});
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, []);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// App that gets data from Hacker News url
function App() {
  const { Fragment, useState, useEffect, useReducer } = React;
  //const [query, setQuery] = useState('MIT');
  //const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 10;
  console.log('before call to dofetch');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://openlibrary.org/search.json?q=the+lord+of+the+rings',
    {
      titles: [],
    }
  );
  console.log('after call to dofetch');
  /*const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }*/
  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        // Part 1, step 2 code goes here
        <ul className='list-group'>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      )}
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById('root'));

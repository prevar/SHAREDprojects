
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
        const res = await axios(url);
        if(!didCancel) {
          dispatch({type:'FETCH_SUCCESS', payload: res.data}); }
      } catch (err) {
        if(!didCancel) {
        dispatch({type:'FETCH_FAILURE'});
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
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
  const [query, setQuery] = useState('MIT');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://www.themealdb.com/api/json/v1/1/random.php',
    {
      meals: [],
    }
  );
  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        // Part 1, step 2 code goes here
        <>        
        <ul className="list-group">
          {data.meals.map((item) => (
            <li key={item.idMeal} className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="w-50 col-2-md p-4 border border-2 border-yellow">
                <img className="w-100" src={item.strMealThumb}/>

                </div>
                <div className="w-50 col-2-md border border-3 border-black">
                <h1 className="text-center">{item.strMeal}</h1>
                <p>{item.strInstructions}</p>
                <a href={item.strYoutube}>See recipe video here</a><br/>
                <a href={item.strSource}>See detailed recipe here</a>
                
                </div>
              </div>
            </div>   
            </li>
          ))}
        </ul>       
        </>

      )}
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById('recipe'));

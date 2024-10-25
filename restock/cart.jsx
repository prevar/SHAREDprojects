// simulate getting products from DataBase
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

//import axios from 'axios';
const products = [
  { name: "Apples", country: "Italy", cost: 3, instock: 10, imgurl: 'apple.png' },
  { name: "Oranges", country: "Spain", cost: 4, instock: 3, imgurl: 'orange.png' },
  { name: "Beans", country: "USA", cost: 2, instock: 5, imgurl: 'beans.png' },
  { name: "Cabbage", country: "USA", cost: 1, instock: 8, imgurl: 'cabbage.png' },
];
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  return <Accordion defaultActiveKey="0">{list}</Accordion>;
};

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  useEffect(() => {
    console.log("useEffect Called");
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("FETCH FROM URl");
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
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
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const {
    Card,
    Accordion,
    Button,
    Container,
    Row,
    Col,
    Image,
    Input,
  } = ReactBootstrap;
  //  Fetch Data
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("http://localhost:1337/api/products");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://localhost:1337/products",
    {
      data: [],
    }
  );
  console.log(`Rendering Products ${JSON.stringify(data)}`);
  // Fetch Data
  const addToCart = (e) => {
    let name = e.target.name;
    let item = items.filter((item) => item.name == name);
    console.log(`add to Cart ${JSON.stringify(item)}`);
    if ( item[0].instock <= 0) return;
    item[0].instock --;
    setCart([...cart, ...item]);

    //doFetch(query);
  };
  const deleteCartItem = (index) => {
    let newCart = cart.filter((item, i) => index != i);
    const delItem = cart.filter((item, i) => index == i);
    let delItemName = delItem[0].name;
    let newProducts = items.map((it,index)=> {
      if (it.name === delItemName) {
        it.instock = it.instock + 1 ;
      }
      return it;
    })
    setCart(newCart);
    setItems(newProducts);
  };
  const photos = ["apple.png", "orange.png", "beans.png", "cabbage.png"];

  let list = items.map((item, index) => {
    let n = Math.floor(Math.random()*1000);
    console.log(n);
    let url = "https://picsum.photos/id/" + n + "/50/50";

    return (
      <li key={index}>
        <Image src={item.imgurl} width={70} roundedCircle></Image>
        <Button variant="primary" size="large">
          {item.name} Cost= ${item.cost}  inStock={item.instock}
        </Button><br/>
        <input name={item.name} type="submit" onClick={addToCart}></input>
      </li>
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <Accordion.Item key={1+index} eventKey={1 + index}>
      <Accordion.Header>
        {item.name}
      </Accordion.Header>
      <Accordion.Body onClick={() => deleteCartItem(index)}
        eventKey={1 + index}>
        $ {item.cost} from {item.country}
      </Accordion.Body>
    </Accordion.Item>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };
  // TODO: implement the restockProducts function
  const restockProducts = (url) => {
    console.log('in restock with url='+url);
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      const returnedItems = response.data.data;
      
      if (returnedItems.length > 0) {
         const restockProductsArray = returnedItems.map((item, index) =>  {  return {name: item.attributes.Name, country: item.attributes.Country, instock:item.attributes.Instock, cost:item.attributes.Cost, imgurl:item.attributes.imgurl} } )
        console.log('restockProductsArray='+JSON.stringify(restockProductsArray));
        
        const productsToAdd = [];
        restockProductsArray.forEach(element => {
          let prodName = element.name;
          let existingItem = items.filter((it)=> it.name === prodName?true:false )  
          if (existingItem != null && existingItem.length > 0) {
            existingItem[0].instock += element.instock;
            console.log('found item');
          }
          else { console.log('not found item');
            productsToAdd.push(element);
          }
        });
        const newProducts = [...items, ...productsToAdd]
        setItems(newProducts);
      }
      console.log(JSON.stringify(response.data.data));
    })
    .catch((error) => {
      console.log(error);
    });

  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: "none" }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion defaultActiveKey="0">{cartList}</Accordion>
        </Col>
        <Col>
          <h1>CheckOut </h1>
          <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(`${query}`);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
};
// ========================================
ReactDOM.render(<Products />, document.getElementById("root"));lhost:1337/products

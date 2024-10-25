// Ex 2 - remove any item from navbar with less than minStock in stock
// write out both the name and the number in stock in format apple:2

function NavBar({ stockItems}) {

  const [stock, setStock] = useState(0);
  console.log('stockItems='+stockItems);
  const {Button} = ReactBootstrap;

  const handleClick = (e)=>{
    alert('in here'+e.target.innerHTML);
    const item = e.target.innerHTML;
    const [name, num] = item.split(':');
    alert(`name=${name}, num= ${num}`)

    //change num for clicked item
    const newStock = stockItems.map( (stockItem) => { 
      console.log(`stockitem= ${stockItem}, name= ${name}, num= ${num}`)
      if (name == stockItem.name) {console.log('in if'); 
        return { name: stockItem.name, instock: stockItem.instock--}}
      else {console.log('in else'); return { name: stockItem.name, instock: stockItem.instock}};
      });
      console.log(`finale stock=newStock ${newStock}`);
      setStock(...newStock);
    };

  
  const updatedList = stockItems.map((item, index) => {
    return <Button onClick={handleClick} key={index}>{item.name}: {item.instock}</Button>;
  });
  // note that React needs to have a single Parent
  return (
  <>

  <ul style={{ listStyleType: "none" }}>{updatedList}</ul>
  <h1>Shopping Cart</h1>
  </>
  );
}
const stockItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 4 },
  { name: "pear", instock: 5 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 }
];
ReactDOM.render(
  <NavBar stockItems={stockItems}/>,
  document.getElementById("root")
);

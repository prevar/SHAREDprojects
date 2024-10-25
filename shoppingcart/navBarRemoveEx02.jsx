// Ex 2 - remove any item from navbar with less than minStock in stock
// write out both the name and the number in stock in format apple:2
function NavBar({ menuitems, minstock }) {
  console.log('origlist='+menuItems);
  const filteredList = menuItems.filter( (menuitem)=>menuitem.instock >= minstock );
  console.log('filteredList='+filteredList);
  const updatedList = filteredList.map((item, index) => {
    return <li key={index}>{item.name}</li>;
  });
  // note that React needs to have a single Parent
  return <ul style={{ listStyleType: "none" }}>{updatedList}</ul>;
}
const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 4 },
  { name: "pear", instock: 5 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 }
];
ReactDOM.render(
  <NavBar menuitems={menuItems} minstock={2} />,
  document.getElementById("root")
);

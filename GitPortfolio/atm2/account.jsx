const ATMDeposit = ({ onChange, isDeposit, atmMode ,validTransaction}) => {
  const choice = ['Deposit', 'Cash Back'];
  const isValid = {validTransaction};
  return (
      <div>
        <label className="label huge">
          { atmMode &&
            <div className="p-3">
              <p> Enter the amount of money you want to {choice[Number(!isDeposit)]} </p>
              <input id="number-input" type="number" width="200" onChange={onChange}></input><br/>
              <input className="m-3" type="submit" width="200" value="Go" id="submit-input" disabled={!validTransaction}></input>
            </div>
          }
        </label>
      </div>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState("");
    const [totalState, setTotalState] = React.useState(0.00);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance = $ ${parseFloat(totalState)} `;
//    console.log(`Account Rendered with Deposit: ${deposit}`);
    const handleChange = (event) => {
      console.log('inhandle change'+event)
      if(event.target.value <= 0) {
        console.log("in val <0");
        setValidTransaction(false);
      }
      else if (atmMode == "Cash Back" && event.target.value > totalState) {
        console.log("atm cash back va>state"+atmMode+" "+totalState+" "+event.target.value);
        setValidTransaction(false);
      }
      else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
    };
  
    const handleModeSelect = (event) => {
      setAtmMode( event.target.value );
      const chosenOption = event.target.value == "Deposit"? true: event.target.value == "Cash Back"? false : null;
      setIsDeposit(chosenOption);
      const amt = document.getElementById('number-input');
      if ( amt != null)
        {
          const amtchnge = document.getElementById('number-input').value;
          //console.log(amtchnge);
          document.getElementById('number-input').value = "";
        }
      //console.log(amt);
      
    }
    return (
      <form onSubmit={handleSubmit}>
        <h3 className="text-center p-3" id="total">{status}</h3>
        <label>What would you like to do today?</label>
        <select className="m-3" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} validTransaction={validTransaction}></ATMDeposit>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
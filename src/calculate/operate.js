export default function operate(numberOne, numberTwo, operation) {
  const one = (numberOne || "0");
  const two = (numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
  if (operation === "+") {
    return ( Number(one) +  Number(two)).toString();
  }
  if (operation === "-") {
    return ( Number(one) -  Number(two)).toString();
  }
  if (operation === "x") {
    return ( Number(one) *  Number(two)).toString();
  }
  if (operation === "÷") {
    if (two === "0") {
      alert("Divide by 0 error");
      return "0";
    } else {
      return ( Number(one)/ Number(two)).toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}
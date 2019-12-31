import operate from './operate';
/**
 * calculate total value
 * @param  {[type]} obj        [description]
 * @param  {[type]} buttonName [description]
 * @return {[type]}            [description]
 */
export default function calculate(obj, buttonName) {
	// if operator
	if(buttonName ==="+" || buttonName ==="-" || buttonName ==="x" || buttonName ==="÷"){
		console.log("calculate");
		if(obj.total){
		console.log(obj);
			if(obj.next){
				return {
					total: operate(obj.total, obj.next, obj.operation),
			      	next: null,
			      	operation: buttonName,
			      	equation: obj.equation? obj.equation + obj.next + buttonName : obj.next + buttonName
				}
			}
			else{
				return {
					total: obj.total,
			      	next: null,
			      	operation: buttonName,
			      	equation: obj.total + buttonName
				}
			}	
		}
		else{
			if(!obj.operation){
				if(obj.next){
					return {
						total: obj.next,
				      	next: null,
				      	operation: buttonName,
				      	equation: obj.equation? obj.equation + obj.next + buttonName : obj.next + buttonName
					}
				}
			}

		}
	}
	// clear data
	if (buttonName === "AC") {
	    return {
	      total: null,
	      next: null,
	      operation: null,
	      equation: null
	    };
  	}
  	//check if number
	if (/[0-9]+/.test(buttonName)) {
	    if (buttonName === "0" && obj.next === "0") {
	      return {};
	    }
	    // If there is an operation, update next
	    if (obj.operation) {
	      if (obj.next) {
	        return { 
	        	next: obj.next + buttonName
	        };
	      }
	      return { next: buttonName };
	    }
	    // If there is no operation, update next and clear the value
	    if (obj.next) {
	      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
	      return {
	        next,
	        total: null,
	      };
	    }
	    return {
	      next: buttonName,
	      total: null,
	    };
  	}
    //operate the operands
	if (buttonName === "%") {
	    if (obj.operation && obj.next) {
	      const result = operate(obj.total, obj.next, obj.operation);
	      return {
	        total: (result/100)
	          .toString(),
	        next: null,
	        operation: null,
	      };
	    }
	    if (obj.next) {
	      return {
	        next: (obj.next/100)
	          .toString(),
	      };
	    }
	    return {};
	}
	if (buttonName === ".") {
	    if (obj.next) {
	      // ignore a . if the next number already has one
	      if (obj.next.includes(".")) {
	        return {};
	      }
	      return { next: obj.next + "." };
	    }
	    return { next: "0." };
	}

  	if (buttonName === "=") {
	    if (obj.next && obj.operation) {
	      return {
	        total: operate(obj.total, obj.next, obj.operation),
	        next: null,
	        operation: null,
	        equation: obj.equation + obj.next+"="
	      };
	    } else {
	      return {};
	    }
	}

	if (buttonName === "+/-") {
		if (obj.next) {
		  return { next: (-1 * parseFloat(obj.next)).toString() };
		}
		if (obj.total) {
		  return { total: (-1 * parseFloat(obj.total)).toString() };
		}
		return {};
	}
	//check if operator pressed
	if (obj.operation) {
	    return {
	      total: operate(obj.total, obj.next, obj.operation),
	      next: null,
	      operation: buttonName,
	    };
	}
	if (!obj.next) {
	    return { operation: buttonName };
	  }

  	// save the operation and shift 'next' into 'total'
  	return {
	    total: obj.next,
	    next: null,
	    operation: buttonName,
	};
}
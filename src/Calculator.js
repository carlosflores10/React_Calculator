import './App.css';
import { evaluate } from 'mathjs';
import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {expr: '', result: ''};
        this.handleClick = this.handleClick.bind(this);
        this.solve = this.solve.bind(this);
        this.filter = this.filter.bind(this);
    }

    handleClick = (input) => {        
        if(input==="AC" && this.state.result==="") {
            this.setState((prevState) => ({...prevState, expr: ""}))
        }else if(input==="AC"){
            this.setState((prevState) => ({...prevState, result: ""}))
        }else{
            this.setState((prevState) => ({...prevState, result: prevState.result + input}))
        }
    }

    filter = (expr) => {
        expr = expr.replace("x", '*')
        expr = expr.replace("sin(", "sin(deg ")
        expr = expr.replace("cos(", "cos(deg ")
        expr = expr.replace("tan(", "tan(deg ")
        expr = expr.replace("E", "*10^")
        let new_e = ""
        for(let i = 0; i < expr.length; i++){
            if(expr[i] === "n" && i > 0 && expr[i-1] === "l"){
                new_e += "og"
                continue
            }
            new_e += expr[i]
        }
        return new_e
    }

    solve = (e) => {
        try {
            let ans = evaluate(this.filter(this.state.result))
            this.setState((prevState) => ({...prevState, expr: prevState.result + "=", result: ans}))
        } catch (error) {
            this.setState((prevState) => ({...prevState, expr: "", result: "ERROR"}))
        }   
    }

    render() {
        return (
            <div class="main-page">
                <center><h1>React Google Calculator</h1></center>
                <div class="display">
                <div class="calculator-grid">
                <div class="calculator">
                    <div id = "expr" class="previous-operand"> {this.state.expr} </div>
                    <div id = "bottombar" class="current-operand"> {this.state.result} </div>
                </div>
                <div class="off"> Deg </div>
                <button onClick={() => this.handleClick('!')}> x! </button>
                <button onClick={() => this.handleClick('(')}> ( </button>
                <button onClick={() => this.handleClick(')')}> ) </button>
                <button onClick={() => this.handleClick('%')}> % </button>
                <button onClick={() => this.handleClick('AC')}> AC </button>

                <button onClick={() => this.handleClick('sin(')}> sin </button>
                <button onClick={() => this.handleClick('ln(')}> ln </button>
                <button onClick={() => this.handleClick('7')} class="number"> 7 </button>
                <button onClick={() => this.handleClick('8')} class="number"> 8 </button>
                <button onClick={() => this.handleClick('9')} class="number"> 9 </button>
                <button onClick={() => this.handleClick('/')}> ÷ </button>

                <button onClick={() => this.handleClick('cos(')}> cos </button>
                <button onClick={() => this.handleClick('log(')}> log </button>
                <button onClick={() => this.handleClick('4')} class="number"> 4 </button>
                <button onClick={() => this.handleClick('5')} class="number"> 5 </button>
                <button onClick={() => this.handleClick('6')} class="number"> 6 </button>
                <button onClick={() => this.handleClick('x')}> x </button>

                <button onClick={() => this.handleClick('tan(')}> tan </button>
                <button onClick={() => this.handleClick('sqrt(')}> √ </button>
                <button onClick={() => this.handleClick('1')} class="number"> 1 </button>
                <button onClick={() => this.handleClick('2')} class="number"> 2 </button>
                <button onClick={() => this.handleClick('3')} class="number"> 3 </button>
                <button onClick={() => this.handleClick('-')}> - </button>

                <button onClick={() => this.handleClick('E')}> EXP </button>
                <button onClick={() => this.handleClick('^(')}> X<sup>y</sup> </button>
                <button onClick={() => this.handleClick('0')} class="number"> 0 </button>
                <button onClick={() => this.handleClick('.')}> . </button>
                <button onClick={() => this.solve()} class="equal"> = </button>
                <button onClick={() => this.handleClick('+')}> + </button>
                </div>
            </div>
        </div>
        );
    }
}
export default Calculator;
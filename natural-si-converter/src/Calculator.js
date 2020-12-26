import React, { Component } from "react";
import Select from "react-select";
import { LoremIpsum } from "lorem-ipsum";
import Array_Natural from "./Array_Natural";
import parse from "html-react-parser";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./Calculator.css";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const pattern = /(^$|^-?\d+\.?(\d+)?((\e\d+|(\x\d+\^\d+)|(\X\d+\^\d+)|(\X\d+\^\d+)\E\d+|(\*\d+\^\d+))?)?\-?)$$/g;
const options = [
  { value: "length", label: "Length" },
  { value: "Barn", label: "Barn" },
  { value: "Mass", label: "Mass" },
  { value: "Time", label: "Time" },
  { value: "Momentum", label: "Momentum" },
  { value: "Area", label: "Area" },
  { value: "Force", label: "Force" },
  { value: "Energy Density", label: "Energy Density" },
  { value: "Energy", label: "Area" },
];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naturalToEnergy: true,
      selectedOption: "Length",
      result: "Your result will display here!",
      underSelect: "",
      comment: "comment",
      userInput: "",
      aboveAmount: "",
      aboveAmountTrailer: "",
      selectUnit: "SI",
      validatorText: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.Calculate3 = this.Calculate3.bind(this);
    this.toggleFlow = this.toggleFlow.bind(this);
    this.handleValidatorChange = this.handleValidatorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("checkInput", (value) => {
      if (value.match(pattern) !== null) return true;
    });
    this.handleSubmit();
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState(
      {
        selectedOption: evt.target.value,
      },
      () => this.Calculate3()
    );
  }

  Calculate3() {
    const {
      selectedOption,
      result,
      underSelect,
      comment,
      userInput,
      naturalToEnergy,
      aboveAmountTrailer,
    } = this.state;
    if (selectedOption !== null) {
      let curVal = selectedOption;
      console.log(selectedOption);
      let toEnergy = `${curVal} to Enery`;
      let fromEnergy = `Energy to ${curVal}`;
      Array_Natural.forEach((e) => {
        if (curVal.toLowerCase() === e.SiUnit.toLowerCase()) {
          let tempUnderSelect = "";
          let tempResult = "";
          if (naturalToEnergy) {
            tempUnderSelect = parse(
              `1 ${e.Label} = ${this.DisplayNumber(e.UnitToGEv)} ${e.GeVLabel}`
            );
            let tempResult = parse(
              this.DisplayNumber(+e.UnitToGEv * +userInput).concat(e.GeVLabel)
            );
            this.setState({
              aboveAmount: parse(e.Label),
              underSelect: tempUnderSelect,
              result:
                userInput == "" ? "Your result will display here!" : tempResult,
            });
          } else {
            tempUnderSelect = parse(
              `1 ${e.GeVLabel} = ${this.DisplayNumber(1 / e.UnitToGEv)} ${
                e.Label
              }`
            );
            tempResult = parse(
              this.DisplayNumber(userInput / e.UnitToGEv).concat(e.Label)
            );

            this.setState({
              aboveAmount: parse(e.GeVLabel),
              underSelect: tempUnderSelect,
              result:
                userInput == "" ? "Your result will display here!" : tempResult,
            });
          }
        }
      });
    }
  }

  DisplayNumber(e) {
    try {
      const input = +e;
      console.log("to e" + e);
      const temp2 = input.toExponential(6);
      console.log(temp2);
      const first = temp2.split("e")[0].substring(0);
      var exp = "";
      console.log(temp2.split("e")[1].substring(0));
      if (parseInt(temp2.split("e")[1].substring(0)) > 0) {
        exp = temp2.split("e")[1].substring(1).sup();
      } else {
        exp = temp2.split("e")[1].substring(0).sup();
      }
      const string1 = `${first} *10${exp}`;
      console.log("i epistrofi" + string1);

      return string1;
    } catch (e) {
      alert("invalid amount!" + e);
    }
  }

  handleUserInputChange(evt) {
    this.setState({
      userInput: evt.target.value,
    });
  }
  toggleFlow() {
    this.setState(
      {
        naturalToEnergy: !this.state.naturalToEnergy,
        selectUnit: this.state.selectUnit === "SI" ? "Natural Unit" : "SI",
      },
      () => this.Calculate3()
    );
  }
  handleValidatorChange(evt) {
    this.setState({ validatorText: evt.target.value });
  }

  handleSubmit() {
    let validText = this.state.validatorText;
    if (validText.indexOf("x10^") !== -1)
      validText = validText.replace("x10^", "e");
    if (validText.indexOf("Χ10^") !== -1)
      validText = validText.replace("Χ10^", "e");
    if (validText.indexOf("*10^") !== -1)
      validText = validText.replace("*10^", "e");
    console.log(validText);
    this.setState(
      {
        userInput: validText,
      },
      () => this.Calculate3()
    );
  }

  render() {
    const {
      selectedOption,
      result,
      underSelect,
      userInput,
      aboveAmount,
      aboveAmountTrailer,
      selectUnit,
    } = this.state;
    const selectUnitdom = (
      <select
        className="selector"
        id="selector"
        value={selectedOption}
        onChange={this.handleChange}
      >
        {options.map((opt) => (
          <option className="selector-item" value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
    return (
      <div className="Calculator-container">
        <h1 className="header">Natural & SI Units Converter</h1>

        <div className="select-container">
          <label className="label-si">Select {selectUnit} unit</label>
          {selectUnitdom}
          <label className="label-under-select">{underSelect}</label>
          {/* <Select
              placeholder="Select SI Unit"
              className="select"
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            /> */}
        </div>

        <div className="validator-container">
          <label className="label-amount">
            {aboveAmount}
            {aboveAmountTrailer}
          </label>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            className="form"
            ref="form"
            id="form"
          >
            <TextValidator
              label="Enter amount"
              value={this.state.validatorText}
              name="newColorName"
              onChange={this.handleValidatorChange}
              validators={["checkInput"]}
              errorMessages={["Wrong input!"]}
            />
          </ValidatorForm>

          <span className="comment"></span>
        </div>
        <div className="result-container">
          <label className="above-result">Your result is</label>
          <label
            className="result-label"
            placeholder="Your result will display here!!"
          >
            {result}
          </label>
        </div>

        <div className="button-container"></div>
        <button type="submit" className="toggle-button calculate" form="form">
          Calculate
        </button>
        <button className="toggle-button" onClick={this.toggleFlow}>
          Toggle
        </button>
        <div></div>

        <div className="footer">
          <span className="footer-span">©2020 {lorem.generateWords(5)}</span>
        </div>
      </div>
    );
  }
}

export default Calculator;

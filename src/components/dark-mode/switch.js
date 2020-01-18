import React, { Component } from "react"
import Switch from "react-switch"
import "./switch.css"

class SwitchDark extends Component {
  constructor() {
    super()
    this.state = { checked: true }
    // 토글 디폴트 값 >> true=check/ false=dark
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  render() {
    return (
      <label className="switch-toggle" htmlFor="icon-switch">
        <Switch
          //   checkedIcon={<div className="icon checkedIcon"></div>}
          //   height={24}
          //   width={70}
          uncheckedIcon={
            <div className="icon uncheckedIcon">
              <span role="img" aria-label="dark-mode__moon">
                🌙
              </span>
            </div>
          }
          onChange={this.handleChange}
          checked={this.state.checked}
          offColor={"#d9dfe2"}
          //   offHandleColor={"#fff"}
          onColor={"#4fa6a1"}
          //   onHandleColor={"#282c35"}

          disabled
        />
        {/* <p>The switch is {this.state.checked ? "on" : "off"}</p> */}
        {/* THEME.DARK : THEME.LIGHT */}
      </label>
    )
  }
}
export default SwitchDark

// https://github.com/markusenglund/react-switch 를 참고하여 수정

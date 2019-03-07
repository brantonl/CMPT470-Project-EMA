import React from 'react'
import { Button, Select } from 'antd'

const Option = Select.Option

function handleChange (value) {
  console.log(`selected ${value}`)
}

function handleBlur () {
  console.log('blur')
}

function handleFocus () {
  console.log('focus')
}

class RefineResult extends React.Component {
  state = {
    loading: false,
    iconLoading: false
  }

  enterLoading = () => {
    this.setState({ loading: true })
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true })
  }

  render () {
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Price'
          optionFilterProp='children'
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='low'>$</Option>
          <Option value='medium'>$$</Option>
          <Option value='high'>$$$</Option>
        </Select>

        <span>
          <br />
          <Button
            type='primary'
            icon='sync'
            loading={this.state.iconLoading}
            onClick={this.enterIconLoading}
          >
            Refine Result
          </Button>
          <br />
        </span>
      </div>
    )
  }
}

export default RefineResult

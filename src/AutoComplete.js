import React, { Component } from 'react';
import { dripFormField, FieldPropTypes } from 'react-drip-form';
import MuiAutoComplete from 'material-ui/AutoComplete';
import defaultProps from './internal/defaultFieldProps';


export class AutoComplete extends Component {
  static propTypes = FieldPropTypes;

  handleClose = (...args) => {
    this.props.input.onBlur();

    if (typeof this.props.onClose === 'function') {
      this.props.onClose(...args);
    }
  };

  handleNewRequest = (value, index) => {
    const { dataSourceConfig, onNewRequest } = this.props;

    this.props.input.onChange(
      typeof value === 'object' && dataSourceConfig
        ? value[dataSourceConfig.value]
        : value
    );

    if (typeof onNewRequest === 'function') {
      onNewRequest(value, index);
    }
  };

  handleUpdate = (value, dataSource, params) => {
    this.props.input.onChange(value);

    if (typeof this.props.onUpdateInput === 'function') {
      this.props.onUpdateInput(value, dataSource, params);
    }
  };

  render() {
    const {
      input,
      meta,
      shouldDisplayError,
      ...rest
    } = this.props;

    const displayError = shouldDisplayError(this.props);

    return (
      <MuiAutoComplete
        {...rest}
        {...input}
        onClose={this.handleClose}
        onNewRequest={this.handleNewRequest}
        onUpdateInput={this.handleUpdate}
        errorText={displayError ? meta.error : null}
      />
    );
  }
}


export default dripFormField('text', {
  defaultProps,
})(AutoComplete);

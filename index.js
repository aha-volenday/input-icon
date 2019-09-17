import React, { Component } from 'react';
import { Form, Input } from 'antd';

import 'fontawesome-iconpicker/dist/css/fontawesome-iconpicker.css';
import './styles.css';

export default class InputIcon extends Component {
	iconPicker = React.createRef();

	componentDidMount() {
		const { id, onChange } = this.props;

		$(`#${id}`).iconpicker();
		$(`#${id}`).on('iconpickerSelected', e => onChange(id, e.iconpickerValue));
	}

	renderInput() {
		const { disabled, id, label = '', placeholder = '', required = false, styles = {}, value = '' } = this.props;

		return (
			<Input
				type="text"
				id={id}
				data-placement="bottomRight"
				name={id}
				autoComplete="off"
				placeholder={placeholder || label || id}
				value={value ? value : ''}
				onChange={e => {}}
				required={required}
				style={styles}
				disabled={disabled}
				ref={this.iconPicker}
				addonAfter={<i class={value} />}
				allowClear
			/>
		);
	}

	render() {
		const { label = '', required = false, withLabel = false } = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? label : false,
			required
		};

		return <Form.Item {...formItemCommonProps}>{this.renderInput()}</Form.Item>;
	}
}

import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const icons = Object.values({ ...fab, ...fas });

export default class InputIcon extends Component {
	renderInput() {
		const {
			disabled,
			id,
			label = '',
			onChange,
			placeholder = '',
			required = false,
			styles = {},
			value = ''
		} = this.props;

		return (
			<Select
				disabled={disabled}
				id={id}
				name={id}
				placeholder="select one country"
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				optionLabelProp="label"
				placeholder={placeholder || label || id}
				required={required}
				showSearch
				style={{ width: '100%', ...styles }}
				suffixIcon={<i class={value} />}
				value={value ? value : ''}>
				{icons.map(d => (
					<Select.Option
						key={`${d.prefix}-fa-${d.iconName}`}
						value={`${d.prefix} fa-${d.iconName}`}
						label={`${d.prefix} fa-${d.iconName}`}>
						<span
							role="img"
							aria-label={d.iconName}
							style={{ width: 20, paddingLeft: 10, paddingRight: 10 }}>
							<i class={`${d.prefix} fa-${d.iconName}`} />
						</span>
						{d.prefix} fa-{d.iconName}
					</Select.Option>
				))}
			</Select>
		);
	}

	render() {
		const { error = null, extra = null, label = '', required = false, withLabel = false } = this.props;

		const formItemCommonProps = {
			colon: false,
			help: error ? error : '',
			label: withLabel ? (
				<>
					<div style={{ float: 'right' }}>{extra}</div> <span class="label">{label}</span>
				</>
			) : (
				false
			),
			required,
			validateStatus: error ? 'error' : 'success'
		};

		return <Form.Item {...formItemCommonProps}>{this.renderInput()}</Form.Item>;
	}
}

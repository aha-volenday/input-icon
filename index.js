import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, fab, far);

import 'fontawesome-iconpicker/dist/css/fontawesome-iconpicker.css';
import './styles.css';

export default class InputIcon extends Component {
	iconPicker = React.createRef();

	componentDidMount() {
		const { id, onChange } = this.props;

		$(this.iconPicker.current).iconpicker();
		$(this.iconPicker.current).on('iconpickerSelected', e => {
			onChange(id, e.iconpickerValue);
		});
	}

	renderInput() {
		const { disabled, id, label = '', placeholder = '', required = false, styles = {}, value = '' } = this.props;

		let newValue = value;
		const valueSplit = newValue.split(' ');
		if (valueSplit.length == 2) {
			const iconSplit = valueSplit[1].split('-');
			iconSplit.shift();
			newValue = [valueSplit[0], iconSplit.join('-')];
		}

		return (
			<div class="input-group">
				<input
					type="text"
					class="form-control icp icp-auto"
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
				/>
				<span class="input-group-addon">
					<FontAwesomeIcon icon={newValue} />
				</span>
			</div>
		);
	}

	render() {
		const { id, label = '', required = false, withLabel = false } = this.props;

		if (withLabel) {
			return (
				<div class="form-group">
					<label for={id}>{required ? `*${label}` : label}</label>
					{this.renderInput()}
				</div>
			);
		} else {
			return this.renderInput();
		}

		return null;
	}
}

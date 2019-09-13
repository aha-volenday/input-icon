import React, { Component } from 'react';
import InputDate from '@volenday/input-date';

// ant design
import { Form, Input, Button, Popover } from 'antd';

import 'fontawesome-iconpicker/dist/css/fontawesome-iconpicker.css';
import 'antd/dist/antd.min.css';
import './styles.css';

export default class InputIcon extends Component {
	iconPicker = React.createRef();
	state = { hasChange: false, isPopoverVisible: false };

	componentDidMount() {
		const { id, action, onChange } = this.props;

		$(`#${id}`).iconpicker();
		$(`#${id}`).on('iconpickerSelected', e => {
			onChange(id, e.iconpickerValue);
			this.setState({ hasChange: action === 'add' ? false : true });
		});
	}

	handlePopoverVisible = visible => {
		this.setState({ isPopoverVisible: visible });
	};

	renderPopover = () => {
		const { isPopoverVisible } = this.state;
		const { id, label = '', historyTrackValue = '', onHistoryTrackChange } = this.props;

		return (
			<Popover
				content={
					<InputDate
						id={id}
						label={label}
						required={true}
						withTime={true}
						withLabel={true}
						value={historyTrackValue}
						onChange={onHistoryTrackChange}
					/>
				}
				trigger="click"
				title="History Track"
				visible={isPopoverVisible}
				onVisibleChange={this.handlePopoverVisible}>
				<span class="float-right">
					<Button
						type="link"
						shape="circle-outline"
						icon="warning"
						size="small"
						style={{ color: '#ffc107' }}
					/>
				</span>
			</Popover>
		);
	};

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
		const { hasChange } = this.state;
		const { id, action, label = '', required = false, withLabel = false, historyTrack = false } = this.props;

		if (withLabel) {
			if (historyTrack) {
				return (
					<Form.Item colon={false} label={label} required={required}>
						{hasChange && action !== 'add' && this.renderPopover()}
						{this.renderInput()}
					</Form.Item>
				);
			}

			return (
				<Form.Item colon={false} label={label} required={required}>
					{this.renderInput()}
				</Form.Item>
			);
		} else {
			if (historyTrack) {
				return (
					<Form.Item>
						{hasChange && action !== 'add' && this.renderPopover()}
						{this.renderInput()}
					</Form.Item>
				);
			}

			return this.renderInput();
		}

		return null;
	}
}

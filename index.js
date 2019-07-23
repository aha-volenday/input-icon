import React, { Component } from 'react';
import InputDate from '@volenday/input-date';

// ant design
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Popover from 'antd/es/popover';

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
				class="icp icp-auto"
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
				size="large"
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
					<div class="form-group">
						<span class="float-left">
							<label for={id}>{required ? `*${label}` : label}</label>
						</span>
						{hasChange && action !== 'add' && this.renderPopover()}
						{this.renderInput()}
					</div>
				);
			}

			return (
				<div class="form-group">
					<label for={id}>{required ? `*${label}` : label}</label>
					{this.renderInput()}
				</div>
			);
		} else {
			if (historyTrack) {
				return (
					<div class="form-group">
						{hasChange && action !== 'add' && this.renderPopover()}
						{this.renderInput()}
					</div>
				);
			}

			return this.renderInput();
		}

		return null;
	}
}

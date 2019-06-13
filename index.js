import React, { Component } from 'react';
import InputDate from '@volenday/input-date';
import { Pane, Popover, Position } from 'evergreen-ui';

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

	renderPopover = () => {
		const { id, label = '', historyTrackValue = '', onHistoryTrackChange } = this.props;

		return (
			<Popover
				content={
					<Pane
						width={240}
						height={240}
						display="flex"
						alignItems="center"
						flexDirection="column"
						justifyContent="center"
						position={Position.TOP_RIGHT}
					>
						<InputDate 
							id={id}
							label={label}
							required={true}
							withTime={true}
							withLabel={true}
							value={historyTrackValue}
							onChange={onHistoryTrackChange}
						/>
					</Pane>
				}
				statelessProps={{ zIndex: 99 }}
			>
				{({ getRef, toggle }) => {
					return (
						<span class="pull-right text-warning" ref={getRef}>
							<i onClick={toggle} style={{ cursor: 'pointer' }} class="fa fa-exclamation-circle" aria-hidden="true"></i>
						</span>
					);
				}}					
			</Popover>
		);
	};

	renderInput() {
		const { disabled, id, label = '', placeholder = '', required = false, styles = {}, value = '' } = this.props;

		return (
			<div class="input-group" style={{ width: '100%' }}>
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
					<i class={value} />
				</span>
			</div>
		);
	}

	render() {
		const { id, label = '', required = false, withLabel = false, historyTrack = false } = this.props;

		if (withLabel) {
			if (historyTrack) {
				return (
					<div class="form-group">
						<span class="pull-left"><label for={id}>{required ? `*${label}` : label}</label></span>
						{this.renderPopover()}
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
						{this.renderPopover()}
						{this.renderInput()}
					</div>
				);
			}

			return this.renderInput();
		}

		return null;
	}
}

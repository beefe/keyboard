/**
 * Keyboard
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	View, Text, Image, TouchableHighlight
} from 'react-native';

import styles, {
	keyStyle, BG_COLOR
} from './styles';


const numberKeys = [
	[
		{ mainText: '1', otherText: '' },
		{ mainText: '2', otherText: '' },
		{ mainText: '3', otherText: '' }
	],
	[
		{ mainText: '4', otherText: '' },
		{ mainText: '5', otherText: '' },
		{ mainText: '6', otherText: '' }
	],
	[
		{ mainText: '7', otherText: '' },
		{ mainText: '8', otherText: '' },
		{ mainText: '9', otherText: '' }
	],
 
];

class Keyboard extends Component {

	constructor(props) {
		super(props);
	}

	_clearAll() {
		this.props.onClear();
	}

	_onPress(key) {
		if (key === '') {
			return;

		// delete key
		} else if (key === 'del') {
			this.props.onDelete();
		// space key
		} else if (key === 'space') {
			this.props.onKeyPress(' ');
		// enter key	
		} else if (key === 'enter') {
			this.props.onKeyPress('\n');

		// number key
		} else {
			this.props.onKeyPress(key);
		}

	}

	_renderOtherText(key) {
	  if (this.props.disableOtherText !== true) {
		return (<Text style={keyStyle.otherText}>{key.otherText}</Text>);
	  }

	  return null;
	}

	_disableBorder() {
	  if (this.props.disableBorder !== true) {
		return keyStyle.bd;
	  }

	  return keyStyle.border;
	}

	_disableClearButtonBackground() {
	  if (this.props.disableClearButtonBackground !== true) {
		return keyStyle.bg_d2d5dc;
	  }

	  return keyStyle.bgLess;
	}

	_clearBtnUnderlayColor() {
	  if (this.props.disableClearButtonBackground !== true) {
		return '#ffffff';
	  }

	  return '#d2d5dc';
	}

	_renderKey(key, index) {
		return (
			<TouchableHighlight
				key={index}
				underlayColor={BG_COLOR}
				style={keyStyle.wrapper}
				onPress={this._onPress.bind(this, key.mainText)}
			>
				<View style={[keyStyle.bd, this._disableBorder()]}>
					<Text style={keyStyle.mainText}>{key.mainText}</Text>
					{this._renderOtherText(key)}
				</View>
			</TouchableHighlight>
		);
	}

	_renderNumberKeys() {
		return numberKeys.map((group, groupIndex) => {
			return (
				<View key={groupIndex} style={styles.row}>
					{group.map(this._renderKey.bind(this))}
				</View>
			);
		});
	}

	_isDecimalPad() {
		return this.props.keyboardType === 'decimal-pad';
	}

	_renderDotKey() {
	  if (this.props.disableDot !== true) {
		let dotNode = null,
		dotText = '';
		if (this._isDecimalPad()) {
			dotText = '.';
			dotNode = <Text style={[keyStyle.mainText, keyStyle.dot]}>.</Text>;
		}
 
		return (
			<TouchableHighlight
				underlayColor="#ffffff"
				style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
				onPress={this._onPress.bind(this, dotText)}
			>
				<View style={[keyStyle.bd, this._disableBorder()]}>{dotNode}</View>
			</TouchableHighlight>
		);
	  }

	  return (
		<TouchableHighlight
		  style={keyStyle.wrapper}
		>
		  <View />
		</TouchableHighlight>
	  );
	}

	_isNumberPadWithComma(){
		return this.props.keyboardType === 'number-pad-comma';
	}

	render() {
		const props = this.props;

		return (
			<View style={styles.wrapper}>
				<View style={styles.main}>
					{this._renderNumberKeys()}
					
										
					{ 
						(this.props.keyboardType === 'number-pad-comma')
						?
							<View>
								<View style={styles.row}>
									<TouchableHighlight
											underlayColor={BG_COLOR}
											style={keyStyle.wrapper}
											onPress={this._onPress.bind(this, '.')}
										>
											<View style={[keyStyle.bd, this._disableBorder()]}>
												<Text style={keyStyle.mainText}>.</Text>
											</View>
									</TouchableHighlight>  

									<TouchableHighlight
											underlayColor={BG_COLOR}
											style={keyStyle.wrapper}
											onPress={this._onPress.bind(this, '0')}
										>
											<View style={[keyStyle.bd, this._disableBorder()]}>
												<Text style={keyStyle.mainText}>0</Text>
											</View>
									</TouchableHighlight>


									<TouchableHighlight
											underlayColor={BG_COLOR}
											style={keyStyle.wrapper}
											onPress={this._onPress.bind(this, ',')}
										>
											<View style={[keyStyle.bd, this._disableBorder()]}>
												<Text style={keyStyle.mainText}>,</Text>
											</View>
									</TouchableHighlight>                                

								</View>        
								<View style={styles.row}>

									<TouchableHighlight
										underlayColor={this._clearBtnUnderlayColor()}
										style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
										onPress={this._onPress.bind(this, 'del')}
										onLongPress={this._clearAll.bind(this)}
									>
										<View style={[keyStyle.bd, this._disableBorder()]}>
											<Image source={require('./images/icon_delete.png')} />
										</View>
									</TouchableHighlight>

									<TouchableHighlight
										underlayColor={this._clearBtnUnderlayColor()}
										style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
										onPress={this._onPress.bind(this, 'space')}
										onLongPress={this._clearAll.bind(this)}
									>
										<View style={[keyStyle.bd, this._disableBorder()]}>
											<Image source={require('./images/icon_space.png')} />
										</View>
									</TouchableHighlight>

									<TouchableHighlight
										underlayColor={this._clearBtnUnderlayColor()}
										style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
										onPress={this._onPress.bind(this, 'enter')}
										onLongPress={this._clearAll.bind(this)}
									>
										<View style={[keyStyle.bd, this._disableBorder()]}>
											<Image source={require('./images/icon_enter.png')} />
										</View>
									</TouchableHighlight>
															
								</View>                                    
							</View>                                                                    

						:
							<View style={styles.row}>
								{this._renderDotKey()}

								<TouchableHighlight
									underlayColor={BG_COLOR}
									style={keyStyle.wrapper}
									onPress={this._onPress.bind(this, '0')}
								>
									<View style={[keyStyle.bd, this._disableBorder()]}>
										<Text style={keyStyle.mainText}>0</Text>
									</View>
								</TouchableHighlight>
						
								<TouchableHighlight
									underlayColor={this._clearBtnUnderlayColor()}
									style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
									onPress={this._onPress.bind(this, 'del')}
									onLongPress={this._clearAll.bind(this)}
								>
									<View style={[keyStyle.bd, this._disableBorder()]}>
										<Image source={require('./images/icon_delete.png')} />
									</View>
								</TouchableHighlight>						

							</View>
					}
					<View style={styles.row}>
						
					</View>                        
				</View>
			</View>
		);
	}
}


Keyboard.propTypes = {
	// 是否显示小数点符号
	keyboardType: PropTypes.oneOf(['number-pad', 'decimal-pad','number-pad-comma']),
	// 点击键盘按键
	onKeyPress: PropTypes.func,
	// 点击删除按钮
	onDelete: PropTypes.func,
	// 长按删除按钮
	onClear: PropTypes.func
};


Keyboard.defaultProps = {
	keyboardType: 'number-pad',
	onKeyPress: () => {},
	onDelete: () => {},
	onClear: () => {}
};


export default Keyboard;

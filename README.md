# react-native-keyboard
A numeric keyboard component.

![ios demo](./doc/ios.png) ![android demo](./doc/android.png)

## Install
1. npm install react-native-keyboard --save
2. import Keyboard from 'react-native-keyboard'


## Example
```javascript
'use strict';

import React, {View, Text, StyleSheet} from 'react-native';
import Keyboard from 'react-native-keyboard';


let model = {
    
    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        model.onChange((model) => {
            this.setState({text: model.getKeys().join('')});
        });
    }

    _handleClear() {
        model.clearAll();
    }

    _handleDelete() {
        model.delKey();
    }

    _handleKeyPress(key) {
        model.addKey(key);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>{this.state.text}</Text>
                </View>    
                <Keyboard 
                    keyboardType="decimal-pad"
                    onClear={this._handleClear.bind(this)}
                    onDelete={this._handleDelete.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
            </View>
        );
    }
}
```

## Props

#### keyboardType
Type: enum('number-pad', 'decimal-pad','number-pad-comma');

#### onKeyPress
Type: func


#### onDelete
Type: func


#### onClear
Type: func

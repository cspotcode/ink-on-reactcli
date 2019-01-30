import React from 'react';

function h(nameOrComponent, ...rest) {
    switch(nameOrComponent) {
        case 'br':
        case 'div':
        case 'span':
            return React.createElement(h.__implementations[nameOrComponent], ...rest);
        default:
            return React.createElement(nameOrComponent, ...rest);
    }
}
h.Fragment = React.Fragment;
h.__implementations = {};

export = h;
export function bootstrap() {
    // TODO handle transitive dependencies?  E.g. if a second copy of `ink`
    // gets installed to node_modules/*/node_modules/ink
    const inkLibs = [
        'ink'
    ];

    // Pollute the require cache to "inject" ourselves into ink.
    // Then, when ink loads, it'll use our injected modules instead of its own implementations.

    const replacementInkComponent = require('./ink-injections/lib/component');
    const replacementInkComponentModuleId = require.resolve('./ink-injections/lib/component');
    const replacementInkH = require('./ink-injections/lib/h');
    const replacementInkHModuleId = require.resolve('./ink-injections/lib/h');

    // start by replacing ink's Component and h() implementations
    for(const inkLib of inkLibs) {
        require.cache[require.resolve(`${ inkLib }/lib/component`)] = require.cache[replacementInkComponentModuleId];
        require.cache[require.resolve(`${ inkLib }/lib/h`)] = require.cache[replacementInkHModuleId];
    }

    // Do this here, not within our h() implementation, to avoid loading ink before we've injected ourselves into the require cache
    Object.assign(replacementInkH.__implementations, {
        br: require('ink/lib/components/br'),
        div: require('ink/lib/components/div'),
        span: require('ink/lib/components/span'),
    });
}
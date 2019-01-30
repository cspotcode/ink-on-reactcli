export {bootstrap} from './bootstrap';

type Ctor<I> = {
    new (...args: any[]): I;
};
export function wrapInkComponent<T extends Ctor<any>>(InkComponentClass: T) {
    class Wrapper extends InkComponentClass {
        render() {
            // React does not pass state and props as args.  Ink does.
            // So give the Ink component what it wants.
            return super.render(this.props, this.state);
        }
    }
    return Wrapper;
}

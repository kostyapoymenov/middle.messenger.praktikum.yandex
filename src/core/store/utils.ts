import type Block from '../block';
import type { IBlockProps } from '../block/types';
import type { IAppState } from './types';

function withStore(
  Component: typeof Block,
  mapStateToProps: (state: Partial<IAppState>) => Partial<IAppState>
) {
  return class extends Component {
    constructor(tagName?: string, propsAndChildren: Partial<IBlockProps> = {}) {
      super(tagName, propsAndChildren);
      this.setProps(mapStateToProps(window.store.getState()));
      window.store.subscribe((state: Partial<IAppState>) => {
        this.setProps(mapStateToProps(state));
      });
    }
  };
}

export default withStore;

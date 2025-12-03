import { expect } from 'chai';
import Block from './index.ts';
import type { IBlockMeta, IBlockProps } from './types.ts';

describe('Block', () => {
  interface TestBlockInstance extends Block<Partial<IBlockProps>> {
    getProps(): IBlockProps;
    getMeta(): IBlockMeta;
    getId(): string;
  }

  let TestBlock: new (props?: Partial<IBlockProps>) => TestBlockInstance;

  beforeEach(() => {
    TestBlock = class TestBlockClass extends Block<Partial<IBlockProps>> {
      constructor(props: Partial<IBlockProps> = {}) {
        super('div', props);
      }

      public getProps(): IBlockProps {
        return this.meta.props;
      }

      public getMeta() {
        return this.meta;
      }

      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement('div');
        div.textContent = 'Test Content';
        fragment.appendChild(div);
        return fragment;
      }
    };
  });

  describe('constructor', () => {
    it('should create element with default tag name', () => {
      const block = new TestBlock();
      const element = block.getElement();
      expect(element).to.exist;
      expect(element?.tagName).to.equal('DIV');
    });

    it('should create element with custom tag name', () => {
      const CustomBlock = class extends Block {
        constructor(props: IBlockProps = {}) {
          super('button', props);
        }
        render() {
          return document.createDocumentFragment();
        }
      };
      const block = new CustomBlock();
      const element = block.getElement();
      expect(element?.tagName).to.equal('BUTTON');
    });

    it('should assign unique id', () => {
      const block1 = new TestBlock();
      const block2 = new TestBlock();
      expect(block1.getId()).to.exist;
      expect(block2.getId()).to.exist;
      expect(block1.getId()).to.not.equal(block2.getId());
    });
  });

  describe('props and children', () => {
    it('should separate props and children', () => {
      const childBlock = new TestBlock();
      const block = new TestBlock({
        className: 'test-class',
        text: 'Hello',
        child: childBlock,
      });

      expect(block.getProps().className).to.equal('test-class');
      expect(block.getProps().text).to.equal('Hello');
      expect(block.children.child).to.equal(childBlock);
    });

    it('should handle array of children', () => {
      const child1 = new TestBlock();
      const child2 = new TestBlock();
      const block = new TestBlock({
        items: [child1, child2],
      });

      expect(Array.isArray(block.children.items)).to.be.true;
      expect(block.children.items).to.deep.equal([child1, child2]);
    });
  });

  describe('element manipulation', () => {
    it('should return element content', () => {
      const block = new TestBlock();
      const content = block.getContent();
      expect(content).to.be.instanceOf(HTMLElement);
    });

    it('should apply className from props', () => {
      const block = new TestBlock({ className: 'test-class another-class' });
      const element = block.getElement();
      expect(element?.classList.contains('test-class')).to.be.true;
      expect(element?.classList.contains('another-class')).to.be.true;
    });

    it('should apply attributes from props', () => {
      const block = new TestBlock({
        attrs: {
          'data-test': 'value',
          id: 'custom-id',
        },
      });
      const element = block.getElement();
      expect(element?.getAttribute('data-test')).to.equal('value');
      expect(element?.getAttribute('id')).to.equal('custom-id');
    });
  });

  describe('setProps method', () => {
    it('should update props correctly', () => {
      const block = new TestBlock({ prop1: 'value1', prop2: 'value2' });

      expect(block.getProps().prop1).to.equal('value1');
      expect(block.getProps().prop2).to.equal('value2');

      block.setProps({ prop1: 'updated', prop3: 'new' });

      expect(block.getProps().prop1).to.equal('updated');
      expect(block.getProps().prop2).to.equal('value2');
      expect(block.getProps().prop3).to.equal('new');
    });

    it('should handle empty props', () => {
      const block = new TestBlock();
      expect(() => {
        block.setProps({});
      }).to.not.throw();
    });
  });
});

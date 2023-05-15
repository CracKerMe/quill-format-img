// @flow

import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';
import IframeVideoSpec from './specs/IframeVideoSpec';

export type OverlayOptions = {
  // classname applied to the overlay element
  className: string,
  // style applied to overlay element, or null to prevent styles
  style: ?{},
};

export type ResizeOptions = {
  // class name applied to the resize handles
  handleClassName: string,
  // style applied to resize handles, or null to prevent styles
  handleStyle: ?{},
};

export type AlignOptions = {
  // the name of the attribute for an element that has its alignment changed
  attribute: string,
  // the aligner does the actual alignment switch
  aligner: {
    // whether or not the aligner should handle the actual alignment properties
    applyStyle: boolean,
  },
  // icons used for alignment
  icons: {
    left: string,
    center: string,
    right: string,
  },
  // the toolbar so users can change alignments
  toolbar: {
    // whether or not users can deselect an alignment. it's up to you to set the initial alignment
    allowDeselect: boolean,
    // class name applied to the root toolbar element
    mainClassName: string,
    // style applied to root toolbar element, or null to prevent styles
    mainStyle: ?{},
    // class name applied to each button in the toolbar
    buttonClassName: string,
    /* whether or not to add the selected style to the buttons.
    they'll always get the is-selected class */
    addButtonSelectStyle: boolean,
    // style applied to buttons, or null to prevent styles
    buttonStyle: ?{},
    // style applied to the svgs in the buttons
    svgStyle: ?{},
  },
};

export type Options = {
  // the BlotSpecs supported
  specs: Class<BlotSpec>[],
  overlay: OverlayOptions,
  align: AlignOptions,
  resize: ResizeOptions,
};

const DefaultOptions: Options = {
  specs: [
    ImageSpec,
    IframeVideoSpec,
  ],
  overlay: {
    className: 'blot-formatter__overlay',
    style: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
    },
  },
  align: {
    attribute: 'data-align',
    aligner: {
      applyStyle: true,
    },
    icons: {
      left: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
      center: `
        <svg viewbox="0 0 18 18">
           <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
        </svg>
      `,
      right: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
      // eslint-disable-next-line quotes
      setlink: `<svg style="width: 100%;height: 100%;" t="1684138542850" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5027" width="200" height="200"><path d="M513.536 673.4336l-180.8384 180.8384a116.736 116.736 0 0 1-81.4592 32.9216 116.736 116.736 0 0 1-81.5104-32.9728 114.5344 114.5344 0 0 1-33.8432-81.408c0-31.8976 12.9536-60.672 33.8432-81.5104l180.8384-180.7872a46.7968 46.7968 0 0 0-29.0816-83.6608 46.848 46.848 0 0 0-36.7104 17.7152l-0.0512 0.1024-180.8384 180.736a208.6912 208.6912 0 0 0 294.8608 294.4512l-0.2048 0.256 180.7872-180.8384a46.8992 46.8992 0 0 0-65.9456-65.792h0.1024zM911.872 112.128A207.9232 207.9232 0 0 0 764.6208 51.2c-57.4976 0-109.568 23.2448-147.3024 60.928L436.48 292.864a46.7968 46.7968 0 0 0 29.0816 83.6608c14.848 0 28.1088-6.912 36.7104-17.664l0.0512-0.1024 180.8384-180.8384a116.736 116.736 0 0 1 81.408-32.9216c31.744 0 60.416 12.544 81.5616 32.9728 20.8896 20.7872 33.792 49.6128 33.792 81.408 0 31.8976-12.9024 60.672-33.792 81.5104l-180.8384 180.7872a46.7968 46.7968 0 0 0 0 65.8432 46.7968 46.7968 0 0 0 65.8432 0l180.7872-180.736A207.9232 207.9232 0 0 0 972.8 259.3792c0-57.5488-23.2448-109.568-60.928-147.3536h0.0512zM360.6016 663.3984c8.3456 8.192 19.712 13.2608 32.3072 13.4144H393.6256c12.8 0 24.3712-5.12 32.8192-13.4144l228.8128-228.8128a46.7968 46.7968 0 0 0-29.0816-83.6096 46.848 46.848 0 0 0-36.7104 17.664l-0.0512 0.1024-228.864 228.8128a46.7968 46.7968 0 0 0 0 65.8432z" p-id="5028" fill="#333333"></path></svg>`,
    },
    toolbar: {
      allowDeselect: true,
      mainClassName: 'blot-formatter__toolbar',
      mainStyle: {
        position: 'absolute',
        top: '-12px',
        right: '0',
        left: '0',
        height: '0',
        minWidth: '100px',
        font: '12px/1.0 Arial, Helvetica, sans-serif',
        textAlign: 'center',
        color: '#333',
        boxSizing: 'border-box',
        cursor: 'default',
        zIndex: '1',
      },
      buttonClassName: 'blot-formatter__toolbar-button',
      addButtonSelectStyle: true,
      buttonStyle: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        background: 'white',
        border: '1px solid #999',
        verticalAlign: 'middle',
      },
      svgStyle: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        background: 'white',
        border: '1px solid #999',
        verticalAlign: 'middle',
      },
    },
  },
  resize: {
    handleClassName: 'blot-formatter__resize-handle',
    handleStyle: {
      position: 'absolute',
      height: '12px',
      width: '12px',
      backgroundColor: 'white',
      border: '1px solid #777',
      boxSizing: 'border-box',
      opacity: '0.80',
    },
  },
};

export default DefaultOptions;

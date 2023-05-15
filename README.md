# Quill Blot Formatter

A [quill](https://quilljs.com/) module to format document [blots](https://github.com/quilljs/parchment#blots). Heavily inspired by [quill-image-resize-module](https://github.com/kensnyder/quill-image-resize-module). Out of the box supports resizing and realigning images and iframe videos, but can be easily extended using [`BlotSpec`](#blotspec) and [`Action`](#action).

## Demo
[demo](https://codesandbox.io/s/4wnwllnnl9)

## Installation
Using `yarn`:
```
yarn add quill-format-img
```

Using `npm`:
```
npm install --save quill-format-img
```

## Usage
### As Module
```js
import Quill from 'quill';

// from the index, which exports a lot of useful modules
import BlotFormatter from 'quill-format-img';

// or, from each individual module
import BlotFormatter from 'quill-format-img/dist/BlotFormatter';

Quill.register('modules/blotFormatter', BlotFormatter);

const quill = new Quill(..., {
  modules: {
    ...
    blotFormatter: {
      // see config options below
    }
  }
});
```

### Script Tag
`quill-format-img.min.js` is provided which exports the same modules as `index.js` under the global `QuillBlotFormatter`.

```html
<script src="<quill>"></script>
<script src="node_modules/quill-format-img/dist/quill-format-img.min.js"></script>
<script>
  Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
  const quill = new Quill(..., {
      modules: {
          ...
          blotFormatter: {
            // see config options below
          }
      }
    }
  });
</script>
```

## BlotSpec
The [`BlotSpec`](https://github.com/Fandom-OSS/quill-format-img/blob/master/src/specs/BlotSpec.js) classes define how `BlotFormatter` interacts with blots. They take the `BlotFormatter` as a constructor arg and have the following functions:

### `init(): void`
Called after all specs have been constructed. Use this to bind to quill events to determine when to activate a specific spec.

### `getActions(): Class<Action>[]`
The [`actions`](#action) that are allowed on this blot. The default is `[AlignAction, ResizeAction, DeleteAction]`.

### `getTargetElement(): ?HTMLElement`
When the spec is active this should return the element that is to be formatter

### `getOverlayElement(): ?HTMLElement`
When the spec is active this should return the element to display the formatting overlay. This defaults to `return getTargetElement()` since they will typically be the same element.

### `setSelection(): void`
After the spec is activated this should set the quill selection using [`setSelection`](https://quilljs.com/docs/api/#setselection). Defaults to `quill.setSelection(null)`.

### `onHide(): void`
Called when the spec is deactivated by the user clicking away from the blot. Use this to clean up any state in the spec during activation.

### Notes
Each spec should call `this.formatter.show(this);` to request activation. See [`specs/`](https://github.com/Fandom-OSS/quill-format-img/tree/master/src/specs) for the built-in specs.

## Action
The [`Action`](https://github.com/Fandom-OSS/quill-format-img/blob/master/src/actions/Action.js) classes define the actions available to a blot once its spec is activated. They take the `BlotFormatter` as a constructor arg and have the following functions:

### `onCreate(): void`
Called immediately after the action is created. Use this to bind quill events and create elements to attach to the overlay.

### `onUpdate(): void`
Called when the formatter has changed something on the blot. Use this to update any internal state.

### `onDestroy(): void`
Called when the formatter is hidden by the user.

See [`actions/`](https://github.com/Fandom-OSS/quill-format-img/tree/master/src/actions) for the existing actions.

## Options
Using quill module options it's easy to disable existing specs, actions, or to override any of the styles provided by this module. For example: if you wanted to remove resizing, support only images, and change the overlay border the following config would work:

```js
import Quill from 'quill';

// from main module
import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-format-img'

// or, from individual modules
import BlotFormatter from 'quill-format-img/dist/BlotFormatter';
import AlignAction from 'quill-format-img/dist/actions/align/AlignAction';
import DeleteAction from 'quill-format-img/dist/actions/DeleteAction';
import ImageSpec from 'quill-format-img/dist/specs/ImageSpec';

Quill.register('modules/blotFormatter', BlotFormatter);

class CustomImageSpec extends ImageSpec {
    getActions() {
        return [AlignAction, DeleteAction];
    }
}

const quill = new Quill(..., {
  modules: {
    ...
    blotFormatter: {
      specs: [
        CustomImageSpec,
      ],
      overlay: {
        style: {
          border: '2px solid red',
        }
      }
    }
  }
});
```

### Notes
- For all supported options as well as the default see [`Options`](https://github.com/Fandom-OSS/quill-format-img/blob/master/src/Options.js).
- object properties are merged, but array properties override the defaults.
- To completely disable styles (`overlay.style`, `resize.handleStyle`, etc) set those to `null`

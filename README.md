## Introduction
a lightweight mobile toast component build on vue

## Installation
```
  npm i zen-toast -S
```

## Usage

#### import
``` javascript
import { Toast } from 'zen-toast';

Vue.use(Toast);
```

#### basic
```javascript
Toast('basic');

Toast.success('success~');

Toast.fail('failed~');

Toast.loading('loading...')
```

#### custom duration
```javascript
Toast({
    message: 'message',
    duration: 0.5
});
```

#### close on click overlay
```javascript
Toast({
    message: 'message！',
    duration: 0,
    closeOnClick: true
});
```

## API

#### methods

| name | params | return | Description |
|------|------|------|------|
| Toast | `options | message` | `void` | show a toast with default style |
| Toast.success | `options | message` | `void` | show a toast with success style |
| Toast.fail | `options | message` | `void` | show a toast with fail style |
| Toast.loading | `options | message` | `void` | show a toast with loading style |
| toast.clear | - | `void` | instance method，clear current toast  |

#### options

| name | Description | type | default | 
|------|------|------|------|
| message | message，maxlength 18 | *string* | ' ' | 
| duration | Toast duration(s), won't disappear if value is 0 | *number* | duration is 3s if text length is larger than 8, and 1.5s if it is not |
| closeOnClick | Whether to close when click overlay | *boolean* | false |

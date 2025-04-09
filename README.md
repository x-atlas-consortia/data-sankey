# Data Sankey (xac-sankey)
Reusable component for displaying consortia data visualization

## Usage
### React
```
import 'xac-sankey/dist/xac-sankey.css'

function Sankey() {
    useEffect(() => {
        import('xac-sankey')
    }, [])

    return (
        <>
            <react-consortia-sankey />
        </>
        )
}
```

### Static Html
```
<html>
<head>
    <title>DS</title>
    <script type="module" src="./js/ConsortiaSankey.js"></script>
    <link rel="stylesheet" href="./xac-sankey.css" />
</head>
<body>
<div class="c-sankey">
    <consortia-sankey />
</div>
</body>
</html>
```

### Passing options
#### Via Attributes
String value options can be passed to the options attribute. It takes a stringified object converted in base64 via the `btoa` method.
```
const ops = {
    api: {
        sankey: 'https://entity.api.sennetconsortium.org/datasets/sankey_data'
        token: 'groups token here'
    }
}
<react-consortia-sankey id='js-sankey' options={btoa(JSON.stringify(ops))} />
```

#### Via the `setOptions` method
`setOptions` only becomes available when `useShadow` is set to `true`. Must pass the `styleSheetPath` for css to be applied to the shadow DOM.

```
const ops = {
    useShadow: true,
    styleSheetPath: './xac-sankey.css',
    api: {
        token: 'groups token here'
    }
}
<react-consortia-sankey id='js-sankey' options={btoa(JSON.stringify(ops))} />
```

`setOptions` will then be available once shadow DOM is ready. You may need to make a check for this depending on your environment. Either with [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a `setTimeout`/`setInterval` callback that asserts `el.setOptions` is not `undefined`.
```
const el = document.getElementById('js-sankey')
el.setOptions({
    api[obj], // {api: {sankey[str], token[str], ubkg[obj]}}
    filters[obj], // {column_name: str}, key-value pair to filter data on
    dataCallback[function(row)] -> list[obj], // returns list of objects of filtered data
    validFilterMap[obj], // {column_name: str}
    d3[obj], // {d3, d3sankey, sankeyLinkHorizontal } // the d3 library and related functions for building the graph
    loading[obj], // {html[str], callback[function(ctx)]} // loading html and callback
    styleSheetPath[str] // publicly accessible url to stylesheet
})

```

## UBKG
To set the `sap` for UBKG organs endpoint:
```
const ops = {
    ubkg: {
        sap: 'hubmap',
    }
}
el.setAttribute('options', btoa(JSON.stringify(ops)))
```

## Other
You may remove defaults from `validFilterMap` by setting the property to `null`.
```
const el = document.getElementById('js-sankey')
const ops = {
    useShadow: true,
    styleSheetPath: './xac-sankey.css',
    validFilterMap: {
        status: null,
        source_type: 'dataset_source_type'
    }
}
el.setAttribute('options', btoa(JSON.stringify(ops)))
```

## Dev
```
npm run all // starts watcher, auto builds and serves example for viewing results
npm run dist // builds distribution
npm run example // serves distribution with example implementation
```
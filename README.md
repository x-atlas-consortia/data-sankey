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
    api[obj], // {context[str], sankey[str], token[str], ubkgOrgans[str]}
    filters[obj], // {columnName: str}, key-value pair to filter data on
    dataCallback[function(row)] -> list[obj], // returns list of objects of filtered data
    onNodeBuildCssCallback[function(row)] -> str, // the callback when building the node class css, should return a string class name to append
    onLinkBuildCssCallback[function(row)] -> str, // the callback when building the link class css, should return a string class name to append
    onNodeClickCallback[function(event, row)], // the callback when a node is clicked
    onLabelClickCallback[function(event, row)], // the callback when a label or name is clicked
    validFilterMap[obj], // {columnName: str} // The mapping between `filters` key to `validFilterMap` key
    displayableFilterMap[obj], // {columnName: str} // the column names to be displayed visually, leave as an empty bject to display all from `validFilterMap`
    d3[obj], // {d3, d3sankey, sankeyLinkHorizontal } // the d3 library and related functions for building the graph
    loading[obj], // {html[str], callback[function(ctx)]} // loading html and callback
    styleSheetPath[str], // publicly accessible url to stylesheet
    groupByOrganCategoryKey[str], // the UBKG property name to use when building dictionary of organs category; default is rui_code
    theme[obj], // {byScheme: {columnName: d3ColorFunction}, byValue: {value: colorHexStr}}
    dimensions[obj] // {breakpoint[int], mobileMaxWidth[int], desktopMaxHeight[int]}  defines sizing specifications
})

```

## UBKG
To set the `context` (SAP) for UBKG organs endpoint:
```
const ops = {
    context: 'hubmap'
}
el.setAttribute('options', btoa(JSON.stringify(ops)))
```
## Adapters
There are two adapters available for easy implementation across projects, `SenNetAdapter` and `HuBMAPAdapter` adapters. For usage, see respective `example*.html` files.
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